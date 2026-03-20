"use client";

import { useState } from "react";
import Link from "next/link";
import type { Job } from "@/lib/jobs";
import { formatDate, isDeadlinePassed, timeAgo } from "@/lib/utils";

interface Props {
  job: Job;
}

export default function JobDetailClient({ job }: Props) {
  const [copied, setCopied] = useState(false);
  const deadlinePassed = job.deadline ? isDeadlinePassed(job.deadline) : false;

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleShare(type: "email" | "linkedin") {
    const url = window.location.href;
    const text = `${job.title} at ${job.company} — GT Real Estate Club`;

    if (type === "email") {
      window.open(
        `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(
          `Check out this opportunity: ${url}`
        )}`
      );
    } else {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        "_blank"
      );
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Back link */}
      <Link
        href="/jobs"
        className="inline-flex items-center gap-1 text-sm text-navy hover:text-gold-hover mb-6 transition-colors font-medium"
      >
        &larr; Back to Open Jobs
      </Link>

      {/* Job header */}
      <div className="border-b border-border pb-5 mb-6">
        <h1 className="text-2xl font-bold text-navy leading-tight">
          {job.title}
        </h1>
        {job.company && (
          <p className="text-lg text-gold font-semibold mt-1">{job.company}</p>
        )}

        {/* Meta tags */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-sm text-secondary">
          {job.sector && <span>{job.sector}</span>}
          {job.location && (
            <>
              <span className="text-border">|</span>
              <span>{job.location}</span>
            </>
          )}
          {job.jobType && (
            <>
              <span className="text-border">|</span>
              <span>{job.jobType}</span>
            </>
          )}
          {job._createdDate && (
            <>
              <span className="text-border">|</span>
              <span>{timeAgo(job._createdDate)}</span>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <article className="flex-1 min-w-0">
          <div className="text-sm text-text leading-relaxed whitespace-pre-wrap">
            {job.description}
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:w-60 shrink-0">
          <div className="sticky top-4 space-y-4">
            {/* Key details */}
            <div className="bg-surface rounded border border-border p-4 space-y-3 text-sm">
              {job.compensation && (
                <div>
                  <span className="font-semibold text-navy block text-xs uppercase tracking-wide mb-0.5">Compensation</span>
                  <span className="text-text">{job.compensation}</span>
                </div>
              )}
              {job.deadline && (
                <div>
                  <span className="font-semibold text-navy block text-xs uppercase tracking-wide mb-0.5">Deadline</span>
                  <span className={deadlinePassed ? "text-red-600" : "text-text"}>
                    {formatDate(job.deadline)}
                    {deadlinePassed && " (Passed)"}
                  </span>
                </div>
              )}
              {job.postedBy && (
                <div>
                  <span className="font-semibold text-navy block text-xs uppercase tracking-wide mb-0.5">Posted by</span>
                  <span className="text-text">
                    {job.postedBy}
                    {job.isAlumPosted && (
                      <span className="ml-1.5 inline-block px-2 py-0.5 text-xs bg-navy text-white rounded">
                        Alumni
                      </span>
                    )}
                  </span>
                </div>
              )}
            </div>

            {/* Apply button */}
            {job.applicationLink && !deadlinePassed ? (
              <a
                href={job.applicationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-4 py-3 bg-navy text-white font-semibold rounded hover:bg-gold transition-colors text-sm"
              >
                Apply Now
              </a>
            ) : deadlinePassed ? (
              <button
                disabled
                className="block w-full text-center px-4 py-3 bg-gray-200 text-gray-400 font-semibold rounded cursor-not-allowed text-sm"
              >
                Deadline Passed
              </button>
            ) : null}

            {/* Share */}
            <div className="flex gap-2">
              <button
                onClick={handleCopyLink}
                className="flex-1 px-3 py-2 text-xs bg-white border border-border rounded hover:bg-surface transition-colors text-secondary"
              >
                {copied ? "Copied!" : "Copy Link"}
              </button>
              <button
                onClick={() => handleShare("email")}
                className="px-3 py-2 text-xs bg-white border border-border rounded hover:bg-surface transition-colors text-secondary"
                title="Email"
              >
                Email
              </button>
              <button
                onClick={() => handleShare("linkedin")}
                className="px-3 py-2 text-xs bg-white border border-border rounded hover:bg-surface transition-colors text-secondary"
                title="LinkedIn"
              >
                LinkedIn
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
