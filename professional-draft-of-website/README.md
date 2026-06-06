# Professional Draft of Website

A standalone, professional redesign of the Georgia Tech Real Estate Club
website, modeled on the layout of the UW Graaskamp Center for Real Estate and
re-skinned to Georgia Tech. Built as a self-contained Next.js + Tailwind app so
it can be deployed and shared independently of the Wix site.

## Pages
- **About** (`/`, the root redirects here) — mission, values (Knowledge /
  Resources / Network), Get Involved, Upcoming Events, Latest News. Hero plays
  an Atlanta drone video.
- **News** — filterable index (search + categories + tags) with a newsletter banner.
- **Alumni** — network, ways to give back, Recruit & Hire.
- **Events** — schedule with a real club-event photo.
- **Advisory Board** — member directory + "why serve."
- **Contact** — leadership people-card directory.
- **Analyst Rolodex** — gated gateway (`/rolodex`) leading to a vetted analyst
  directory (`/rolodex/directory`) with search, filters, resume-aware search,
  and individual analyst profiles.

## Status
Prototype. All figures, rosters, news, events, and most copy are placeholder
data, clearly marked. Brand colors, logo, layout, and components are final.

## Run locally
```bash
npm install
npm run dev   # http://localhost:3000
```

## Deploy (Vercel)
This app lives in a subfolder. When importing into Vercel, set the project's
**Root Directory** to `professional-draft-of-website`.

## Stack
Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · TypeScript.
