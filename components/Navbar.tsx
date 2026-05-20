"use client";

import Link from "next/link";

import {
  Search,
  User,
  Heart,
  ShoppingBag,
} from "lucide-react";

export default function Navbar({
  cartCount,
}: {
  cartCount: number;
}) {

  return (

    <>

      {/* TOP BAR */}

      <div className="w-full bg-white text-black text-center text-sm py-2 font-medium border-b">

        No Return & Refund Policy • No COD • Exchange Only If Product Is Damaged

      </div>

      {/* NAVBAR */}

      <nav className="sticky top-0 z-50 bg-black text-white border-b border-gray-200">

        <div className="max-w-[1800px] mx-auto px-6 h-[80px] flex items-center justify-between gap-10">

          {/* LEFT */}

          <div className="flex items-center gap-12">

            {/* LOGO */}

            <Link href="/">

              <img
                src="/nav.png"
                alt="logo"
                className="h-15 w-auto"
              />

            </Link>

            {/* MENU */}

            <div className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-wide">

              <Link href="/">

                HOME

              </Link>

              <Link href="/">

                COLLECTION

              </Link>

              <Link href="/">

                STUDIO

              </Link>

            </div>

          </div>

          {/* SEARCH */}

          <div className="hidden md:flex flex-1 max-w-3xl bg-[#f5f5f6] rounded-md px-4 h-[44px] items-center">

            <Search
              size={18}
              className="text-gray-500"
            />

            <input
              type="text"
              placeholder="Search for Kurties, One Piece and more"
              className="bg-transparent outline-none px-4 w-full text-sm text-white placeholder-gray-500"
            />

          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-8">

            {/* PROFILE */}

            <button className="flex flex-col items-center text-[11px] font-semibold">

              <User size={18} />

              <span className="mt-1">

                Profile

              </span>

            </button>

            {/* WISHLIST */}

            <button className="flex flex-col items-center text-[11px] font-semibold">

              <Heart size={18} />

              <span className="mt-1">

                Wishlist

              </span>

            </button>

            {/* BAG */}

            <button className="relative flex flex-col items-center text-[11px] font-semibold">

              <ShoppingBag size={18} />

              <span className="mt-1">

                Cart

              </span>

              {cartCount > 0 && (

                <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">

                  {cartCount}

                </span>

              )}

            </button>

          </div>

        </div>

      </nav>

    </>

  );

}