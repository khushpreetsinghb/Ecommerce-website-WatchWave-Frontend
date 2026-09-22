"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSearch } from "@/context/search";
import { useCart } from "@/context/cart";
import { apiUrl } from "@/lib/api";
import { formatINR } from "@/lib/format";
import toast from "react-hot-toast";

const Search = () => {
  const [values] = useSearch();
  const [cart, setCart] = useCart();
  const router = useRouter();
  const results = values?.results || [];

  return (
    <div className="container search-page">
      <div className="search-head">
        <h1>Search Results</h1>
        <h6>
          {results.length < 1
            ? "No Products Found"
            : `Found ${results.length} ${
                results.length === 1 ? "product" : "products"
              }`}
        </h6>
      </div>
      {results.length === 0 ? (
        <div className="no-results">
          <h5>Nothing matched your search</h5>
          <p>Try a different keyword — or browse the full collection.</p>
          <button className="btn btn-dark" onClick={() => router.push("/")}>
            Browse Watches
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {results.map((p) => (
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
      )}
    </div>
  );
};

export default Search;
