"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Checkbox, Radio } from "antd";
import { Prices } from "@/components/Prices";
import { useCart } from "@/context/cart";
import { useAuth } from "@/context/auth";
import axios from "@/lib/api-client";
import { apiUrl } from "@/lib/api";
import { formatINR } from "@/lib/format";
import toast from "react-hot-toast";
import { AiOutlineReload } from "react-icons/ai";

const HomePage = () => {
  const router = useRouter();
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Require login. Server and first client render must match, so NEVER
  // branch on localStorage during render — decide client-side in an effect.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let storedUser = null;
    try {
      storedUser = JSON.parse(localStorage.getItem("auth"))?.user;
    } catch {
      storedUser = null;
    }
    if (!auth?.user && !storedUser) {
      router.replace("/login?redirect=/");
    } else {
      setReady(true);
    }
  }, [auth?.user, router]);

  // NOTE: no early return here — every hook below must run on every
  // render (Rules of Hooks). The login gate sits just before the main
  // return at the bottom of this component.

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    if (!ready) return;
    getAllCategory();
    getTotal();
    getAllProducts();
  }, [ready]);
  //get products
  const getAllProducts = async (pageNum = 1) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/product-list/${pageNum}`
      );
      setLoading(false);
      setProducts(data?.products || []);
    } catch (error) {
      setLoading(false);
      // console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    if (!ready) return;
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      // Dedupe by _id: without this, appending a page that overlaps the
      // current list renders the same product twice (duplicate React keys).
      setProducts((prev) => {
        const seen = new Set(prev.map((p) => p._id));
        const fresh = (data?.products || []).filter((p) => !seen.has(p._id));
        return [...prev, ...fresh];
      });
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // Reset without a page refresh: clearing the controlled selections
  // re-runs the filter effect, which reloads the first full page.
  const resetFilters = () => {
    setChecked([]);
    setRadio([]);
  };
  // Filtering replaces pagination (the filter API returns all matches at
  // once), so any selection change restarts from page 1: applying a filter
  // fetches matches, clearing all filters reloads the first full page.
  useEffect(() => {
    if (!ready) return;
    setPage(1);
    if (checked.length || radio.length) {
      filterProduct();
    } else {
      getAllProducts(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      // console.log(error);
    }
  };
  // Login gate AFTER all hooks (Rules of Hooks + hydration-safe:
  // server and first client render both output this same placeholder).
  // While a filter is active the list already holds ALL matches, so the
  // paginated Load More button must stay hidden — appending an unfiltered
  // page onto filtered results is what duplicated products (same key).
  const isFiltering = checked.length > 0 || radio.length > 0;
  if (!ready) {
    return (
      <div className="auth-gate">
        <p>Please login to view the collection...</p>
      </div>
    );
  }
  return (
    <>
      {/* hero */}
      <section className="hero">
        <div className="hero-inner">
          <div>
            <span className="hero-eyebrow">New Season · 2026 Collection</span>
            <h1>
              Time, <em>elevated</em> for every moment.
            </h1>
            <p className="lead">
              Discover hand-picked luxury, sport and smart watches —
              authentic pieces, insured delivery and a 2-year warranty.
            </p>
            <div className="hero-ctas">
              <button
                className="btn btn-gold"
                onClick={() =>
                  document
                    .getElementById("collection")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Shop the Collection
              </button>
              <button
                className="btn btn-ghost-light"
                onClick={() => router.push("/categories")}
              >
                Browse Categories
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <b>{total || "10"}+</b>
                <span>Curated pieces</span>
              </div>
              <div className="stat">
                <b>{categories?.length || "4"}</b>
                <span>Collections</span>
              </div>
              <div className="stat">
                <b>2yr</b>
                <span>Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* shop */}
      <div className="shop-wrap" id="collection">
        <div className="shop-head">
          <div>
            <div className="eyebrow">The Collection</div>
            <h2>All Watches</h2>
          </div>
          <p>
            {total ? `${total} pieces` : ""} · Complimentary insured shipping
          </p>
        </div>
        <div className="container-fluid row home-page">
        <div className="col-md-3 filters">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column filter-group">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                checked={checked.includes(c._id)}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column filter-group">
            <Radio.Group
              value={radio}
              onChange={(e) => setRadio(e.target.value)}
            >
              {Prices?.map((p) => (
                <div className="filter-option" key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button className="btn btn-danger" onClick={resetFilters}>
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9 ">
          {!loading && products?.length === 0 ? (
            <div className="no-results">
              <h5>No watches match your filters</h5>
              <p>
                Try a different category or price range — or clear the
                filters to browse the full collection.
              </p>
              <button className="btn btn-dark" onClick={resetFilters}>
                Clear Filters
              </button>
            </div>
          ) : (
          <>
          <div className="product-grid">
            {products?.map((p) => (
              <div className="card" key={p._id}>
                <img
                  src={apiUrl(`/api/v1/product/product-photo/${p._id}`)}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {formatINR(p.price)}
                    </h5>
                  </div>
                  <p className="card-text ">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => router.push(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {!isFiltering && products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
          </>
          )}
        </div>
      </div>
      </div>
    </>
  );
};

export default HomePage;
