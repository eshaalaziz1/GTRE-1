"use client";

import Link from "next/link";
import { useGtre } from "@/lib/store/GtreStore";
import { useEditMode } from "@/lib/editMode";

/**
 * Floating control shown only to signed-in admins. Toggles site-wide Edit mode,
 * which turns every <SiteText/> and <SiteImage/> on the page into click-to-edit
 * controls, so an admin can browse any tab and change copy or photos in place.
 */
export default function AdminEditBar() {
  const { currentAccount } = useGtre();
  const { editMode, setEditMode } = useEditMode();

  if (currentAccount?.role !== "admin") return null;

  return (
    <div className="fixed bottom-4 right-4 z-[150] flex items-center gap-3 rounded-full border border-border bg-white/95 backdrop-blur px-4 py-2.5 shadow-[0_6px_20px_rgba(0,0,0,0.18)]">
      <span className="text-[13px] font-semibold text-navy">
        {editMode ? "Editing this page" : "Admin"}
      </span>
      <button
        onClick={() => setEditMode(!editMode)}
        className={`px-3 py-1.5 rounded-full text-[12px] font-bold transition-colors ${
          editMode ? "bg-gold text-navy hover:bg-gold-hover" : "bg-navy text-white hover:bg-navy-deep"
        }`}
      >
        {editMode ? "Done editing" : "Edit this page"}
      </button>
      {editMode ? (
        <span className="hidden sm:inline text-[12px] text-secondary">Click any highlighted text or photo</span>
      ) : (
        <Link href="/admin" className="text-[12px] font-semibold text-gold-hover hover:text-navy">
          Dashboard
        </Link>
      )}
    </div>
  );
}
