"use client";

import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { Search, User, Heart, ShoppingBag } from "lucide-react";

export default function Navbar() {
  const { wishlistItems } = useWishlist();
  const { cartCount } = useCart();

  return (
    <header className="fixed top-0 left-0 w-full z-50">

      {/* TOP BAR */}
      <div className="bg-white text-black text-center text-sm py-2 font-medium border-b">
        No Return & Refund Policy • No COD • Exchange Only If Product Is Damaged
      </div>

      {/* NAVBAR */}
      <nav className="bg-black text-white border-b border-gray-800">
        <div className="max-w-[1800px] mx-auto px-6 h-[80px] flex items-center justify-between gap-10">

          {/* LEFT */}
          <div className="flex items-center gap-12">
            
            <Link href="/">
              <img
                src="/nav.png"
                alt="logo"
                className="h-16 w-auto object-contain"
              />
            </Link>

            <div className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-wide">
              <Link href="/">HOME</Link>
              <Link href="/collections">COLLECTION</Link>
              <Link href="/">STUDIO</Link>
            </div>
          </div>

          {/* SEARCH */}
          <div className="hidden md:flex flex-1 max-w-3xl bg-[#111] border border-white/10 focus-within:border-[#d6c2a8] rounded-md px-4 h-[44px] items-center transition">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search for Kurties, One Piece and more"
              className="bg-transparent outline-none px-4 w-full text-sm text-white placeholder-gray-500"
            />
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-8">

            <button className="flex flex-col items-center text-[11px] font-semibold">
              <User size={18} />
              <span className="mt-1">Profile</span>
            </button>

            <Link href="/wishlist" className="flex flex-col items-center text-[11px] font-semibold">
              <div className="relative">
                <Heart size={18} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </div>
              <span className="mt-1">Wishlist</span>
            </Link>

            <Link
  href="/cart"
  className="relative flex flex-col items-center text-[11px] font-semibold"
>
              <ShoppingBag size={18} />
              <span className="mt-1">Cart</span>

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

          </div>
        </div>
      </nav>
    </header>
  );
}