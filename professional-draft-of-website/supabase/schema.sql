-- ===========================================================================
-- GTRE website — Supabase schema (idempotent)
--
-- Run this in the Supabase SQL editor. It is safe to run MORE THAN ONCE: every
-- statement guards against "already exists", so re-running it simply converges
-- your database to the intended state (fresh, half-applied, or fully applied).
--
-- Table + column names mirror src/lib/store/types.ts so the Supabase data
-- adapter maps 1:1 to the mock store.
--
-- Auth model:
--   * Supabase Auth owns credentials (email/password). Remove any Google/OAuth
--     provider in Authentication → Providers (email/password only), and enable
--     "Confirm email" so sign-ups must verify their address.
--   * `profiles` extends auth.users with role + approval status + club fields.
--   * A new sign-up creates a profile with status = 'pending' (via the trigger
--     below). Admins approve.
-- ===========================================================================

-- Enum types (guarded so re-runs don't error). ------------------------------
do $$ begin
  create type account_role as enum ('student', 'industry', 'admin');
exception when duplicate_object then null; end $$;

do $$ begin
  create type account_status as enum ('pending', 'approved', 'rejected');
exception when duplicate_object then null; end $$;

-- Extend auth.users ----------------------------------------------------------
create table if not exists public.profiles (
  id           uuid primary key references auth.users on delete cascade,
  role         account_role   not null default 'student',
  status       account_status not null default 'pending',
  name         text not null,
  email        text not null unique,
  company      text,
  linkedin     text,
  title        text,
  grad_year    int,
  major        text,
  is_alumni    boolean not null default false,
  created_at   timestamptz not null default now(),
  approved_at  timestamptz,
  approved_by  uuid references auth.users
);

-- Students must use a Georgia Tech email (belt-and-suspenders with app logic).
alter table public.profiles drop constraint if exists student_gt_email;
alter table public.profiles
  add constraint student_gt_email
  check (role <> 'student' or email ~* '@([a-z0-9-]+\.)*gatech\.edu$');

-- Content tables --------------------------------------------------------------
create table if not exists public.announcements (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  body        text not null,
  category    text not null default 'General',
  pinned      boolean not null default false,
  author_id   uuid references public.profiles,
  author_name text,
  created_at  timestamptz not null default now()
);

create table if not exists public.events (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  type          text not null default 'Meeting',
  -- Which schedule track this belongs to (mirrors the two-column schedule).
  track         text not null default 'General',
  date          date not null,
  time          text,
  location      text,
  description   text,
  -- Manual display order within a track (lower = earlier); admins reorder.
  "order"       int not null default 0,
  check_in_code text,
  check_in_open boolean not null default false,
  created_at    timestamptz not null default now()
);
-- Add track/order if the events table already existed from an older schema.
alter table public.events add column if not exists track text not null default 'General';
alter table public.events add column if not exists "order" int not null default 0;

create table if not exists public.check_ins (
  id           uuid primary key default gen_random_uuid(),
  event_id     uuid references public.events on delete cascade,
  event_title  text,
  account_id   uuid references public.profiles on delete cascade,
  member_name  text,
  member_email text,
  checked_in_at timestamptz not null default now(),
  unique (event_id, account_id)
);

create table if not exists public.assignments (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  week        int,
  due_date    date not null,
  points      int not null default 0,
  category    text not null default 'Assignment',
  published   boolean not null default true,
  created_at  timestamptz not null default now()
);

create table if not exists public.submissions (
  id            uuid primary key default gen_random_uuid(),
  assignment_id uuid references public.assignments on delete cascade,
  account_id    uuid references public.profiles on delete cascade,
  member_name   text,
  member_email  text,
  type          text not null,
  content       text not null,
  comments      text,
  submitted_at  timestamptz not null default now(),
  grade         int,
  feedback      text,
  graded_at     timestamptz,
  graded_by     text,
  unique (assignment_id, account_id)
);

create table if not exists public.questions (
  id          uuid primary key default gen_random_uuid(),
  account_id  uuid references public.profiles on delete cascade,
  member_name text,
  subject     text not null,
  body        text not null,
  status      text not null default 'open',
  answer      text,
  answered_by text,
  created_at  timestamptz not null default now(),
  answered_at timestamptz
);

create table if not exists public.meeting_notes (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  date        date not null,
  body        text,
  author_name text,
  created_at  timestamptz not null default now()
);

create table if not exists public.resources (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  url         text not null,
  category    text not null default 'Link',
  created_at  timestamptz not null default now()
);

-- Single-row editable site info.
create table if not exists public.site_info (
  id                       int primary key default 1,
  meeting_time             text,
  meeting_location         text,
  contact_email            text,
  analyst_program_intro    text,
  syllabus_embed_url       text default '',
  google_calendar_embed_url text default '',
  check (id = 1)
);
insert into public.site_info (id) values (1) on conflict do nothing;

-- Admin-swappable site images: slot key -> uploaded image URL (see lib/images.ts).
create table if not exists public.site_images (
  key        text primary key,
  url        text not null,
  updated_at timestamptz not null default now()
);

-- ===========================================================================
-- Auto-create a profile when a user signs up.
--
-- A new sign-up (supabase.auth.signUp) writes name/role/club fields into the
-- user's metadata (raw_user_meta_data). This trigger copies them into
-- public.profiles with status = 'pending'. SECURITY DEFINER lets it insert past
-- RLS, so the browser never needs an INSERT policy on profiles. With email
-- confirmation ON, the account still can't sign in until the user clicks the
-- verification link AND an admin approves — the two gates behind sign-up.
-- ===========================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role, status, name, email, company, linkedin, title, grad_year, major)
  values (
    new.id,
    coalesce((new.raw_user_meta_data->>'role')::account_role, 'student'),
    'pending',
    coalesce(new.raw_user_meta_data->>'name', ''),
    new.email,
    new.raw_user_meta_data->>'company',
    new.raw_user_meta_data->>'linkedin',
    new.raw_user_meta_data->>'title',
    nullif(new.raw_user_meta_data->>'grad_year', '')::int,
    new.raw_user_meta_data->>'major'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ===========================================================================
-- Row-Level Security (RLS). Re-running drops+recreates each policy.
-- ===========================================================================
alter table public.profiles      enable row level security;
alter table public.announcements enable row level security;
alter table public.events        enable row level security;
alter table public.check_ins     enable row level security;
alter table public.assignments   enable row level security;
alter table public.submissions   enable row level security;
alter table public.questions     enable row level security;
alter table public.meeting_notes enable row level security;
alter table public.resources     enable row level security;
alter table public.site_info     enable row level security;
alter table public.site_images   enable row level security;

-- Helper: is the current user an approved admin?
create or replace function public.is_admin() returns boolean language sql stable as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin' and status = 'approved'
  );
