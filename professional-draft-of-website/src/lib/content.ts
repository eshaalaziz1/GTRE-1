// Site content for the prototype.

// The club's three values, with copy pulled from the live GTRE Analyst Program
// page (reatgt.org/commercial-real-estate-workshop). Resources lists the
// industry-standard tools as text rather than logos, per direction.
export const VALUES = [
  {
    title: "Knowledge",
    lines: [
      "Structured curriculum covering real estate finance, development, market analysis, and underwriting.",
      "Professional and career guidance.",
      "Excel and financial modeling practice.",
    ],
    href: "/events",
    cta: "See the program",
  },
  {
    title: "Resources",
    lines: [
      "Access to the industry professional standard resources, including CoStar and Argus.",
      "Real deal materials to apply your skills to.",
    ],
    href: "/about",
    cta: "Learn more",
  },
  {
    title: "Network",
    lines: [
      "Our 250+ alumni network gives students access to industry leaders who are ready and willing to give back to students that express a drive to pursue a real estate career.",
    ],
    href: "/alumni",
    cta: "Meet the network",
  },
];

// "Get involved" cards (industry & alumni engagement).
export const ENGAGEMENT = [
  {
    title: "Hire Our Students",
    body: "Recruiters and alumni: browse vetted member profiles in the Analyst Rolodex and reach students directly.",
    href: "/rolodex",
  },
  {
    title: "Advisory Board",
    body: "Senior industry leaders who shape our programming, judge case studies, and open doors for members.",
    href: "/advisory-board",
  },
  {
    title: "Alumni & Friends",
    body: "Once a member, always part of the network. Stay involved through mentorship, recruiting, and events.",
    href: "/alumni",
  },
];

export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
};

export const NEWS: NewsItem[] = [
  {
    slug: "spring-case-study-results",
    title: "Spring Case Study Competition Crowns Top Analysts",
    date: "April 18, 2026",
    category: "Case Competitions",
    tags: ["Case Study", "Analyst Program"],
    excerpt:
      "Eighteen members presented full underwriting packages to a panel of alumni judges. The top three advance to the summer mentorship track.",
  },
  {
    slug: "fall-recruiting-recap",
    title: "Members Land Roles at National Firms After Fall Recruiting",
    date: "March 2, 2026",
    category: "Careers",
    tags: ["Recruiting"],
    excerpt:
      "A record number of members secured analyst and internship offers this cycle across acquisitions, development, and capital markets.",
  },
  {
    slug: "new-industry-partners",
    title: "Club Welcomes Five New Industry Partners",
    date: "February 10, 2026",
    category: "Partnerships",
    tags: ["Networking"],
    excerpt:
      "New partners join the advisory board to support programming, case studies, and direct recruiting access to members.",
  },
  {
    slug: "spring-cohort-kickoff",
    title: "Analyst Program Kicks Off Its Spring Cohort",
    date: "February 2, 2026",
    category: "Programs",
    tags: ["Analyst Program"],
    excerpt:
      "A new cohort begins the semester-long Analyst Program, building skills in finance, development, and underwriting.",
  },
  {
    slug: "fall-conference-recap",
    title: "Fall Real Estate Conference Draws Record Attendance",
    date: "November 14, 2025",
    category: "Conferences",
    tags: ["Networking", "Industry Panel"],
    excerpt:
      "Students, alumni, and industry partners gathered for a day of panels on the state of the market.",
  },
  {
    slug: "acquisitions-panel",
    title: "Alumni Panel: Breaking Into Acquisitions",
    date: "October 22, 2025",
    category: "Careers",
    tags: ["Industry Panel", "Recruiting"],
    excerpt:
      "Alumni acquisitions professionals shared how they broke in and what they look for in analysts.",
  },
  {
    slug: "atlanta-development-tour",
    title: "Members Tour a Major Atlanta Development",
    date: "October 5, 2025",
    category: "Programs",
    tags: ["Development"],
    excerpt:
      "Members walked an active Midtown development with the project team to see the deal come to life.",
  },
  {
    slug: "capital-markets-workshop",
    title: "Club Hosts a Capital Markets Workshop",
    date: "September 28, 2025",
    category: "Programs",
    tags: ["Capital Markets", "Analyst Program"],
    excerpt:
      "A hands-on session on debt sizing, the capital stack, and how deals get financed.",
  },
  {
    slug: "alumni-spotlight-md",
    title: "Alumni Spotlight: From Member to Managing Director",
    date: "September 12, 2025",
    category: "Alumni",
    tags: ["Awards"],
    excerpt:
      "A look back at one alum's path from club member to leading a national investment team.",
  },
];

export type EventItem = {
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
};

// The club's real 2026 Industry Events series (from the program schedule).
// Times are set per-event closer to the date; location is fixed here.
export const EVENTS: EventItem[] = [
  { title: "Kickoff Event", date: "Sep 10, 2026", time: "", location: "Scheller Tower", type: "Kickoff" },
  { title: "Careers in RE", date: "Sep 17, 2026", time: "", location: "Caddell", type: "Panel" },
  { title: "JOINT Private Equity Panel", date: "Sep 24, 2026", time: "", location: "Biltmore", type: "Panel" },
  { title: "Development Panel", date: "Oct 15, 2026", time: "", location: "Caddell", type: "Panel" },
  { title: "Capital Markets Panel", date: "Oct 22, 2026", time: "", location: "Caddell", type: "Panel" },
  { title: "Site Tour", date: "Oct 29, 2026", time: "", location: "Caddell", type: "Site Tour" },
  { title: "Affordable Housing Panel", date: "Nov 5, 2026", time: "", location: "Caddell", type: "Panel" },
  { title: "Site Tour", date: "Nov 12, 2026", time: "", location: "Caddell", type: "Site Tour" },
  { title: "Entrepreneurship Panel", date: "Nov 19, 2026", time: "", location: "Caddell", type: "Panel" },
];

