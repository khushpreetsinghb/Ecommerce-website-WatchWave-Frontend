"use client";

import React, { useState, useEffect } from "react";
import axios from "@/lib/api-client";
import { apiUrl } from "@/lib/api";
import { formatINR } from "@/lib/format";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/context/cart";
import toast from "react-hot-toast";

const ProductDetailsClient = () => {
  const params = useParams();
  const router = useRouter();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      // console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      // console.log(error);
    }
  };

  // add to cart unless it's already there (avoids duplicate lines)
  const addToCart = (silent = false) => {
    if (!product?._id) return false;
    if (cart.some((item) => item._id === product._id)) {
      if (!silent) toast.success("Item is already in your cart");
      return true;
    }
    const updated = [...cart, product];
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    if (!silent) toast.success("Item Added to cart");
    return true;
  };

  // BUY NOW: make sure this product is in the cart, then jump
  // straight to the cart page where checkout/payment happens
  const handleBuyNow = () => {
    if (!addToCart(true)) return;
    toast.success("Proceeding to checkout");
    router.push("/cart");
  };
  return (
    <>
      <div className="row container product-details">
        <div className="col-md-6">
          <div className="product-media">
            <img
              src={apiUrl(`/api/v1/product/product-photo/${product._id}`)}
              alt={product.name}
            />
          </div>
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>
            Price : {formatINR(product?.price)}
          </h6>
          <h6>Category : {product?.category?.name}</h6>
          <div className="d-flex gap-2 mt-3">
            <button
              className="btn btn-secondary ms-1"
              disabled={!product?._id}
              onClick={() => addToCart()}
            >
              ADD TO CART
            </button>
            <button
              className="btn btn-dark ms-1"
              disabled={!product?._id}
              onClick={handleBuyNow}
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="row container similar-products">
        <h4>Similar Products ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" key={p._id}>
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
    </>
  );
};

export default ProductDetailsClient;
