"use client";

import Link from "next/link";
import ProductReviews from "@/components/ProductReviews";

import {
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { useEffect, useState } from "react";

export default function ProductClient({
  productId,
}: {
  productId: string;
}) {

  const [liked, setLiked] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [similarProducts, setSimilarProducts] = useState<any[]>([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProduct() {
      try {
        if (!productId) {
          setLoading(false);
          return;
        }

        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data: any = {
            id: docSnap.id,
            ...docSnap.data(),
          };

          setProduct(data);

          // SIMILAR PRODUCTS
          const querySnapshot = await getDocs(collection(db, "products"));

          const similar = querySnapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .filter(
              (item: any) =>
                item.category === data.category && item.id !== data.id
            )
            .slice(0, 4);

          setSimilarProducts(similar);

          // REVIEWS
          const reviewsSnapshot = await getDocs(collection(db, "reviews"));

          const productReviews = reviewsSnapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .filter((review: any) => review.productId === data.id);

          setReviews(productReviews);
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
            (total: number, item: any) => total + item.rating,
            0
          ) / reviews.length
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

        {/* LEFT IMAGES */}
        <div className="columns-2 gap-4 space-y-4">
          {galleryImages.map((image: string, index: number) => (
            <div
              key={`${image}-${index}`}
              onClick={() => setPreviewImage(image)}
              className="bg-[#111] rounded-2xl overflow-hidden break-inside-avoid cursor-zoom-in group"
            >
              <img
                src={image}
                alt=""
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-125 pointer-events-none"
              />
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="sticky top-24 h-fit bg-[#111] border border-white/10 rounded-[2rem] p-8">

          <h2 className="text-3xl font-bold">TrendyFrenzy</h2>

          <h1 className="text-2xl text-gray-300 mt-2">
            {product.name}
          </h1>

          {/* RATING */}
          <div className="mt-5 border border-white/10 rounded-md px-4 py-2 inline-flex items-center gap-3">
            <span className="font-bold">{averageRating} ★</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-300">
              {reviews.length} Reviews
            </span>
          </div>

          {/* PRICE */}
          <div className="mt-6 flex items-center gap-3 flex-wrap">
            <span className="text-4xl font-bold">
              ₹{product.salePrice || product.price}
            </span>

            {product.salePrice && (
              <>
                <span className="line-through text-gray-500 text-2xl">
                  ₹{product.price}
                </span>
              </>
            )}
          </div>

          {/* SIZE */}
          <div className="mt-10">
            <h3 className="font-bold text-lg mb-5">SELECT SIZE</h3>

            <div className="flex flex-wrap gap-4">
              {product.sizes?.map((size: string) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-16 h-16 rounded-full border ${
                    selectedSize === size
                      ? "border-[#d6c2a8] text-[#d6c2a8]"
                      : "border-white/20"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* FULLSCREEN PREVIEW */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt=""
            className="max-h-[90%] max-w-[90%] object-contain"
          />

          <button className="absolute top-6 right-6 text-white text-3xl">
            ✕
          </button>
        </div>
      )}

      {/* REVIEWS */}
      <div className="max-w-7xl mx-auto px-4 mt-24">
        <ProductReviews productId={product.id} />
      </div>

    </main>
  );
}