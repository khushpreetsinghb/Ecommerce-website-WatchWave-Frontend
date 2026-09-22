import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-top">
        <div>
          <div className="footer-brand">
            Watch<span>Wave</span>
          </div>
          <p>
            Curated luxury, sport and smart watches for every moment.
            Authentic pieces, insured shipping and a 2-year WatchWave warranty.
          </p>
        </div>
        <div>
          <h6>Shop</h6>
          <div>
            <Link href="/">All Watches</Link>
          </div>
          <div>
            <Link href="/categories">Categories</Link>
          </div>
          <div>
            <Link href="/cart">Cart</Link>
          </div>
        </div>
        <div>
          <h6>Company</h6>
          <div>
            <Link href="/about">About</Link>
          </div>
          <div>
            <Link href="/contact">Contact</Link>
          </div>
          <div>
            <Link href="/policy">Privacy Policy</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        All Rights Reserved &copy; Khushpreet Singh · Crafted with Next.js,
        Express &amp; MongoDB
      </div>
    </div>
  );
};

export default Footer;
