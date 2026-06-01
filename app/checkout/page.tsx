"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const totalMRP = cartItems.reduce(
    (total: number, item: any) =>
      total + Number(item.price) * (item.quantity || 1),
    0
  );

  const totalAmount = cartItems.reduce(
    (total: number, item: any) =>
      total +
      Number(item.salePrice || item.price) *
      (item.quantity || 1),
    0
  );

  const discount = totalMRP - totalAmount;
  async function placeOrder() {
    if (
      !fullName ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pincode
    ) {
      alert("Please fill all fields");
      return;
    }



    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        orderId: "TF" + Date.now(),

        userId: user.uid,
        userEmail: user.email,

        customerName: fullName,
        phone,
        address,
        city,
        state,
        pincode,

        items: cartItems,

        totalMRP,
        discount,
        totalAmount,

        status: "Pending",

        createdAt: Date.now(),
      });

      clearCart();

      window.location.href = "/order-success";

    } catch (error) {
      console.error(error);
      alert("Failed to place order");
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">

            <div className="flex items-center gap-6 text-sm tracking-[4px] uppercase">

              <div className="text-gray-500">
                Bag
              </div>

              <div className="text-gray-600">
                ----------
              </div>

              <div className="text-green-400 font-semibold">
                Address
              </div>

              <div className="text-gray-600">
                ----------
              </div>

              <div className="text-gray-500">
                Payment
              </div>

            </div>

            <div className="text-green-400 text-sm font-semibold">
              🔒 100% Secure
            </div>

          </div>

          <div className="grid lg:grid-cols-[65%_35%] gap-10">

            {/* LEFT */}
            <div className="bg-[#111] border border-white/10 rounded-2xl p-6">

              <h2 className="text-2xl font-bold mb-6">
                Delivery Address
              </h2>

              <div className="space-y-4">

                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(e.target.value)
                  }
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 outline-none"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 outline-none"
                />

                <textarea
                  placeholder="Address"
                  value={address}
                  onChange={(e) =>
                    setAddress(e.target.value)
                  }
                  rows={4}
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 outline-none"
                />

                <div className="grid md:grid-cols-3 gap-4">

                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) =>
                      setCity(e.target.value)
                    }
                    className="bg-black border border-white/20 rounded-lg px-4 py-3 outline-none"
                  />

                  <input
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) =>
                      setState(e.target.value)
                    }
                    className="bg-black border border-white/20 rounded-lg px-4 py-3 outline-none"
                  />

                  <input
                    type="text"
                    placeholder="Pincode"
                    value={pincode}
                    onChange={(e) =>
                      setPincode(e.target.value)
                    }
                    className="bg-black border border-white/20 rounded-lg px-4 py-3 outline-none"
                  />

                </div>

              </div>

            </div>

            {/* RIGHT */}
            <div>

              <div className="bg-[#111] border border-white/10 rounded-2xl p-6 sticky top-28">

                <h2 className="text-2xl font-bold mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">

                  {cartItems.map(
                    (item: any, index: number) => (
                      <div
                        key={index}
                        className="flex justify-between text-sm"
                      >
                        <span>
                          {item.name}
                          {" "}
                          x
                          {" "}
                          {item.quantity}
                        </span>

                        <span>
                          ₹
                          {(item.salePrice ||
                            item.price) *
                            item.quantity}
                        </span>
                      </div>
                    )
                  )}

                </div>

                <div className="border-t border-white/10 pt-4 space-y-4">

                  <div className="flex justify-between">
                    <span>Total MRP</span>
                    <span>₹{totalMRP}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Discount on MRP</span>
                    <span className="text-green-400">
                      -₹{discount}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Coupon Discount</span>
                    <span className="text-green-400">
                      -₹0
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Platform Fee</span>
                    <span className="text-green-400">
                      FREE
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-400">
                      FREE
                    </span>
                  </div>

                  <div className="border-t border-white/10 pt-4 flex justify-between items-start text-xl font-bold">

                    <div>
                      <p>Total Amount</p>
                      <p className="text-xs text-gray-500 font-normal mt-1">
                        Inclusive of GST
                      </p>
                    </div>

                    <span>
                      ₹{totalAmount}
                    </span>

                  </div>

                </div>

                <button
                  onClick={placeOrder}
                  className="w-full mt-6 py-4 rounded-full bg-white text-black font-bold hover:opacity-90 transition"
                >
                  PLACE ORDER
                </button>

              </div>

            </div>

          </div>

        </div>
      </main>
    </>
  );
}