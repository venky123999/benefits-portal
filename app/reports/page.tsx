"use client";

import Link from "next/link";

export default function Reports() {
  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold mb-8">
        Reports
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold">
            Daily Report
          </h2>

          <p className="mt-3 text-gray-600">
            View today's applications.
          </p>

          <button className="mt-5 bg-blue-600 text-white px-5 py-2 rounded">
            View
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold">
            Monthly Report
          </h2>

          <p className="mt-3 text-gray-600">
            View monthly statistics.
          </p>

          <button className="mt-5 bg-green-600 text-white px-5 py-2 rounded">
            View
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold">
            Excel Report
          </h2>

          <p className="mt-3 text-gray-600">
            Download application reports.
          </p>

          <button className="mt-5 bg-purple-600 text-white px-5 py-2 rounded">
            Download
          </button>
        </div>

      </div>

      <div className="mt-10">
        <Link
          href="/dashboard"
          className="bg-gray-800 text-white px-6 py-3 rounded"
        >
          Back to Dashboard
        </Link>
      </div>
    </main>
  );
}