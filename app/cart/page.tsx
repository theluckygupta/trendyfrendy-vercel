"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    cartItems,
    setCartItems,
    removeFromCart,
    cartTotal,
  } = useCart();

  const [pincode, setPincode] = useState("");
  const [pincodeMsg, setPincodeMsg] = useState("");

  if (!cartItems || cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-bold mb-4">
          Your Bag is Empty
        </h1>

        <p className="text-gray-400 mb-8">
          Add some products to continue shopping.
        </p>

        <Link
          href="/collections"
          className="px-8 py-4 border border-white rounded-full hover:bg-white hover:text-black transition"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">

          <div className="flex items-center gap-6 text-sm tracking-[4px] uppercase">

            <div className="text-green-400 font-semibold">
              Bag
            </div>

            <div className="text-gray-600">
              ----------
            </div>

            <div className="text-gray-500">
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
          <div>

            {/* PINCODE */}
            <div className="bg-[#111] border border-white/10 rounded-xl p-5 mb-8">

              <div className="flex flex-col md:flex-row gap-4 justify-between">

                <h3 className="font-semibold">
                  Check delivery time & services
                </h3>

                <div className="flex">

                  <input
                    value={pincode}
                    onChange={(e) =>
                      setPincode(e.target.value)
                    }
                    placeholder="Enter Pincode"
                    className="bg-black border border-white/20 px-4 py-2 rounded-l-lg outline-none"
                  />

                  <button
                    onClick={() => {
                      if (pincode.length !== 6) {
                        setPincodeMsg("Invalid Pincode");
                      } else {
                        setPincodeMsg(
                          "Delivery available in 3-5 days 🚚"
                        );
                      }
                    }}
                    className="px-5 bg-white text-black font-semibold rounded-r-lg"
                  >
                    Check
                  </button>

                </div>

              </div>

              {pincodeMsg && (
                <p className="text-green-400 text-sm mt-3">
                  {pincodeMsg}
                </p>
              )}

            </div>

            {/* BAG TITLE */}
            <div className="flex justify-between items-center mb-5">

              <h1 className="text-3xl font-bold">
                My Bag ({cartItems.length})
              </h1>

              <div className="text-sm text-gray-400">
                {cartItems.length}/{cartItems.length} Items Selected
              </div>

            </div>

            {/* ITEMS */}
            <div className="space-y-6">

              {cartItems.map(
                (item: any, index: number) => (

                  <div
                    key={index}
                    className="bg-[#111] border border-white/10 rounded-2xl p-4 flex gap-4"
                  >

                    {/* IMAGE */}
                    <div className="w-32 h-40 rounded-xl overflow-hidden bg-black">

                      <img
                        src={item.mainImage}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />

                    </div>

                    {/* DETAILS */}
                    <div className="flex-1">

                      <h2 className="font-bold text-lg">
                        {item.name}
                      </h2>

                      <p className="text-gray-400 mt-1">
                        Size: {item.size}
                      </p>

                      <div className="flex items-center gap-3 mt-3">

                        <span className="text-2xl font-bold">
                          ₹
                          {item.salePrice ||
                            item.price}
                        </span>

                        {item.salePrice && (
                          <span className="line-through text-gray-500">
                            ₹{item.price}
                          </span>
                        )}

                      </div>

                      {/* QUANTITY */}
                      <div className="flex items-center gap-3 mt-5">

                        <button
                          onClick={() =>
                            setCartItems(
                              (prev: any[]) =>
                                prev.map(
                                  (
                                    p,
                                    i
                                  ) =>
                                    i ===
                                    index
                                      ? {
                                          ...p,
                                          quantity:
                                            Math.max(
                                              1,
                                              p.quantity -
                                                1
                                            ),
                                        }
                                      : p
                                )
                            )
                          }
                          className="w-10 h-10 rounded-full border border-white/20"
                        >
                          -
                        </button>

                        <span className="font-bold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            setCartItems(
                              (prev: any[]) =>
                                prev.map(
                                  (
                                    p,
                                    i
                                  ) =>
                                    i ===
                                    index
                                      ? {
                                          ...p,
                                          quantity:
                                            p.quantity +
                                            1,
                                        }
                                      : p
                                )
                            )
                          }
                          className="w-10 h-10 rounded-full border border-white/20"
                        >
                          +
                        </button>

                      </div>

                      <button
                        onClick={() =>
                          removeFromCart(index)
                        }
                        className="mt-5 text-red-400 text-sm"
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <div>

            {/* COUPON */}
            <div className="bg-[#111] border border-white/10 rounded-2xl p-5 mb-6">

              <h3 className="font-semibold mb-4">
                Apply Coupon
              </h3>

              <button className="w-full py-3 border border-white rounded-lg hover:bg-white hover:text-black transition">
                APPLY COUPON
              </button>

            </div>

            {/* PRICE CARD */}
<div className="bg-[#111] border border-white/10 rounded-2xl p-6 sticky top-28">

  <h2 className="text-2xl font-bold mb-6">
    Price Details
  </h2>

  {/*
    Total original prices
  */}
  {(() => {
    const totalMRP = cartItems.reduce(
      (total: number, item: any) =>
        total +
        Number(item.price) *
          (item.quantity || 1),
      0
    );

    const totalAmount = cartItems.reduce(
      (total: number, item: any) =>
        total +
        Number(
          item.salePrice || item.price
        ) *
          (item.quantity || 1),
      0
    );

    const discount =
      totalMRP - totalAmount;

    const couponDiscount = 0;

// TrendyFrenzy platform fee = FREE
const platformFee = 0;


const finalTotal =
  totalAmount -
  couponDiscount;

    return (
      <>
        <div className="space-y-4">

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
              -₹{couponDiscount}
            </span>
          </div>

          <div className="flex justify-between">
  <span>Shipping</span>
  <span className="text-green-400">
    FREE
  </span>
</div>

<div className="flex justify-between">
  <span>Platform Fee</span>
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

  <span>₹{finalTotal}</span>

</div>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          By placing your order you agree to our Terms &
          Conditions.
        </p>

        <Link
          href="/checkout"
          className="block text-center mt-6 py-4 rounded-full bg-white text-black font-bold hover:opacity-90 transition"
        >
          PROCEED TO CHECKOUT
        </Link>
      </>
    );
  })()}
</div>

          </div> {/* RIGHT SIDEBAR */}

        </div> {/* GRID */}

      </div> {/* CONTAINER */}

    </main>
  );
}