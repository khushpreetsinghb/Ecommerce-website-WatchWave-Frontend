import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Go back - page not found",
};

const Pagenotfound = () => {
  return (
    <div className="pnf">
      <h1 className="pnf-title">404</h1>
      <h2 className="pnf-heading">Oops ! Page Not Found</h2>
      <Link href="/" className="pnf-btn">
        Go Back
      </Link>
    </div>
  );
};

export default Pagenotfound;
