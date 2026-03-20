import { getJobs } from "@/lib/jobs";
import JobBoardClient from "./JobBoardClient";

export const metadata = {
  title: "Job Opportunities | GT Real Estate Club",
  description: "Browse real estate job and internship opportunities for GT REC members",
};

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  const jobs = await getJobs();

  return <JobBoardClient initialJobs={jobs} />;
}
