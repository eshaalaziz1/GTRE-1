import type { GtreState } from "./types";

// ---------------------------------------------------------------------------
// Seed data for the prototype. This makes every screen populated and clickable
// out of the box. When the Supabase backend is wired, this seed becomes the
// initial migration / SQL fixtures instead of localStorage.
//
// Demo logins (email / password):
//   admin@gatech.edu   / admin123     (admin — full access)
//   member@gatech.edu  / member123    (student — approved)
//   recruiter@firm.com / recruiter123 (industry — approved)
//   pending@gatech.edu / pending123   (student — awaiting approval, cannot log in)
// ---------------------------------------------------------------------------

const now = "2026-07-01T12:00:00.000Z";

export const SEED: GtreState = {
  currentAccountId: null,
  accounts: [
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
      title: "Fall Analyst Program applications are open",
      body: "Applications for the Fall 2026 Analyst Program cohort are now open. Submit your resume through the portal by August 25. The program runs weekly and covers underwriting, development, and capital markets.",
      category: "Analyst Program",
      pinned: true,
      authorName: "Avery Mitchell",
      createdAt: "2026-07-01T15:00:00.000Z",
    },
    {
      id: "ann-2",
      title: "Kickoff meeting — Thursday 6 PM",
      body: "Our first general meeting of the semester is this Thursday at 6:00 PM in Scheller 200. Pizza provided. Check in with the meeting code to log attendance.",
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

  events: [
    {
      id: "evt-1",
      title: "Kickoff General Meeting",
      type: "Meeting",
      date: "2026-08-27",
      time: "6:00 PM",
      location: "Scheller College of Business, Room 200",
      description: "Semester kickoff, program overview, and social.",
      checkInCode: "GTRE27",
      checkInOpen: true,
    },
    {
      id: "evt-2",
      title: "Financial Modeling Workshop",
      type: "Workshop",
      date: "2026-09-03",
      time: "6:00 PM",
      location: "Scheller College of Business, Room 200",
      description: "Hands-on Excel underwriting session.",
      checkInCode: "MODEL1",
      checkInOpen: false,
    },
    {
      id: "evt-3",
      title: "Fall Case Study Kickoff",
      type: "Case Study",
      date: "2026-09-17",
      time: "6:00 PM",
      location: "Scheller College of Business, Room 200",
      description: "Teams assigned, packet released.",
    },
    {
      id: "evt-4",
      title: "Analyst Program — Underwriting Assignment Due",
      type: "Deadline",
      date: "2026-09-10",
      description: "Submit your underwriting model through the Assignments tab.",
    },
    {
      id: "evt-5",
      title: "Alumni Networking Night",
      type: "Social",
      date: "2026-10-16",
      time: "7:00 PM",
      location: "Ponce City Market",
      description: "Meet alumni across acquisitions, development, and capital markets.",
    },
  ],

  checkIns: [
    {
      id: "chk-1",
      eventId: "evt-1",
      eventTitle: "Kickoff General Meeting",
      accountId: "acc-member",
      memberName: "Marcus Whitfield",
      memberEmail: "member@gatech.edu",
      checkedInAt: "2026-08-27T22:05:00.000Z",
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
      title: "Case Study — Adaptive Reuse Underwriting",
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
      answer: "Use your own structure — we grade on logic and clarity, not a fixed template. A starter is in the Materials tab if you want one.",
      answeredBy: "Jordan Ellis",
      createdAt: "2026-08-30T18:00:00.000Z",
      answeredAt: "2026-08-31T14:00:00.000Z",
    },
  ],

  meetingNotes: [
    {
      id: "note-1",
      title: "Exec sync — semester planning",
      date: "2026-07-01",
      body: "Set the Fall calendar, confirmed CoStar renewal, assigned case study leads. Action items: Maya to book rooms, Chris to finalize sponsor outreach.",
      authorName: "Avery Mitchell",
      createdAt: now,
    },
  ],

  resources: [
    {
      id: "res-1",
      title: "Real Estate Finance — Week 1 Slides",
      description: "Cap rates, NOI, valuation basics.",
      url: "https://docs.google.com/presentation/d/example/edit",
      category: "Slides",
      createdAt: now,
    },
    {
      id: "res-2",
      title: "Multifamily Underwriting Starter Model",
      description: "Excel template to build from.",
      url: "https://docs.google.com/spreadsheets/d/example/edit",
      category: "Tool",
      createdAt: now,
    },
    {
      id: "res-3",
      title: "CoStar & Argus Access Instructions",
      description: "How approved members log in.",
      url: "https://drive.google.com/file/d/example/view",
      category: "Document",
      createdAt: now,
    },
    {
      id: "res-4",
      title: "Fall Case Study Packet",
      description: "Savannah adaptive-reuse deal materials.",
      url: "https://drive.google.com/file/d/example/view",
      category: "Case Study",
      createdAt: now,
    },
  ],

  siteInfo: {
    meetingTime: "Thursdays at 6:00 PM",
    meetingLocation: "Scheller College of Business, Room 200",
    contactEmail: "realestate@gatech.edu",
    analystProgramIntro:
      "The Analyst Program is a semester-long, hands-on curriculum that takes members from real estate fundamentals to a full underwriting case study. Members build models, present to alumni judges, and earn a place in the vetted Analyst Rolodex.",
    syllabusEmbedUrl: "",
    googleCalendarEmbedUrl: "",
  },
};
