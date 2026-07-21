"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "../../components/ProgressBar";

export default function AddressPage() {

  const [houseNumber, setHouseNumber] = useState("");
const [street, setStreet] = useState("");
const [district, setDistrict] = useState("");
const [pinCode, setPinCode] = useState("");

const [errors, setErrors] = useState({
  houseNumber: "",
  street: "",
  district: "",
  pinCode: "",
});
const handleNext = () => {
  const newErrors = {
  houseNumber: "",
  street: "",
  district: "",
  pinCode: "",
};

  let isValid = true;

  if (houseNumber.trim() === "") {
  newErrors.houseNumber = "House Number is required";
  isValid = false;
}

  if (street.trim() === "") {
    newErrors.street = "Street is required";
    isValid = false;
  }

  if (district.trim() === "") {
    newErrors.district = "District is required";
    isValid = false;
  }

  if (!/^\d{6}$/.test(pinCode)) {
  newErrors.pinCode = "PIN Code must be 6 digits";
  isValid = false;
}

  setErrors(newErrors);

  if (isValid) {
    const oldData = JSON.parse(localStorage.getItem("applicationData") || "{}");

    localStorage.setItem(
      "applicationData",
      JSON.stringify({
        ...oldData,
        houseNumber,
street,
district,
pinCode,
      })
    );

    router.push("/apply/income");
  }
};

const router = useRouter();
  return (
    
    <main className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <ProgressBar step={2} />
        <h1 className="text-3xl font-bold text-center mb-6">
          Address Details
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">House Number</label>
            <input
  type="text"
  value={houseNumber}
  onChange={(e) => setHouseNumber(e.target.value)}
  className="w-full border rounded p-3"
  placeholder="House Number"
/>

{errors.houseNumber && (
  <p className="text-red-500 text-sm">
    {errors.houseNumber}
  </p>
)}
          </div>

          <div>
            <label className="block mb-1 font-medium">Street</label>
            <input
  type="text"
  value={street}
  onChange={(e) => setStreet(e.target.value)}
  className="w-full border rounded p-3"
  placeholder="Street"
/>

{errors.street && (
  <p className="text-red-500 text-sm">
    {errors.street}
  </p>
)}
          </div>

          <div>
            <label className="block mb-1 font-medium">District</label>
            <input
  type="text"
  value={district}
  onChange={(e) => setDistrict(e.target.value)}
  className="w-full border rounded p-3"
  placeholder="District"
/>

{errors.district && (
  <p className="text-red-500 text-sm">
    {errors.district}
  </p>
)}
          </div>

          <div>
            <label className="block mb-1 font-medium">PIN Code</label>
            <input
  type="text"
  value={pinCode}
  onChange={(e) => setPinCode(e.target.value)}
  className="w-full border rounded p-3"
  placeholder="PIN Code"
/>

{errors.pinCode && (
  <p className="text-red-500 text-sm">
    {errors.pinCode}
  </p>
)}
          </div>

          <div className="flex justify-between mt-6">
            <Link
              href="/apply"
              className="bg-gray-600 text-white px-6 py-3 rounded"
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