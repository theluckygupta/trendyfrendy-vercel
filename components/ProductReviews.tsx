"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";

import {
  db,
} from "@/lib/firebase";

import {
  useAuth,
} from "@/context/AuthContext";

export default function ProductReviews({
  productId,
}: {
  productId: string;
}) {

  const {
    user,
    loginWithGoogle,
  } = useAuth();

  const [reviews, setReviews] =
    useState<any[]>([]);

  const [review, setReview] =
    useState("");

  const [rating, setRating] =
    useState(5);

  const [loading, setLoading] =
    useState(false);

  async function fetchReviews() {

    try {

      const q =
        query(

          collection(
            db,
            "reviews"
          ),

          where(
            "productId",
            "==",
            productId
          ),

          orderBy(
            "createdAt",
            "desc"
          )

        );

      const snapshot =
        await getDocs(q);

      const data =
        snapshot.docs.map(
          (doc) => ({

            id:
              doc.id,

            ...doc.data(),

          })
        );

      setReviews(data);

    } catch (error) {

      console.log(error);

    }

  }

  useEffect(() => {

    fetchReviews();

  }, []);

  async function submitReview() {

    if (!user) {

      alert(
        "Login Required"
      );

      return;

    }

    if (!review) return;

    try {

      setLoading(true);

      await addDoc(

        collection(
          db,
          "reviews"
        ),

        {

          productId,

          review,

          rating,

          name:
            user.displayName,

          userEmail:
            user.email,

          userPhoto:
            user.photoURL,

          createdAt:
            Date.now(),

        }

      );

      setReview("");

      setRating(5);

      fetchReviews();

      alert(
        "Review Added 😎"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed to add review"
      );

    }

    setLoading(false);

  }

  const averageRating =
    reviews.length

      ? (
          reviews.reduce(
            (
              total,
              item: any
            ) =>

              total +
              item.rating,

            0
          ) /
          reviews.length
        ).toFixed(1)

      : "0";

  return (

    <section className="mt-28">

      <div className="flex items-center justify-between mb-12">

        <div>

          <p className="uppercase tracking-[0.3em] text-[#d6c2a8] text-sm mb-3">

            Customer Reviews

          </p>

          <h2 className="text-5xl font-black">

            Reviews & Ratings

          </h2>

        </div>

        <div className="text-right">

          <p className="text-5xl font-black">

            {averageRating}

          </p>

          <p className="text-gray-400 mt-2">

            {reviews.length}
            {" "}
            Reviews

          </p>

        </div>

      </div>

      {/* REVIEW FORM */}

      <div className="bg-[#111] border border-white/10 rounded-[2rem] p-8 mb-16">

        <h3 className="text-3xl font-bold mb-8">

          Write A Review

        </h3>

        {!user && (

          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 mb-8">

            <p className="text-red-400 mb-5">

              Login Required To Write Review

            </p>

            <button
              onClick={loginWithGoogle}
              className="bg-white text-black px-6 py-3 rounded-full font-semibold"
            >

              Login With Google

            </button>

          </div>

        )}

        {user && (

          <div className="flex items-center gap-4 mb-8">

            <img
              src={
                user.photoURL ||
                "/user.png"
              }
              alt=""
              className="w-14 h-14 rounded-full object-cover"
            />

            <div>

              <h4 className="font-semibold text-lg">

                {user.displayName}

              </h4>

              <p className="text-gray-400 text-sm">

                {user.email}

              </p>

            </div>

          </div>

        )}

        {/* STARS */}

        <div className="flex gap-3 text-5xl mb-8">

          {[1, 2, 3, 4, 5].map(
            (star) => (

              <button
                key={star}
                type="button"
                onClick={() =>
                  setRating(star)
                }
                className="hover:scale-110 transition"
              >

                {star <= rating

                  ? "⭐"

                  : "☆"}

              </button>

            )
          )}

        </div>

        <textarea
          rows={5}
          value={review}
          onChange={(e) =>
            setReview(
              e.target.value
            )
          }
          placeholder="Write your review..."
          className="w-full bg-black border border-white/10 rounded-2xl p-5 outline-none resize-none"
        />

        <button
          onClick={submitReview}
          disabled={
            loading || !user
          }
          className="mt-6 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-[#d6c2a8] transition disabled:opacity-50"
        >

          {loading
            ? "Posting..."
            : "Submit Review"}

        </button>

      </div>

      {/* REVIEWS */}

      <div className="space-y-8">

        {reviews.map(
          (
            item: any
          ) => (

            <div
              key={item.id}
              className="bg-[#111] border border-white/10 rounded-[2rem] p-8"
            >

              <div className="flex items-center justify-between mb-6">

                <div className="flex items-center gap-4">

                  <img
                    src={
                      item.userPhoto ||
                      "/user.png"
                    }
                    alt=""
                    className="w-14 h-14 rounded-full object-cover"
                  />

                  <div>

                    <h3 className="text-2xl font-bold">

                      {item.name}

                    </h3>

                    <span className="text-green-400 text-sm">

                      Verified Buyer

                    </span>

                  </div>

                </div>

                <div className="flex items-center gap-1 text-3xl">

                  {[1, 2, 3, 4, 5].map(
                    (star) => (

                      <span
                        key={star}
                      >

                        {star <=
                        item.rating

                          ? "⭐"

                          : "☆"}

                      </span>

                    )
                  )}

                </div>

              </div>

              <p className="text-gray-300 text-lg leading-8">

                {item.review}

              </p>

            </div>

          )
        )}

      </div>

    </section>

  );

}