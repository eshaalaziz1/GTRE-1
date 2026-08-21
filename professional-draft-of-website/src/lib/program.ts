// Analyst Program curriculum. These are the club's real program modules, kept
// in one file so the exec team can edit them without touching the page.
export type Module = {
  number: number;
  title: string;
  description: string;
  topics: string[];
};

// The six-module GTRE Analyst Program curriculum. Titles and descriptions are
// the club's own; the topic tags are pulled directly from each description.
export const CURRICULUM: Module[] = [
  {
    number: 1,
    title: "CRE Fundamentals",
    description:
      "Introduction to commercial real estate, asset classes, market participants, the development cycle, and core investment concepts.",
    topics: ["Asset classes", "Market participants", "Development cycle", "Investment concepts"],
  },
  {
    number: 2,
    title: "Networking and Professionalism",
    description:
      "Building your professional network, navigating industry events, resume and LinkedIn strategy, and conducting informational interviews.",
    topics: ["Professional networking", "Industry events", "Resume & LinkedIn", "Informational interviews"],
  },
  {
    number: 3,
    title: "Excel for Real Estate",
    description:
      "Financial modeling fundamentals in Excel, cash flow projections, returns analysis, sensitivity tables, and industry-standard formatting.",
    topics: ["Cash flow projections", "Returns analysis", "Sensitivity tables", "Modeling standards"],
  },
  {
    number: 4,
    title: "Capital Markets and Financing",
    description:
      "Debt and equity capital stacks, LTV, DSCR, cap rates, and how deals get financed, from construction loans to permanent debt.",
    topics: ["Capital stack", "LTV & DSCR", "Cap rates", "Debt financing"],
  },
  {
    number: 5,
    title: "Leasing and Brokerage",
    description:
      "How commercial leasing works across asset types, tenant rep, landlord rep, lease structures, and the brokerage business model.",
    topics: ["Tenant & landlord rep", "Lease structures", "Brokerage model", "Asset types"],
  },
  {
    number: 6,
    title: "Case Study",
    description:
      "Final case study presentation to the Alumni Board. Apply everything learned to a real deal, underwriting, financing, and investment recommendation.",
    topics: ["Live deal underwriting", "Financing", "Investment recommendation", "Alumni Board panel"],
  },
];

// Industry-standard tools members get hands-on with (listed as text, per brand).
export const PROGRAM_TOOLS = ["Excel financial modeling", "CoStar", "Argus Enterprise", "Real deal materials"];
