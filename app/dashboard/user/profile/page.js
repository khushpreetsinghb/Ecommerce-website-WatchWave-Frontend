"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import UserMenu from "@/components/Layout/UserMenu";
import { useAuth } from "@/context/auth";
import toast from "react-hot-toast";
import axios from "@/lib/api-client";

const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [saving, setSaving] = useState(false);

  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user || {};
    setName(name || "");
    setPhone(phone || "");
    setEmail(email || "");
    setAddress(address || "");
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        phone,
        address,
      });
      if (data?.errro) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      // console.log(error);
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const initial = (name || email || "?").charAt(0).toUpperCase();

  return (
    <div className="container-fluid my-3 p-3 dashboard">
      <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-9">
          <div className="profile-card">
            <div className="profile-head">
              <div className="profile-avatar">{initial}</div>
              <div>
                <h3>{name || "Your Profile"}</h3>
                <p>{email}</p>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="profileName">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  id="profileName"
                  placeholder="Enter Your Name"
                  autoFocus
                />
              </div>
              <div className="mb-3">
                <label htmlFor="profileEmail">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  id="profileEmail"
                  placeholder="Enter Your Email"
                  disabled
                />
              </div>
              <div className="mb-3">
                <label htmlFor="profilePhone">Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control"
                  id="profilePhone"
                  placeholder="Enter Your Phone"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="profileAddress">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control"
                  id="profileAddress"
                  placeholder="Enter Your Address"
                />
              </div>

              <div className="profile-actions">
                <button
                  type="submit"
                  className="btn btn-dark"
                  disabled={saving}
                >
                  {saving ? "SAVING..." : "UPDATE PROFILE"}
                </button>
                <Link
                  href="/dashboard/user/change-password"
                  className="profile-password-link"
                >
                  Change password →
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
