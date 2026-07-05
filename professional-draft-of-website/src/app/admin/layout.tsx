import RequireAuth from "@/components/RequireAuth";
import AdminShell from "@/components/AdminShell";

export const metadata = { title: "Admin | GT Real Estate Club" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth roles={["admin"]}>
      <AdminShell>{children}</AdminShell>
    </RequireAuth>
  );
}
