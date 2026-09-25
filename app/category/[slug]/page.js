"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import axios from "@/lib/api-client";
import { apiUrl } from "@/lib/api";
import { formatINR } from "@/lib/format";

const FALLBACK_IMAGE = "/images/cutout/m1.png";

const CATEGORY_NOTES = {
  classic: "Quiet foundations for the days that become your signature.",
  sport: "Clear purpose and confident proportions for active hours.",
  smart: "Useful intelligence with a lighter, more human point of view.",
  luxury: "Considered finishing for the moments that deserve more room.",
};

const productImage = (product) =>
  product?._id
    ? apiUrl(`/api/v1/product/product-photo/${product._id}`)
    : FALLBACK_IMAGE;

const descriptionFor = (value) => {
  const text = value || "A considered WatchWave timepiece for the everyday.";
  return text.length > 132 ? `${text.slice(0, 132).trim()}…` : text;
};

export default function CategoryProduct() {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setFailed(false);

    const loadProducts = async () => {
      if (!params?.slug) return;
      try {
        const { data } = await axios.get(
          `/api/v1/product/product-category/${params.slug}`
        );
        if (!active) return;
        setProducts(data?.products || []);
        setCategory(data?.category || null);
      } catch {
        if (!active) return;
        setProducts([]);
        setCategory(null);
        setFailed(true);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadProducts();
    return () => {
      active = false;
    };
  }, [params?.slug]);

  const categoryName = category?.name || "Collection";
  const note = CATEGORY_NOTES[category?.slug] || "A considered WatchWave edit for the hours that matter.";

  return (
    <main className="ww-page ww-inner-page ww-category-page">
      <section className="ww-category-hero" aria-labelledby="ww-category-title">
        <div className="ww-category-hero-copy">
          <Link className="ww-back-link" href="/categories">
            <FiArrowLeft aria-hidden="true" /> All collections
          </Link>
          <p className="ww-inner-kicker">
            <span /> WatchWave / {categoryName}
          </p>
          <h1 id="ww-category-title">
            {categoryName === "Collection" ? "The " : ""}
            <em>{categoryName}</em>
          </h1>
          <p>{note}</p>
          <div className="ww-category-hero-stats">
            <div><strong>{loading ? "—" : products.length}</strong><span>pieces in the edit</span></div>
            <div><strong>04</strong><span>design directions</span></div>
          </div>
        </div>
        <div className="ww-category-hero-art" aria-hidden="true">
          <div className="ww-category-hero-ring" />
          <div className="ww-category-hero-watch">
            <img
              src={productImage(products[0])}
              alt=""
              onError={(event) => {
                event.currentTarget.src = FALLBACK_IMAGE;
              }}
            />
          </div>
          <span>{categoryName} / 01</span>
        </div>
      </section>

      <section className="ww-category-products ww-section">
        <div className="ww-section-heading">
          <div>
            <p className="ww-kicker">The selection</p>
            <h2>
              Find your <em>fit.</em>
            </h2>
          </div>
          <p className="ww-section-heading-aside">
            Every piece in this family shares a point of view. Let the one that
            stays with you decide.
          </p>
        </div>

        {loading ? (
          <div className="ww-category-grid" aria-label="Loading products">
            {Array.from({ length: 6 }).map((_, index) => (
              <div className="ww-category-skeleton" key={index}>
                <span />
                <i />
                <i />
              </div>
            ))}
          </div>
        ) : failed ? (
          <div className="ww-collections-empty">
            <span>W</span>
            <h3>We could not open this family.</h3>
            <p>Try again in a moment or browse the full collection.</p>
            <Link className="ww-button ww-button-dark" href="/categories">
              View collections
            </Link>
          </div>
        ) : products.length ? (
          <div className="ww-category-grid">
            {products.map((product, index) => (
              <article className="ww-category-card" key={product._id}>
                <Link href={`/product/${product.slug}`} className="ww-category-card-media">
                  <img
                    src={productImage(product)}
                    alt={product.name}
                    onError={(event) => {
                      event.currentTarget.src = FALLBACK_IMAGE;
                    }}
                  />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <i><FiArrowUpRight aria-hidden="true" /></i>
                </Link>
                <div className="ww-category-card-copy">
                  <p>{categoryName}</p>
                  <div>
                    <h3>{product.name}</h3>
                    <strong>{formatINR(product.price)}</strong>
                  </div>
                  <span>{descriptionFor(product.description)}</span>
                  <Link href={`/product/${product.slug}`}>
                    View details <FiArrowUpRight aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="ww-collections-empty">
            <span>W</span>
            <h3>No pieces in this edit yet.</h3>
            <p>Explore another family and find your next watch.</p>
            <Link className="ww-button ww-button-dark" href="/categories">
              Browse collections
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
