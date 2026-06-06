// Placeholder advisory board roster for the prototype. Swap for the real
// roster + square headshots. `photo` left null falls back to an initials avatar.

export type BoardMember = {
  slug: string;
  name: string;
  position: string;
  organization: string;
  group: string;
  photo: string | null;
  bio: string;
  focus: string[];
  gtConnection: string;
};

export const BOARD_GROUPS = ["Executive Advisors", "Industry Advisors"] as const;

export const BOARD: BoardMember[] = [
  {
    slug: "james-holloway",
    name: "James Holloway",
    position: "Managing Partner",
    organization: "Peachtree Capital Group",
    group: "Executive Advisors",
    photo: null,
    bio: "James leads acquisitions and capital formation at Peachtree Capital Group and has mentored the club's case-study program for six years.",
    focus: ["Acquisitions", "Capital Markets", "Multifamily"],
    gtConnection: "BS Management, 2004",
  },
  {
    slug: "angela-pierce",
    name: "Angela Pierce",
    position: "Executive Vice President",
    organization: "Sterling Development Partners",
    group: "Executive Advisors",
    photo: null,
    bio: "Angela oversees a national ground-up development pipeline and chairs the club's industry panel series.",
    focus: ["Development", "Mixed-Use", "Entitlements"],
    gtConnection: "BS Civil Engineering, 2001",
  },
  {
    slug: "robert-nguyen",
    name: "Robert Nguyen",
    position: "Chief Investment Officer",
    organization: "Atlantic Net Lease",
    group: "Executive Advisors",
    photo: null,
    bio: "Robert directs investment strategy across a net-lease portfolio and advises members on underwriting discipline.",
    focus: ["Net Lease", "Underwriting", "Portfolio Strategy"],
    gtConnection: "MBA, 2009",
  },
  {
    slug: "denise-carter",
    name: "Denise Carter",
    position: "Senior Managing Director",
    organization: "Gateway Mortgage Capital",
    group: "Executive Advisors",
    photo: null,
    bio: "Denise runs originations for a national CRE debt platform and leads the club's capital-markets workshops.",
    focus: ["Debt", "Originations", "Structured Finance"],
    gtConnection: "BS Economics, 2006",
  },
  {
    slug: "michael-osei",
    name: "Michael Osei",
    position: "Principal",
    organization: "Highline Industrial",
    group: "Industry Advisors",
    photo: null,
    bio: "Michael acquires and develops logistics assets across the Southeast and hosts members for site tours.",
    focus: ["Industrial", "Logistics", "Development"],
    gtConnection: "BS Building Construction, 2012",
  },
  {
    slug: "sara-whitman",
    name: "Sara Whitman",
    position: "Director, Asset Management",
    organization: "Northpoint Residential",
    group: "Industry Advisors",
    photo: null,
    bio: "Sara manages a multifamily portfolio and coaches members on operations and value-add execution.",
    focus: ["Asset Management", "Multifamily", "Operations"],
    gtConnection: "BS Management, 2013",
  },
  {
    slug: "thomas-reed",
    name: "Thomas Reed",
    position: "Vice President",
    organization: "Beacon Hotel Investors",
    group: "Industry Advisors",
    photo: null,
    bio: "Thomas underwrites hospitality acquisitions and conversions and judges the club's annual case study.",
    focus: ["Hospitality", "Acquisitions", "Conversions"],
    gtConnection: "MBA, 2014",
  },
  {
    slug: "priya-shah",
    name: "Priya Shah",
    position: "Partner",
    organization: "Meridian Brokerage Group",
    group: "Industry Advisors",
    photo: null,
    bio: "Priya leads an investment-sales team and runs the club's brokerage and negotiations mentorship.",
    focus: ["Investment Sales", "Brokerage", "Capital Markets"],
    gtConnection: "BS Industrial Engineering, 2010",
  },
  {
    slug: "daniel-foster",
    name: "Daniel Foster",
    position: "Managing Director",
    organization: "Crescent Equity Partners",
    group: "Industry Advisors",
    photo: null,
    bio: "Daniel raises and deploys discretionary equity for value-add multifamily and advises on fund structuring.",
    focus: ["Private Equity", "Value-Add", "Fund Strategy"],
    gtConnection: "BS Economics, 2008",
  },
  {
    slug: "grace-liu",
    name: "Grace Liu",
    position: "Head of Research",
    organization: "Sunbelt Market Analytics",
    group: "Industry Advisors",
    photo: null,
    bio: "Grace leads market research across Sunbelt metros and supports members with data and market studies.",
    focus: ["Market Research", "Data", "Strategy"],
    gtConnection: "MS Analytics, 2017",
  },
  {
    slug: "andre-walker",
    name: "Andre Walker",
    position: "Senior Project Executive",
    organization: "Keystone Construction",
    group: "Industry Advisors",
    photo: null,
    bio: "Andre delivers large mixed-use projects and teaches members the construction side of the business.",
    focus: ["Construction", "Project Delivery", "Mixed-Use"],
    gtConnection: "BS Building Construction, 2005",
  },
  {
    slug: "emily-barnes",
    name: "Emily Barnes",
    position: "Vice President, Capital Markets",
    organization: "Harborview Realty Advisors",
    group: "Industry Advisors",
    photo: null,
    bio: "Emily structures debt and equity placements and mentors members through recruiting season.",
    focus: ["Capital Markets", "Debt & Equity", "Recruiting"],
    gtConnection: "BS Management, 2015",
  },
];

export function getBoardMember(slug: string): BoardMember | undefined {
  return BOARD.find((m) => m.slug === slug);
}

export function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}
