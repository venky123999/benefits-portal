"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import toast, { Toaster } from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import DashboardChart from "../components/DashboardChart";
interface Application {
  _id: string;
  name: string;
  aadhaar: string;
  mobile: string;
  income: number;
  district: string;
  status: string;
  createdAt: string;

  aadhaarFile?: string;
  incomeFile?: string;
  photo?: string;
}

export default function Dashboard() {
const [applications, setApplications] = useState<Application[]>([]);
const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");
const [selectedApp, setSelectedApp] = useState<Application | null>(null);
const [currentPage, setCurrentPage] = useState(1);
const recordsPerPage = 10;
const router = useRouter();
const total = applications.length;

const pending = applications.filter(
  (app) => app.status === "Pending"
).length;

const approved = applications.filter(
  (app) => app.status === "Approved"
).length;

const rejected = applications.filter(
  (app) => app.status === "Rejected"
).length;
const filteredApplications = applications.filter((app) => {
  const matchesSearch =
    app.name.toLowerCase().includes(search.toLowerCase()) ||
    app.aadhaar.includes(search) ||
    app.district.toLowerCase().includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "All" ||
    app.status === statusFilter;

  return matchesSearch && matchesStatus;
});

const totalPages = Math.ceil(
  filteredApplications.length / recordsPerPage
);

const currentApplications = filteredApplications.slice(
  (currentPage - 1) * recordsPerPage,
  currentPage * recordsPerPage
);
  // Fetch Applications
 useEffect(() => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    router.push("/login");
    return;
  }

fetch("http://localhost:5000/api/applications")
  .then((res) => res.json())
  .then((data) => {
    setApplications(data);
    setLoading(false);
  })
  .catch((err) => {
    console.log(err);
    setLoading(false);
  });    

}, [router]);

  // Delete Application
  const deleteApplication = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/applications/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setApplications((prev) =>
          prev.filter((app) => app._id !== id)
        );

        toast.success("Application Deleted Successfully");
      } else {
        toast.error("Delete Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Update Status
  const updateStatus = async (
    id: string,
    status: string
  ) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/applications/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (response.ok) {
        setApplications((prev) =>
          prev.map((app) =>
            app._id === id
              ? { ...app, status }
              : app
          )
        );

        toast.success("Status Updated");
      } else {
      toast.error("Status Update Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Export to Excel
const downloadPDF = (app: Application) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Benefits Application Report", 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [["Field", "Value"]],
    body: [
      ["Name", app.name],
      ["Aadhaar", app.aadhaar],
      ["Mobile", app.mobile],
      ["Income", `₹${app.income}`],
      ["District", app.district],
      ["Status", app.status],
      [
        "Created At",
        new Date(app.createdAt).toLocaleString(),
      ],
    ],
  });

  doc.save(`${app.name}_Application.pdf`);
};

const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(applications);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Applications"
  );

  XLSX.writeFile(workbook, "Applications.xlsx");
};
const logout = () => {
  localStorage.removeItem("isLoggedIn");
  router.push("/login");
};
 return (
  <>
    <Toaster position="top-right" />

    <div className="flex">
    <Sidebar />

    <main className="flex-1 min-h-screen bg-gray-100 p-10">

    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold">
        Admin Dashboard
      </h1>

      <div className="flex gap-4">
        <button
          onClick={exportToExcel}
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded"
        >
          Export Excel
        </button>

        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded"
        >
          Logout
        </button>
      </div>
    </div>

    <div className="flex gap-4 mb-6">
      <input
        type="text"
        placeholder="Search by Name, Aadhaar or District..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border p-3 rounded shadow"
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="border p-3 rounded shadow"
      >
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </select>
    </div>
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

  <div className="bg-blue-600 text-white p-6 rounded-lg shadow">
    <h2 className="text-lg font-semibold">Total Applications</h2>
    <p className="text-3xl font-bold mt-2">{total}</p>
  </div>

  <div className="bg-yellow-500 text-white p-6 rounded-lg shadow">
    <h2 className="text-lg font-semibold">Pending</h2>
    <p className="text-3xl font-bold mt-2">{pending}</p>
  </div>

  <div className="bg-green-600 text-white p-6 rounded-lg shadow">
    <h2 className="text-lg font-semibold">Approved</h2>
    <p className="text-3xl font-bold mt-2">{approved}</p>
  </div>

  <div className="bg-red-600 text-white p-6 rounded-lg shadow">
    <h2 className="text-lg font-semibold">Rejected</h2>
    <p className="text-3xl font-bold mt-2">{rejected}</p>
  </div>

</div>


<DashboardChart
  pending={pending}
  approved={approved}
  rejected={rejected}
/>

<div className="bg-white p-6 rounded shadow overflow-x-auto"></div>

      <div className="bg-white p-6 rounded shadow overflow-x-auto">
        <table className="w-full border border-collapse">
         <thead>
  <tr className="bg-blue-600 text-white">
    <th className="border p-3">Name</th>
    <th className="border p-3">Aadhaar</th>
    <th className="border p-3">Mobile</th>
    <th className="border p-3">Income</th>
    <th className="border p-3">District</th>
    <th className="border p-3">Status</th>
    <th className="border p-3">View</th>
    <th className="border p-3">PDF</th>
    <th className="border p-3">Delete</th>
  </tr>
</thead>
<tbody>
  {currentApplications.map((app) => (
      <tr key={app._id}>
        <td className="border p-3">{app.name}</td>
        <td className="border p-3">{app.aadhaar}</td>
        <td className="border p-3">{app.mobile}</td>
        <td className="border p-3">₹{app.income}</td>
        <td className="border p-3">{app.district}</td>

        <td className="border p-3 text-center">
          <button
            onClick={() => updateStatus(app._id, "Approved")}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded mr-2"
          >
            Approve
          </button>

          <button
            onClick={() => updateStatus(app._id, "Rejected")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
          >
            Reject
          </button>

          <p className="mt-2 font-bold">
            {app.status}
          </p>
        </td>

     <td className="border p-3 text-center">
  <button
    onClick={() => setSelectedApp(app)}
    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
  >
    View
  </button>
</td>

<td className="border p-3 text-center">
  <button
    onClick={() =>downloadPDF(app)}
    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
  >
    PDF
  </button>
</td>

<td className="border p-3 text-center">
  <button
    onClick={() => deleteApplication(app._id)}
    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
  >
    Delete
  </button>
</td>
      </tr>
    ))}
</tbody>
        </table>
        <div className="flex justify-center items-center gap-4 mt-6">
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
    className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
  >
    Previous
  </button>

  <span className="font-semibold">
    Page {currentPage} of {totalPages}
  </span>

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(currentPage + 1)}
    className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
  >
    Next
  </button>
</div>
            </div>

      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">

            <h2 className="text-2xl font-bold mb-6">
              Application Details
            </h2>

            <div className="space-y-3">
              <p><strong>Name:</strong> {selectedApp.name}</p>
              <p><strong>Aadhaar:</strong> {selectedApp.aadhaar}</p>
              <p><strong>Mobile:</strong> {selectedApp.mobile}</p>
              <p><strong>Income:</strong> ₹{selectedApp.income}</p>
              <p><strong>District:</strong> {selectedApp.district}</p>
              <p><strong>Status:</strong> {selectedApp.status}</p>
              <p>
  <strong>Aadhaar File:</strong>{" "}
  {selectedApp.aadhaarFile || "Not Uploaded"}
</p>

<p>
  <strong>Income Certificate:</strong>{" "}
  {selectedApp.incomeFile || "Not Uploaded"}
</p>

<p>
  <strong>Passport Photo:</strong>{" "}
  {selectedApp.photo || "Not Uploaded"}
</p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(selectedApp.createdAt).toLocaleString()}
              </p>
            </div>
</div>


            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setSelectedApp(null)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
              >
                Close
              </button>
            </div>

          </div>

      )}

    </main>
    </div>
    </>
  );
}