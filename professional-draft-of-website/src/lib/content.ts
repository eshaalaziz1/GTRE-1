// Site content for the prototype.

// Join the club's Outlook group to get announcement emails + the shared calendar.
export const OUTLOOK_GROUP_JOIN_URL =
  "https://outlook.office365.com/groups/groupsubscription?action=join&smtp=gtrementorshipfall2026%40groups.gatech.edu&bO=true";

// New-member intake form (Microsoft Forms). Students complete this after signing
// up with their GT email; it feeds their profile, Rolodex, and resume.
export const MEMBER_FORM_URL =
  "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=u5ghSHuuJUuLem1_MvqggxmAnKRdWYNOjjFXygw-JrhURVlQTUxZNklDNVVRMjlQMUFOUDM0WU5RVyQlQCN0PWcu";

// The club's three values, with copy pulled from the live GTRE Mentorship Program
// page (reatgt.org/commercial-real-estate-workshop). Resources lists the
// industry-standard tools as text rather than logos, per direction.
export const VALUES = [
  {
    title: "Knowledge",
    lines: [
      "Structured curriculum covering real estate finance, development, market analysis, and underwriting.",
      "Professional and career guidance.",
      "Excel and financial modeling practice.",
    ],
    href: "/analyst-program",
    cta: "See the program",
  },
  {
    title: "Resources",
    lines: [
      "Access to the industry professional standard resources, including CoStar and Argus.",
      "Real deal materials to apply your skills to.",
    ],
    href: "/about",
    cta: "Learn more",
  },
  {
    title: "Network",
    lines: [
      "Our 250+ alumni network gives students access to industry leaders who are ready and willing to give back to students that express a drive to pursue a real estate career.",
    ],
    href: "/alumni",
    cta: "Meet the network",
  },
];

// "Get involved" cards (industry & alumni engagement).
export type EngagementCard = { title: string; body: string; href: string; image?: string; imgClassName?: string };

export const ENGAGEMENT: EngagementCard[] = [
  {
    title: "Hire Our Students",
    body: "Recruiters and alumni: browse vetted member profiles in the Analyst Rolodex and reach students directly.",
    href: "/rolodex",
    image: "/photos/networking.jpg",
  },
  {
    title: "Advisory Board",
    body: "Senior industry leaders who shape our programming, judge case studies, and help members get in front of firms.",
    href: "/advisory-board",
    image: "/photos/kepano-center.jpg",
  },
  {
    title: "Alumni & Friends",
    body: "Once a member, always part of the network. Stay involved through mentorship, recruiting, and events.",
    href: "/alumni",
    image: "/photos/women-panel.jpg",
    imgClassName: "scale-[1.15]",
  },
];

// News now lives on the News page as live LinkedIn embeds (see src/lib/linkedin.ts).

// Upcoming events on the home page are read live from the admin-managed schedule
// in the store (see src/components/UpcomingEvents.tsx), the same source as the
// Calendar page — so there is no separate hardcoded event list to drift.

