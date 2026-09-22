"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Drop-in replacement for react-router-dom's NavLink: renders a next/link
// and appends the `active` class when the current path matches.
// Accepts both `href` (Next style) and `to` (react-router style).
export default function NavLink({ href, to, className = "", ...rest }) {
  const pathname = usePathname();
  const target = href ?? to ?? "#";
  const active = target !== "#" && pathname === target ? "active" : "";
  return (
    <Link
      href={target}
      className={`${className} ${active}`.trim()}
      {...rest}
    />
  );
}
