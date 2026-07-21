"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "../../components/ProgressBar";


export default function IncomePage() {
  const router = useRouter();

const [occupation, setOccupation] = useState("");
const [income, setIncome] = useState("");
const [familyMembers, setFamilyMembers] = useState("");
const [error, setError] = useState("");
const handleNext = () => {
  if (income.trim() === "") {
    setError("Annual Income is required");
    return;
  }

  setError("");

  const oldData = JSON.parse(
    localStorage.getItem("applicationData") || "{}"
  );

  localStorage.setItem(
  "applicationData",
  JSON.stringify({
    ...oldData,
    occupation,
    income,
    familyMembers,
  })
);

  router.push("/apply/documents");
};
  return (
    <main className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <ProgressBar step={3} />

        <h1 className="text-3xl font-bold text-center mb-6">
          Income Details
        </h1>

        <div className="space-y-4">

          <div>
            <label className="block mb-1 font-medium">
              Occupation
            </label>
<input
  type="text"
  placeholder="Enter Occupation"
  value={occupation}
  onChange={(e) => setOccupation(e.target.value)}
  className="w-full border rounded p-3"
/>
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Annual Income
            </label>

            <input
  type="number"
  placeholder="Enter Annual Income"
  value={income}
  onChange={(e) => setIncome(e.target.value)}
  className="w-full border rounded p-3"
/>

{error && (
  <p className="text-red-500 text-sm mt-1">
    {error}
  </p>
)}
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Family Members
            </label>

           <input
  type="number"
  placeholder="Number of Family Members"
  value={familyMembers}
  onChange={(e) => setFamilyMembers(e.target.value)}
  className="w-full border rounded p-3"
/>
          </div>

          <div className="flex justify-between">

            <Link
              href="/apply/address"
              className="bg-gray-500 text-white px-6 py-3 rounded"
            >
              Back
            </Link>

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