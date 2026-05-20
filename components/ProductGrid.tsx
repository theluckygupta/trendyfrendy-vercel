"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import {
  db,
} from "@/lib/firebase";

type Props = {
  products: any[];
  setSelectedProduct: (product: any) => void;
  setCartItems: any;
  setCartOpen: (open: boolean) => void;
};

export default function ProductGrid({
  products,
  setSelectedProduct,
  setCartItems,
  setCartOpen,
}: Props) {

  const [likedItems, setLikedItems] = useState<{ [key: string]: boolean }>({});


  const [reviewStats, setReviewStats] =
    useState<any>({});

  useEffect(() => {

    async function fetchReviews() {

      const snapshot =
        await getDocs(
          collection(
            db,
            "reviews"
          )
        );

      const grouped: any = {};

      snapshot.docs.forEach(
        (doc) => {

          const data: any =
            doc.data();

          if (
            !grouped[
              data.productId
            ]
          ) {

            grouped[
              data.productId
            ] = {

              total: 0,

              count: 0,

            };

          }

          grouped[
            data.productId
          ].total +=
            data.rating;

          grouped[
            data.productId
          ].count += 1;

        }
      );

      setReviewStats(
        grouped
      );

    }

    fetchReviews();

  }, []);

  return (

    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">

      {products.map(
        (product: any) => {

          const stats =
            reviewStats[
              product.id
            ];

          const average =
            stats

              ? (
                  stats.total /
                  stats.count
                ).toFixed(1)

              : null;

          return (

            <Link
  key={product.id}
  href={`/products/${product.id}`}
  className="group"
>

             <div className="relative overflow-hidden rounded-[2rem] bg-[#111] group">

  {/* MAIN IMAGE */}

  <img
    src={
      product.mainImage
    }
    alt={product.name}
    className="w-full h-[300px] md:h-[420px] object-cover transition duration-700 group-hover:opacity-0 absolute inset-0"
  />

  {/* HOVER IMAGE */}

  <img
    src={
      product.leftImage ||
      product.rightImage ||
      product.mainImage
    }
    alt={product.name}
    className="w-full h-[300px] md:h-[420px] object-cover transition duration-700 opacity-0 group-hover:opacity-100"
  />

  {/* RATING */}

  {average && (

    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl flex items-center gap-2 shadow-lg z-20">

      <span className="font-bold text-black text-sm">

        {average}

      </span>

      <span className="text-green-600">

        ★

      </span>

      <span className="text-gray-500 text-sm">

        |

      </span>

      <span className="text-gray-700 text-sm">

        {stats.count}

      </span>

    </div>

  )}

  {/* WISHLIST BUTTON */}

 <button
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();

    setLikedItems((prev) => ({
      ...prev,
      [product.id]: !prev[product.id],
    }));
  }}
  className="absolute bottom-4 right-4 bg-white text-black px-5 py-3 rounded-full font-semibold opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition duration-300 z-20 shadow-xl"
>
  {likedItems[product.id] ? "❤️ Wishlisted" : "♡ Wishlist"}
</button>

  {/* DOTS */}

  <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition z-20">

    <div className="w-2 h-2 rounded-full bg-white" />

    <div className="w-2 h-2 rounded-full bg-white/40" />

    <div className="w-2 h-2 rounded-full bg-white/40" />

  </div>

</div>

              {/* CONTENT */}

              <div className="mt-5">

                <h3 className="text-2xl font-semibold mb-2 line-clamp-1">

                  {product.name}

                </h3>

                <p className="text-gray-400 line-clamp-2 mb-4">

                  {
                    product.shortDescription
                  }

                </p>

                <div className="flex items-center gap-4 flex-wrap">

                  <p className="text-2xl font-bold">

                    ₹
                    {product.salePrice ||
                      product.price}

                  </p>

                  {product.salePrice && (

                    <>
                      <p className="text-gray-500 line-through">

                        ₹
                        {product.price}

                      </p>

                      <p className="text-[#ff905a]">

                        (
                        {Math.round(

                          ((product.price -
                            product.salePrice) /

                            product.price) *

                            100
                        )}
                        % OFF)

                      </p>
                    </>

                  )}

                </div>

              </div>

            </Link>

          );

        }
      )}

    </div>

  );

}