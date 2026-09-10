// Analyst Rolodex roster.
//
// Intentionally EMPTY for now: member profiles are only published to the
// directory once each person has given consent to appear. The full roster was
// generated from the new-member form export and can be regenerated and restored
// here once consent is collected. Until then the directory shows its
// "launching soon" state.

export type RolodexMember = {
  id: string;
  slug: string;
  name: string;
  major: string;
  year: string;
  grad: string;
  gradYear: number;
  disciplines: string[];
  summary: string;
  experience: string;
};

export const MEMBERS: RolodexMember[] = [];

export const MEMBER_DISCIPLINES = Array.from(new Set(MEMBERS.flatMap((m) => m.disciplines))).sort();
export const MEMBER_GRAD_YEARS = Array.from(new Set(MEMBERS.map((m) => m.gradYear).filter(Boolean))).sort();

export function memberInitials(name: string): string {
  return name.split(' ').filter(Boolean).map((p) => p[0]).slice(0, 2).join('').toUpperCase();
}
