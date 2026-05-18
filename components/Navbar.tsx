"use client";

import Link from "next/link";

export default function Navbar({
  cartCount,
 }: {
  cartCount: number;
}) {

  return (

    <>

      {/* TOP TERMS BAR */}

      <div className="w-full bg-white text-black text-center text-[11px] md:text-sm py-2 px-4 border-b border-black/10 fixed top-0 left-0 z-[60]">

        No Return & Refund Policy • No COD • Exchange Only If Product Is Damaged

        {" "}

        <Link
          href="/terms"
          className="underline font-medium ml-1 hover:text-gray-600 transition"
        >

          T&C*

        </Link>

      </div>

      {/* NAVBAR */}

      <nav className="fixed top-[36px] left-0 w-full flex justify-between items-center px-6 md:px-8 py-5 bg-black z-50 border-b border-white/10">

        <Link href="/">

          <img
            src="/nav.png"
            alt="TrendyFrenzy Logo"
            className="h-12 md:h-14 w-auto"
          />

        </Link>

        <div className="hidden md:flex gap-6 text-sm uppercase tracking-widest text-white">

          <a
            href="#collections"
            className="hover:text-[#d6c2a8] transition"
          >

            Collections

          </a>

          <a
            href="#contact"
            className="hover:text-[#d6c2a8] transition"
          >

            Contact

          </a>

        </div>

        <button
          onClick={() => {

  window.location.href =
    "/checkout";

}}
          className="border border-white/20 text-white px-5 py-2 rounded-full hover:border-[#d6c2a8] hover:text-[#d6c2a8] transition"
        >

          Cart ({cartCount})

        </button>

      </nav>

    </>

  );

}