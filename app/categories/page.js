"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "@/lib/api-client";
import { apiUrl } from "@/lib/api";

export default function Categories() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await axios.get("/api/v1/category/get-category");
        const cats = data?.category || [];
        // One representative product per category for the cover image,
        // plus the piece count — fetched in parallel.
        const withCovers = await Promise.all(
          cats.map(async (c) => {
            try {
              const res = await axios.get(
                `/api/v1/product/product-category/${c.slug}`
              );
              const products = res.data?.products || [];
              return {
                ...c,
                count: products.length,
                coverId: products[0]?._id || null,
                coverName: products[0]?.name || c.name,
              };
            } catch {
              return { ...c, count: 0, coverId: null, coverName: c.name };
            }
          })
        );
        setCards(withCovers);
      } catch {
        setCards([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="collections-page">
      <div className="collections-head">
        <div className="eyebrow">Collections</div>
        <h1>Shop by Category</h1>
        <p>
          Four curated collections — pick one to explore every piece in it.
        </p>
      </div>
      {loading ? (
        <p className="collections-status">Loading collections...</p>
      ) : cards.length === 0 ? (
        <p className="collections-status">No collections found.</p>
      ) : (
        <div className="collections-grid">
          {cards.map((c) => (
            <Link
              key={c._id}
              href={`/category/${c.slug}`}
              className="collection-card"
            >
              <div className="collection-media">
                {c.coverId ? (
                  <img
                    src={apiUrl(`/api/v1/product/product-photo/${c.coverId}`)}
                    alt={c.coverName}
                    loading="lazy"
                  />
                ) : (
                  <div className="collection-placeholder">
                    {c.name?.charAt(0)}
                  </div>
                )}
                <span className="collection-count">
                  {c.count} {c.count === 1 ? "piece" : "pieces"}
                </span>
              </div>
              <div className="collection-body">
                <h3>{c.name}</h3>
                <span className="collection-link">Shop now →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
