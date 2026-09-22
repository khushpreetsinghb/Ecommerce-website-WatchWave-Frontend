import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <Toaster />

        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "WatchWave- Watches for Every Moment",
  description: "Discover the largest collection of watches to suit every style, brand, and budget on our WatchWave eCommerce platform, built with the MERN stack (MongoDB, Express.js, React, and Node.js).",
  keywords: "WatchWave, Watches, MERN, React, Node, Mongodb",
  author: "Khushpreet Singh",
};

export default Layout;
