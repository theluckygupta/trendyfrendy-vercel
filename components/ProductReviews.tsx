"use client";

import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

export default function ProductReviews({ productId }: { productId: string }) {
  const { user, loginWithGoogle } = useAuth();

  const [reviews, setReviews] = useState<any[]>([]);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false);

  // 🔥 FETCH REVIEWS (FIXED)
  async function fetchReviews() {
    const q = query(
      collection(db, "reviews"),
      where("productId", "==", productId),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setReviews(data);
  }

  // 🔥 CHECK PURCHASE
  async function checkPurchase() {
    if (!user) return;

    const snapshot = await getDocs(collection(db, "orders"));

    const orders = snapshot.docs.map((doc) => doc.data());

    const purchased = orders.some(
      (order: any) =>
        order.userEmail === user.email &&
        order.products?.some(
          (p: any) => p.productId === productId
        )
    );

    setHasPurchased(purchased);
  }

  useEffect(() => {
    fetchReviews();
    checkPurchase();
  }, [user]);

  // 🔥 SUBMIT REVIEW
  async function submitReview() {
    if (!user) return alert("Login Required");
    if (!hasPurchased)
      return alert("You must purchase this product first");

    if (!review) return;

    try {
      setLoading(true);

      await addDoc(collection(db, "reviews"), {
        productId,
        review,
        rating,
        name: user.displayName,
        userEmail: user.email,
        userPhoto: user.photoURL,
        createdAt: Date.now(),
      });

      setReview("");
      setRating(5);
      fetchReviews();
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((t, r: any) => t + r.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0";

  return (
    <section className="mt-28">

      {/* HEADER */}
      <div className="flex justify-between mb-12">
        <div>
          <h2 className="text-4xl font-bold">
            Reviews & Ratings
          </h2>
        </div>
        <div className="text-right">
          <p className="text-4xl font-bold">
            {averageRating} ★
          </p>
          <p className="text-gray-400">
            {reviews.length} Reviews
          </p>
        </div>
      </div>

      {/* 🔥 MYNTRA BARS */}
      <div className="mb-12 max-w-md">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = reviews.filter(
            (r) => r.rating === star
          ).length;

          const percent = reviews.length
            ? (count / reviews.length) * 100
            : 0;

          return (
            <div key={star} className="flex items-center gap-3 mb-2">
              <span>{star}★</span>
              <div className="flex-1 h-2 bg-gray-700 rounded">
                <div
                  className="h-2 bg-green-500 rounded"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="text-sm text-gray-400">
                {count}
              </span>
            </div>
          );
        })}
      </div>

      {/* 🔥 REVIEW FORM */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-6 mb-10">

        {!user && (
          <button
            onClick={loginWithGoogle}
            className="bg-white text-black px-6 py-3 rounded-full"
          >
            Login to write review
          </button>
        )}

        {user && !hasPurchased && (
          <p className="text-yellow-400">
            Only buyers can review this product
          </p>
        )}

        {user && hasPurchased && (
          <>
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <button key={s} onClick={() => setRating(s)}>
                  <Star
                    size={20}
                    fill={s <= rating ? "#facc15" : "transparent"}
                    stroke="#facc15"
                  />
                </button>
              ))}
            </div>

            <textarea
              value={review}
              onChange={(e) =>
                setReview(e.target.value)
              }
              className="w-full bg-black p-4 rounded mb-4"
              placeholder="Write review..."
            />

            <button
              onClick={submitReview}
              disabled={loading}
              className="bg-white text-black px-6 py-3 rounded"
            >
              Submit
            </button>
          </>
        )}
      </div>

      {/* REVIEWS LIST */}
      <div className="space-y-6">
        {reviews.map((r: any) => (
          <div
            key={r.id}
            className="bg-[#111] p-6 rounded-2xl"
          >
            <div className="flex justify-between mb-2">
              <h3>{r.name}</h3>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={16}
                    fill={s <= r.rating ? "#facc15" : "transparent"}
                    stroke="#facc15"
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-400">{r.review}</p>
          </div>
        ))}
      </div>
    </section>
  );
}