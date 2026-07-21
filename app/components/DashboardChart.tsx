"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface DashboardChartProps {
  pending: number;
  approved: number;
  rejected: number;
}

export default function DashboardChart({
  pending,
  approved,
  rejected,
}: DashboardChartProps) {
  const data = {
    labels: ["Pending", "Approved", "Rejected"],
    datasets: [
      {
        data: [pending, approved, rejected],
        backgroundColor: [
          "#facc15",
          "#22c55e",
          "#ef4444",
        ],
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Application Status
      </h2>

      <div className="w-80 mx-auto">
        <Pie data={data} />
      </div>
    </div>
  );
}