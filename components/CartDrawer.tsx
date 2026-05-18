"use client";

import Link from "next/link";

export default function CartDrawer({
  cartOpen,
  setCartOpen,
  cartItems,
  setCartItems,
  cartTotal,
}: any) {

  if (!cartOpen) return null;

  return (

    <div className="fixed top-0 right-0 h-screen w-full md:w-[450px] bg-[#111] z-[120] border-l border-white/10 p-8 overflow-y-auto">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-10">

        <h2 className="text-3xl font-bold text-white">

          Your Cart

        </h2>

        <button
          onClick={() =>
            setCartOpen(false)
          }
          className="text-3xl text-white hover:text-[#d6c2a8]"
        >

          ×

        </button>

      </div>

      {/* EMPTY */}

      {cartItems.length === 0 && (

        <div className="text-gray-400 text-center py-20">

          Your cart is empty

        </div>

      )}

      {/* ITEMS */}

      <div className="space-y-6">

        {cartItems.map(
          (
            item: any,
            index: number
          ) => (

            <div
              key={index}
              className="flex gap-4 border-b border-white/10 pb-6"
            >

              <img
                src={
                  item.mainImage ||
                  item.image
                }
                alt={item.name}
                className="w-24 h-28 object-cover rounded-xl"
              />

              <div className="flex-1">

                <h3 className="text-xl font-semibold text-white">

                  {item.name}

                </h3>

                <p className="text-[#d6c2a8] mt-2">

                  ₹
                  {item.salePrice ||
                    item.price}

                </p>

                <button
                  onClick={() =>

                    setCartItems(
                      (
                        prev: any[]
                      ) =>

                        prev.filter(
                          (
                            _: any,
                            i: number
                          ) =>

                            i !== index
                        )
                    )

                  }
                  className="mt-3 text-sm text-red-400 hover:text-red-300 transition"
                >

                  Remove

                </button>

              </div>

            </div>

          )
        )}

      </div>

      {/* FOOTER */}

      {cartItems.length > 0 && (

        <div className="border-t border-white/10 mt-10 pt-6">

          <div className="flex justify-between items-center text-2xl font-semibold text-white">

            <span>

              Total

            </span>

            <span className="text-[#d6c2a8]">

              ₹
              {cartTotal.toLocaleString()}

            </span>

          </div>

          <Link
            href="/checkout"
            className="block mt-6 bg-white text-black text-center py-4 rounded-full font-semibold hover:bg-[#d6c2a8] transition"
          >

            Proceed to Checkout

          </Link>

        </div>

      )}

    </div>

  );

}