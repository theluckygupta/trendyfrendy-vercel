"use client";
import {
  useWishlist,
} from "@/context/WishlistContext";
import Link from "next/link";

export default function ProductGrid({
  products,
  setSelectedProduct,
  setCartItems,
  setCartOpen,
}: any) {
const {
  wishlistItems,
  toggleWishlist,
} = useWishlist();
  return (

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

      {products.map(
        (product: any) => (

          <div
            key={product.id}
            className="group bg-[#111] border border-white/10 rounded-[2rem] overflow-hidden hover:border-[#d6c2a8] transition duration-500"
          >

            {/* IMAGE */}

            <div className="relative overflow-hidden">
              <button

  onClick={() =>
    toggleWishlist(
      product
    )
  }

  className="absolute top-5 left-5 z-20 w-12 h-12 rounded-full bg-black/70 backdrop-blur flex items-center justify-center text-2xl hover:scale-110 transition"
>

  {wishlistItems.find(
    (
      item: any
    ) =>

      item.id ===
      product.id
  )

    ? "❤️"

    : "🤍"}

</button>

              <img
                src={
                  product.mainImage ||
                  product.image
                }
                alt={product.name}
                className="w-full h-[500px] object-cover group-hover:scale-105 transition duration-700"
              />

              <button
                onClick={() =>
                  setSelectedProduct(
                    product
                  )
                }
                className="absolute top-5 right-5 bg-black/70 backdrop-blur px-5 py-2 rounded-full text-sm hover:bg-white hover:text-black transition"
              >

                Quick View

              </button>

            </div>

            {/* CONTENT */}

            <div className="p-8">

              <p className="uppercase tracking-[0.25em] text-[#d6c2a8] text-xs mb-3">

                {product.category ||
                  "Luxury"}

              </p>

              <h3 className="text-3xl font-bold mb-4">

                {product.name}

              </h3>

              <p className="text-gray-400 leading-7 mb-6 line-clamp-2">

                {product.shortDescription ||
                  product.description}

              </p>

              {/* PRICE */}

              <div className="flex items-center gap-4 mb-8">

                <p className="text-3xl font-bold">

                  ₹
                  {product.salePrice ||
                    product.price}

                </p>

                {product.salePrice && (

                  <p className="text-gray-500 line-through text-xl">

                    ₹
                    {product.price}

                  </p>

                )}

              </div>

              {/* BUTTONS */}

              <div className="flex gap-4">

                <Link
                  href={`/products/${product.id}`}
                  className="flex-1 text-center border border-white/10 py-4 rounded-full hover:border-[#d6c2a8] hover:text-[#d6c2a8] transition"
                >

                  View Product

                </Link>

                <button
                  onClick={() => {

                    setCartItems(
                      (prev: any[]) => [

                        ...prev,

                        {
                          ...product,
                          quantity: 1,
                        },

                      ]
                    );

                    setCartOpen(true);

                  }}
                  className="flex-1 bg-white text-black py-4 rounded-full font-semibold hover:bg-[#d6c2a8] transition"
                >

                  Add to Cart

                </button>

              </div>

            </div>

          </div>

        )
      )}

    </div>

  );

}