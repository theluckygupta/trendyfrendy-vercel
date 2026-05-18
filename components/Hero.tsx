"use client";

import { motion } from "framer-motion";

export default function Hero() {

  return (

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

      <div className="relative z-10">

        <p className="uppercase tracking-[0.4em] text-sm text-[#d6c2a8] mb-6">
          Surat Premium Fashion
        </p>

        <h1 className="text-6xl md:text-8xl font-black leading-tight">
          TRENDY
          <br />
          FRENZY
        </h1>

        <p className="mt-8 text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto">
          Luxury Kurties & Ethnic Fashion Crafted For Modern Women
        </p>

        <a
          href="https://wa.me/917019650441"
          target="_blank"
          className="inline-block mt-10 px-10 py-4 bg-white text-black rounded-full text-lg font-semibold hover:bg-[#d6c2a8] transition duration-300"
        >
          Shop on WhatsApp
        </a>

      </div>

    </motion.section>

  );

}