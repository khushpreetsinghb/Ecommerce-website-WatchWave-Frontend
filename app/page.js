"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiCheck,
  FiFilter,
  FiLoader,
  FiShoppingBag,
  FiX,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { Prices } from "@/components/Prices";
import { useAuth } from "@/context/auth";
import { useCart } from "@/context/cart";
import axios from "@/lib/api-client";
import { apiUrl } from "@/lib/api";
import { formatINR } from "@/lib/format";

const FALLBACK_IMAGE = "/images/w1.png";

const productImage = (product) =>
  product?._id
    ? apiUrl(`/api/v1/product/product-photo/${product._id}`)
    : FALLBACK_IMAGE;

const categoryName = (product) => {
  if (typeof product?.category === "string") return product.category;
  return product?.category?.name || "WatchWave collection";
};

const shortDescription = (value) => {
  const text = value || "";
  return text.length > 116 ? `${text.slice(0, 116).trim()}…` : text;
};

const ProductCard = ({ product, index, onOpen, onAdd }) => (
  <article className="ww-product-card">
    <button
      type="button"
      className="ww-product-media"
      onClick={() => onOpen(product)}
      aria-label={`Quick view ${product.name}`}
    >
      <img src={productImage(product)} alt={product.name} loading="lazy" />
      <span className="ww-product-number">{String(index + 1).padStart(2, "0")}</span>
      <span className="ww-product-view">
        Quick view <FiArrowUpRight aria-hidden="true" />
      </span>
    </button>
    <div className="ww-product-heading">
      <div>
        <span className="ww-product-category">{categoryName(product)}</span>
        <h3>{product.name}</h3>
      </div>
      <strong>{formatINR(product.price)}</strong>
    </div>
    <p className="ww-product-description">{shortDescription(product.description)}</p>
    <div className="ww-product-actions">
      <button type="button" onClick={() => onAdd(product)}>
        Add to bag <FiArrowUpRight aria-hidden="true" />
      </button>
      <Link href={`/product/${product.slug}`}>View details</Link>
    </div>
  </article>
);

