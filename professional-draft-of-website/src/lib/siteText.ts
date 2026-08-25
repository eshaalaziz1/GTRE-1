// Admin-editable text. Each slot is a piece of on-page copy (a title, header, or
// intro) that an admin can change from Admin → Content without touching code.
// Pages render slots through <SiteText slotKey=… />, which shows the admin's
// saved text when present and the default below otherwise.
//
// To make more copy editable: add a slot here and use <SiteText> in the page.

export type TextSlot = {
  key: string;
  group: string;
  label: string;
  defaultValue: string;
  multiline?: boolean;
};

export const TEXT_SLOTS: TextSlot[] = [
  // Homepage
  { key: "home-headline", group: "Homepage", label: "Hero headline", defaultValue: "Leading the future of real estate." },
  {
    key: "home-mission",
    group: "Homepage",
    label: "Hero mission statement",
    multiline: true,
    defaultValue:
      "Our mission is to equip students with the resources and knowledge to lead the future of the real estate industry, supply that industry with exceptional talent, and grow a lasting real estate community at Georgia Tech.",
  },
  // Leadership
  { key: "leadership-title", group: "Leadership", label: "Page title", defaultValue: "Leadership" },
  {
    key: "leadership-intro",
    group: "Leadership",
    label: "Intro",
    multiline: true,
    defaultValue:
      "The student executive board runs the club, the Mentorship Program, and every event on the calendar. Meet the team leading Georgia Tech Real Estate.",
  },
  // Alumni
  { key: "alumni-title", group: "Alumni", label: "Page title", defaultValue: "Alumni" },
  {
    key: "alumni-intro",
    group: "Alumni",
    label: "Intro",
    multiline: true,
    defaultValue:
      "GT Real Estate alumni work across development, finance, and investment, in Atlanta and well beyond it. They stay close to the club and to each other, trading ideas, deals, and job leads, and they show up for students who are trying to break into the industry.",
  },
  // Advisory Board
  { key: "advisory-title", group: "Advisory Board", label: "Page title", defaultValue: "Advisory Board" },
  {
    key: "advisory-intro",
    group: "Advisory Board",
    label: "Intro",
    multiline: true,
    defaultValue:
      "Senior real estate leaders and active alumni who advise the club, mentor members, and help connect them to the industry.",
  },
  // Calendar
  { key: "calendar-title", group: "Calendar", label: "Page title", defaultValue: "Calendar" },
  {
    key: "calendar-intro",
    group: "Calendar",
    label: "Intro",
    multiline: true,
    defaultValue:
      "Club meetings, the Mentorship Program, and industry events. Managed by the exec team, members can check in for meetings from the portal.",
  },
  // Contact
  { key: "contact-title", group: "Contact", label: "Page title", defaultValue: "Contact Us" },
];

export function textValue(siteText: Record<string, string> | undefined, key: string): string {
  const slot = TEXT_SLOTS.find((s) => s.key === key);
  const override = siteText?.[key];
  return override && override.trim() ? override : slot?.defaultValue ?? "";
}
