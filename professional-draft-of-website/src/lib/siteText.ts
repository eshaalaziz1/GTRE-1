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
  { key: "home-whatwedo-eyebrow", group: "Homepage", label: "\"What we do\" eyebrow", defaultValue: "What we do" },
  { key: "home-goals-title", group: "Homepage", label: "Goals section title", defaultValue: "Built around three goals." },
  { key: "home-goal1-title", group: "Homepage", label: "Goal 1 title", defaultValue: "Equip our students" },
  {
    key: "home-goal1-body", group: "Homepage", label: "Goal 1 body", multiline: true,
    defaultValue: "Give members the knowledge, technical skills, and real-world reps to launch careers across acquisitions, development, debt, brokerage, and beyond.",
  },
  { key: "home-goal2-title", group: "Homepage", label: "Goal 2 title", defaultValue: "Supply the industry with talent" },
  {
    key: "home-goal2-body", group: "Homepage", label: "Goal 2 body", multiline: true,
    defaultValue: "Connect firms and alumni to a vetted pipeline of Georgia Tech's strongest real estate students through the Analyst Rolodex and the Opportunities board.",
  },
  { key: "home-goal3-title", group: "Homepage", label: "Goal 3 title", defaultValue: "Grow a lasting community" },
  {
    key: "home-goal3-body", group: "Homepage", label: "Goal 3 body", multiline: true,
    defaultValue: "Build a real estate network at Georgia Tech that keeps students, alumni, and industry connected long after graduation.",
  },
  { key: "home-getinvolved-eyebrow", group: "Homepage", label: "\"Get involved\" eyebrow", defaultValue: "Get involved" },
  { key: "home-getinvolved-title", group: "Homepage", label: "Get involved title", defaultValue: "Industry and alumni engagement." },
  // Leadership
  { key: "leadership-title", group: "Leadership", label: "Page title", defaultValue: "Leadership" },
  {
    key: "leadership-intro",
    group: "Leadership",
    label: "Intro",
    multiline: true,
    defaultValue:
      "The students who run the club, the Mentorship Program, and everything on the calendar.",
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
    defaultValue: "Club meetings, the Mentorship Program, and industry events.",
  },
  // Contact
  { key: "contact-title", group: "Contact", label: "Page title", defaultValue: "Contact Us" },
];

export function textValue(siteText: Record<string, string> | undefined, key: string): string {
  const slot = TEXT_SLOTS.find((s) => s.key === key);
  const override = siteText?.[key];
  return override && override.trim() ? override : slot?.defaultValue ?? "";
}