$$;

-- Helper: is the current user approved (any role)?
create or replace function public.is_approved() returns boolean language sql stable as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and status = 'approved'
  );
$$;

-- Profiles: you can read/update your own row; admins do everything.
drop policy if exists "own profile read"      on public.profiles;
drop policy if exists "own profile update"    on public.profiles;
drop policy if exists "admin manage profiles" on public.profiles;
create policy "own profile read"   on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "own profile update" on public.profiles for update using (id = auth.uid());
create policy "admin manage profiles" on public.profiles for all using (public.is_admin()) with check (public.is_admin());

-- Announcements, events, and resources are public: the public /news, /calendar,
-- and /search pages read them without a session. Admins write them.
drop policy if exists "members read announcements" on public.announcements;
drop policy if exists "public read announcements"  on public.announcements;
drop policy if exists "admin write announcements"  on public.announcements;
create policy "public read announcements" on public.announcements for select using (true);
create policy "admin write announcements"  on public.announcements for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "members read events" on public.events;
drop policy if exists "public read events"  on public.events;
drop policy if exists "admin write events"  on public.events;
create policy "public read events" on public.events for select using (true);
create policy "admin write events"  on public.events for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "members read resources" on public.resources;
drop policy if exists "public read resources"  on public.resources;
drop policy if exists "admin write resources"  on public.resources;
create policy "public read resources" on public.resources for select using (true);
create policy "admin write resources"  on public.resources for all using (public.is_admin()) with check (public.is_admin());

