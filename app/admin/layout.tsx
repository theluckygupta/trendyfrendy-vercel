"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
  usePathname,
} from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  const pathname =
    usePathname();

  const [authorized, setAuthorized] =
    useState(false);

  const [mobileMenu, setMobileMenu] =
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

  const links = [

    {
      href: "/admin",
      label: "Dashboard",
    },

    {
      href: "/admin/products",
      label: "Products",
    },

    {
      href: "/admin/orders",
      label: "Orders",
    },

    {
      href: "/admin/customers",
      label: "Customers",
    },

    {
      href: "/admin/reviews",
      label: "Reviews",
    },

    {
      href: "/admin/settings",
      label: "Settings",
    },

  ];

  return (

    <div className="min-h-screen bg-[#f5f5f5] text-black flex">

      {/* MOBILE TOPBAR */}

      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">

        <h1 className="text-xl font-black">
          TrendyFrenzy
        </h1>

        <button
          onClick={() =>
            setMobileMenu(
              !mobileMenu
            )
          }
          className="text-3xl"
        >

          ☰

        </button>

      </div>

      {/* MOBILE MENU */}

      {mobileMenu && (

        <div className="md:hidden fixed inset-0 z-40 bg-black/40">

          <aside className="w-[260px] h-full bg-white p-6">

            <div className="flex items-center justify-between mb-10">

              <h2 className="text-2xl font-black">
                Menu
              </h2>

              <button
                onClick={() =>
                  setMobileMenu(
                    false
                  )
                }
                className="text-2xl"
              >

                ✕

              </button>

            </div>

            <nav className="space-y-3">

              {links.map((link) => (

                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() =>
                    setMobileMenu(
                      false
                    )
                  }
                  className={`block px-4 py-3 rounded-xl transition ${
                    pathname ===
                    link.href
                      ? "bg-black text-white"
                      : "hover:bg-gray-100"
                  }`}
                >

                  {link.label}

                </Link>

              ))}

              <Link
                href="/admin/products/new"
                onClick={() =>
                  setMobileMenu(
                    false
                  )
                }
                className="block px-4 py-3 rounded-xl bg-black text-white"
              >

                + Add Product

              </Link>

              <button
                onClick={() => {

                  localStorage.removeItem(
                    "admin-auth"
                  );

                  router.push(
                    "/login"
                  );

                }}
                className="w-full text-left px-4 py-3 rounded-xl bg-red-500 text-white"
              >

                Logout

              </button>

            </nav>

          </aside>

        </div>

      )}

      {/* DESKTOP SIDEBAR */}

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

          {links.map((link) => (

            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-3 rounded-xl transition ${
                pathname ===
                link.href
                  ? "bg-black text-white"
                  : "hover:bg-black hover:text-white"
              }`}
            >

              {link.label}

            </Link>

          ))}

          <Link
            href="/admin/products/new"
            className="block px-4 py-3 rounded-xl bg-black text-white"
          >

            + Add Product

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

      <main className="flex-1 p-4 md:p-10 overflow-x-hidden pt-24 md:pt-10">

        {children}

      </main>

    </div>

  );

}