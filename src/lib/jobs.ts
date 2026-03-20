import { getWixClient } from "./wix-client";
import { COLLECTIONS } from "./constants";

export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  sector: string;
  description: string;
  applicationLink: string;
  deadline: string;
  postedBy: string;
  isAlumPosted: boolean;
  isActive: boolean;
  compensation: string;
  _createdDate: string;
}

export interface FilterCounts {
  location: Record<string, number>;
  sector: Record<string, number>;
  jobType: Record<string, number>;
}

export interface JobFilters {
  search?: string;
  location?: string[];
  sector?: string[];
  jobType?: string[];
}

export async function getJobs(): Promise<Job[]> {
  try {
    const client = getWixClient();

    const result = await client.items
      .query(COLLECTIONS.jobs)
      .eq("isActive", true)
      .descending("_createdDate")
      .limit(100)
      .find();

    return (result.items ?? []).map((item) => ({
      _id: item._id!,
      ...(item.data ?? item),
    })) as Job[];
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    return [];
  }
}

export async function getJobById(id: string): Promise<Job | null> {
  try {
    const client = getWixClient();
    const result = await client.items.get(COLLECTIONS.jobs, id);
    if (!result) return null;
    return { _id: result._id!, ...(result.data ?? result) } as Job;
  } catch {
    return null;
  }
}

export function buildFilterCounts(jobs: Job[]): FilterCounts {
  const counts: FilterCounts = {
    location: {},
    sector: {},
    jobType: {},
  };

  jobs.forEach((job) => {
    if (job.location) {
      counts.location[job.location] = (counts.location[job.location] || 0) + 1;
    }
    if (job.sector) {
      counts.sector[job.sector] = (counts.sector[job.sector] || 0) + 1;
    }
    if (job.jobType) {
      counts.jobType[job.jobType] = (counts.jobType[job.jobType] || 0) + 1;
    }
  });

  return counts;
}

export function filterJobs(jobs: Job[], filters: JobFilters): Job[] {
  let filtered = [...jobs];

  if (filters.search) {
    const term = filters.search.toLowerCase();
    filtered = filtered.filter(
      (job) =>
        job.title?.toLowerCase().includes(term) ||
        job.company?.toLowerCase().includes(term)
    );
  }

  if (filters.location && filters.location.length > 0) {
    filtered = filtered.filter((job) =>
      filters.location!.includes(job.location)
    );
  }

  if (filters.sector && filters.sector.length > 0) {
    filtered = filtered.filter((job) => filters.sector!.includes(job.sector));
  }

  if (filters.jobType && filters.jobType.length > 0) {
    filtered = filtered.filter((job) =>
      filters.jobType!.includes(job.jobType)
    );
  }

  return filtered;
}
