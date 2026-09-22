"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UserMenu from "@/components/Layout/UserMenu";
import axios from "@/lib/api-client";
import { apiUrl } from "@/lib/api";
import { formatINR } from "@/lib/format";
import { useAuth } from "@/context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const router = useRouter();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <div className="container-fluid my-3 p-3 dashboard">
      <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-9">
          <div className="orders-card">
            <div className="orders-head">
              <h3>All Orders</h3>
              <p>
                {orders?.length === 0
                  ? "Nothing here yet"
                  : `${orders.length} ${
                      orders.length === 1 ? "order" : "orders"
                    } so far`}
              </p>
            </div>
            {orders?.length === 0 ? (
              <div className="no-results">
                <h5>No orders yet</h5>
                <p>
                  You haven&apos;t bought anything so far — your orders will
                  show up here once you check out.
                </p>
                <button
                  className="btn btn-dark"
                  onClick={() => router.push("/")}
                >
                  Browse Watches
                </button>
              </div>
            ) : (
              orders?.map((o, i) => {
                return (
                  <div className="order-card" key={o?._id || i}>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Status</th>
                          <th scope="col">Buyer</th>
                          <th scope="col"> date</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{o?.status}</td>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o?.createAt).fromNow()}</td>
                          <td>{o?.payment?.method || (o?.payment?.success ? "Success" : "Failed")}</td>
                          <td>{o?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="container">
                      {o?.products?.map((p) => (
                        <div className="row mb-2 p-3 card flex-row" key={p._id}>
                          <div className="col-md-4">
                            <div className="order-thumb">
                              <img
                                src={apiUrl(
                                  `/api/v1/product/product-photo/${p._id}`
                                )}
                                alt={p.name}
                              />
                            </div>
                          </div>
                          <div className="col-md-8">
                            <p>{p.name}</p>
                            <p>{p.description.substring(0, 30)}</p>
                            <p>Price : {formatINR(p.price)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
