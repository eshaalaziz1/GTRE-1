"use client";

import { useState, useMemo } from "react";
import type { Job, JobFilters } from "@/lib/jobs";
import { filterJobs, buildFilterCounts } from "@/lib/jobs";
import JobCard from "@/components/JobCard";
import FilterSidebar from "@/components/FilterSidebar";

interface Props {
  initialJobs: Job[];
}

export default function JobBoardClient({ initialJobs }: Props) {
  const [filters, setFilters] = useState<JobFilters>({
    search: "",
    location: [],
    sector: [],
    jobType: [],
  });

  const filteredJobs = useMemo(
    () => filterJobs(initialJobs, filters),
    [initialJobs, filters]
  );

  const counts = useMemo(() => buildFilterCounts(initialJobs), [initialJobs]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Page header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-navy">Open Jobs</h1>
      </div>

      <div className="flex gap-8">
        {/* Filter sidebar */}
        <FilterSidebar
          counts={counts}
          filters={filters}
          onFilterChange={setFilters}
          totalJobs={initialJobs.length}
          filteredCount={filteredJobs.length}
        />

        {/* Job list */}
        <div className="flex-1 min-w-0">
          {filteredJobs.length === 0 ? (
            <div className="py-12 text-center">
              <h3 className="text-base font-semibold text-navy mb-2">
                No opportunities match your filters
              </h3>
              <p className="text-secondary text-sm">
                Try adjusting your search or check back soon for new postings.
              </p>
              <button
                onClick={() =>
                  setFilters({
                    search: "",
                    location: [],
                    sector: [],
                    jobType: [],
                  })
                }
                className="mt-4 px-4 py-2 bg-navy text-white rounded text-sm font-medium hover:bg-gold transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div>
              {filteredJobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
