# GTRE Website — Portals, Auth & Backend Setup

This app runs on **two interchangeable data adapters**, selected at runtime by
`NEXT_PUBLIC_DATA_BACKEND` (see `src/lib/store/`):

- **`mock`** (default) — a browser `localStorage` store. Accounts, approvals,
  assignments, grading, check-ins, Q&A, the calendar, and site-info edits all
  work with no backend, so you can click through every screen. Data lives in one
  browser and is not shared between visitors.
- **`supabase`** — the real backend: Supabase Auth (with email verification) for
  sign-up/sign-in, and Postgres tables (guarded by Row-Level Security) for
  everything else. Site-info and content edits persist for **all** visitors.

Both adapters implement the same `useGtre()` contract (`src/lib/store/context.tsx`),
so **no page components change** when you flip the backend. The section below is
everything needed to turn Supabase on.

## What's built

| Area | Route | Notes |
|---|---|---|
| Public site | `/about`, `/analyst-program`, `/news`, `/events`, `/calendar`, `/alumni`, `/advisory-board`, `/contact` | Marketing + program pages |
| Analyst Program | `/analyst-program` | Overview · Curriculum · **Syllabus (view-only embed placeholder)** · Resources |
| Calendar | `/calendar` | Admin-managed month grid + upcoming list; optional Google Calendar embed |
| Auth | `/login`, `/signup` | Student (GT email) + Industry (email/password/LinkedIn). **No Google sign-in.** |
| Member portal | `/portal`, `/portal/*` | Home, Assignments, Grades, Check-In, Materials, Q&A, Profile |
| Admin portal | `/admin`, `/admin/*` | Members/approvals, Announcements, Events & Check-Ins, Assignments & Grading, Questions, Materials, Meeting Notes, Site Info |
| Analyst Rolodex | `/rolodex`, `/rolodex/directory` | Gateway + sign-in gate → vetted directory |

### Demo logins (prototype)
- `admin@gatech.edu` / `admin123` — admin (full access)
- `member@gatech.edu` / `member123` — approved student
- `recruiter@firm.com` / `recruiter123` — approved industry professional
- `pending@gatech.edu` / `pending123` — pending (blocked until an admin approves)

Reset demo data any time in **Admin → Site Info → Reset**.

## Account rules (as implemented)
- **Students** must sign up with an `@gatech.edu` email (enforced in the store
  and in the Supabase schema `check` constraint).
- **Industry professionals** must supply a **LinkedIn URL**; email + password.
- Every new account is created `pending` and cannot sign in until an admin
  **approves** it. Admins can approve, reject, delete, set roles, and mark
  alumni.
- **Google sign-in is removed** — email/password only.

## Going live with Supabase

The Supabase adapter is **already built** (`src/lib/store/SupabaseStore.tsx` +
`src/lib/supabase/client.ts`). Turning it on is configuration, not coding:

1. **Create a Supabase project** (free tier is fine).
2. **Run the schema.** In the SQL editor, paste and run `supabase/schema.sql`.
   It creates `profiles` (extends `auth.users`), every content table, the
   sign-up trigger that auto-creates a pending profile, and the RLS policies.
   The script is **idempotent** — safe to run more than once, so if an earlier
   run half-applied, just run it again and it converges.
3. **Enable email verification.** In **Authentication → Providers → Email**,
   enable **Confirm email**. Disable Google/all other OAuth. This is what stops
   someone signing up with an email that isn't theirs — the account can't sign
   in until the real owner clicks the verification link.
4. **Set redirect URLs.** In **Authentication → URL Configuration**, set the
   **Site URL** to your deployed origin (e.g. `https://gtre.org`) and add it
   (plus `http://localhost:3000` for local dev) to **Redirect URLs**. Sign-up
   confirmation links send the user to `/login`.
5. **Add env vars.** Copy `.env.example` → `.env.local` and fill in the
   **Project URL** and **anon key** (Project Settings → API). Set
   `NEXT_PUBLIC_DATA_BACKEND=supabase`. On Vercel, add the same three variables
   in Project → Settings → Environment Variables and redeploy.
   - `@supabase/supabase-js` and `@supabase/ssr` are already installed.
   - **No service-role key is required** for the current features — admin
     actions run through the signed-in admin's session under the RLS policies.
6. **Make the first admin.** Sign up normally, click the email link to confirm,
   then in the SQL editor promote yourself (there's no admin to approve the
   first admin):
   ```sql
   update public.profiles
   set role = 'admin', status = 'approved'
   where email = 'eaziz3@gatech.edu';
   ```
   From then on you can approve/manage everyone else in **Admin → Members**.

### Security notes
- **RLS is the security boundary.** `RequireAuth` is client-side (good UX only).
  The policies in `schema.sql` ensure protected rows never reach an unauthorized
  client. Announcements, events, and resources are intentionally **public read**
  (the public `/news`, `/calendar`, and `/search` pages use them); assignments,
  submissions, check-ins, questions, meeting notes, and profiles are gated.
- **Deleting an account** removes its `profiles` row via the admin RLS policy.
  Fully deleting the underlying `auth.users` record (rare) needs a service-role
  server action — add the `SUPABASE_SERVICE_ROLE_KEY` env var then.
- **Approval emails (optional).** On approve, send a "you're approved" email via
  Supabase Edge Functions / Resend, or notify members manually to start.

## Existing accounts (Wix / old Vercel portal)
Password hashes can't be securely migrated. **Start fresh**: seed known members
by inviting them (or pre-creating approved `profiles` rows keyed to a Supabase
invite email). This is cleaner and safer than importing legacy credentials.

## Syllabus
The Syllabus tab (`/analyst-program`) embeds a **view-only** document. When the
club has one, an admin pastes a Google Docs/Drive **`/preview`** URL into
**Admin → Site Info → Syllabus embed**. Until then the tab shows a placeholder.

## Calendar
Default is the **admin-managed calendar**: events posted in **Admin → Events**
render on `/calendar` and feed member check-ins (one source of truth). If you'd
rather manage dates in Google, paste a Google Calendar embed URL in
**Admin → Site Info → Calendar embed** and the page shows that instead.

## The old `/src` API layer
The repo root (`/src`, package `frontend`) is a separate Next.js app of Wix Data
API routes that served the old site/portal. It's independent of this app. Once
this site is on Supabase you can retire it; nothing here depends on it.
