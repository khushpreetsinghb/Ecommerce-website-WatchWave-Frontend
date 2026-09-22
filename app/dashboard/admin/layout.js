"use client";

import AdminGuard from "@/components/Routes/AdminGuard";

// All /dashboard/admin/* routes render inside the admin guard.
export default function AdminDashboardLayout({ children }) {
  return <AdminGuard>{children}</AdminGuard>;
}
