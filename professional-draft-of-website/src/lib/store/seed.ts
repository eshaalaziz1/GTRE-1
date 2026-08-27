import type { GtreState } from "./types";

// ---------------------------------------------------------------------------
// Seed data for the prototype. This makes every screen populated and clickable
// out of the box. When the Supabase backend is wired, this seed becomes the
// initial migration / SQL fixtures instead of localStorage.
//
// Demo logins (email / password):
//   admin@gatech.edu   / admin123     (admin, full access)
//   member@gatech.edu  / member123    (student, approved)
//   recruiter@firm.com / recruiter123 (industry, approved)
//   pending@gatech.edu / pending123   (student, awaiting approval, cannot log in)
// ---------------------------------------------------------------------------

const now = "2026-07-01T12:00:00.000Z";

export const SEED: GtreState = {
  currentAccountId: null,
  accounts: [
    {
      id: "acc-eaziz3",
      role: "admin",
      status: "approved",
      name: "Eshaal Aziz",
      email: "eaziz3@gatech.edu",
      passwordHash: "gtre2026",
      title: "Director of IT",
      gradYear: 2028,
      major: "Computer Science",
      createdAt: now,
      approvedAt: now,
    },
    {
      id: "acc-admin",
      role: "admin",
      status: "approved",
      name: "Avery Mitchell",
      email: "admin@gatech.edu",
      passwordHash: "admin123",
      title: "President",
      gradYear: 2026,
      major: "Business Administration",
      createdAt: now,
      approvedAt: now,
    },
    {
      id: "acc-member",
      role: "student",
      status: "approved",
      name: "Marcus Whitfield",
      email: "member@gatech.edu",
      passwordHash: "member123",
      gradYear: 2026,
      major: "Business Administration",
      createdAt: now,
      approvedAt: now,
    },
    {
      id: "acc-recruiter",
      role: "industry",
      status: "approved",
      name: "Dana Cole",
      email: "recruiter@firm.com",
      passwordHash: "recruiter123",
      company: "Stonemont Financial",
      title: "Talent Partner",
      linkedin: "https://www.linkedin.com/in/dana-cole",
      createdAt: now,
      approvedAt: now,
    },
    {
      id: "acc-pending-student",
      role: "student",
      status: "pending",
      name: "Priya Raman",
      email: "pending@gatech.edu",
      passwordHash: "pending123",
      gradYear: 2027,
      major: "Civil Engineering",
      createdAt: now,
    },
    {
      id: "acc-pending-industry",
      role: "industry",
      status: "pending",
      name: "Jordan Feld",
      email: "jordan@acquisitions.com",
      passwordHash: "jordan123",
      company: "Invesco Real Estate",
      title: "VP, Acquisitions",
      linkedin: "https://www.linkedin.com/in/jordan-feld",
      createdAt: now,
    },
    {
      id: "acc-alum",
      role: "student",
      status: "approved",
      name: "Whitney Adams",
      email: "whitney.adams@alum.gatech.edu",
      passwordHash: "whitney123",
      gradYear: 2019,
      major: "Business Administration",
      isAlumni: true,
      createdAt: now,
      approvedAt: now,
    },
  ],

  announcements: [
    {
      id: "ann-1",
      title: "Fall Mentorship Program applications are open",
      body: "Applications for the Fall 2026 Mentorship Program cohort are now open. Submit your resume through the portal by August 25. The program runs weekly and covers underwriting, development, and capital markets.",
      category: "Mentorship Program",
      pinned: true,
      authorName: "Avery Mitchell",
      createdAt: "2026-07-01T15:00:00.000Z",
    },
    {
      id: "ann-2",
      title: "Kickoff meeting, Monday 6:30 PM",
      body: "Our first general meeting of the semester is this Monday at 6:30 PM in Scheller 200. Pizza provided. Check in with the meeting code to log attendance.",
      category: "Meeting",
      pinned: false,
      authorName: "Maya Patel",
      createdAt: "2026-06-28T15:00:00.000Z",
    },
    {
      id: "ann-3",
      title: "New CoStar & Argus access for members",
      body: "Approved members now have access to CoStar and Argus through the club. See the Materials tab for login instructions.",
      category: "General",
      pinned: false,
      authorName: "Jordan Ellis",
      createdAt: "2026-06-20T15:00:00.000Z",
    },
  ],

  // The real 2026 GTRE schedule, split into the two tracks the club runs:
  // the weekly Mentorship Program and the Industry Events series. Times default to
  // 6:30 PM for Mentorship Program meetings; adjust in Admin → Events.
  events: [
    // ---- Mentorship Program (weekly, George Tower 0232) ----------------------
    { id: "ap-1", track: "Mentorship Program", order: 0, type: "Meeting", title: "Info Session", date: "2026-08-31", time: "6:30 PM", location: "George Tower 0232", checkInCode: "INFO26", checkInOpen: false },
    { id: "ap-2", track: "Mentorship Program", order: 1, type: "Meeting", title: "Intro and CRE Overview", date: "2026-09-14", time: "6:30 PM", location: "George Tower 0232", checkInCode: "INTRO", checkInOpen: false },
    { id: "ap-3", track: "Mentorship Program", order: 2, type: "Workshop", title: "Capital Markets & Financing", date: "2026-09-21", time: "6:30 PM", location: "George Tower 0232", checkInCode: "CAPMKT", checkInOpen: false },
    { id: "ap-4", track: "Mentorship Program", order: 3, type: "Event", title: "Recruitment Event - Peachtree", date: "2026-09-28", time: "6:30 PM", location: "George Tower 0232", checkInCode: "RECRUIT", checkInOpen: false },
    { id: "ap-5", track: "Mentorship Program", order: 4, type: "Social", title: "Fall Break", date: "2026-10-05", description: "No class this week, enjoy the break." },
    { id: "ap-6", track: "Mentorship Program", order: 5, type: "Workshop", title: "Development & Construction", date: "2026-10-12", time: "6:30 PM", location: "George Tower 0232", checkInCode: "DEVCON", checkInOpen: false },
    { id: "ap-7", track: "Mentorship Program", order: 6, type: "Workshop", title: "Investments in CRE", date: "2026-10-19", time: "6:30 PM", location: "George Tower 0232", checkInCode: "INVEST", checkInOpen: false },
    { id: "ap-8", track: "Mentorship Program", order: 7, type: "Case Study", title: "Case Study Overview / Submarket Research", date: "2026-10-26", time: "6:30 PM", location: "George Tower 0232", checkInCode: "CASE1", checkInOpen: false },
    { id: "ap-9", track: "Mentorship Program", order: 8, type: "Workshop", title: "Underwriting and Excel Modeling", date: "2026-11-02", time: "6:30 PM", location: "George Tower 0232", checkInCode: "MODEL", checkInOpen: false },
    { id: "ap-10", track: "Mentorship Program", order: 9, type: "Case Study", title: "Case Study Example", date: "2026-11-09", time: "6:30 PM", location: "George Tower 0232", checkInCode: "CASE2", checkInOpen: false },
    { id: "ap-11", track: "Mentorship Program", order: 10, type: "Case Study", title: "Case Study Review Session", date: "2026-11-16", time: "6:30 PM", location: "George Tower 0232", checkInCode: "REVIEW", checkInOpen: false },
    { id: "ap-12", track: "Mentorship Program", order: 11, type: "Case Study", title: "Presentations Day 1", date: "2026-11-23", time: "6:30 PM", location: "George Tower 0232", checkInCode: "PRES1", checkInOpen: false },

    // ---- Industry Events --------------------------------------------------
    { id: "ie-1", track: "Industry Events", order: 0, type: "Event", title: "Kickoff Event", date: "2026-09-10", location: "The Biltmore" },
    { id: "ie-2", track: "Industry Events", order: 1, type: "Event", title: "Careers in RE", date: "2026-09-17", location: "George Tower 0220" },
    { id: "ie-3", track: "Industry Events", order: 2, type: "Event", title: "JOINT Private Equity Panel", date: "2026-09-24", location: "George Tower 0220" },
    { id: "ie-4", track: "Industry Events", order: 3, type: "Event", title: "Development Panel", date: "2026-10-15", location: "George Tower 0220" },
    { id: "ie-5", track: "Industry Events", order: 4, type: "Event", title: "Affordable Housing Panel", date: "2026-10-22", location: "George Tower 0220" },
    { id: "ie-6", track: "Industry Events", order: 5, type: "Event", title: "Site Tour", date: "2026-10-29" },
    { id: "ie-7", track: "Industry Events", order: 6, type: "Event", title: "Capital Markets Panel", date: "2026-11-05", location: "George Tower 0220" },
    { id: "ie-8", track: "Industry Events", order: 7, type: "Event", title: "Site Tour", date: "2026-11-12" },
    { id: "ie-9", track: "Industry Events", order: 8, type: "Event", title: "Entrepreneurship Panel", date: "2026-11-19", location: "George Tower 0220" },
  ],

  checkIns: [
    {
      id: "chk-1",
      eventId: "ap-1",
      eventTitle: "Info Session",
      accountId: "acc-member",
      memberName: "Marcus Whitfield",
      memberEmail: "member@gatech.edu",
      checkedInAt: "2026-08-31T22:05:00.000Z",
    },
  ],

  assignments: [
    {
      id: "asg-1",
      title: "Real Estate Finance Fundamentals Quiz",
      description: "A short quiz covering cap rates, NOI, and the capital stack. Complete it before the second meeting.",
      week: 1,
      dueDate: "2026-09-03",
      points: 20,
      category: "Quiz",
      published: true,
      createdAt: now,
    },
    {
      id: "asg-2",
      title: "Multifamily Underwriting Model",
      description: "Build a 5-year cash flow model for the provided multifamily deal. Submit your Excel file or a link to your model.",
      week: 2,
      dueDate: "2026-09-10",
      points: 50,
      category: "Assignment",
      published: true,
      createdAt: now,
    },
    {
      id: "asg-3",
      title: "Case Study, Adaptive Reuse Underwriting",
      description: "As a team, produce a full underwriting package and recommendation for the Savannah hotel-to-multifamily conversion.",
      week: 4,
      dueDate: "2026-10-01",
      points: 100,
      category: "Case Study",
      published: true,
      createdAt: now,
    },
  ],

  submissions: [
    {
      id: "sub-1",
      assignmentId: "asg-1",
      accountId: "acc-member",
      memberName: "Marcus Whitfield",
      memberEmail: "member@gatech.edu",
      type: "text",
      content: "Completed quiz. Answers: 1-B, 2-C, 3-A ...",
      submittedAt: "2026-09-01T18:00:00.000Z",
      grade: 18,
      feedback: "Strong. Review the difference between levered and unlevered IRR.",
      gradedAt: "2026-09-02T18:00:00.000Z",
      gradedBy: "Avery Mitchell",
    },
  ],

  questions: [
    {
      id: "q-1",
      accountId: "acc-member",
      memberName: "Marcus Whitfield",
      subject: "Which template should we use for the underwriting model?",
      body: "Is there a standard club template for the multifamily model, or can we build our own?",
      status: "answered",
      answer: "Use your own structure, we grade on logic and clarity, not a fixed template. A starter is in the Materials tab if you want one.",
      answeredBy: "Jordan Ellis",
      createdAt: "2026-08-30T18:00:00.000Z",
      answeredAt: "2026-08-31T14:00:00.000Z",
    },
  ],

  meetingNotes: [
    {
      id: "note-1",
      title: "Exec sync, semester planning",
      date: "2026-07-01",
      body: "Set the Fall calendar, confirmed CoStar renewal, assigned case study leads. Action items: Maya to book rooms, Chris to finalize sponsor outreach.",
      authorName: "Avery Mitchell",
      createdAt: now,
    },
  ],

  resources: [
    {
      id: "res-week1-slides",
      title: "Week 1 Slides",
      description: "Mentorship Program, Week 1.",
      url: "/materials/week-1-slides.pdf",
      category: "Slides",
      createdAt: now,
    },
    {
      id: "res-week2-slides",
      title: "Week 2 Slides",
      description: "Mentorship Program, Week 2.",
      url: "/materials/week-2-slides.pdf",
      category: "Slides",
      createdAt: now,
    },
    // Case Study materials (grouped in the portal by title: Examples,
    // Models & Templates, Prompts & Rubric). Files live in /public/case-study.
    {
      id: "cs-example-rustin",
      title: "Case Study Example — Rustin Jalali",
      description: "A full, worked case study submission to model your own after.",
      url: "/case-study/case-study-example-rustin-jalali.pdf",
      category: "Case Study",
      createdAt: now,
    },
    {
      id: "cs-model-multifamily",
      title: "Multifamily Development Model",
      description: "Excel template for a ground-up multifamily development.",
      url: "/case-study/multifamily-development-model.xlsx",
      category: "Case Study",
      createdAt: now,
    },
    {
      id: "cs-model-office",
      title: "Office Development Model",
      description: "Excel template for an office development underwriting.",
      url: "/case-study/office-development-model.xlsx",
      category: "Case Study",
      createdAt: now,
    },
    {
      id: "cs-model-hotel",
      title: "Hotel Development Model",
      description: "Excel template for a hotel development underwriting.",
      url: "/case-study/hotel-development-model.xlsx",
      category: "Case Study",
      createdAt: now,
    },
    {
      id: "cs-model-industrial",
      title: "Industrial Underwriting Model",
      description: "Excel template for an industrial deal underwriting.",
      url: "/case-study/industrial-underwriting-model.xlsx",
      category: "Case Study",
      createdAt: now,
    },
    {
      id: "cs-model-asset-mgmt",
      title: "Asset Management Portfolio Model",
      description: "Excel template for portfolio-level asset management.",
      url: "/case-study/asset-management-portfolio-model.xlsx",
      category: "Case Study",
      createdAt: now,
    },
    {
      id: "cs-prompts-rubric",
      title: "Case Study Prompts & Rubric",
      description: "The current case study prompts and the grading rubric.",
      url: "/case-study/case-study-prompts-and-rubric.docx",
      category: "Case Study",
      createdAt: now,
    },
  ],

  siteInfo: {
    meetingTime: "Mondays at 6:30 PM",
    meetingLocation: "George Tower 0232",
    contactEmail: "rjalali6@gatech.edu",
    analystProgramIntro:
      "The Mentorship Program is a semester-long, hands-on curriculum that takes members from real estate fundamentals to a full underwriting case study. Members build models, present to alumni judges, and earn a place in the vetted Analyst Rolodex.",
    // Live-embedded syllabus (SharePoint/Word). `action=embedview` renders a
    // read-only, scrollable viewer that reflects edits to the source document.
    // Update this URL any time in Admin → Site Info.
    syllabusEmbedUrl:
      "https://gtvault-my.sharepoint.com/:w:/g/personal/jjohnson709_gatech_edu/IQAG5DhZ_CAYQ7Q0i30SEXYpARL_4OXuRyBX9ByaarWpyJ8?e=AKhQmr&action=embedview",
    googleCalendarEmbedUrl: "",
  },
  siteImages: {},
  siteText: {},
};
