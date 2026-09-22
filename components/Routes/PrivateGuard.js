"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth";
import axios from "@/lib/api-client";
import Spinner from "../Spinner";

// Guards /dashboard/user/* — same behaviour as the old PrivateRoute,
// but renders Next.js `children` instead of react-router's <Outlet />.
export default function PrivateGuard({ children }) {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("/api/v1/auth/user-auth");
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <>{children}</> : <Spinner from={pathname} />;
}
