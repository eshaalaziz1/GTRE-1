// Job & internship board content. These are the club's real opportunity
// listings, migrated from the CMS. New roles are added here (or, once the
// backend is wired, sourced from the JobOpportunities collection).

export type Opportunity = {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: "Internship" | "Full-Time" | "Co-op";
  sector: string;
  compensation: string;
  deadline: string; // ISO yyyy-mm-dd
  applicationLink: string;
  postedBy: string;
  isAlumPosted: boolean;
  description: string;
};

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: "opp-jll-analyst",
    title: "Summer Analyst — Real Estate Acquisitions",
    company: "JLL",
    location: "Atlanta, GA",
    jobType: "Internship",
    sector: "Investment",
    compensation: "$30/hr",
    deadline: "2026-04-15",
    applicationLink: "https://careers.jll.com",
    postedBy: "Career Services",
    isAlumPosted: false,
    description:
      "Join JLL's acquisitions team for a 10-week summer analyst program. You'll support underwriting, due diligence, and market research on commercial real estate transactions across the Southeast. Ideal for rising juniors with strong Excel and financial modeling skills.",
  },
  {
    id: "opp-portman-dev",
    title: "Development Intern",
    company: "Portman Holdings",
    location: "Atlanta, GA",
    jobType: "Internship",
    sector: "Development",
    compensation: "$25/hr",
    deadline: "2026-04-01",
    applicationLink: "https://portmanholdings.com/careers",
    postedBy: "Alumni — Sarah Chen '21",
    isAlumPosted: true,
    description:
      "Work alongside Portman's development team on mixed-use projects in Midtown Atlanta. Responsibilities include market analysis, project scheduling support, and assisting with entitlement processes. Great exposure to ground-up development.",
  },
  {
    id: "opp-cbre-analyst",
    title: "Real Estate Analyst",
    company: "CBRE",
    location: "New York, NY",
    jobType: "Full-Time",
    sector: "Brokerage",
    compensation: "$75,000 - $85,000",
    deadline: "2026-05-01",
    applicationLink: "https://careers.cbre.com",
    postedBy: "Career Services",
    isAlumPosted: false,
    description:
      "CBRE's Capital Markets group is hiring a full-time analyst to support investment sales and debt/equity placement. You'll prepare offering memorandums, build financial models, and conduct market comp analysis. CFA or ARGUS proficiency a plus.",
  },
  {
    id: "opp-starwood-associate",
    title: "Private Equity Associate",
    company: "Starwood Capital Group",
    location: "Miami, FL",
    jobType: "Full-Time",
    sector: "Private Equity",
    compensation: "$110,000 - $130,000 + bonus",
    deadline: "2026-04-20",
    applicationLink: "https://starwoodcapital.com/careers",
    postedBy: "Alumni — Marcus Williams '19",
    isAlumPosted: true,
    description:
      "Starwood Capital seeks an associate for their real estate private equity fund. Responsibilities include deal sourcing, financial modeling, asset management support, and investor reporting. 2+ years of investment banking or RE experience required.",
  },
  {
    id: "opp-greystar-coop",
    title: "Property Management Co-op",
    company: "Greystar",
    location: "Charlotte, NC",
    jobType: "Co-op",
    sector: "Property Management",
    compensation: "$22/hr",
    deadline: "2026-03-30",
    applicationLink: "https://greystar.com/careers",
    postedBy: "Career Services",
    isAlumPosted: false,
    description:
      "6-month co-op with Greystar's multifamily property management team. You'll assist with leasing operations, tenant relations, financial reporting, and property inspections across a portfolio of 2,000+ units in the Charlotte metro area.",
  },
  {
    id: "opp-cousins-dev",
    title: "Summer 2026 Real Estate Development Intern",
    company: "Cousins Properties",
    location: "Atlanta, GA",
    jobType: "Internship",
    sector: "Development",
    compensation: "$25/hr",
    deadline: "2026-04-15",
    applicationLink: "https://careers.cousinsproperties.com/internship-2026",
    postedBy: "Sarah Chen '22",
    isAlumPosted: true,
    description:
      "Join Cousins Properties' development team for a 10-week summer internship focused on commercial real estate development across the Southeast. You'll work alongside senior developers on active projects including mixed-use developments, office towers, and life science facilities.\n\nResponsibilities:\n- Assist with financial modeling and underwriting for new development opportunities\n- Conduct market research and competitive analysis\n- Support due diligence processes for land acquisitions\n- Participate in construction site visits and project meetings\n- Prepare investment committee presentations\n\nRequirements:\n- Currently enrolled in an undergraduate or graduate program\n- Strong Excel and financial modeling skills\n- Interest in commercial real estate development\n- GPA of 3.0 or above",
  },
  {
    id: "opp-invesco-analyst",
    title: "Investment Analyst — Summer Associate",
    company: "Invesco Real Estate",
    location: "Atlanta, GA",
    jobType: "Internship",
    sector: "Investment",
    compensation: "$35/hr",
    deadline: "2026-04-01",
    applicationLink: "https://invesco.com/careers/summer-associate-2026",
    postedBy: "GT REC Admin",
    isAlumPosted: false,
    description:
      "Invesco Real Estate is seeking a Summer Associate to join our acquisitions team in Atlanta. This role offers direct exposure to institutional real estate investment across multiple property types.\n\nResponsibilities:\n- Build and maintain complex financial models for potential acquisitions\n- Analyze market data, rent rolls, and operating statements\n- Prepare investment memoranda for senior leadership\n- Conduct property tours and site inspections\n- Support portfolio management and asset valuation\n\nRequirements:\n- Pursuing MBA or MS in Real Estate\n- Prior experience in real estate, investment banking, or consulting preferred\n- Advanced Excel and Argus Enterprise proficiency\n- Strong analytical and communication skills",
  },
  {
    id: "opp-cbre-brokerage-intern",
    title: "Commercial Real Estate Brokerage Intern",
    company: "CBRE",
    location: "New York, NY",
    jobType: "Internship",
    sector: "Brokerage",
    compensation: "$22/hr",
    deadline: "2026-03-31",
    applicationLink: "https://cbre.com/careers/internships",
    postedBy: "Michael Torres '21",
    isAlumPosted: true,
    description:
      "CBRE's New York office is looking for a motivated intern to join our Capital Markets team for Summer 2026. You'll gain hands-on experience in one of the world's largest commercial real estate services firms.\n\nResponsibilities:\n- Support brokers with deal underwriting and financial analysis\n- Research comparable transactions and market trends\n- Assist in preparing offering memoranda and pitch materials\n- Attend client meetings and property tours\n- Maintain CRM and deal pipeline databases\n\nRequirements:\n- Undergraduate or graduate student in business, finance, or real estate\n- Interest in commercial real estate brokerage\n- Strong attention to detail and work ethic\n- Excellent written and verbal communication skills",
  },
  {
    id: "opp-starwood-analyst",
    title: "Real Estate Private Equity Analyst",
    company: "Starwood Capital Group",
    location: "Miami, FL",
    jobType: "Full-Time",
    sector: "Private Equity",
    compensation: "$85,000 - $95,000/year",
    deadline: "2026-05-01",
    applicationLink: "https://starwoodcapital.com/careers/analyst-2026",
    postedBy: "GT REC Admin",
    isAlumPosted: false,
    description:
      "Starwood Capital Group is hiring a full-time Analyst to join our real estate private equity team in Miami. This is an ideal role for recent graduates looking to launch a career in institutional real estate investing.\n\nResponsibilities:\n- Underwrite and model potential acquisitions across property types\n- Conduct due diligence on investment opportunities\n- Monitor portfolio performance and prepare quarterly reports\n- Support fundraising efforts and investor relations\n- Collaborate with asset management on value-add strategies\n\nRequirements:\n- Bachelor's degree in finance, real estate, or related field\n- 0-2 years of experience in real estate, banking, or consulting\n- Strong financial modeling skills (Argus, Excel)\n- Ability to work in a fast-paced, entrepreneurial environment\n- Series 7 and 63 licenses preferred but not required",
  },
  {
    id: "opp-greystar-coop-2027",
    title: "Property Management Co-op — Spring 2027",
    company: "Greystar",
    location: "Atlanta, GA",
    jobType: "Co-op",
    sector: "Property Management",
    compensation: "$20/hr",
    deadline: "2026-10-15",
    applicationLink: "https://greystar.com/careers/coop-spring-2027",
    postedBy: "Jennifer Park '23",
    isAlumPosted: true,
    description:
      "Greystar is offering a Spring 2027 co-op position in multifamily property management at one of our Atlanta-area communities. This is a full-time, semester-long role ideal for students interested in the operational side of real estate.\n\nResponsibilities:\n- Assist Community Manager with daily operations\n- Support leasing efforts including tours, applications, and move-ins\n- Coordinate maintenance requests and vendor relationships\n- Analyze property financials and prepare monthly reports\n- Plan and execute resident events and engagement programs\n\nRequirements:\n- Currently enrolled in an undergraduate program at Georgia Tech\n- Interest in multifamily real estate and property management\n- Strong interpersonal and organizational skills\n- Ability to commit to a full semester co-op\n- Valid driver's license",
  },
];
