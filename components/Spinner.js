"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Countdown spinner that redirects when the countdown hits zero.
// `path` mirrors the old react-router guard behaviour ("login" for users,
// "" i.e. "/" for admins). `from` carries the page the user came from so
// the login page can send them back via `?redirect=`.
const Spinner = ({ path = "login", from = "" }) => {
  const [count, setCount] = useState(3);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    if (count === 0) {
      const target =
        path === "login" && from
          ? `/login?redirect=${encodeURIComponent(from)}`
          : `/${path}`;
      router.push(target);
    }
    return () => clearInterval(interval);
  }, [count, router, path, from]);
  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h1 className="Text-center">redirecting to you in {count} second </h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
