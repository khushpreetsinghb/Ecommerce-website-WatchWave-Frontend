"use client";

import { useEffect } from "react";

// Loads Bootstrap's JS bundle client-side (navbar toggler, dropdowns).
// The CSS is imported globally in app/layout.js.
export default function BootstrapClient() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return null;
}
