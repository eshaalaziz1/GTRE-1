import Link from "next/link";
import { timeAgo, truncate } from "@/lib/utils";
import type { Job } from "@/lib/jobs";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="border-b border-border py-5 first:pt-0">
      {/* Title row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <Link
            href={`/jobs/${job._id}`}
            className="text-base font-bold text-navy hover:text-gold-hover transition-colors leading-snug"
          >
            {job.title}
          </Link>
        </div>
        <div className="shrink-0 text-right">
          <span className="text-xs text-secondary whitespace-nowrap">
            {job.location}
          </span>
          {job.isAlumPosted && (
            <span className="block text-xs text-gold font-medium mt-0.5">
              Alumni Posted
            </span>
          )}
        </div>
      </div>

      {/* Category / Sector tag */}
      <div className="mt-1 flex items-center gap-3 text-sm">
        {job.sector && (
          <span className="text-secondary">
            {job.sector}
            {job.jobType && <> &middot; {job.jobType}</>}
          </span>
        )}
      </div>

      {/* Meta line */}
      <div className="mt-1 flex items-center gap-3 text-xs text-secondary">
        {job.company && <span className="font-medium text-text">{job.company}</span>}
        {job.compensation && (
          <>
            <span className="text-border">|</span>
            <span>{job.compensation}</span>
          </>
        )}
        {job._createdDate && (
          <>
            <span className="text-border">|</span>
            <span>{timeAgo(job._createdDate)}</span>
          </>
        )}
      </div>

      {/* Description excerpt */}
      {job.description && (
        <p className="mt-2 text-sm text-text leading-relaxed">
          {truncate(job.description, 280)}
        </p>
      )}

      {/* Footer link */}
      <Link
        href={`/jobs/${job._id}`}
        className="inline-block mt-2 text-sm text-navy font-medium hover:text-gold-hover transition-colors"
      >
        View {job.sector || "Job"} details &rarr;
      </Link>
    </div>
  );
}
