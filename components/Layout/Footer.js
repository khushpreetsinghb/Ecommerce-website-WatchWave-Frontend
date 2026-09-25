import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-intro">
          <Link href="/" className="site-footer-brand">
            <span className="site-brand-mark">W</span>
            <span>
              Watch<span>Wave</span>
            </span>
          </Link>
          <p>
            A considered collection of watches for the hours that matter —
            authentic pieces, thoughtful details and a little more meaning
            every day.
          </p>
          <span className="site-footer-note">Independent watch retail · est. 2024</span>
        </div>

        <div className="site-footer-column">
          <h3>Explore</h3>
          <Link href="/">Home</Link>
          <Link href="/categories">Collections</Link>
          <Link href="/about">Our story</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="site-footer-column">
          <h3>Your account</h3>
          <Link href="/login">Sign in</Link>
          <Link href="/register">Create an account</Link>
          <Link href="/cart">Shopping bag</Link>
          <Link href="/policy">Privacy policy</Link>
        </div>

        <div className="site-footer-signoff">
          <span className="site-footer-kicker">The WatchWave promise</span>
          <h2>Time, well chosen.</h2>
          <p>
            If a piece does not feel right, we would rather help you find the
            one that does.
          </p>
        </div>
      </div>
      <div className="site-footer-bottom">
        <span>© {new Date().getFullYear()} WatchWave. All rights reserved.</span>
        <span>Made for considered everyday wear.</span>
      </div>
    </footer>
  );
};

export default Footer;
