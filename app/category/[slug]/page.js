"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "@/lib/api-client";
import { apiUrl } from "@/lib/api";
import { formatINR } from "@/lib/format";

const CategoryProduct = () => {
  const params = useParams();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div className="container mt-3 category">
      <h4 className="text-center">Category - {category?.name}</h4>
      <h6 className="text-center">{products?.length} result found </h6>
      <div className="category-grid">
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
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default CategoryProduct;
