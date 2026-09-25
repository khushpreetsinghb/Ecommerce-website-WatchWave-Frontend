"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiChevronDown,
  FiMenu,
  FiShoppingBag,
  FiUser,
  FiX,
} from "react-icons/fi";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import { useAuth } from "@/context/auth";
import { useCart } from "@/context/cart";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/categories" },
  { label: "Our story", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const pathname = usePathname();
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cartCount = cart?.length || 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    setMenuOpen(false);
    toast.success("You have been signed out");
  };

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-header-inner">
        <Link href="/" className="site-brand" aria-label="WatchWave home">
          <span className="site-brand-mark">W</span>
          <span className="site-brand-word">
            Watch<span>Wave</span>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "is-active" : ""}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header-tools">
          <div className="site-header-search">
            <SearchInput />
          </div>

          {auth?.user ? (
            <details className="site-account-menu">
              <summary className="site-account-trigger">
                <FiUser aria-hidden="true" />
                <span>{auth.user.name || "Account"}</span>
                <FiChevronDown aria-hidden="true" />
              </summary>
              <div className="site-account-popover">
                <Link
                  href={`/dashboard/${
                    auth?.user?.role === 1 ? "admin" : "user"
                  }`}
                >
                  Dashboard
                </Link>
                <Link href="/dashboard/user/orders">My orders</Link>
                <button type="button" onClick={handleLogout}>
                  Sign out
                </button>
              </div>
            </details>
          ) : (
            <Link className="site-signin" href="/login">
              <FiUser aria-hidden="true" />
              <span>Sign in</span>
            </Link>
          )}

          <Link className="site-cart-link" href="/cart" aria-label={`Bag, ${cartCount} items`}>
            <FiShoppingBag aria-hidden="true" />
            <span>Bag</span>
            <b>{cartCount}</b>
          </Link>

          <button
            type="button"
            className="site-menu-toggle"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="site-mobile-menu">
          <div className="site-mobile-links">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="site-mobile-account">
            {auth?.user ? (
              <>
                <Link
                  href={`/dashboard/${
                    auth?.user?.role === 1 ? "admin" : "user"
                  }`}
                >
                  Dashboard
                </Link>
                <button type="button" onClick={handleLogout}>
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/login">Sign in</Link>
                <Link href="/register">Create an account</Link>
              </>
            )}
          </div>
          <p>Considered watches for the hours that matter.</p>
        </div>
      )}
    </header>
  );
};

export default Header;
