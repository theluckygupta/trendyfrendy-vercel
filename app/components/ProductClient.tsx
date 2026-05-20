"use client";

import Link from "next/link";

import ProductReviews from "@/components/ProductReviews";
import { useWishlist } from "@/context/WishlistContext";


import {
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import {
  db,
} from "@/lib/firebase";

import {
  useEffect,
  useState,
} from "react";

export default function ProductClient({
  productId,
}: {
  productId: string;
}) {

  const [liked, setLiked] = useState(false);

  const [product, setProduct] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [
    similarProducts,
    setSimilarProducts,
  ] = useState<any[]>([]);

  const [selectedSize, setSelectedSize] =
    useState("");

  const [reviews, setReviews] =
    useState<any[]>([]);

  useEffect(() => {

    async function fetchProduct() {

      try {

        if (!productId) {

          setLoading(false);

          return;

        }

        const docRef = doc(
          db,
          "products",
          productId
        );

        const docSnap =
          await getDoc(docRef);

        if (docSnap.exists()) {

          const data: any = {

            id:
              docSnap.id,

            ...docSnap.data(),

          };

          setProduct(data);

          /* SIMILAR PRODUCTS */

          const querySnapshot =
            await getDocs(
              collection(
                db,
                "products"
              )
            );

          const similar =
            querySnapshot.docs
              .map((doc) => ({

                id:
                  doc.id,

                ...doc.data(),

              }))
              .filter(
                (item: any) =>

                  item.category ===
                    data.category &&

                  item.id !==
                    data.id
              )
              .slice(0, 4);

          setSimilarProducts(
            similar
          );

          /* REVIEWS */

          const reviewsSnapshot =
            await getDocs(
              collection(
                db,
                "reviews"
              )
            );

          const productReviews =
            reviewsSnapshot.docs
              .map((doc) => ({

                id:
                  doc.id,

                ...doc.data(),

              }))
              .filter(
                (review: any) =>

                  review.productId ===
                  data.id
              );

          setReviews(
            productReviews
          );

        }

      } catch (error) {

        console.log(error);

      }

      setLoading(false);

    }

    fetchProduct();

  }, [productId]);

  if (loading) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center">

        Loading...

      </div>

    );

  }

  if (!product) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center">

        Product Not Found

      </div>

    );

  }

  const averageRating =
    reviews.length > 0

      ? (
          reviews.reduce(
            (
              total: number,
              item: any
            ) =>

              total +
              item.rating,

            0
          ) /
          reviews.length
        ).toFixed(1)

      : "0";

  const galleryImages = [

    product.mainImage,

    product.leftImage,

    product.rightImage,

    product.backImage,

    product.productOnlyImage,

  ].filter(Boolean);

  return (

    <main className="bg-[#0a0a0a] text-white min-h-screen pt-10">

      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-[58%_42%] gap-10">

        {/* LEFT IMAGE GRID */}

        <div className="grid grid-cols-2 gap-4">

          {galleryImages.map(
            (
              image: string,
              index: number
            ) => (

              <div
                key={index}
                className="bg-[#111] overflow-hidden rounded-2xl"
              >

                <img
                  src={image}
                  alt=""
                  className="w-full object-cover hover:scale-105 transition duration-500"
                />

              </div>

            )
          )}

        </div>

        {/* RIGHT */}

        <div className="sticky top-24 h-fit bg-[#111] border border-white/10 rounded-[2rem] p-8">

          <h2 className="text-3xl font-bold">

            TrendyFrenzy

          </h2>

          <h1 className="text-2xl text-gray-300 mt-2">

            {product.name}

          </h1>

          {/* RATING */}

          <div className="mt-5 border border-white/10 rounded-md px-4 py-2 inline-flex items-center gap-3">

            <span className="font-bold">

              {averageRating}
              {" "}
              ★

            </span>

            <span className="text-gray-400">

              |

            </span>

            <span className="text-gray-300">

              {reviews.length}
              {" "}
              Reviews

            </span>

          </div>

          {/* PRICE */}

          <div className="mt-6 flex items-center gap-3 flex-wrap">

            <span className="text-4xl font-bold">

              ₹
              {product.salePrice ||
                product.price}

            </span>

            {product.salePrice && (

              <>
                <span className="line-through text-gray-500 text-2xl">

                  ₹
                  {product.price}

                </span>

                <span className="text-[#ff905a] text-2xl font-semibold">

                  (
                  {Math.round(

                    ((product.price -
                      product.salePrice) /

                      product.price) *

                      100
                  )}
                  % OFF)

                </span>
              </>

            )}

          </div>

          <p className="text-green-600 font-semibold mt-2">

            inclusive of all taxes

          </p>

          {/* SIZE */}

          <div className="mt-10">

            <div className="flex items-center justify-between mb-5">

              <h3 className="font-bold text-lg">

                SELECT SIZE

              </h3>

            </div>

            <div className="flex flex-wrap gap-4">

              {product.sizes?.map(
                (
                  size: string
                ) => (

                  <button
                    key={size}
                    onClick={() =>
                      setSelectedSize(
                        size
                      )
                    }
                    className={`w-16 h-16 rounded-full border font-semibold transition ${
                      selectedSize ===
                      size

                        ? "border-[#d6c2a8] text-[#d6c2a8]"

                        : "border-white/20"
                    }`}
                  >

                    {size}

                  </button>

                )
              )}

            </div>

          </div>

          {/* BUTTONS */}

          <div className="flex gap-4 mt-10">

            <a
              href={`https://wa.me/917019650441?text=Hi, I want to order ${product.name}${
                selectedSize

                  ? ` in size ${selectedSize}`

                  : ""
              }`}
              target="_blank"
              className="flex-1 bg-black text-white hover:bg-white hover:text-black py-5 font-bold px-10 border border-white/30 rounded-md text-center transition"
            >

              ADD TO BAG

            </a>

<button
  onClick={() => {
    setLiked(!liked);
  }}
  className="px-8 py-4 rounded-full border border-white/10 hover:border-[#d6c2a8] transition"
>
  {liked ? "❤️ Wishlisted" : "♡ Wishlist"}
</button>

          </div>

          {/* DELIVERY */}

          <div className="mt-12 border-t border-white/10 pt-10">

            <h3 className="font-bold text-lg mb-5">

              DELIVERY OPTIONS

            </h3>

            <div className="flex border border-white/10 rounded-md overflow-hidden">

              <input
                type="text"
                placeholder="Enter pincode"
                className="flex-1 px-4 py-4 bg-transparent outline-none"
              />

              <button className="px-6 text-[#d6c2a8] font-bold">

                Check

              </button>

            </div>

          </div>

          {/* DETAILS */}

          <div className="mt-14 border-t border-white/10 pt-10">

            <h3 className="font-bold text-xl mb-6">

              PRODUCT DETAILS

            </h3>

            <p className="text-gray-300 leading-8">

              {product.shortDescription}

            </p>

            <div className="grid grid-cols-2 gap-8 mt-10">

              <div>

                <p className="text-gray-500 text-sm">

                  Sleeves

                </p>

                <p className="font-medium">

                  {product.sleeves || "-"}

                </p>

              </div>

              <div>

                <p className="text-gray-500 text-sm">

                  Top Length

                </p>

                <p className="font-medium">

                  {product.topLength || "-"}

                </p>

              </div>

              <div>

                <p className="text-gray-500 text-sm">

                  Bottom Length

                </p>

                <p className="font-medium">

                  {product.bottomLength || "-"}

                </p>

              </div>

              <div>

                <p className="text-gray-500 text-sm">

                  Category

                </p>

                <p className="font-medium">

                  {product.category || "-"}

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* REVIEWS */}

      <div className="max-w-7xl mx-auto px-4 mt-24">

        <ProductReviews
          productId={product.id}
        />

      </div>

      {/* SIMILAR PRODUCTS */}

      <section className="max-w-7xl mx-auto px-4 mt-24 pb-24">

        <h2 className="text-4xl font-bold mb-12">

          Similar Products

        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

          {similarProducts.map(
            (item: any) => (

              <Link
                key={item.id}
                href={`/products/${item.id}`}
                className="group"
              >

                <div className="overflow-hidden bg-[#111] rounded-2xl mb-4">

                  <img
                    src={item.mainImage}
                    alt={item.name}
                    className="w-full h-[350px] object-cover group-hover:scale-105 transition duration-500"
                  />

                </div>

                <h3 className="font-bold text-lg">

                  {item.name}

                </h3>

                <div className="flex items-center gap-3 mt-2">

                  <p className="font-bold text-xl">

                    ₹
                    {item.salePrice ||
                      item.price}

                  </p>

                  {item.salePrice && (

                    <p className="line-through text-gray-400">

                      ₹
                      {item.price}

                    </p>

                  )}

                </div>

              </Link>

            )
          )}

        </div>

      </section>

    </main>

  );

}