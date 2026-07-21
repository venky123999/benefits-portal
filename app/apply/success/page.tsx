"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 2000); // Redirect after 2 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Application Submitted Successfully!
        </h1>

        <p className="text-gray-700">
          Thank you for applying to the Government Welfare Scheme.
        </p>

        <p className="mt-4 text-gray-500">
          Redirecting to Dashboard...
        </p>
      </div>
    </main>
  );
}