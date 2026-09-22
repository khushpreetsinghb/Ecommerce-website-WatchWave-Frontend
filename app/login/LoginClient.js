"use client";

import React, { useState } from "react";
import axios from "@/lib/api-client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/context/auth";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginClient = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [auth, setAuth] = useAuth();

  const router = useRouter();
  const searchParams = useSearchParams();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        router.push(searchParams.get("redirect") || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      // console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="auth-split">
      <div className="auth-brand">
        <div className="auth-logo">
          Watch<span>Wave</span>
        </div>
        <div>
          <h2>
            Welcome back to <em>timeless elegance.</em>
          </h2>
          <p>
            Sign in to explore the collection, track orders and check out
            faster with your saved details.
          </p>
          <div className="auth-points">
            <div>
              <b>10+</b>
              <span>Curated pieces</span>
            </div>
            <div>
              <b>2yr</b>
              <span>Warranty</span>
            </div>
            <div>
              <b>Free</b>
              <span>Insured shipping</span>
            </div>
          </div>
        </div>
        <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)" }}>
          All Rights Reserved &copy; Khushpreet Singh
        </p>
      </div>
      <div className="auth-form-side">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h4 className="title">Welcome back</h4>
            <p className="form-sub">Login to continue to WatchWave</p>

            <div className="mb-3">
              <input
                type="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter Your Email"
                required
              />
            </div>
            <div className="mb-3 password-wrap">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Your Password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
            <div className="mb-3">
              <button
                type="button"
                className="btn forgot-btn"
                onClick={() => {
                  router.push("/forgot-password");
                }}
              >
                Forgot Password?
              </button>
            </div>

            <button type="submit" className="btn btn-primary">
              LOGIN
            </button>
            <button
              type="button"
              className="btn btn-outline-ink"
              onClick={() => router.push("/register")}
            >
              CREATE ACCOUNT
            </button>
          </form>
          <p className="auth-switch">
            New to WatchWave? <Link href="/register">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginClient;
