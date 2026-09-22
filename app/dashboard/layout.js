"use client";

import PrivateGuard from "@/components/Routes/PrivateGuard";

// All /dashboard/user/* routes render inside the auth guard.
export default function UserDashboardLayout({ children }) {
  return <PrivateGuard>{children}</PrivateGuard>;
}
