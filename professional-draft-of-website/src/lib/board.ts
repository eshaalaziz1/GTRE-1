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

export function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}
