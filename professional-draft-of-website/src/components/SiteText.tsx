"use client";

import { useGtre } from "@/lib/store/GtreStore";
import { textValue } from "@/lib/siteText";

/**
 * Renders an admin-editable piece of copy (see src/lib/siteText.ts). Shows the
 * admin's saved text for `slotKey` when set, otherwise the slot's default. Emits
 * just the text so it can drop inside any existing tag (<h1>, <p>, …). Editing is
 * done in Admin → Content; members never see edit controls.
 */
export default function SiteText({ slotKey }: { slotKey: string }) {
  const { state } = useGtre();
  return <>{textValue(state.siteText, slotKey)}</>;
}
