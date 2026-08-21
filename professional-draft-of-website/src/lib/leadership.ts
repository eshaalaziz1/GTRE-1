// Executive Board rosters, grouped by term so past years can be added as their
// own sections (matching the club's year-by-year leadership layout). The newest
// term goes first.
//
// HEADSHOTS: each member's `photo` points at /public/exec/<slug>.jpg|png. Drop a
// square headshot there named by slug and it appears automatically; until then a
// clean initials avatar shows instead. `focus` (CSS object-position) and `zoom`
// tune how each photo is cropped into the circle so every face is centered,
// regardless of whether the original is a portrait, square, or landscape.

export type ExecMember = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  focus?: string; // object-position / transform-origin, e.g. "50% 30%"
  zoom?: number; // >1 tightens the crop on the face
};

export type ExecTerm = {
  term: string;
  members: ExecMember[];
};

const fall2026: ExecMember[] = [
  {
    slug: "rustin-jalali",
    name: "Rustin Jalali",
    role: "President",
    bio: "Rustin is a third-year Business major with a concentration in Finance and is pursuing two minors in Real Estate and Spanish. He has past experience with Third and Urban as a mixed-use development intern and with Brasfield and Gorrie as a pre-construction intern. He completed the GTRE Analyst Program in Fall 2025.",
    photo: "/exec/rustin-jalali.jpg",
    focus: "50% 25%",
    zoom: 1.5,
  },
  {
    slug: "adam-stadelmeier",
    name: "Adam Stadelmeier",
    role: "Managing Director of Fund",
    bio: "Adam is a third-year Business Administration major with a concentration in Finance and is pursuing a minor in Real Estate Development and Finance. He has past experience with Cousins Properties as an analyst, Creek Dog Capital as a deal origination intern, and The Whiting-Turner Contracting Company as a project management intern. He completed the GTRE Analyst Program in Fall 2025.",
    photo: "/exec/adam-stadelmeier.jpg",
    focus: "50% 33%",
    zoom: 1.08,
  },
  {
    slug: "neal-shah",
    name: "Neal Shah",
    role: "Portfolio Manager of Fund",
    bio: "Neal is a third-year Business Administration major with a concentration in Finance and a minor in FinTech. He has past experience with Stockbridge as a real estate private equity summer analyst and with Newmark as a business development intern. He completed the GTRE Analyst Program in Fall 2025.",
    photo: "/exec/neal-shah.jpg",
    focus: "50% 32%",
    zoom: 1.22,
  },
  {
    slug: "sree-hariharan",
    name: "Sree Hariharan",
    role: "Undergraduate VP",
    bio: "Sree is a third-year Civil Engineering major. She has past experience with Kimley-Horn on its development team, RBMT as a real estate capital allocations intern, and Sotheby's International Realty as a real estate intern. She completed the GTRE Analyst Program in Fall 2024.",
    photo: "/exec/sree-hariharan.jpg",
    focus: "50% 28%",
    zoom: 1.05,
  },
  {
    slug: "tanish-patel",
    name: "Tanish Patel",
    role: "VP of Development",
    bio: "Tanish is a fourth-year Business Administration major with a concentration in Finance, a minor in Economics, and certificates in Accounting and Business Analytics. He has past experience with Grant Thornton as an operations and performance consulting intern and with Reunitus as a corporate strategy and financial planning intern. He completed the GTRE Analyst Program in Fall 2024.",
    photo: "/exec/tanish-patel.png",
    focus: "54% 34%",
    zoom: 1.32,
  },
  {
    slug: "josh-craig",
    name: "Josh Craig",
    role: "VP of Industry Relations",
    bio: "Josh is a Building Construction major at Georgia Tech with a focus on real estate and development, and completed the GTRE Analyst Program in Spring 2026.",
    photo: "/exec/josh-craig.png",
    focus: "50% 30%",
    zoom: 1.18,
  },
  {
    slug: "evan-mamun",
    name: "Evan Mamun",
    role: "Director of Mentorship",
    bio: "Evan is a third-year Business major with a concentration in Finance. He has past experience with Octave Holdings and Investments as a summer analyst and with TWO Capital Partners as a real estate private equity summer analyst. He completed the GTRE Analyst Program in Spring 2026.",
    photo: "/exec/evan-mamun.jpg",
    focus: "50% 36%",
    zoom: 1.08,
  },
  {
    slug: "suvan-gumadavalli",
    name: "Suvan Gumadavalli",
    role: "Director of Alumni Relations",
    bio: "Suvan is a second-year Mechanical Engineering major. He completed the GTRE Analyst Program in Spring 2026.",
    photo: "/exec/suvan-gumadavalli.jpg",
    focus: "48% 40%",
    zoom: 1.08,
  },
  {
    slug: "emmie-adams",
    name: "Emmie Adams",
    role: "Director of Marketing",
    bio: "Emmie is a third-year Construction Science and Management major. She has past experience with Reeves Young as an industrial preconstruction intern. She completed the GTRE Analyst Program in Spring 2026.",
    photo: "/exec/emmie-adams.jpg",
    focus: "46% 34%",
    zoom: 1.12,
  },
  {
    slug: "olivia-brown",
    name: "Olivia Brown",
    role: "Director of Marketing",
    bio: "Olivia is a second-year Construction Science and Management major and a Stamps President's Scholar. She has contributed as a student researcher in Georgia Tech's Building for Communities VIP program. She completed the GTRE Analyst Program in Spring 2026.",
    photo: "/exec/olivia-brown.jpg",
    focus: "48% 33%",
    zoom: 1.06,
  },
  {
    slug: "eshaal-aziz",
    name: "Eshaal Aziz",
    role: "Director of IT",
    bio: "Eshaal is a second-year Computer Science major with a focus in FinTech. She has past experience with Mubadala Capital as a finance and strategy intern and with Cleveland Clinic Abu Dhabi as a data science and business intelligence intern. She completed the GTRE Analyst Program in Fall 2025.",
    photo: "/exec/eshaal-aziz.jpg",
    focus: "56% 56%",
    zoom: 1.18,
  },
  {
    slug: "leonid-shteynblik",
    name: "Leonid Shteynblik",
    role: "Treasurer",
    bio: "Leonid is a second-year Civil Engineering major pursuing a minor in French. He has past experience with Gabriel Fuentes Jr. Construction as an engineering intern and with PharmLogic International as a development intern. He completed the GTRE Analyst Program in Spring 2026.",
    photo: "/exec/leonid-shteynblik.png",
    focus: "50% 38%",
    zoom: 1.08,
  },
];

export const EXEC_TERMS: ExecTerm[] = [{ term: "Fall 2026", members: fall2026 }];
