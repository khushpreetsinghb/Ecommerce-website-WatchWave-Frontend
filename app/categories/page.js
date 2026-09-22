"use client";

import React from "react";
import Link from "next/link";
import useCategory from "@/hooks/useCategory";

export default function Categories() {
  const categories = useCategory();
  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <div className="row container">
        {categories.map((c) => (
          <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={c._id}>
            <div className="card">
              <Link href={`/category/${c.slug}`} className="btn cat-btn">
                {c.name}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
