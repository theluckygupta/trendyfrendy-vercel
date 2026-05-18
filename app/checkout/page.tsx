"use client";

import Link from "next/link";

import Navbar from "@/components/Navbar";

import {
  useCart,
} from "@/context/CartContext";

import {
  useAuth,
} from "@/context/AuthContext";

export default function CheckoutPage() {

  const {
    cartItems,
    setCartItems,
  } = useCart();

  const {
    user,
    login,
    logout,
  } = useAuth();

  const total =
    cartItems.reduce(

      (
        total: number,
        item: any
      ) => {

        const numericPrice =
          Number(
            item.salePrice ||
            item.price
          );

        return (
          total +
          numericPrice *
            (item.quantity || 1)
        );

      },

      0

    );

  async function handleCheckout() {

    if (!user) {

      try {

        await login();

        return;

      } catch (error: any) {

        alert(
          error.message
        );

        console.log(error);

        return;

      }

    }

    const orderText = `🛍️ New Order - TrendyFrenzy

${cartItems.map(
  (item: any) =>

`• ${item.name}
₹${item.salePrice || item.price}`
).join("\n\n")}

----------------------------

Total: ₹${total}
`;

    window.open(

      `https://wa.me/917019650441?text=${encodeURIComponent(orderText)}`,

      "_blank"

    );

  }

  return (

    <>

      <Navbar
        cartCount={cartItems.length}
        onCartOpen={() => {}}
      />

      <main className="min-h-screen bg-[#0a0a0a] text-white px-6 py-24">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}

          <div className="flex items-center justify-between mb-16">

            <div>

              <p className="uppercase tracking-[0.3em] text-[#d6c2a8] text-sm mb-4">

                Checkout

              </p>

              <h1 className="text-5xl md:text-7xl font-black">

                Your Cart

              </h1>

            </div>

            <Link
              href="/"
              className="border border-white/10 px-6 py-3 rounded-full hover:border-[#d6c2a8] hover:text-[#d6c2a8] transition"
            >

              Continue Shopping

            </Link>

          </div>

          {/* EMPTY */}

          {cartItems.length === 0 && (

            <div className="text-center py-32">

              <h2 className="text-4xl font-bold mb-6">

                Your cart is empty

              </h2>

              <Link
                href="/"
                className="inline-block bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-[#d6c2a8] transition"
              >

                Shop Now

              </Link>

            </div>

          )}

          {/* CART */}

          {cartItems.length > 0 && (

            <div className="grid lg:grid-cols-[1fr_420px] gap-12">

              {/* LEFT */}

              <div className="space-y-8">

                {cartItems.map(

                  (
                    item: any,
                    index: number
                  ) => (

                    <div
                      key={index}
                      className="bg-[#111] border border-white/10 rounded-[2rem] p-6 flex gap-6"
                    >

                      <img
                        src={
                          item.mainImage ||
                          item.image
                        }
                        alt={item.name}
                        className="w-36 h-44 object-cover rounded-2xl"
                      />

                      <div className="flex-1 flex flex-col justify-between">

                        <div>

                          <p className="uppercase tracking-[0.2em] text-[#d6c2a8] text-xs mb-3">

                            {item.category ||
                              "Luxury"}

                          </p>

                          <h2 className="text-3xl font-bold mb-4">

                            {item.name}

                          </h2>

                          <p className="text-gray-400 leading-7">

                            {item.shortDescription}

                          </p>

                        </div>

                        <div className="flex items-center justify-between mt-6">

                          <div className="flex items-center gap-4">

                            <p className="text-3xl font-bold">

                              ₹
                              {item.salePrice ||
                                item.price}

                            </p>

                            {item.salePrice && (

                              <p className="text-gray-500 line-through">

                                ₹
                                {item.price}

                              </p>

                            )}

                          </div>

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
                            className="text-red-400 hover:text-red-300 transition"
                          >

                            Remove

                          </button>

                        </div>

                      </div>

                    </div>

                  )

                )}

              </div>

              {/* RIGHT */}

              <div className="bg-[#111] border border-white/10 rounded-[2rem] p-8 h-fit sticky top-24">

                <h2 className="text-4xl font-bold mb-10">

                  Order Summary

                </h2>

                <div className="space-y-5 mb-10">

                  <div className="flex justify-between text-lg">

                    <span className="text-gray-400">

                      Products

                    </span>

                    <span>

                      {cartItems.length}

                    </span>

                  </div>

                  <div className="flex justify-between text-lg">

                    <span className="text-gray-400">

                      Shipping

                    </span>

                    <span>

                      Free

                    </span>

                  </div>

                </div>

                <div className="border-t border-white/10 pt-8 mb-10">

                  <div className="flex justify-between items-center">

                    <span className="text-2xl font-semibold">

                      Total

                    </span>

                    <span className="text-4xl font-black text-[#d6c2a8]">

                      ₹
                      {total.toLocaleString()}

                    </span>

                  </div>

                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-white text-black py-5 rounded-full text-lg font-semibold hover:bg-[#d6c2a8] transition"
                >

                  {user
                    ? "Proceed To Checkout"
                    : "Login With Google"}

                </button>

                {user && (

                  <button
                    onClick={logout}
                    className="mt-4 w-full border border-white/10 py-5 rounded-full text-lg font-semibold hover:border-red-500 hover:text-red-400 transition"
                  >

                    Logout

                  </button>

                )}

              </div>

            </div>

          )}

        </div>

      </main>

    </>

  );

}