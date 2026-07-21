"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

export default function Applications() {
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/applications")
      .then((res) => res.json())
      .then((data) => setApplications(data));
  }, []);

 return (
  <div className="flex">

    <Sidebar />

    <main className="flex-1 min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold mb-8">
        All Applications
      </h1>

      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">

        <table className="w-full border">

          <thead>
            <tr className="bg-blue-600 text-white">

              <th className="border p-3">Name</th>
              <th className="border p-3">Aadhaar</th>
              <th className="border p-3">Mobile</th>
              <th className="border p-3">Income</th>
              <th className="border p-3">District</th>
              <th className="border p-3">Status</th>

            </tr>
          </thead>

          <tbody>

            {applications.map((app) => (

              <tr key={app._id}>

                <td className="border p-3">{app.name}</td>
                <td className="border p-3">{app.aadhaar}</td>
                <td className="border p-3">{app.mobile}</td>
                <td className="border p-3">₹{app.income}</td>
                <td className="border p-3">{app.district}</td>
                <td className="border p-3">{app.status}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
    </div>
  );
}