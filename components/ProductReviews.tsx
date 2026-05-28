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
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  // 🔥 FETCH REVIEWS
  async function fetchReviews() {
    try {
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
    } catch (err) {
      console.log(err);
    }
  }

  // 🔥 CHECK PURCHASE
  async function checkPurchase() {
    if (!user) return;

    try {
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
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchReviews();
    checkPurchase();
  }, [user]);

  // 🔥 CLOUDINARY IMAGE UPLOAD (FINAL)
  async function handleImageUpload(e: any) {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);

    const uploadedImages: string[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file as Blob);
      formData.append("upload_preset", "YOUR_UPLOAD_PRESET"); // 🔥 CHANGE
      formData.append("cloud_name", "YOUR_CLOUD_NAME");       // 🔥 CHANGE

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();

        if (data.secure_url) {
          uploadedImages.push(data.secure_url);
        }
      } catch (err) {
        console.log(err);
      }
    }

    setImages((prev) => [...prev, ...uploadedImages]);
    setUploading(false);
  }

  // 🔥 SUBMIT REVIEW
  async function submitReview() {
    if (!user) return alert("Login Required");
    if (!hasPurchased)
      return alert("Only buyers can review");
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
        images,
        verified: true,
        createdAt: Date.now(),
      });

      setReview("");
      setRating(5);
      setImages([]);

      fetchReviews();
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  // ⭐ CALCULATIONS
  const average =
    reviews.length > 0
      ? (
          reviews.reduce((t, r: any) => t + r.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0";

  return (
    <section>

      {/* HEADER */}
      <div className="flex justify-between mb-10">
        <h2 className="text-3xl font-bold">
          Ratings & Reviews
        </h2>

        <div className="text-right">
          <p className="text-4xl font-bold">
            {average} ★
          </p>
          <p className="text-gray-400">
            {reviews.length} Reviews
          </p>
        </div>
      </div>

      {/* RATING BARS */}
      <div className="mb-10 max-w-md">
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

      {/* CUSTOMER PHOTOS */}
      <div className="mb-10">
        <h3 className="font-semibold mb-4">
          Customer Photos
        </h3>

        <div className="flex gap-3 overflow-x-auto">
          {reviews.flatMap((r) => r.images || []).map((img: string, i: number) => (
            <img
              key={i}
              src={img}
              className="w-20 h-20 object-cover rounded-lg hover:scale-110 transition"
            />
          ))}
        </div>
      </div>

      {/* REVIEW FORM */}
      <div className="bg-[#111] p-6 rounded-xl mb-10">

        {!user && (
          <button
            onClick={loginWithGoogle}
            className="bg-white text-black px-6 py-3 rounded"
          >
            Login to review
          </button>
        )}

        {user && !hasPurchased && (
          <p className="text-yellow-400">
            Only verified buyers can review
          </p>
        )}

        {user && hasPurchased && (
          <>
            {/* STARS */}
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

            {/* TEXT */}
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full bg-black p-4 rounded mb-4"
              placeholder="Write review..."
            />

            {/* IMAGE UPLOAD */}
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-4"
            />

            {uploading && (
              <p className="text-sm text-gray-400 mb-2">
                Uploading images...
              </p>
            )}

            {/* PREVIEW */}
            <div className="flex gap-2 mb-4">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="w-16 h-16 rounded object-cover"
                />
              ))}
            </div>

            <button
              onClick={submitReview}
              disabled={loading}
              className="bg-white text-black px-6 py-3 rounded"
            >
              {loading ? "Posting..." : "Submit Review"}
            </button>
          </>
        )}
      </div>

      {/* REVIEWS LIST */}
      <div className="space-y-6">
        {reviews.map((r: any) => (
          <div key={r.id} className="bg-[#111] p-6 rounded-xl">

            <div className="flex justify-between mb-2">
              <div>
                <h3 className="font-semibold">{r.name}</h3>

                {r.verified && (
                  <span className="text-green-400 text-xs">
                    Verified Buyer
                  </span>
                )}
              </div>

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

            <p className="text-gray-400 mb-3">
              {r.review}
            </p>

            <div className="flex gap-2">
              {r.images?.map((img: string, i: number) => (
                <img
                  key={i}
                  src={img}
                  className="w-20 h-20 object-cover rounded-lg hover:scale-110 transition"
                />
              ))}
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}