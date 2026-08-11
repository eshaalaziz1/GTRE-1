-- ===========================================================================
-- GTRE backend migration — brings an EXISTING database up to the version the
-- Supabase data adapter expects. Safe to run more than once (idempotent).
--
-- Run this in the Supabase SQL editor if you already ran an earlier schema.sql.
-- If you're starting a brand-new project, just run schema.sql instead — it now
-- includes everything below.
-- ===========================================================================

-- 1) events: add the track + manual-order columns the schedule UI needs. -------
alter table public.events add column if not exists track text not null default 'General';
alter table public.events add column if not exists "order" int not null default 0;

-- 2) Auto-create a profile (status = 'pending') on sign-up. --------------------
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

-- 3) Make announcements / events / resources publicly readable. ----------------
-- The public /news, /calendar, and /search pages read them without a session.
drop policy if exists "members read announcements" on public.announcements;
drop policy if exists "public read announcements"  on public.announcements;
create policy "public read announcements" on public.announcements for select using (true);

drop policy if exists "members read events" on public.events;
drop policy if exists "public read events"  on public.events;
create policy "public read events" on public.events for select using (true);

drop policy if exists "members read resources" on public.resources;
drop policy if exists "public read resources"  on public.resources;
create policy "public read resources" on public.resources for select using (true);
