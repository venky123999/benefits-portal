"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "../../components/ProgressBar";


export default function DocumentsPage() {
  
  const router = useRouter();

const [aadhaarFile, setAadhaarFile] = useState<File | null>(null);
const [incomeFile, setIncomeFile] = useState<File | null>(null);
const [photoFile, setPhotoFile] = useState<File | null>(null);
const [error, setError] = useState("");
const handleNext = () => {
  if (!aadhaarFile || !incomeFile || !photoFile) {
  setError("Please upload all documents");
  return;
}
  setError("");

  // Get previous data
  const oldData = JSON.parse(
    localStorage.getItem("applicationData") || "{}"
  );

  // Save uploaded file name
  localStorage.setItem(
    "applicationData",
    JSON.stringify({
      ...oldData,
aadhaarFile: aadhaarFile.name,
incomeFile: incomeFile.name,
photo: photoFile.name,    })
  );

  router.push("/apply/review");
};
  return (
    <main className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <ProgressBar step={4} />

        <h1 className="text-3xl font-bold text-center mb-6">
          Document Upload
        </h1>

        <div className="space-y-4">

          <div>
            <label className="block mb-1 font-medium">
              Aadhaar Card
            </label>

           <input
  type="file"
  onChange={(e) => {
    if (e.target.files && e.target.files.length > 0) {
      setAadhaarFile(e.target.files[0]);
    }
  }}
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
              Income Certificate
            </label>

           <input
  type="file"
  onChange={(e) => {
    if (e.target.files && e.target.files.length > 0) {
      setIncomeFile(e.target.files[0]);
    }
  }}
  className="w-full border rounded p-3"
/>
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Passport Photo
            </label>

            <input
  type="file"
  onChange={(e) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhotoFile(e.target.files[0]);
    }
  }}
  className="w-full border rounded p-3"
/>
          </div>

          <div className="flex justify-between">

            <Link
              href="/apply/income"
              className="bg-gray-500 text-white px-6 py-3 rounded"
            >
              Back
            </Link>

          <button
  onClick={handleNext}
  className="bg-blue-700 text-white px-6 py-3 rounded"
>
  Next
</button>

          </div>

        </div>

      </div>
    </main>
  );
}