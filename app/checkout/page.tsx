"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CheckoutPage() {

  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {

    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

  }, []);

  const total = cartItems.reduce((total, item) => {

    const numericPrice = Number(
      item.price.replace("₹", "")
    );

    return total + numericPrice;

  }, 0);

  const whatsappMessage = encodeURIComponent(

    `Hello TrendyFrendy,%0A%0AI want to order:%0A${cartItems
      .map(
        (item) =>
          `• ${item.name} - ${item.price}`
      )
      .join("%0A")}%0A%0ATotal: ₹${total}`

  );

  return (

    <main className="min-h-screen bg-black text-white px-6 py-20">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center mb-20">

        <Link
          href="/"
          className="text-2xl font-bold tracking-[0.2em] uppercase text-white"
        >
          TrendyFrendy
        </Link>

        <Link
          href="/"
          className="border border-white/20 text-white px-6 py-3 rounded-full hover:border-[#d6c2a8] hover:text-[#d6c2a8] transition"
        >
          Continue Shopping
        </Link>

      </nav>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20">

        {/* FORM */}
        <div>

          <p className="uppercase tracking-[0.3em] text-[#d6c2a8] text-sm mb-4">
            Checkout
          </p>

          <h1 className="text-5xl font-bold mb-10">
            Customer Details
          </h1>

          <div className="space-y-6">

            <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-[#111] border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-[#d6c2a8]"
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="w-full bg-[#111] border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-[#d6c2a8]"
            />

            <textarea
              placeholder="Shipping Address"
              rows={5}
              className="w-full bg-[#111] border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-[#d6c2a8]"
            />

          </div>

        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-[#111] rounded-[2rem] p-10 h-fit">

          <h2 className="text-3xl font-bold mb-10">
            Order Summary
          </h2>

          <div className="space-y-6">

            {cartItems.map((item, index) => (

              <div
                key={index}
                className="flex justify-between border-b border-white/10 pb-4"
              >

                <div>

                  <h3 className="font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-gray-400 text-sm mt-1">
                    Premium Collection
                  </p>

                </div>

                <p className="text-[#d6c2a8]">
                  {item.price}
                </p>

              </div>

            ))}

          </div>

          <div className="flex justify-between items-center mt-10 text-2xl font-bold">

            <span>Total</span>

            <span className="text-[#d6c2a8]">
              ₹{total}
            </span>

          </div>

          <a
            href={`https://wa.me/919426892200?text=${whatsappMessage}`}
            target="_blank"
            className="block mt-10 bg-white text-black text-center py-5 rounded-full font-semibold hover:bg-[#d6c2a8] transition"
          >
            Place Order on WhatsApp
          </a>

        </div>

      </div>

    </main>

  );
}