"use client";

import { useState } from "react";
import type { FilterCounts, JobFilters } from "@/lib/jobs";

interface FilterSidebarProps {
  counts: FilterCounts;
  filters: JobFilters;
  onFilterChange: (filters: JobFilters) => void;
  totalJobs: number;
  filteredCount: number;
}

export default function FilterSidebar({
  counts,
  filters,
  onFilterChange,
  totalJobs,
  filteredCount,
}: FilterSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const hasActiveFilters =
    (filters.search && filters.search.length > 0) ||
    (filters.location && filters.location.length > 0) ||
    (filters.sector && filters.sector.length > 0) ||
    (filters.jobType && filters.jobType.length > 0);

  function handleSearch(value: string) {
    onFilterChange({ ...filters, search: value });
  }

  function toggleFilter(
    key: "location" | "sector" | "jobType",
    value: string
  ) {
    const current = filters[key] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange({ ...filters, [key]: updated });
  }

  function clearAll() {
    onFilterChange({ search: "", location: [], sector: [], jobType: [] });
  }

  const sidebarContent = (
    <>
      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search jobs..."
          value={filters.search || ""}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full px-3 py-2 border border-border rounded text-sm focus:outline-none focus:border-navy bg-white"
        />
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearAll}
          className="text-xs text-navy hover:text-gold-hover mb-4 underline"
        >
          Clear all filters
        </button>
      )}

      {filteredCount !== totalJobs && (
        <p className="text-xs text-secondary mb-4">
          Showing {filteredCount} of {totalJobs} jobs
        </p>
      )}

      <FilterGroup
        title="Locations"
        placeholder="Choose locations"
        options={counts.location}
        selected={filters.location || []}
        onToggle={(v) => toggleFilter("location", v)}
      />

      <FilterGroup
        title="Sector"
        placeholder="Choose sector"
        options={counts.sector}
        selected={filters.sector || []}
        onToggle={(v) => toggleFilter("sector", v)}
      />

      <FilterGroup
        title="Job Type"
        placeholder="Choose job type"
        options={counts.jobType}
        selected={filters.jobType || []}
        onToggle={(v) => toggleFilter("jobType", v)}
      />
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-navy text-white rounded text-sm font-medium"
        >
          Filters
          {hasActiveFilters && (
            <span className="bg-gold text-navy px-1.5 py-0.5 rounded-full text-xs font-bold">
              {(filters.location?.length || 0) +
                (filters.sector?.length || 0) +
                (filters.jobType?.length || 0)}
            </span>
          )}
        </button>

        {mobileOpen && (
          <div className="mt-3 p-4 bg-white border border-border rounded shadow-lg">
            {sidebarContent}
          </div>
        )}
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-4">
          <h2 className="text-lg font-bold text-navy mb-4">Filters</h2>
          {sidebarContent}
        </div>
      </aside>
    </>
  );
}

function FilterGroup({
  title,
  placeholder,
  options,
  selected,
  onToggle,
}: {
  title: string;
  placeholder: string;
  options: Record<string, number>;
  selected: string[];
  onToggle: (value: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const sorted = Object.entries(options).sort((a, b) => b[1] - a[1]);

  if (sorted.length === 0) return null;

  return (
    <div className="mb-5">
      <h3 className="text-sm font-semibold text-text mb-1.5">{title}</h3>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-3 py-2 border border-border rounded text-sm text-secondary bg-white hover:border-navy transition-colors flex items-center justify-between"
      >
        <span>
          {selected.length > 0
            ? `${selected.length} selected`
            : placeholder}
        </span>
        <svg
          className={`w-4 h-4 text-secondary transition-transform ${expanded ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {expanded && (
        <div className="mt-1 border border-border rounded bg-white max-h-48 overflow-y-auto">
          {sorted.map(([value, count]) => (
            <label
              key={value}
              className={`flex items-center gap-2 px-3 py-1.5 cursor-pointer hover:bg-surface text-sm ${
                selected.includes(value) ? "bg-surface font-medium" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={selected.includes(value)}
                onChange={() => onToggle(value)}
                className="rounded border-border text-navy focus:ring-navy/30 h-3.5 w-3.5"
              />
              <span className="flex-1 text-text truncate">{value}</span>
              <span className="text-secondary text-xs">{count}</span>
            </label>
          ))}
        </div>
      )}
      {/* Show selected items as text below dropdown */}
      {!expanded && selected.length > 0 && (
        <div className="mt-1 space-y-0.5">
          {sorted
            .filter(([v]) => selected.includes(v))
            .map(([value, count]) => (
              <button
                key={value}
                onClick={() => onToggle(value)}
                className="flex items-center w-full text-left text-sm text-navy hover:text-gold-hover group"
              >
                <span className="flex-1 truncate">{value}</span>
                <span className="text-secondary text-xs mr-1">{count}</span>
                <span className="text-secondary group-hover:text-red-500 text-xs">&times;</span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
