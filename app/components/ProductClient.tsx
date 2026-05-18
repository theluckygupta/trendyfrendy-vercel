"use client";
import Link from "next/link";

import {
  doc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import {
  db,
} from "@/lib/firebase";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

export default function ProductClient() {

  const params =
    useParams();

  const [product, setProduct] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [selectedImage, setSelectedImage] =
    useState("");
    const [reviews, setReviews] =
  useState<any[]>([]);

const [rating, setRating] =
  useState(5);

const [reviewText, setReviewText] =
  useState("");

const [userName, setUserName] =
  useState("");

const [submitting, setSubmitting] =
  useState(false);
    const [
  similarProducts,
  setSimilarProducts,
] = useState<any[]>([]);

  const [selectedSize, setSelectedSize] =
    useState("");

  useEffect(() => {

    async function fetchProduct() {

      try {

        if (!params?.id) {

          setLoading(false);

          return;

        }

        const docRef = doc(
          db,
          "products",
          String(params.id)
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

          setSelectedImage(
            data.mainImage ||
            data.images?.[0] ||
            ""
          );
          const reviewsQuery =
  query(
    collection(
      db,
      "reviews"
    ),
    where(
      "productId",
      "==",
      data.id
    )
  );

const reviewSnapshot =
  await getDocs(
    reviewsQuery
  );

const fetchedReviews =
  reviewSnapshot.docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data(),
    })
  );

setReviews(
  fetchedReviews
);
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
      id: doc.id,
      ...doc.data(),
    }))
    .filter(
      (item: any) =>
        item.category ===
          data.category &&
        item.id !== data.id
    )
    .slice(0, 4);

setSimilarProducts(
  similar
);

        }

      } catch (error) {

        console.log(error);

      }

      setLoading(false);

    }

    fetchProduct();

  }, [params]);
async function submitReview() {

  if (
    !reviewText ||
    !userName
  ) return;

  try {

    setSubmitting(true);

    await addDoc(
      collection(
        db,
        "reviews"
      ),
      {

        productId:
          product.id,

        userName,

        rating,

        review:
          reviewText,

        createdAt:
          new Date(),

      }
    );

    setReviews((prev) => [

      ...prev,

      {

        userName,

        rating,

        review:
          reviewText,

      },

    ]);

    setReviewText("");

    setUserName("");

    setRating(5);

  } catch (error) {

    console.log(error);

  }

  setSubmitting(false);

}
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
            total,
            item
          ) =>

            total +
            item.rating,

          0
        ) /
        reviews.length
      ).toFixed(1)

    : "5.0";

  return (

    <main className="min-h-screen bg-[#0a0a0a] text-white px-4 md:px-6 py-16 md:py-24">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-20">

        {/* IMAGE SECTION */}

        <div className="space-y-5">

          <div className="overflow-hidden rounded-[2rem] bg-[#111]">

            {(selectedImage ||
              product.mainImage) ? (

              <img
                src={
                  selectedImage ||
                  product.mainImage
                }
                alt={product.name}
                className="w-full h-[450px] md:h-[750px] object-cover"
              />

            ) : (

              <div className="w-full h-[450px] md:h-[750px] flex items-center justify-center text-gray-500">

                No Image

              </div>

            )}

          </div>

          {/* THUMBNAILS */}

          {product.images?.length > 0 && (

            <div className="flex gap-4 overflow-x-auto pb-2">

              {product.images.map(
                (
                  image: string,
                  index: number
                ) => (

                  <button
                    key={index}
                    onClick={() =>
                      setSelectedImage(
                        image
                      )
                    }
                    className={`border-2 rounded-2xl overflow-hidden min-w-[90px] h-[110px] transition ${
                      selectedImage ===
                      image
                        ? "border-white"
                        : "border-transparent"
                    }`}
                  >

                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-cover"
                    />

                  </button>

                )
              )}

            </div>

          )}

        </div>

        {/* CONTENT */}

        <div className="flex flex-col justify-center">

          <p className="uppercase tracking-[0.35em] text-sm text-[#d6c2a8] mb-5">

            {product.category ||
              "Luxury Collection"}

          </p>

          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6 md:mb-8">

            {product.name}

          </h1>

          <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 md:mb-10">

            {product.shortDescription}

          </p>

          <div className="flex items-center gap-5 mb-10 flex-wrap">

            <p className="text-4xl md:text-5xl font-bold">

              ₹
              {product.salePrice ||
                product.price}

            </p>

            {product.salePrice && (

              <p className="text-xl md:text-2xl text-gray-500 line-through">

                ₹{product.price}

              </p>

            )}

          </div>
<div className="flex items-center gap-4 mb-10">

  <div className="flex text-yellow-400 text-2xl">

    ★★★★★

  </div>

  <p className="text-lg text-gray-300">

    {averageRating}
    {" "}
    (
    {reviews.length}
    {" "}
    Reviews
    )

  </p>

</div>
          {/* DETAILS */}

          <div className="space-y-4 mb-10 text-gray-300">

            <p>
              Top Length:
              {" "}
              {product.topLength || "-"}
            </p>

            <p>
              Bottom Length:
              {" "}
              {product.bottomLength || "-"}
            </p>

            <p>
              Sleeves:
              {" "}
              {product.sleeves || "-"}
            </p>

            {/* SIZE SELECTION */}

            <div>

              <p className="mb-4">

                Sizes:

              </p>

              <div className="flex flex-wrap gap-3">

                {product.sizes?.length ? (

                  product.sizes.map(
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
                        className={`px-5 py-2 rounded-xl border transition ${
                          selectedSize ===
                          size
                            ? "bg-white text-black border-white"
                            : "border-gray-600 text-white"
                        }`}
                      >

                        {size}

                      </button>

                    )
                  )

                ) : (

                  <p>-</p>

                )}

              </div>

            </div>

          </div>

          {/* ORDER BUTTON */}

          <a
            href={`https://wa.me/917019650441?text=Hi, I want to order ${product.name}${
              selectedSize
                ? ` in size ${selectedSize}`
                : ""
            }`}
            target="_blank"
            className="bg-white text-black px-10 py-5 rounded-full font-semibold w-fit hover:bg-[#d6c2a8] transition"
          >

            Order on WhatsApp

          </a>

        </div>

      </div>
{/* SIMILAR PRODUCTS */}

