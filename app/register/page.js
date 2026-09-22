"use client";

import React, { useState } from "react";
import axios from "@/lib/api-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const router = useRouter();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        router.push("/login");
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
            Begin your <em>collection story.</em>
          </h2>
          <p>
            Create an account for faster checkout, order tracking and early
            access to limited pieces.
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
            <h4 className="title">Create account</h4>
            <p className="form-sub">Join WatchWave in under a minute</p>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter Your Name"
                required
                autoFocus
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
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
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter Your Phone"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter Your Address"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="What is Your Favorite sport?"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              REGISTER
            </button>
          </form>
          <p className="auth-switch">
            Already have an account? <Link href="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
