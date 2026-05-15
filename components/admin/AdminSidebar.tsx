"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

const links = [

  {
    name: "Dashboard",
    href: "/admin",
  },

  {
    name: "Products",
    href: "/admin/products",
  },

  {
    name: "Orders",
    href: "/admin/orders",
  },

  {
    name: "Customers",
    href: "/admin/customers",
  },

  {
    name: "Reviews",
    href: "/admin/reviews",
  },

  {
    name: "Settings",
    href: "/admin/settings",
  },

];

export default function AdminSidebar() {

  const pathname = usePathname();

  return (

    <aside className="w-[260px] bg-white border-r border-gray-200 min-h-screen p-6">

      <div className="mb-10">

        <h1 className="text-2xl font-bold">
          TrendyFrenzy
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Shopify Style Admin
        </p>

      </div>

      <div className="space-y-2">

        {links.map((link) => (

          <Link
            key={link.href}
            href={link.href}
            className={`block px-4 py-3 rounded-xl transition ${
              pathname === link.href
                ? "bg-black text-white"
                : "hover:bg-gray-100"
            }`}
          >

            {link.name}

          </Link>

        ))}

      </div>

    </aside>

  );

}