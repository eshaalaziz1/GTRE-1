// Site content for the prototype.

// The club's three values, with copy pulled from the live GTRE Analyst Program
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
    href: "/events",
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
    body: "Senior industry leaders who shape our programming, judge case studies, and open doors for members.",
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

export type EventItem = {
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
};

// The club's real 2026 Industry Events series (from the program schedule).
// Times are set per-event closer to the date; location is fixed here.
export const EVENTS: EventItem[] = [
  { title: "Kickoff Event", date: "Sep 10, 2026", time: "", location: "Scheller Tower", type: "Kickoff" },
  { title: "Careers in RE", date: "Sep 17, 2026", time: "", location: "Caddell", type: "Panel" },
  { title: "JOINT Private Equity Panel", date: "Sep 24, 2026", time: "", location: "Biltmore", type: "Panel" },
  { title: "Development Panel", date: "Oct 15, 2026", time: "", location: "Caddell", type: "Panel" },
  { title: "Capital Markets Panel", date: "Oct 22, 2026", time: "", location: "Caddell", type: "Panel" },
  { title: "Site Tour", date: "Oct 29, 2026", time: "", location: "Caddell", type: "Site Tour" },
  { title: "Affordable Housing Panel", date: "Nov 5, 2026", time: "", location: "Caddell", type: "Panel" },
  { title: "Site Tour", date: "Nov 12, 2026", time: "", location: "Caddell", type: "Site Tour" },
  { title: "Entrepreneurship Panel", date: "Nov 19, 2026", time: "", location: "Caddell", type: "Panel" },
];

