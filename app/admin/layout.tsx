"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  const [authorized, setAuthorized] =
    useState(false);

  useEffect(() => {

    const isAdmin =
      localStorage.getItem(
        "admin-auth"
      );

    if (!isAdmin) {

      router.push("/login");

    } else {

      setAuthorized(true);

    }

  }, [router]);

  if (!authorized) {

    return null;

  }

  return (

    <div className="min-h-screen md:flex bg-[#f5f5f5]">

      {/* SIDEBAR */}

      <aside className="hidden md:block w-[260px] bg-white border-r border-gray-200 p-6">

        <div className="mb-10">

          <h1 className="text-3xl font-black">
            TrendyFrenzy
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Admin Panel 
          </p>

        </div>

        <nav className="space-y-2">

          <Link
            href="/admin"
            className="block px-4 py-3 rounded-xl hover:bg-black hover:text-white transition"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/products"
            className="block px-4 py-3 rounded-xl hover:bg-black hover:text-white transition"
          >
            Products
          </Link>

          <Link
            href="/admin/orders"
            className="block px-4 py-3 rounded-xl hover:bg-black hover:text-white transition"
          >
            Orders
          </Link>

          <Link
            href="/admin/customers"
            className="block px-4 py-3 rounded-xl hover:bg-black hover:text-white transition"
          >
            Customers
          </Link>

          <Link
            href="/admin/reviews"
            className="block px-4 py-3 rounded-xl hover:bg-black hover:text-white transition"
          >
            Reviews
          </Link>

          <Link
            href="/admin/settings"
            className="block px-4 py-3 rounded-xl hover:bg-black hover:text-white transition"
          >
            Settings
          </Link>

          <button
            onClick={() => {

              localStorage.removeItem(
                "admin-auth"
              );

              router.push("/login");

            }}
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-500 hover:text-white transition"
          >

            Logout

          </button>

        </nav>

      </aside>

      {/* CONTENT */}

      <main className="flex-1 p-4 md:p-10 overflow-x-hidden">
        {children}
      </main>

    </div>

  );

}