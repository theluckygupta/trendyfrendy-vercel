"use client";

import Link from "next/link";
import ProductReviews from "@/components/ProductReviews";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";

export default function ProductClient({
  productId,
}: {
  productId: string;
}) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [similarProducts, setSimilarProducts] = useState<any[]>([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // 🔥 FETCH PRODUCT + SIMILAR
  useEffect(() => {
    async function fetchData() {
      try {
        if (!productId) return;

        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setLoading(false);
          return;
        }

        const data: any = {
          id: docSnap.id,
          ...docSnap.data(),
        };

        setProduct(data);

        // 🔥 SIMILAR PRODUCTS
        const snapshot = await getDocs(collection(db, "products"));

        const similar = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(
            (item: any) =>
              item.category === data.category &&
              item.id !== data.id
          )
          .slice(0, 4);

        setSimilarProducts(similar);
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    }

    fetchData();
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

  const images = [
    product.mainImage,
    product.leftImage,
    product.rightImage,
    product.backImage,
    product.productOnlyImage,
  ].filter(Boolean);

  return (
    <main className="bg-black text-white min-h-screen pt-10">

      {/* 🔥 TOP SECTION */}
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-[55%_45%] gap-10">

        {/* LEFT → IMAGES */}
        <div className="grid grid-cols-2 gap-4">
          {images.map((img: string, i: number) => (
            <div
              key={i}
              onClick={() => setPreviewImage(img)}
              className="bg-[#111] rounded-2xl overflow-hidden cursor-zoom-in flex items-center justify-center"
            >
              <img
                src={img}
                alt=""
                className="max-h-[500px] object-contain"
              />
            </div>
          ))}
        </div>

        {/* RIGHT → PRODUCT INFO */}
        <div className="sticky top-24 h-fit bg-[#111] p-8 rounded-2xl border border-white/10">

          <h2 className="text-2xl font-bold">TrendyFrenzy</h2>

          <h1 className="text-xl text-gray-300 mt-2">
            {product.name}
          </h1>

          {/* PRICE */}
          <div className="mt-6 flex gap-3 items-center">
            <span className="text-3xl font-bold">
              ₹{product.salePrice || product.price}
            </span>

            {product.salePrice && (
              <span className="line-through text-gray-500">
                ₹{product.price}
              </span>
            )}
          </div>

          {/* SIZE */}
          <div className="mt-8">
            <h3 className="font-semibold mb-4">SELECT SIZE</h3>

            <div className="flex gap-3 flex-wrap">
              {product.sizes?.map((size: string) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-full ${
                    selectedSize === size
                      ? "border-white"
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

      {/* 🔥 IMAGE PREVIEW */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            className="max-w-[90%] max-h-[90%] object-contain"
          />
        </div>
      )}

      {/* 🔥 BOTTOM SECTION */}
      <div className="max-w-7xl mx-auto px-4 mt-24 grid lg:grid-cols-[40%_60%] gap-10">

        {/* LEFT → SIMILAR PRODUCTS */}
        <div className="sticky top-24 h-fit">
          <h2 className="text-xl font-bold mb-6">
            Similar Products
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {similarProducts.map((item: any) => (
              <Link key={item.id} href={`/products/${item.id}`}>
                <div className="bg-[#111] rounded-xl overflow-hidden p-2">

                  <div className="h-[180px] flex items-center justify-center">
                    <img
                      src={item.mainImage}
                      alt=""
                      className="max-h-full object-contain"
                    />
                  </div>

                  <p className="text-sm mt-2 line-clamp-1">
                    {item.name}
                  </p>

                  <p className="text-sm text-gray-400">
                    ₹{item.salePrice || item.price}
                  </p>

                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT → REVIEWS */}
        <div>
          <ProductReviews productId={product.id} />
        </div>

      </div>

    </main>
  );
}