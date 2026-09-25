"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import axios from "@/lib/api-client";
import { apiUrl } from "@/lib/api";

const FALLBACK_IMAGES = {
  classic: "/images/cutout/w1.png",
  sport: "/images/cutout/m2.png",
  smart: "/images/cutout/s1.png",
  luxury: "/images/cutout/l1.png",
};

const COLLECTION_NOTES = {
  classic: {
    eyebrow: "Quiet foundations",
    description: "Balanced proportions, legible dials and the kind of ease that makes a watch feel like part of your day.",
  },
  sport: {
    eyebrow: "Clear purpose",
    description: "Confident silhouettes and practical details for early starts, late finishes and everything between.",
  },
  smart: {
    eyebrow: "Useful intelligence",
    description: "Modern functionality with a lighter point of view — technology that fits into the day, not over it.",
  },
  luxury: {
    eyebrow: "Quiet ceremony",
    description: "Considered materials and finishing for the moments that deserve a little more room to breathe.",
  },
};

const fallbackFor = (category) =>
  FALLBACK_IMAGES[category?.slug] || FALLBACK_IMAGES.classic;

const productImage = (product, category) =>
  product?._id
    ? apiUrl(`/api/v1/product/product-photo/${product._id}`)
    : fallbackFor(category);

export default function Categories() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const { data } = await axios.get("/api/v1/category/get-category");
        const categories = data?.category || [];
        const withCovers = await Promise.all(
          categories.map(async (category) => {
            try {
              const response = await axios.get(
                `/api/v1/product/product-category/${category.slug}`
              );
              const products = response.data?.products || [];
              return {
                ...category,
                count: products.length,
                cover: products[0] || null,
              };
            } catch {
              return { ...category, count: 0, cover: null };
            }
          })
        );

        if (active) setCards(withCovers);
      } catch {
        if (active) setCards([]);
      } finally {
        if (active) setLoading(false);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, []);

  const totalPieces = useMemo(
    () => cards.reduce((sum, card) => sum + Number(card.count || 0), 0),
    [cards]
  );

  return (
    <main className="ww-page ww-inner-page ww-collections-page">
      <section className="ww-inner-hero ww-collections-hero" aria-labelledby="ww-collections-title">
        <div className="ww-inner-hero-copy">
          <p className="ww-inner-kicker">
            <span /> WatchWave / collections
          </p>
          <h1 id="ww-collections-title">
            Find your <em>rhythm.</em>
          </h1>
          <p>
            {cards.length || "—"} distinct ways to wear time. Start with a feeling, then follow
            the details until the right watch feels inevitable.
          </p>
          <div className="ww-inner-hero-actions">
            <a className="ww-button ww-button-light" href="#collection-list">
              Explore the families <FiArrowDown aria-hidden="true" />
            </a>
            <span>{cards.length || "—"} families · {totalPieces || "—"} pieces</span>
          </div>
        </div>
        <div className="ww-collections-hero-art" aria-hidden="true">
          <div className="ww-collections-hero-ring ww-collections-hero-ring-one" />
          <div className="ww-collections-hero-ring ww-collections-hero-ring-two" />
          <div className="ww-collections-hero-watch">
            <img src="/images/cutout/m1.png" alt="" />
          </div>
          <span className="ww-collections-hero-note">The edit / 2026</span>
        </div>
      </section>

      <section className="ww-collections-intro ww-section">
        <div className="ww-collections-intro-mark">W</div>
        <div>
          <p className="ww-kicker">A little direction, not a rulebook</p>
          <h2>
            Choose by <em>character.</em>
          </h2>
        </div>
        <p>
          There is no one correct watch. There is only the one that fits your
          pace, your wardrobe and the way you like to mark a moment.
        </p>
      </section>

      <section className="ww-collections-list-section ww-section" id="collection-list">
        <div className="ww-section-heading">
          <div>
            <p className="ww-kicker">The families</p>
            <h2>
              Four ways to <em>wear time.</em>
            </h2>
          </div>
          <p className="ww-section-heading-aside">
            Take a look around. Each family has its own rhythm, with enough
            room for the details to speak for themselves.
          </p>
        </div>

        {loading ? (
          <div className="ww-collections-grid" aria-label="Loading collections">
            {Array.from({ length: 4 }).map((_, index) => (
              <div className="ww-collection-skeleton" key={index}>
                <span />
                <i />
                <i />
              </div>
            ))}
          </div>
        ) : cards.length ? (
          <div className="ww-collections-grid">
            {cards.map((category, index) => {
              const note = COLLECTION_NOTES[category.slug] || {
                eyebrow: "The WatchWave edit",
                description: "A considered selection for the hours that matter.",
              };

              return (
                <Link
                  className={`ww-collection-tile ${index === 0 ? "is-featured" : ""}`}
                  href={`/category/${category.slug}`}
                  key={category._id || category.slug}
                >
                  <div className="ww-collection-tile-media">
                    <span className="ww-collection-tile-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <img
                      src={productImage(category.cover, category)}
                      alt={category.cover?.name || category.name}
                      onError={(event) => {
                        event.currentTarget.src = fallbackFor(category);
                      }}
                    />
                    <span className="ww-collection-tile-arrow">
                      <FiArrowUpRight aria-hidden="true" />
                    </span>
                  </div>
                  <div className="ww-collection-tile-copy">
                    <p>{note.eyebrow}</p>
                    <h3>{category.name}</h3>
                    <span className="ww-collection-tile-count">
                      {category.count} {category.count === 1 ? "piece" : "pieces"}
                    </span>
                    <p className="ww-collection-tile-description">{note.description}</p>
                    <span className="ww-collection-tile-link">
                      View family <FiArrowUpRight aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="ww-collections-empty">
            <span>W</span>
            <h3>The families are taking a moment.</h3>
            <p>Refresh the page or return home while we prepare the edit.</p>
            <Link className="ww-button ww-button-dark" href="/">
              Back home
            </Link>
          </div>
        )}
      </section>

      <section className="ww-inner-cta">
        <div>
          <p className="ww-kicker">Still deciding?</p>
          <h2>
            Let the details make the <em>case.</em>
          </h2>
        </div>
        <Link className="ww-button ww-button-light" href="/about">
          Read our approach <FiArrowUpRight aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
