-- ===========================================================================
-- GTRE seed data — the real Fall 2026 schedule + site info.
--
-- Run this ONCE in the Supabase SQL editor after schema.sql, to populate the
-- live Calendar and Analyst Program info. It's written to be safe to re-run:
--   * events seed only when the events table is empty (won't duplicate or
--     overwrite anything an admin later adds/edits in Admin -> Events),
--   * site info seeds only if it hasn't been customized yet,
--   * eaziz3@gatech.edu is (re)promoted to admin if that account exists.
-- After this, officers manage the schedule from Admin -> Events.
-- ===========================================================================

-- Fall 2026 schedule: Analyst Program (weekly, Caddell) + Industry Events.
insert into public.events (title, type, track, date, "time", location, description, "order", check_in_code, check_in_open)
select * from (values
  -- Analyst Program
  ('Info Session',                                       'Meeting',    'Analyst Program', date '2026-08-31', '6:00 PM', 'Caddell', null,                                      0,  'INFO26',   false),
  ('Intro and CRE Overview',                             'Meeting',    'Analyst Program', date '2026-09-14', '6:00 PM', 'Caddell', null,                                      1,  'INTRO',    false),
  ('Capital Markets & Financing',                        'Workshop',   'Analyst Program', date '2026-09-21', '6:00 PM', 'Caddell', null,                                      2,  'CAPMKT',   false),
  ('Recruitment Event - Peachtree',                      'Event',      'Analyst Program', date '2026-09-28', '6:00 PM', 'Caddell', null,                                      3,  'RECRUIT',  false),
  ('Fall Break (No Meeting)',                            'Social',     'Analyst Program', date '2026-10-05', null,      'Caddell', 'No class this week. Enjoy the break.',     4,  null,       false),
  ('Development & Construction',                          'Workshop',   'Analyst Program', date '2026-10-12', '6:00 PM', 'Caddell', null,                                      5,  'DEVCON',   false),
  ('Investments in CRE',                                 'Workshop',   'Analyst Program', date '2026-10-19', '6:00 PM', 'Caddell', null,                                      6,  'INVEST',   false),
  ('Case Study Overview / Submarket Research (Sandy Paul)','Case Study','Analyst Program', date '2026-10-26', '6:00 PM', 'Caddell', null,                                      7,  'CASE1',    false),
  ('Underwriting and Excel Modeling',                    'Workshop',   'Analyst Program', date '2026-11-02', '6:00 PM', 'Caddell', null,                                      8,  'MODEL',    false),
  ('Case Study Example',                                 'Case Study', 'Analyst Program', date '2026-11-09', '6:00 PM', 'Caddell', null,                                      9,  'CHECKIN',  true),
  ('Case Study Practice',                                'Case Study', 'Analyst Program', date '2026-11-16', '6:00 PM', 'Caddell', null,                                      10, 'PRACTICE', false),
  ('Presentations Day 1',                                'Case Study', 'Analyst Program', date '2026-11-23', '6:00 PM', 'Caddell', null,                                      11, 'PRES1',    false),
  ('Break (No Meeting)',                                 'Social',     'Analyst Program', date '2026-11-30', null,      'Caddell', 'No class this week. Enjoy the break.',     12, null,       false),
  ('Presentations Day 2',                                'Case Study', 'Analyst Program', date '2026-12-07', '6:00 PM', 'Caddell', null,                                      13, 'PRES2',    false),
  -- Industry Events
  ('Kickoff Event',            'Event', 'Industry Events', date '2026-09-10', null, 'Scheller Tower', null, 0, null, false),
  ('Careers in RE',            'Event', 'Industry Events', date '2026-09-17', null, 'Caddell',        null, 1, null, false),
  ('JOINT Private Equity Panel','Event','Industry Events', date '2026-09-24', null, 'Biltmore',       null, 2, null, false),
  ('Development Panel',        'Event', 'Industry Events', date '2026-10-15', null, 'Caddell',        null, 3, null, false),
  ('Capital Markets Panel',    'Event', 'Industry Events', date '2026-10-22', null, 'Caddell',        null, 4, null, false),
  ('Site Tour',               'Event', 'Industry Events', date '2026-10-29', null, 'Caddell',        null, 5, null, false),
  ('Affordable Housing Panel', 'Event', 'Industry Events', date '2026-11-05', null, 'Caddell',        null, 6, null, false),
  ('Site Tour',               'Event', 'Industry Events', date '2026-11-12', null, 'Caddell',        null, 7, null, false),
  ('Entrepreneurship Panel',   'Event', 'Industry Events', date '2026-11-19', null, 'Caddell',        null, 8, null, false)
) as v(title, type, track, date, "time", location, description, "order", check_in_code, check_in_open)
where not exists (select 1 from public.events);

-- Site info: meeting details, Analyst Program intro, live syllabus embed.
-- Only seeds if it hasn't been customized (won't clobber an admin's edits).
update public.site_info set
  meeting_time          = 'Thursdays at 6:00 PM',
  meeting_location      = 'Scheller College of Business, Room 200',
  contact_email         = 'realestate@gatech.edu',
  analyst_program_intro = 'The Analyst Program is a semester-long, hands-on curriculum that takes members from real estate fundamentals to a full underwriting case study. Members build models, present to alumni judges, and earn a place in the vetted Analyst Rolodex.',
  syllabus_embed_url    = 'https://gtvault-my.sharepoint.com/:w:/g/personal/jjohnson709_gatech_edu/IQAG5DhZ_CAYQ7Q0i30SEXYpARL_4OXuRyBX9ByaarWpyJ8?e=AKhQmr&action=embedview'
where id = 1 and coalesce(analyst_program_intro, '') = '';

-- Ensure eaziz3 is admin if that account has already signed up.
update public.profiles set role = 'admin', status = 'approved'
where lower(email) = 'eaziz3@gatech.edu';
