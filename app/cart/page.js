"use client";

import React, { useState } from "react";
import { useCart } from "@/context/cart";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import { AiFillWarning } from "react-icons/ai";
import axios from "@/lib/api-client";
import { apiUrl } from "@/lib/api";
import { formatINR } from "@/lib/format";
import toast from "react-hot-toast";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return formatINR(total);
    } catch (error) {
      // console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      // console.log(error);
    }
  };

  //place order with cash on delivery (no online gateway needed)
  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      // send IDs only: cart items may carry photo buffers (from
      // category/filter responses), which would blow past the JSON
      // body limit — the server only needs the IDs
      const { data } = await axios.post("/api/v1/product/place-order", {
        cart: cart.map((i) => ({ _id: i._id })),
      });
      setLoading(false);
      if (data?.success) {
        localStorage.removeItem("cart");
        setCart([]);
        router.push("/dashboard/user/orders");
        toast.success("Order Placed Successfully");
      } else {
        toast.error(data?.message || "Could not place order");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Could not place order");
      setLoading(false);
    }
  };

  return (
    <div className=" cart-page">
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center bg-light p-2 mb-1">
            {!auth?.user
              ? "Hello Guest"
              : `Hello  ${auth?.token && auth?.user?.name}`}
            <p className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout !"
                  }`
                : " Your Cart Is Empty"}
            </p>
          </h1>
        </div>
      </div>
      <div className="container ">
        <div className="row ">
          <div className="col-md-7  p-0 m-0">
            {!cart?.length ? (
              <div className="no-results">
                <h5>Your cart is empty</h5>
                <p>
                  Browse the collection and add a watch you love — it will
                  show up here.
                </p>
                <button
                  className="btn btn-dark"
                  onClick={() => router.push("/")}
                >
                  Browse Watches
                </button>
              </div>
            ) : (
            cart?.map((p) => (
              <div className="row card flex-row" key={p._id}>
                <div className="col-md-4">
                  <div className="cart-thumb">
                    <img
                      src={apiUrl(`/api/v1/product/product-photo/${p._id}`)}
                      alt={p.name}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Price : {formatINR(p.price)}</p>
                </div>
                <div className="col-md-4 cart-remove-btn">
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
            )}
          </div>
          <div className="col-md-5 cart-summary ">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPrice()} </h4>
            <div className="mb-3">
              <button
                className="btn btn-outline-dark"
                onClick={() => router.push("/")}
              >
                Continue Shopping
              </button>
            </div>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => router.push("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => router.push("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => router.push("/login?redirect=/cart")}
                  >
                    Plase Login to checkout
                  </button>
                )}
              </div>
            )}
            {/* checkout: this is a learning project with no payment
                gateway, so ordering is cash-on-delivery — one button,
                no card forms, no failing token calls */}
            <div className="mt-2">
              {!auth?.token || !cart?.length ? null : !auth?.user?.address ? (
                <p className="text-muted">
                  Add your delivery address above to proceed to checkout.
                </p>
              ) : (
                <div className="cod-box">
                  <p className="text-muted">
                    Pay in cash when your order arrives at your doorstep.
                  </p>
                  <button
                    className="btn btn-dark"
                    onClick={handlePlaceOrder}
                    disabled={loading}
                  >
                    {loading ? "Placing Order ...." : "Place Order"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
