"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "../components/ProgressBar";
export default function ApplyPage() {

  const [name, setName] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [mobile, setMobile] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    aadhaar: "",
    mobile: "",
  });
  const router = useRouter();
  const handleNext = () => {
  const newErrors = {
    name: "",
    aadhaar: "",
    mobile: "",
  };

  let isValid = true;

  // Validate Name
  if (name.trim() === "") {
    newErrors.name = "Full Name is required";
    isValid = false;
  }

  // Validate Aadhaar
  if (!/^\d{12}$/.test(aadhaar)) {
    newErrors.aadhaar = "Aadhaar must be exactly 12 digits";
    isValid = false;
  }

  // Validate Mobile
  if (!/^\d{10}$/.test(mobile)) {
    newErrors.mobile = "Mobile Number must be exactly 10 digits";
    isValid = false;
  }

  setErrors(newErrors);

    if (isValid) {

  localStorage.setItem(
    "applicationData",
    JSON.stringify({
      name,
      aadhaar,
      mobile,
    })
  );

  router.push("/apply/address");
}
};


  return (
  <main className="min-h-screen bg-gray-100 flex justify-center items-center">
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">

      <ProgressBar step={1} />

      <h1 className="text-3xl font-bold text-center mb-6">
        Government Welfare Application
      </h1>

      <div className="space-y-4">

        {/* Full Name */}
        <div>
          <label className="block font-medium mb-1">Full Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded p-3"
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name}
            </p>
          )}
        </div>

        {/* Aadhaar */}
        <div>
          <label className="block font-medium mb-1">Aadhaar Number</label>

          <input
            type="text"
            placeholder="12-digit Aadhaar"
            value={aadhaar}
            onChange={(e) => setAadhaar(e.target.value)}
            className="w-full border rounded p-3"
          />

          {errors.aadhaar && (
            <p className="text-red-500 text-sm mt-1">
              {errors.aadhaar}
            </p>
          )}
        </div>

        {/* Mobile */}
        <div>
          <label className="block font-medium mb-1">Mobile Number</label>

          <input
            type="tel"
            placeholder="Enter mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full border rounded p-3"
          />

          {errors.mobile && (
            <p className="text-red-500 text-sm mt-1">
              {errors.mobile}
            </p>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleNext}
            className="bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-800"
          >
            Next
          </button>
        </div>

      </div>

    </div>
  </main>
);
}