const HomePage = () => {
  const router = useRouter();
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [quickView, setQuickView] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const isFiltering = checked.length > 0 || radio.length > 0;
  const heroProduct = products[0];
  const heroImage = productImage(heroProduct);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      setCategories(data?.category || []);
    } catch {
      setCategories([]);
    }
  };

  const loadTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(Number(data?.total) || 0);
    } catch {
      setTotal(0);
    }
  };

  const loadProducts = async (pageNumber = 1, replace = false) => {
    setLoading(true);
    try {
      const response =
        checked.length || radio.length
          ? await axios.post("/api/v1/product/product-filters", {
              checked,
              radio,
            })
          : await axios.get(`/api/v1/product/product-list/${pageNumber}`);
      const nextProducts = response.data?.products || [];
      setProducts((current) => {
        if (replace || pageNumber === 1) return nextProducts;
        const seen = new Set(current.map((product) => product._id));
        return [
          ...current,
          ...nextProducts.filter((product) => !seen.has(product._id)),
        ];
      });
    } catch {
      if (replace || pageNumber === 1) setProducts([]);
      toast.error("We could not load the collection. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
    loadTotal();
  }, []);

  useEffect(() => {
    setPage(1);
    loadProducts(1, true);
  }, [checked, radio]);

  useEffect(() => {
    if (page > 1) loadProducts(page);
  }, [page]);

  useEffect(() => {
    if (!quickView) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setQuickView(null);
    };
    document.body.classList.add("ww-modal-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("ww-modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [quickView]);

  const categoryIsSelected = (id) => checked.includes(id);

  const toggleCategory = (id) => {
    setChecked((current) =>
      current.includes(id)
        ? current.filter((categoryId) => categoryId !== id)
        : [...current, id]
    );
  };

  const choosePrice = (price) => {
    setRadio((current) => (current[0] === price ? [] : [price]));
  };

  const clearFilters = () => {
    setChecked([]);
    setRadio([]);
  };

  const addToBag = (product) => {
    if (!auth?.user) {
      toast("Sign in to add a watch to your bag");
      router.push("/login?redirect=/");
      return;
    }
    if (cart?.some((item) => item._id === product._id)) {
      toast("That watch is already in your bag");
      return;
    }
    const updated = [...(cart || []), product];
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    toast.success(`${product.name} added to your bag`);
  };

  const scrollToCollection = () => {
    document
      .getElementById("collection")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const selectedPrice = useMemo(
    () => Prices.find((price) => price.array[0] === radio[0]),
    [radio]
  );

  return (
    <div className="ww-page">
      <section className="ww-hero" aria-labelledby="ww-hero-title">
        <div className="ww-hero-grid" aria-hidden="true" />
        <div className="ww-hero-orbit ww-hero-orbit-one" aria-hidden="true" />
        <div className="ww-hero-orbit ww-hero-orbit-two" aria-hidden="true" />
        <div className="ww-hero-copy">
          <p className="ww-kicker">
            <span /> Independent watch retail · 2026
          </p>
          <h1 id="ww-hero-title">
            Time, <em>well chosen.</em>
          </h1>
          <p className="ww-hero-lede">
            A considered edit of watches for the hours that matter — from
            everyday classics to pieces with a little more presence.
          </p>
          <div className="ww-hero-actions">
            <button type="button" className="ww-button ww-button-light" onClick={scrollToCollection}>
              Explore the collection <FiArrowUpRight aria-hidden="true" />
            </button>
            <Link className="ww-text-link ww-text-link-light" href="/about">
              Our approach <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="ww-hero-stats" aria-label="WatchWave highlights">
            <div>
              <strong>{total || "—"}</strong>
              <span>pieces to explore</span>
            </div>
            <div>
              <strong>{categories.length || "—"}</strong>
              <span>watch families</span>
            </div>
            <div>
              <strong>2 yr</strong>
              <span>WatchWave warranty</span>
            </div>
          </div>
        </div>
        <div className="ww-hero-product">
          <div className="ww-hero-image-frame">
            <img src={heroImage} alt={heroProduct?.name || "WatchWave watch"} />
          </div>
          <span className="ww-hero-caption">
            {heroProduct?.name || "The everyday edit"} <FiArrowUpRight aria-hidden="true" />
          </span>
        </div>
        <div className="ww-hero-foot">
          <span>Scroll to discover</span>
          <span className="ww-hero-line" />
          <span>Quiet details. Clear choices.</span>
        </div>
      </section>

      <section className="ww-intro-section ww-section">
        <div className="ww-intro-mark" aria-hidden="true">W</div>
        <div>
          <p className="ww-kicker">A more considered way to shop</p>
          <h2>
            The right watch does not need to be <em>loud.</em>
          </h2>
        </div>
        <p className="ww-intro-copy">
          We bring together well-made pieces for different styles, budgets and
          routines. Take your time, compare the details and choose the one that
          feels like yours.
        </p>
      </section>

      <section className="ww-collection-section ww-section" id="collection">
        <div className="ww-section-heading">
          <div>
            <p className="ww-kicker">01 / The collection</p>
            <h2>
              Find your <em>everyday.</em>
            </h2>
          </div>
          <div className="ww-section-heading-aside">
            <p>
              Five expressions, one easier way to find your next watch. Filter
              by family or explore the full edit.
            </p>
            <span>{total || products.length} timepieces · USD / INR</span>
          </div>
        </div>

        <div className="ww-collection-toolbar">
          <div className="ww-filter-pills" aria-label="Filter by category">
            <button
              type="button"
              className={!checked.length ? "is-active" : ""}
              onClick={() => setChecked([])}
            >
              All watches
            </button>
            {categories.map((category) => (
              <button
                type="button"
                key={category._id || category.slug}
                className={categoryIsSelected(category._id) ? "is-active" : ""}
                onClick={() => toggleCategory(category._id)}
              >
                {category.name}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="ww-filter-toggle"
            onClick={() => setFiltersOpen((open) => !open)}
            aria-expanded={filtersOpen}
          >
            <FiFilter aria-hidden="true" /> Filters
            {isFiltering && <span>{checked.length + radio.length}</span>}
          </button>
        </div>

        <div className="ww-collection-layout">
          <aside className={`ww-filter-panel ${filtersOpen ? "is-open" : ""}`}>
            <div className="ww-filter-panel-head">
              <span>Refine the edit</span>
              {isFiltering && (
                <button type="button" onClick={clearFilters}>
                  Clear all
                </button>
              )}
            </div>
            <fieldset>
              <legend>Category</legend>
              <button
                type="button"
                className={`ww-filter-option ${!checked.length ? "is-active" : ""}`}
                onClick={() => setChecked([])}
              >
                <span className="ww-filter-check">{!checked.length && <FiCheck />}</span>
                All families
              </button>
              {categories.map((category) => (
                <button
                  type="button"
                  className={`ww-filter-option ${
                    categoryIsSelected(category._id) ? "is-active" : ""
                  }`}
                  key={category._id || category.slug}
                  onClick={() => toggleCategory(category._id)}
                >
                  <span className="ww-filter-check">
                    {categoryIsSelected(category._id) && <FiCheck />}
                  </span>
                  {category.name}
                </button>
              ))}
            </fieldset>
            <fieldset>
              <legend>Price</legend>
              {Prices.map((price) => (
                <button
                  type="button"
                  className={`ww-filter-option ${
                    radio[0] === price.array[0] ? "is-active" : ""
                  }`}
                  key={price._id}
                  onClick={() => choosePrice(price.array)}
                >
                  <span className="ww-filter-check">
                    {radio[0] === price.array[0] && <FiCheck />}
                  </span>
                  {price.name}
                </button>
              ))}
            </fieldset>
            {selectedPrice && (
              <p className="ww-filter-note">
                Showing pieces from {formatINR(selectedPrice.array[0])} upwards.
              </p>
            )}
          </aside>

          <div className="ww-product-results">
            <div className="ww-results-head">
              <span>
                {loading && page === 1
                  ? "Curating the collection…"
                  : `${products.length} ${products.length === 1 ? "piece" : "pieces"}`}
              </span>
              {isFiltering && <span>Filtered selection</span>}
            </div>

            {loading && page === 1 ? (
              <div className="ww-product-grid" aria-label="Loading products">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div className="ww-product-skeleton" key={index}>
                    <span />
                    <i />
                    <i />
                  </div>
                ))}
              </div>
            ) : products.length ? (
              <>
                <div className="ww-product-grid">
                  {products.map((product, index) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      index={index}
                      onOpen={setQuickView}
                      onAdd={addToBag}
                    />
                  ))}
                </div>
                {!isFiltering && products.length < total && (
                  <div className="ww-load-more">
                    <button
                      type="button"
                      className="ww-button ww-button-outline"
                      onClick={() => setPage((current) => current + 1)}
                      disabled={loading}
                    >
                      {loading ? <FiLoader className="ww-spin" /> : "Load more pieces"}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="ww-empty-state">
                <span className="ww-empty-mark">W</span>
                <h3>Nothing matches that edit.</h3>
                <p>Try clearing a filter and give the collection another look.</p>
                <button type="button" className="ww-button ww-button-dark" onClick={clearFilters}>
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="ww-craft-section" id="craft">
        <div className="ww-craft-art">
          <img src={heroImage} alt="A closer look at a WatchWave timepiece" loading="lazy" />
          <div className="ww-cart-caption">
            <span>Details worth noticing</span>
            <span>WatchWave / close study</span>
          </div>
        </div>
        <div className="ww-craft-copy">
          <p className="ww-kicker">02 / The craft</p>
          <h2>
            Precision, with a <em>human side.</em>
          </h2>
          <p>
            A good watch is more than a shape on a wrist. It is the weight,
            the finish, the way the light catches a case and the feeling that
            it will still suit you years from now.
          </p>
          <div className="ww-spec-row">
            <div><strong>01</strong><span>considered proportions</span></div>
            <div><strong>02</strong><span>everyday comfort</span></div>
            <div><strong>03</strong><span>lasting character</span></div>
          </div>
          <Link className="ww-text-link" href="/categories">
            Explore the families <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="ww-story-section ww-section" id="story">
        <div className="ww-story-heading">
          <p className="ww-kicker">03 / Our story</p>
          <h2>
            Watches for the <em>in-between.</em>
          </h2>
        </div>
        <div className="ww-story-copy">
          <p>
            WatchWave began with a simple idea: finding a watch should feel
            clear, considered and enjoyable. We bring together different styles
            without pretending one watch fits everyone.
          </p>
          <Link className="ww-text-link" href="/about">
            Read our story <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="ww-story-stats">
          <div><strong>01</strong><span>Clear choices</span></div>
          <div><strong>02</strong><span>Human guidance</span></div>
          <div><strong>03</strong><span>Everyday focus</span></div>
        </div>
      </section>

      <section className="ww-values-section">
        <div className="ww-section-heading">
          <div>
            <p className="ww-kicker">The WatchWave difference</p>
            <h2>More than a <em>transaction.</em></h2>
          </div>
        </div>
        <div className="ww-values-grid">
          <article><span>01</span><h3>Authentic pieces</h3><p>A clear edit across classic, sport and smart families.</p></article>
          <article><span>02</span><h3>Thoughtful details</h3><p>Product information presented simply, so you can compare with confidence.</p></article>
          <article><span>03</span><h3>Here when needed</h3><p>Questions before or after your order? Start a conversation with us.</p></article>
        </div>
        <div className="ww-cta-row">
          <div>
            <p className="ww-kicker">Ready when you are</p>
            <h2>Take your time. We will be here.</h2>
          </div>
          <Link className="ww-button ww-button-light" href="/categories">
            Browse all watches <FiArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      {quickView && (
        <div className="ww-modal-backdrop" role="presentation" onMouseDown={() => setQuickView(null)}>
          <div
            className="ww-quick-view"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ww-quick-view-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="ww-modal-close"
              onClick={() => setQuickView(null)}
              aria-label="Close quick view"
            >
              <FiX aria-hidden="true" />
            </button>
            <div className="ww-quick-media">
              <img src={productImage(quickView)} alt={quickView.name} />
              <span>WatchWave / quick view</span>
            </div>
            <div className="ww-quick-copy">
              <p className="ww-kicker">{categoryName(quickView)}</p>
              <h2 id="ww-quick-view-title">{quickView.name}</h2>
              <strong className="ww-quick-price">{formatINR(quickView.price)}</strong>
              <p>{quickView.description || "A considered WatchWave timepiece for the everyday."}</p>
              <dl className="ww-quick-specs">
                <div><dt>Family</dt><dd>{categoryName(quickView)}</dd></div>
                <div><dt>Availability</dt><dd>In the current edit</dd></div>
                <div><dt>Delivery</dt><dd>Insured shipping</dd></div>
              </dl>
              <div className="ww-quick-actions">
                <button type="button" className="ww-button ww-button-dark" onClick={() => addToBag(quickView)}>
                  Add to bag <FiShoppingBag aria-hidden="true" />
                </button>
                <Link className="ww-text-link" href={`/product/${quickView.slug}`} onClick={() => setQuickView(null)}>
                  Full details <FiArrowUpRight aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
