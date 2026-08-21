// Advisory board roster — name and role only. `photo` left null falls back to
// an initials avatar until a square headshot is dropped in.

export type BoardMember = {
  slug: string;
  name: string;
  role: string;
  photo: string | null;
};

export const BOARD: BoardMember[] = [
  { slug: "rick-porter", name: "Rick Porter", role: "Faculty Advisor", photo: null },
  { slug: "barry-branch", name: "Barry Branch", role: "Faculty Advisor", photo: null },
  { slug: "stacy-scopano", name: "Stacy Scopano", role: "Alumni Advisor & Former President", photo: null },
];

// Alumni Board — the club's active alumni board (~10 members), folded into the
// Advisory Board page rather than a separate tab. Add each member below and they
// appear automatically; while empty the page shows a "being finalized" note.
// `company` is optional and shows under the name.
export type AlumniBoardMember = BoardMember & { company?: string };

export const ALUMNI_BOARD: AlumniBoardMember[] = [
  // Example shape (remove and replace with the real roster):
  // { slug: "jane-doe", name: "Jane Doe", role: "Analyst, Blackstone", company: "Class of 2021", photo: null },
];

export function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}
