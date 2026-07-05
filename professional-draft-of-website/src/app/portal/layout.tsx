import RequireAuth from "@/components/RequireAuth";
import PortalShell from "@/components/PortalShell";

export const metadata = { title: "Member Portal | GT Real Estate Club" };

// The member portal is for students/members and admins. Industry professionals
// are routed to the Analyst Rolodex instead.
export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth roles={["student", "admin"]}>
      <PortalShell>{children}</PortalShell>
    </RequireAuth>
  );
}
