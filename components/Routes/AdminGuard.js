"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import axios from "@/lib/api-client";
import Spinner from "../Spinner";

// Guards /dashboard/admin/* — same behaviour as the old AdminRoute,
// but renders Next.js `children` instead of react-router's <Outlet />.
export default function AdminGuard({ children }) {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("/api/v1/auth/admin-auth");
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

  return ok ? <>{children}</> : <Spinner path="" />;
}
