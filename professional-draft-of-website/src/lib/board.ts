// Advisory board roster. These are the club's real advisors. More members are
// added here as the board grows; `photo` left null falls back to an initials
// avatar until a square headshot is dropped in.

export type BoardMember = {
  slug: string;
  name: string;
  position: string;
  organization: string;
  group: string;
  photo: string | null;
  bio: string;
  focus: string[];
  gtConnection: string;
};

// Single group for now; add more (e.g. "Industry Advisors") as the board grows
// and the page will render each non-empty group as its own section.
export const BOARD_GROUPS = ["Advisory Board"] as const;

export const BOARD: BoardMember[] = [
  {
    slug: "rick-porter",
    name: "Rick Porter",
    position: "Founder",
    organization: "Richport Properties",
    group: "Advisory Board",
    photo: null,
    bio: "Rick Porter has spent five decades building homes and communities across Metro Atlanta. He founded his residential development company, Richport, straight out of college in 1975, and over his career his companies have built several thousand homes and developed more than $550 million of real estate. In 2006 he joined Georgia Tech's College of Design, and in 2016 he became a Professor of Practice and the founding Director of the Master of Real Estate Development program, where he helps shape the next generation of developers.",
    focus: ["Residential Development", "Homebuilding", "Real Estate Education"],
    gtConnection: "Professor of Practice, College of Design",
  },
  {
    slug: "barry-branch",
    name: "Barry Branch",
    position: "Managing Partner",
    organization: "SSG Realty Partners",
    group: "Advisory Board",
    photo: null,
    bio: "Barry Branch has led financing efforts for more than $12 billion of commercial real estate projects since 1971. For over 13 years he served as a senior executive for legendary architect-developer John C. Portman, Jr., securing funding for landmarks including the Westin Peachtree Plaza and Atlanta Apparel Mart, the Westin Bonaventure in Los Angeles, and the Brussels International Trade Mart. In 2018 he co-founded SSG Realty Partners, an Atlanta-based land investment advisory firm. He has chaired the Association of Foreign Investors in Real Estate (AFIRE) and served as Vice Chairman of the Real Estate Roundtable, and is the Robert H. Ledbetter, Sr. Professor of the Practice of Real Estate Development at Georgia Tech's Scheller College of Business.",
    focus: ["Capital Markets", "Real Estate Finance", "Land Investment"],
    gtConnection: "Professor of the Practice, Scheller College of Business",
  },
  {
    slug: "stacy-scopano",
    name: "Stacy Scopano",
    position: "VP, National Prefabrication & Manufacturing Director",
    organization: "JE Dunn Construction",
    group: "Advisory Board",
    photo: null,
    bio: "Stacy Scopano works at the intersection of technology and the built environment. A Georgia Tech economics graduate, he leads national prefabrication and manufacturing at JE Dunn Construction, and has previously driven innovation and strategy at Skanska USA, Autodesk, and Trimble. With deep expertise in Building Information Modeling (BIM), construction technology, and project planning, he brings members a forward-looking perspective on how PropTech and industrialized construction are reshaping real estate and development.",
    focus: ["Construction Technology", "PropTech", "Prefabrication & BIM"],
    gtConnection: "BS Economics",
  },
];

export function getBoardMember(slug: string): BoardMember | undefined {
  return BOARD.find((m) => m.slug === slug);
}

export function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}
