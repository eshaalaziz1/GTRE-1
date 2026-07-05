# GTRE Website — Portals, Auth & Backend Setup

This app ships as a **fully working prototype with no backend**: accounts,
approvals, assignments, grading, check-ins, Q&A, the calendar, and site-info
edits all run against a browser `localStorage` store (`src/lib/store/`). That
lets you click through every screen today. To go live, you swap that one store
for Supabase — no page components change.

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

1. **Create a Supabase project** (free tier is fine). In
   **Authentication → Providers**, enable **Email** and disable Google/all OAuth.
2. **Run the schema**: paste `supabase/schema.sql` into the SQL editor. It
   creates `profiles` (extends `auth.users`) plus all content tables and a
   starter set of Row-Level-Security policies.
3. **Add env vars**: copy `.env.example` → `.env.local` and fill in your
   project URL + keys. Set `NEXT_PUBLIC_DATA_BACKEND=supabase`.
4. **Install the client**: `npm i @supabase/supabase-js @supabase/ssr`.
5. **Implement the Supabase adapter.** The whole app talks to the data layer
   through `useGtre()` (`src/lib/store/GtreStore.tsx`). Create a sibling
   implementation that fulfills the same interface against Supabase:
   - `login` / `signUpStudent` / `signUpIndustry` → `supabase.auth` +
     an `insert` into `profiles` (status `pending`).
   - `approveAccount` / `rejectAccount` / `setRole` / etc. → `update profiles`
     (admin, via a server action using the service-role key).
   - announcements / events / assignments / submissions / questions / notes /
     resources / site_info → straight table reads/writes.
   Keep the mock adapter for local dev; select the adapter with
   `NEXT_PUBLIC_DATA_BACKEND`.
6. **Server-side gating.** `RequireAuth` is client-side (good UX, not a security
   boundary). Rely on **RLS** so protected rows never reach an unauthorized
   client, and put admin mutations (approvals, grading) in **server actions**
   that check the caller is an approved admin.
7. **Approval emails (optional).** On approve, send the "you're approved" email
   via Supabase Edge Functions / Resend, or manually to start.

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
