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

export const OPPORTUNITIES: Opportunity[] = [];
