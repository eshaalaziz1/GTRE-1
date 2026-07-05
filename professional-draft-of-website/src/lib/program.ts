// Analyst Program curriculum outline. Placeholder modules the exec team can
// replace; kept in one file so it's easy to edit without touching the page.
export type Module = {
  week: number;
  title: string;
  topics: string[];
};

export const CURRICULUM: Module[] = [
  { week: 1, title: "Real Estate Finance Fundamentals", topics: ["Cap rates & NOI", "The capital stack", "Valuation basics"] },
  { week: 2, title: "Multifamily Underwriting", topics: ["Rent rolls", "Operating expenses", "5-year cash flow modeling"] },
  { week: 3, title: "Development & Construction", topics: ["Development pro formas", "Cost budgeting", "Timelines & risk"] },
  { week: 4, title: "Market Analysis", topics: ["Supply & demand", "Submarket selection", "CoStar & data tools"] },
  { week: 5, title: "Debt & Capital Markets", topics: ["Debt sizing", "DSCR & LTV", "How deals get financed"] },
  { week: 6, title: "Argus & Commercial Modeling", topics: ["Argus Enterprise", "Lease modeling", "Office/retail underwriting"] },
  { week: 7, title: "Case Study Sprint", topics: ["Team assignments", "Full underwriting package", "Investment memo"] },
  { week: 8, title: "Final Presentations", topics: ["Present to alumni judges", "Q&A defense", "Analyst Rolodex placement"] },
];

// Industry-standard tools members get hands-on with (listed as text, per brand).
export const PROGRAM_TOOLS = ["Excel financial modeling", "CoStar", "Argus Enterprise", "Real deal materials"];
