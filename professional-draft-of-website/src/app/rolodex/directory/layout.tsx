import RequireAuth from "@/components/RequireAuth";

// The vetted analyst directory (and individual profiles) require an approved,
// signed-in account. The gateway at /rolodex explains access and signs people
// in. Any approved account may view; the target audience is industry partners
// and alumni.
export default function DirectoryLayout({ children }: { children: React.ReactNode }) {
  return <RequireAuth>{children}</RequireAuth>;
}
