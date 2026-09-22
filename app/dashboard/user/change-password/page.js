"use client";

import React, { useState } from "react";
import UserMenu from "@/components/Layout/UserMenu";
import toast from "react-hot-toast";
import axios from "@/lib/api-client";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newPassword !== confirmPassword) {
        toast.error("New passwords do not match");
        return;
      }
      setSaving(true);
      const { data } = await axios.put("/api/v1/auth/change-password", {
        currentPassword,
        newPassword,
      });
      if (data?.success) {
        toast.success(data?.message || "Password Changed Successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container-fluid my-3 p-3 dashboard">
      <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-9">
          <div className="profile-card">
            <div className="profile-head">
              <div>
                <h3>Change Password</h3>
                <p>Keep your account secure with a strong password</p>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="form-control"
                  id="currentPassword"
                  placeholder="Enter Current Password"
                  autoFocus
                />
              </div>
              <div className="mb-3">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="form-control"
                  id="newPassword"
                  placeholder="Enter New Password (min 6 characters)"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm New Password"
                />
              </div>

              <div className="profile-actions">
                <button
                  type="submit"
                  className="btn btn-dark"
                  disabled={saving}
                >
                  {saving ? "SAVING..." : "UPDATE PASSWORD"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
