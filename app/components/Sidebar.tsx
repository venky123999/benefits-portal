"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Applications",
      path: "/applications",
    },
    {
      name: "Reports",
      path: "/reports",
    },
    {
      name: "Settings",
      path: "/settings",
    },
  ];

  return (
    <div className="w-64 min-h-screen bg-blue-800 text-white p-6">

      <h1 className="text-2xl font-bold mb-10">
        Welfare Portal
      </h1>

      <div className="space-y-3">
        {menu.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={`block p-3 rounded transition ${
              pathname === item.path
                ? "bg-white text-blue-800 font-bold"
                : "hover:bg-blue-700"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>

    </div>
  );
}