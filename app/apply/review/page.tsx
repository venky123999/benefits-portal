"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "../../components/ProgressBar";

export default function ReviewPage() {
  const [data, setData] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    const savedData = JSON.parse(
      localStorage.getItem("applicationData") || "{}"
    );

    setData(savedData);
  }, []);

  const handleSubmit = async () => {
  try {
    console.log("Sending Data:", data);

    const response = await fetch(
  "/api/applications",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    console.log("Response Status:", response.status);

    const result = await response.text();
    console.log("Response:", result);

    if (response.ok) {
      alert("Application Submitted Successfully!");
      localStorage.removeItem("applicationData");
      router.push("/apply/success");
    } else {
      alert("Submission Failed!");
      console.log(result);
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    alert("Server Error!");
  }
};
  return (
    <main className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">

        <ProgressBar step={5} />

        <h1 className="text-3xl font-bold text-center mb-6">
          Review Application
        </h1>

        <div className="space-y-3">
          <p><strong>Name:</strong> {data.name}</p>

          <p><strong>Aadhaar:</strong> {data.aadhaar}</p>

          <p><strong>Mobile:</strong> {data.mobile}</p>

          <p><strong>House Number:</strong> {data.houseNumber}</p>

          <p><strong>Street:</strong> {data.street}</p>

          <p><strong>District:</strong> {data.district}</p>

          <p><strong>PIN Code:</strong> {data.pinCode}</p>

          <p><strong>Occupation:</strong> {data.occupation}</p>

          <p><strong>Annual Income:</strong> ₹{data.income}</p>

          <p><strong>Family Members:</strong> {data.familyMembers}</p>

<p><strong>Aadhaar File:</strong> {data.aadhaarFile}</p>

<p><strong>Income Certificate:</strong> {data.incomeFile}</p>

<p><strong>Passport Photo:</strong> {data.photo}</p>        </div>

        <div className="flex justify-between mt-8">
          <Link
            href="/apply/documents"
            className="bg-gray-600 text-white px-6 py-3 rounded"
          >
          </Link>

          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-6 py-3 rounded"
          >
            Submit
          </button>
        </div>

      </div>
    </main>
  );
}