-- Assignments stay member-only (portal content). Admins write them.
drop policy if exists "members read assignments" on public.assignments;
drop policy if exists "admin write assignments"  on public.assignments;
create policy "members read assignments" on public.assignments for select using (public.is_approved());
create policy "admin write assignments"  on public.assignments for all using (public.is_admin()) with check (public.is_admin());

-- Submissions: a member manages their own; admins read/grade all.
drop policy if exists "own submissions"        on public.submissions;
drop policy if exists "admin read submissions" on public.submissions;
drop policy if exists "admin grade submissions" on public.submissions;
create policy "own submissions"     on public.submissions for all using (account_id = auth.uid()) with check (account_id = auth.uid());
create policy "admin read submissions" on public.submissions for select using (public.is_admin());
create policy "admin grade submissions" on public.submissions for update using (public.is_admin());

-- Check-ins: a member creates/reads their own; admins read all.
drop policy if exists "own check-ins"        on public.check_ins;
drop policy if exists "admin read check-ins" on public.check_ins;
create policy "own check-ins"       on public.check_ins for all using (account_id = auth.uid()) with check (account_id = auth.uid());
create policy "admin read check-ins" on public.check_ins for select using (public.is_admin());

-- Questions: a member creates/reads their own + answered ones; admins manage all.
drop policy if exists "member questions" on public.questions;
drop policy if exists "member ask"       on public.questions;
drop policy if exists "admin answer"     on public.questions;
create policy "member questions" on public.questions for select using (account_id = auth.uid() or status = 'answered' or public.is_admin());
create policy "member ask"        on public.questions for insert with check (account_id = auth.uid());
create policy "admin answer"      on public.questions for all using (public.is_admin()) with check (public.is_admin());

-- Meeting notes: admins only.
drop policy if exists "admin notes" on public.meeting_notes;
create policy "admin notes" on public.meeting_notes for all using (public.is_admin()) with check (public.is_admin());

-- Site info: anyone can read (public pages use it); admins edit.
drop policy if exists "public read site info" on public.site_info;
drop policy if exists "admin edit site info"  on public.site_info;
create policy "public read site info" on public.site_info for select using (true);
create policy "admin edit site info"  on public.site_info for all using (public.is_admin()) with check (public.is_admin());

-- Site images: anyone can read (public pages render them); admins edit.
drop policy if exists "public read site images" on public.site_images;
drop policy if exists "admin edit site images"  on public.site_images;
create policy "public read site images" on public.site_images for select using (true);
create policy "admin edit site images"  on public.site_images for all using (public.is_admin()) with check (public.is_admin());

-- ===========================================================================
-- Storage: a public bucket for admin-uploaded site images. Admins upload via
-- Admin → Images; everyone can read the resulting public URLs.
-- ===========================================================================
insert into storage.buckets (id, name, public)
  values ('site-images', 'site-images', true)
  on conflict (id) do update set public = true;

drop policy if exists "public read site-images" on storage.objects;
create policy "public read site-images" on storage.objects
  for select using (bucket_id = 'site-images');

drop policy if exists "admin write site-images" on storage.objects;
create policy "admin write site-images" on storage.objects
  for all
  using (bucket_id = 'site-images' and public.is_admin())
  with check (bucket_id = 'site-images' and public.is_admin());