<section className="max-w-7xl mx-auto mt-32">

  <div className="mb-12">

    <p className="uppercase tracking-[0.3em] text-[#d6c2a8] text-sm mb-4">

      You May Also Like

    </p>

    <h2 className="text-4xl md:text-5xl font-bold">

      Similar Products

    </h2>

  </div>

  <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-10">

    {similarProducts.map(
      (item: any) => (

        <Link
          key={item.id}
          href={`/products/${item.id}`}
          className="group"
        >

          <div className="overflow-hidden rounded-[2rem] bg-[#111] mb-5">

            <img
              src={
                item.mainImage
              }
              alt={item.name}
              className="w-full h-[350px] object-cover group-hover:scale-105 transition duration-500"
            />

          </div>

          <p className="uppercase tracking-[0.25em] text-[#d6c2a8] text-xs mb-3">

            {item.category}

          </p>

          <h3 className="text-2xl font-semibold mb-3">

            {item.name}

          </h3>

          <p className="text-gray-400 line-clamp-2 mb-4">

            {
              item.shortDescription
            }

          </p>

          <div className="flex items-center gap-4">

            <p className="text-2xl font-bold">

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

        </Link>

      )
    )}

  </div>

</section>
{/* REVIEWS */}

<section className="max-w-7xl mx-auto mt-32">

  <div className="mb-16">

    <p className="uppercase tracking-[0.3em] text-[#d6c2a8] text-sm mb-4">

      Customer Feedback

    </p>

    <h2 className="text-5xl font-black">

      Reviews

    </h2>

  </div>

  {/* REVIEW FORM */}

  <div className="bg-[#111] border border-white/10 rounded-[2rem] p-10 mb-16">

    <h3 className="text-3xl font-bold mb-8">

      Write a Review

    </h3>

    <input
      type="text"
      placeholder="Your Name"
      value={userName}
      onChange={(e) =>
        setUserName(
          e.target.value
        )
      }
      className="w-full bg-black border border-white/10 rounded-2xl px-6 py-5 mb-6 outline-none focus:border-[#d6c2a8]"
    />

    <select
      value={rating}
      onChange={(e) =>
        setRating(
          Number(
            e.target.value
          )
        )
      }
      className="w-full bg-black border border-white/10 rounded-2xl px-6 py-5 mb-6 outline-none focus:border-[#d6c2a8]"
    >

      <option value={5}>
        5 Stars
      </option>

      <option value={4}>
        4 Stars
      </option>

      <option value={3}>
        3 Stars
      </option>

      <option value={2}>
        2 Stars
      </option>

      <option value={1}>
        1 Star
      </option>

    </select>

    <textarea
      placeholder="Write your review..."
      value={reviewText}
      onChange={(e) =>
        setReviewText(
          e.target.value
        )
      }
      className="w-full bg-black border border-white/10 rounded-2xl px-6 py-5 h-40 mb-6 outline-none focus:border-[#d6c2a8]"
    />

    <button
      onClick={submitReview}
      disabled={submitting}
      className="bg-white text-black px-10 py-5 rounded-full font-semibold hover:bg-[#d6c2a8] transition"
    >

      {submitting
        ? "Submitting..."
        : "Submit Review"}

    </button>

  </div>

  {/* REVIEW LIST */}

  <div className="space-y-8">

    {reviews.map(
      (
        item: any,
        index: number
      ) => (

        <div
          key={index}
          className="bg-[#111] border border-white/10 rounded-[2rem] p-8"
        >

          <div className="flex items-center justify-between mb-5">

            <h3 className="text-2xl font-bold">

              {item.userName}

            </h3>

            <div className="text-yellow-400 text-xl">

              {"★".repeat(
                item.rating
              )}

            </div>

          </div>

          <p className="text-gray-300 leading-8 text-lg">

            {item.review}

          </p>

        </div>

      )
    )}

  </div>

</section>
    </main>

  );

}