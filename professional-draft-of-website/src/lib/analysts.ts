/**
 * Analyst Rolodex shared mock data (UI prototype).
 *
 * All figures are placeholder data. The production version will source each
 * analyst's tracked metrics (attendance, assignment submissions, graded
 * case-study work) and uploaded resumes from the club's existing collections.
 * `resumeText` stands in for the parsed contents of an uploaded resume so the
 * directory search can match on roles, industries, and companies.
 */

export type Status = "Available" | "Looking for opportunities" | "Interning";

export type Experience = {
  company: string;
  role: string;
  period: string;
};

export type Analyst = {
  id: string;
  slug: string;
  name: string;
  gradYear: number;
  major: string;
  concentration: string;
  hometown: string;
  status: Status;
  gpa: number;
  attendancePct: number;
  assignmentsDone: number;
  assignmentsTotal: number;
  caseStudyTitle: string;
  caseStudyScore: number;
  caseStudyRank: number;
  caseStudyField: number;
  skills: string[];
  interests: string[];
  coursework: { course: string; grade: string }[];
  experiences: Experience[];
  bio: string;
  linkedin: string;
  hasResume: boolean;
  resumeText: string;
};

export const ANALYSTS: Analyst[] = [
  {
    id: "a1",
    slug: "marcus-whitfield",
    name: "Marcus Whitfield",
    gradYear: 2026,
    major: "Business Administration",
    concentration: "Finance",
    hometown: "Atlanta, GA",
    status: "Available",
    gpa: 3.82,
    attendancePct: 96,
    assignmentsDone: 11,
    assignmentsTotal: 12,
    caseStudyTitle: "Adaptive Reuse: Hotel-to-Multifamily in Savannah",
    caseStudyScore: 94,
    caseStudyRank: 1,
    caseStudyField: 18,
    skills: ["Argus Enterprise", "Excel Modeling", "Market Analysis", "Underwriting"],
    interests: ["Multifamily", "Value-Add", "Acquisitions"],
    coursework: [
      { course: "Real Estate Finance", grade: "A" },
      { course: "Corporate Finance", grade: "A" },
      { course: "Investments", grade: "A-" },
      { course: "Urban Economics", grade: "A" },
    ],
    experiences: [
      { company: "Cortland", role: "Acquisitions Intern", period: "Summer 2025" },
      { company: "Cushman & Wakefield", role: "Capital Markets Analyst Intern", period: "Summer 2024" },
    ],
    bio: "Built a full hotel-to-multifamily conversion model that ranked first in the spring case study. Targeting an acquisitions analyst role at a value-add shop.",
    linkedin: "https://www.linkedin.com/in/marcus-whitfield",
    hasResume: true,
    resumeText:
      "Acquisitions and capital markets. Multifamily underwriting, value-add, Argus Enterprise, Excel modeling. Cortland acquisitions intern. Cushman & Wakefield capital markets. Real estate private equity.",
  },
  {
    id: "a2",
    slug: "priya-nair",
    name: "Priya Nair",
    gradYear: 2026,
    major: "Industrial Engineering",
    concentration: "Real Estate Development",
    hometown: "Marietta, GA",
    status: "Looking for opportunities",
    gpa: 3.91,
    attendancePct: 92,
    assignmentsDone: 12,
    assignmentsTotal: 12,
    caseStudyTitle: "Ground-Up Industrial Outparcel Feasibility",
    caseStudyScore: 91,
    caseStudyRank: 2,
    caseStudyField: 18,
    skills: ["Development Pro Forma", "Site Planning", "Cost Estimating", "Python"],
    interests: ["Development", "Industrial", "Logistics"],
    coursework: [
      { course: "Real Estate Development", grade: "A" },
      { course: "Project Management", grade: "A" },
      { course: "Statistics", grade: "A" },
      { course: "Construction Methods", grade: "A-" },
    ],
    experiences: [
      { company: "Portman Holdings", role: "Development Intern", period: "Summer 2025" },
      { company: "Pattillo Industrial Real Estate", role: "Project Analyst Intern", period: "Summer 2024" },
    ],
    bio: "Engineering rigor applied to development feasibility. Strong on cost and schedule. Targeting a development analyst seat.",
    linkedin: "https://www.linkedin.com/in/priya-nair",
    hasResume: true,
    resumeText:
      "Industrial and logistics development. Ground-up feasibility, development pro forma, site planning, cost estimating, Python. Portman Holdings development intern. Pattillo industrial project analyst.",
  },
  {
    id: "a3",
    slug: "devon-carter",
    name: "Devon Carter",
    gradYear: 2027,
    major: "Economics",
    concentration: "Capital Markets",
    hometown: "Chattanooga, TN",
    status: "Available",
    gpa: 3.74,
    attendancePct: 100,
    assignmentsDone: 12,
    assignmentsTotal: 12,
    caseStudyTitle: "Debt Sizing for a Coastal GA Workforce Deal",
    caseStudyScore: 89,
    caseStudyRank: 3,
    caseStudyField: 18,
    skills: ["Debt Sizing", "DCF", "Capital Stack", "Market Research"],
    interests: ["Debt", "Capital Markets", "Affordable"],
    coursework: [
      { course: "Money & Banking", grade: "A" },
      { course: "Econometrics", grade: "A-" },
      { course: "Real Estate Finance", grade: "A" },
      { course: "Game Theory", grade: "B+" },
    ],
    experiences: [
      { company: "Truist Securities", role: "CRE Debt Intern", period: "Summer 2025" },
      { company: "Colliers", role: "Research Intern", period: "Summer 2024" },
    ],
    bio: "Perfect attendance and a sharp lens on the debt side. Wants to learn the capital markets desk from the ground up.",
    linkedin: "https://www.linkedin.com/in/devon-carter",
    hasResume: true,
    resumeText:
      "Debt and structured finance. Debt sizing, DCF, capital stack, market research. Truist Securities CRE debt intern. Colliers research. Affordable and workforce housing.",
  },
  {
    id: "a4",
    slug: "sofia-reyes",
    name: "Sofia Reyes",
    gradYear: 2026,
    major: "Architecture",
    concentration: "Design + Development",
    hometown: "Savannah, GA",
    status: "Interning",
    gpa: 3.68,
    attendancePct: 88,
    assignmentsDone: 10,
    assignmentsTotal: 12,
    caseStudyTitle: "Mixed-Use Repositioning of a 1990s Garden Apartment",
    caseStudyScore: 87,
    caseStudyRank: 4,
    caseStudyField: 18,
    skills: ["Rhino", "Adobe Suite", "Feasibility", "Unit Mix Design"],
    interests: ["Mixed-Use", "Design", "Repositioning"],
    coursework: [
      { course: "Studio V", grade: "A" },
      { course: "Building Systems", grade: "A-" },
      { course: "Real Estate Development", grade: "B+" },
      { course: "Pro Forma Modeling", grade: "A-" },
    ],
    experiences: [
      { company: "Cooper Carry", role: "Architecture Intern", period: "2025 - Present" },
      { company: "Lord Aeck Sargent", role: "Design Intern", period: "Summer 2024" },
    ],
    bio: "Bridges design and the deal. Currently interning part-time and open to full-time conversations for 2026.",
    linkedin: "https://www.linkedin.com/in/sofia-reyes",
    hasResume: true,
    resumeText:
      "Design and development. Mixed-use repositioning, unit mix design, feasibility, Rhino, Adobe. Cooper Carry architecture intern. Lord Aeck Sargent design.",
  },
  {
    id: "a5",
    slug: "jalen-brooks",
    name: "Jalen Brooks",
    gradYear: 2027,
    major: "Business Administration",
    concentration: "Strategy",
    hometown: "Columbus, GA",
    status: "Available",
    gpa: 3.55,
    attendancePct: 84,
    assignmentsDone: 9,
    assignmentsTotal: 12,
    caseStudyTitle: "Hold-vs-Sell Analysis on a Stabilized Asset",
    caseStudyScore: 85,
    caseStudyRank: 6,
    caseStudyField: 18,
    skills: ["Excel Modeling", "Sensitivity Analysis", "Brokerage", "Cold Outreach"],
    interests: ["Brokerage", "Investment Sales", "Multifamily"],
    coursework: [
      { course: "Strategic Management", grade: "A-" },
      { course: "Real Estate Finance", grade: "B+" },
      { course: "Negotiations", grade: "A" },
      { course: "Marketing", grade: "A-" },
    ],
    experiences: [
      { company: "Marcus & Millichap", role: "Investment Sales Intern", period: "Summer 2025" },
      { company: "Ackerman & Co", role: "Brokerage Intern", period: "Summer 2024" },
    ],
    bio: "Relationship-driven and comfortable on the phone. Leaning toward investment sales and brokerage.",
    linkedin: "https://www.linkedin.com/in/jalen-brooks",
    hasResume: true,
    resumeText:
      "Investment sales and brokerage. Excel modeling, sensitivity analysis, cold outreach. Marcus & Millichap investment sales intern. Ackerman brokerage.",
  },
  {
    id: "a6",
    slug: "hannah-lim",
    name: "Hannah Lim",
    gradYear: 2026,
    major: "Computer Science",
    concentration: "PropTech",
    hometown: "Duluth, GA",
    status: "Looking for opportunities",
    gpa: 3.97,
    attendancePct: 94,
    assignmentsDone: 12,
    assignmentsTotal: 12,
    caseStudyTitle: "Automating Rent-Comp Collection with Python",
    caseStudyScore: 93,
    caseStudyRank: 2,
    caseStudyField: 18,
    skills: ["Python", "SQL", "Data Pipelines", "Argus"],
    interests: ["PropTech", "Data", "Asset Management"],
    coursework: [
      { course: "Databases", grade: "A" },
      { course: "Machine Learning", grade: "A" },
      { course: "Real Estate Finance", grade: "A-" },
      { course: "Data Structures", grade: "A" },
    ],
    experiences: [
      { company: "JLL Technologies", role: "Data Engineering Intern", period: "Summer 2025" },
      { company: "Cherre", role: "Software Intern", period: "Summer 2024" },
    ],
    bio: "Builds the tools the rest of the team uses. Wants a role where data and real estate meet.",
    linkedin: "https://www.linkedin.com/in/hannah-lim",
    hasResume: true,
    resumeText:
      "PropTech and data. Python, SQL, data pipelines, Argus, asset management analytics. JLL Technologies data engineering intern. Cherre software intern.",
  },
  {
    id: "a7",
    slug: "tyler-ahmed",
    name: "Tyler Ahmed",
    gradYear: 2028,
    major: "Civil Engineering",
    concentration: "Construction Management",
    hometown: "Augusta, GA",
    status: "Available",
    gpa: 3.61,
    attendancePct: 90,
    assignmentsDone: 11,
    assignmentsTotal: 12,
    caseStudyTitle: "Hard-Cost Reconciliation on a Renovation Budget",
    caseStudyScore: 86,
    caseStudyRank: 5,
    caseStudyField: 18,
    skills: ["Cost Estimating", "Scheduling", "Bluebeam", "Site Logistics"],
    interests: ["Construction", "Development", "Renovation"],
    coursework: [
      { course: "Construction Management", grade: "A-" },
      { course: "Structural Analysis", grade: "B+" },
      { course: "Estimating", grade: "A" },
      { course: "Materials", grade: "A-" },
    ],
    experiences: [
      { company: "Brasfield & Gorrie", role: "Field Engineering Intern", period: "Summer 2025" },
      { company: "Juneau Construction", role: "Estimating Intern", period: "Summer 2024" },
    ],
    bio: "Understands what it actually costs to build. A strong fit for a development or construction-adjacent analyst role.",
    linkedin: "https://www.linkedin.com/in/tyler-ahmed",
    hasResume: true,
    resumeText:
      "Construction management. Cost estimating, scheduling, Bluebeam, site logistics, renovation. Brasfield & Gorrie field engineering intern. Juneau Construction estimating.",
  },
  {
    id: "a8",
    slug: "olivia-grant",
    name: "Olivia Grant",
    gradYear: 2027,
    major: "Economics",
    concentration: "Investments",
    hometown: "Roswell, GA",
    status: "Looking for opportunities",
    gpa: 3.79,
    attendancePct: 98,
    assignmentsDone: 12,
    assignmentsTotal: 12,
    caseStudyTitle: "IRR Partition on a Three-Year Value-Add Hold",
    caseStudyScore: 90,
    caseStudyRank: 3,
    caseStudyField: 18,
    skills: ["Waterfall Modeling", "IRR Analysis", "Excel", "Investor Reporting"],
    interests: ["Acquisitions", "Asset Management", "Value-Add"],
    coursework: [
      { course: "Investments", grade: "A" },
      { course: "Real Estate Finance", grade: "A" },
      { course: "Financial Modeling", grade: "A" },
      { course: "Microeconomics", grade: "A-" },
    ],
    experiences: [
      { company: "Invesco Real Estate", role: "Asset Management Intern", period: "Summer 2025" },
      { company: "Bell Partners", role: "Acquisitions Intern", period: "Summer 2024" },
    ],
    bio: "Comfortable building promote waterfalls and investor reporting. Wants an acquisitions or asset-management seat.",
    linkedin: "https://www.linkedin.com/in/olivia-grant",
    hasResume: true,
    resumeText:
      "Acquisitions and asset management. Waterfall modeling, IRR analysis, investor reporting, value-add. Invesco Real Estate asset management intern. Bell Partners acquisitions.",
  },
  {
    id: "a9",
    slug: "andre-sutton",
    name: "Andre Sutton",
    gradYear: 2026,
    major: "Business Administration",
    concentration: "Finance",
    hometown: "Macon, GA",
    status: "Available",
    gpa: 3.48,
    attendancePct: 86,
    assignmentsDone: 10,
    assignmentsTotal: 12,
    caseStudyTitle: "Break-Even Occupancy on a Lease-Up",
    caseStudyScore: 83,
    caseStudyRank: 8,
    caseStudyField: 18,
    skills: ["Excel Modeling", "Lease-Up Analysis", "Market Research", "Presentations"],
    interests: ["Multifamily", "Lease-Up", "Acquisitions"],
    coursework: [
      { course: "Real Estate Finance", grade: "B+" },
      { course: "Corporate Finance", grade: "A-" },
      { course: "Accounting", grade: "A-" },
      { course: "Statistics", grade: "B+" },
    ],
    experiences: [
      { company: "RangeWater Real Estate", role: "Lease-Up Analyst Intern", period: "Summer 2025" },
      { company: "Gables Residential", role: "Operations Intern", period: "Summer 2024" },
    ],
    bio: "Steady worker who presents well. Looking for a first analyst role to prove himself.",
    linkedin: "https://www.linkedin.com/in/andre-sutton",
    hasResume: true,
    resumeText:
      "Multifamily operations and lease-up. Excel modeling, lease-up analysis, market research, presentations. RangeWater lease-up analyst intern. Gables Residential operations.",
  },
];

export const STATUS_META: Record<Status, { label: string; color: string }> = {
  Available: { label: "Available", color: "#2E7D32" },
  "Looking for opportunities": { label: "Looking for opportunities", color: "#9A7B1F" },
  Interning: { label: "Currently interning", color: "#003057" },
};

export const MAJORS = Array.from(new Set(ANALYSTS.map((a) => a.major))).sort();

export function getAnalyst(slug: string): Analyst | undefined {
  return ANALYSTS.find((a) => a.slug === slug);
}

export function gradeColor(score: number): string {
  if (score >= 90) return "#2E7D32";
  if (score >= 85) return "#9A7B1F";
  return "#555555";
}
