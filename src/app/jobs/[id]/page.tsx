import { getJobById } from "@/lib/jobs";
import JobDetailClient from "./JobDetailClient";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await getJobById(id);
  if (!job) return { title: "Job Not Found | GT Real Estate Club" };
  return {
    title: `${job.title} at ${job.company} | GT Real Estate Club`,
    description: job.description?.substring(0, 160),
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) {
    notFound();
  }

  return <JobDetailClient job={job} />;
}
