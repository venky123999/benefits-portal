"use client";

import { useState } from "react";
import Link from "next/link";

export default function Settings() {
  const [name, setName] = useState("Admin");
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("");

  const saveProfile = () => {
    alert("Profile Updated Successfully!");
  };

  const changePassword = () => {
    if (!password) {
      alert("Enter a new password");
      return;
    }

    alert("Password Changed Successfully!");
    setPassword("");
  };

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-8">
        Settings
      </h1>

      <div className="bg-white rounded-lg shadow p-8 max-w-2xl">

        <h2 className="text-2xl font-bold mb-6">
          Admin Profile
        </h2>

        <div className="space-y-5">

          <div>
            <label className="font-semibold">Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-3 rounded mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-3 rounded mt-2"
            />
          </div>

          <button
            onClick={saveProfile}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded"
          >
            Save Profile
          </button>

          <hr />

          <h2 className="text-2xl font-bold">
            Change Password
          </h2>

          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded"
          />

          <button
            onClick={changePassword}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded"
          >
            Change Password
          </button>

          <div className="pt-6">
            <Link
              href="/dashboard"
              className="bg-gray-800 text-white px-6 py-3 rounded"
            >
              Back to Dashboard
            </Link>
          </div>

        </div>

      </div>

    </main>
  );
}