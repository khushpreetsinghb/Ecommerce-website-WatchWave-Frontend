"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

// Auth routes render full-screen without site chrome
const CHROMELESS = ["/login", "/register", "/forgot-password"];

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const bare = CHROMELESS.some(
    (r) => pathname === r || pathname?.startsWith(`${r}/`)
  );
  if (bare) {
    return <main style={{ minHeight: "100vh" }}>{children}</main>;
  }
  return (
    <>
      <Header />
      <main style={{ minHeight: "70vh" }}>{children}</main>
      <Footer />
    </>
  );
}
