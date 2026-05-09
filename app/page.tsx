"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
{/* TOP BAR */}
<div className="w-full bg-[#d6c2a8] text-black text-center py-2 text-sm tracking-widest uppercase font-medium">

  New Festive Collection Available Now ✨

</div>
      {/* NAVBAR */}
<nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-8 py-5 bg-black z-50 border-b border-white/10">

  <h1 className="text-2xl font-bold tracking-[0.2em] uppercase">
    TrendyFrendy
  </h1>

  {/* DESKTOP MENU */}
  <div className="hidden md:flex gap-6 text-sm uppercase tracking-widest">

    <a href="#collections" className="hover:text-[#d6c2a8] transition">
      Collections
    </a>

    <a href="#contact" className="hover:text-[#d6c2a8] transition">
      Contact
    </a>

  </div>

  {/* MOBILE BUTTON */}
  <button
    onClick={() => setMenuOpen(!menuOpen)}
    className="md:hidden text-3xl"
  >
    ☰
  </button>

</nav>

{/* MOBILE MENU */}
{menuOpen && (

  <div className="fixed top-0 left-0 w-full h-screen bg-black z-40 flex flex-col justify-center items-center gap-10 text-2xl uppercase tracking-widest">

    <a
      href="#collections"
      onClick={() => setMenuOpen(false)}
      className="hover:text-[#d6c2a8]"
    >
      Collections
    </a>

    <a
      href="#contact"
      onClick={() => setMenuOpen(false)}
      className="hover:text-[#d6c2a8]"
    >
      Contact
    </a>

  </div>

)}

      {/* HERO SECTION */}
      <motion.section
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.2 }}
  className="relative h-screen flex flex-col justify-center items-center text-center px-6"
>

        <div
  className="absolute inset-0 bg-cover bg-center"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1600&auto=format&fit=crop')",
  }}
/>

<div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 animate-[fadeIn_1.5s_ease]">

          <p className="uppercase tracking-[0.4em] text-sm text-[#d6c2a8] mb-6">
            Surat Premium Fashion
          </p>

          <h1 className="text-6xl md:text-8xl font-black leading-tight">
            TRENDY
            <br />
            FRENDY
          </h1>

          <p className="mt-8 text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Luxury Kurties & Ethnic Fashion Crafted For Modern Women
          </p>

          <a
            href="https://wa.me/919426892200"
            target="_blank"
            className="inline-block mt-10 px-10 py-4 bg-white text-black rounded-full text-lg font-semibold hover:bg-[#d6c2a8] transition duration-300"
          >
            Shop on WhatsApp
          </a>

        </div>

      </motion.section>

      {/* COLLECTIONS */}
      {/* LUXURY MARQUEE */}
<div className="overflow-hidden border-y border-white/10 py-4 bg-black">

  <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite] text-[#d6c2a8] uppercase tracking-[0.4em] text-sm">

    <span className="mx-8">
      New Arrivals
    </span>

    <span className="mx-8">
      Premium Ethnic Wear
    </span>

    <span className="mx-8">
      Surat Collection
    </span>

    <span className="mx-8">
      Luxury Kurties
    </span>

    <span className="mx-8">
      Festive Fashion
    </span>

    <span className="mx-8">
      New Arrivals
    </span>

    <span className="mx-8">
      Premium Ethnic Wear
    </span>

    <span className="mx-8">
      Surat Collection
    </span>

  </div>

</div>

      {/* FEATURED PRODUCTS */}
<section
  id="collections"
  className="px-6 py-28 max-w-7xl mx-auto"
>

  <div className="mb-20 text-center">

    <p className="uppercase tracking-[0.3em] text-[#d6c2a8] text-sm mb-4">
      Trending Collections
    </p>

    <h2 className="text-5xl md:text-6xl font-bold">
      Featured Styles
    </h2>

  </div>

  <div className="grid md:grid-cols-3 gap-10">

    {/* PRODUCT 1 */}
    <div className="group">

      <div className="overflow-hidden rounded-[2rem] bg-[#111]">

        <img
          src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop"
          alt="Kurti"
          className="h-[500px] w-full object-cover group-hover:scale-110 transition duration-700"
        />

      </div>

      <div className="mt-6">

        <div className="flex justify-between items-center">

          <h3 className="text-2xl font-semibold">
            Black Cotton Kurti
          </h3>

          <span className="text-[#d6c2a8] text-lg">
            ₹1499
          </span>

        </div>

        <p className="text-gray-400 mt-2">
          Elegant modern ethnic wear.
        </p>

      </div>

    </div>

    {/* PRODUCT 2 */}
    <div className="group">

      <div className="overflow-hidden rounded-[2rem] bg-[#111]">

        <img
          src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop"
          alt="Kurti"
          className="h-[500px] w-full object-cover group-hover:scale-110 transition duration-700"
        />

      </div>

      <div className="mt-6">

        <div className="flex justify-between items-center">

          <h3 className="text-2xl font-semibold">
            Festive Designer Set
          </h3>

          <span className="text-[#d6c2a8] text-lg">
            ₹2499
          </span>

        </div>

        <p className="text-gray-400 mt-2">
          Premium festive collection.
        </p>

      </div>

    </div>

    {/* PRODUCT 3 */}
    <div className="group">

      <div className="overflow-hidden rounded-[2rem] bg-[#111]">

        <img
          src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop"
          alt="Kurti"
          className="h-[500px] w-full object-cover group-hover:scale-110 transition duration-700"
        />

      </div>

      <div className="mt-6">

        <div className="flex justify-between items-center">

          <h3 className="text-2xl font-semibold">
            Luxury Ethnic Wear
          </h3>

          <span className="text-[#d6c2a8] text-lg">
            ₹3299
          </span>

        </div>

        <p className="text-gray-400 mt-2">
          Modern luxury fashion aesthetic.
        </p>

      </div>

    </div>

  </div>

</section>

{/* INSTAGRAM GALLERY */}
<section className="px-6 py-28 max-w-7xl mx-auto">

  <div className="text-center mb-16">

    <p className="uppercase tracking-[0.3em] text-[#d6c2a8] text-sm mb-4">
      Instagram Style
    </p>

    <h2 className="text-5xl md:text-6xl font-bold">
      Fashion Moments
    </h2>

  </div>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

    <div className="overflow-hidden rounded-[2rem]">
      <img
        src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop"
        alt="Fashion"
        className="h-[320px] w-full object-cover hover:scale-110 transition duration-700"
      />
    </div>

    <div className="overflow-hidden rounded-[2rem]">
      <img
        src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop"
        alt="Fashion"
        className="h-[320px] w-full object-cover hover:scale-110 transition duration-700"
      />
    </div>

    <div className="overflow-hidden rounded-[2rem]">
      <img
        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop"
        alt="Fashion"
        className="h-[320px] w-full object-cover hover:scale-110 transition duration-700"
      />
    </div>

    <div className="overflow-hidden rounded-[2rem]">
      <img
        src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop"
        alt="Fashion"
        className="h-[320px] w-full object-cover hover:scale-110 transition duration-700"
      />
    </div>

  </div>

</section>

      {/* FOOTER */}
      <footer
        id="contact"
        className="border-t border-white/10 py-10 text-center text-gray-500"
      >

        <p>
          © 2026 TrendyFrendy — Surat Fashion Brand
        </p>

      </footer>
{/* FLOATING WHATSAPP BUTTON */}
<a
  href="https://wa.me/919426892200"
  target="_blank"
  className="fixed bottom-6 right-6 bg-[#25D366] text-white px-6 py-4 rounded-full shadow-2xl text-lg font-semibold hover:scale-110 transition duration-300 z-50"
>
  WhatsApp
</a>
    </main>
  );
}