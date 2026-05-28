"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ProductReviews from "@/components/ProductReviews";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";

export default function ProductClient({ productId }: { productId: string }) {
  const { cartItems, setCartItems } = useCart();
  const { wishlistItems, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState<any>(null);
  const [similarProducts, setSimilarProducts] = useState<any[]>([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [pincode, setPincode] = useState("");
  const [pincodeMsg, setPincodeMsg] = useState("");

  const [showSizeChart, setShowSizeChart] = useState(false);
  const [activeTab, setActiveTab] = useState<"size" | "measure">("size");
  const [unit, setUnit] = useState<"in" | "cm">("in");

  useEffect(() => {
    async function fetchData() {
      const docSnap = await getDoc(doc(db, "products", productId));
      if (!docSnap.exists()) return;

      const data: any = { id: docSnap.id, ...docSnap.data() };
      setProduct(data);

      const snapshot = await getDocs(collection(db, "products"));
      const similar = snapshot.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter((p: any) => p.category === data.category && p.id !== data.id)
        .slice(0, 9);

      setSimilarProducts(similar);
    }

    fetchData();
  }, [productId]);

  if (!product) return null;

  const images = [
    product.mainImage,
    product.leftImage,
    product.rightImage,
    product.backImage,
    product.productOnlyImage,
  ].filter(Boolean);

  const sizes = [
    { size: "XS", bust: 32, waist: 26, length: 29 },
    { size: "S", bust: 34, waist: 28, length: 29 },
    { size: "M", bust: 36, waist: 30, length: 29 },
    { size: "L", bust: 38, waist: 32, length: 29 },
    { size: "XL", bust: 40, waist: 34, length: 29 },
    { size: "XXL", bust: 42, waist: 36, length: 29 },
  ];

  const convert = (val: number) =>
    unit === "cm" ? (val * 2.54).toFixed(1) : val;

  const discount =
    product.salePrice && product.price
      ? Math.round(
          ((product.price - product.salePrice) / product.price) * 100
        )
      : null;

  return (
    <main className="bg-black text-white">

      {/* TOP */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-[60%_40%] gap-10">

        {/* IMAGES */}
        <div className="grid grid-cols-2 gap-4">
          {images.map((img: string, i: number) => (
            <div
              key={i}
              onClick={() => setPreviewImage(img)}
              className="bg-[#111] rounded-xl overflow-hidden cursor-zoom-in"
            >
              <img
                src={img}
                className="w-full h-full object-contain hover:scale-110 transition"
              />
            </div>
          ))}
        </div>

        {/* RIGHT CARD */}
        <div className="sticky top-24 h-fit bg-[#111] border border-white/10 rounded-2xl p-6">

          <h2 className="text-xl font-bold">
            {product.brand || "TrendyFrenzy"}
          </h2>

          <h1 className="text-gray-400 text-sm mt-1">
            {product.name}
          </h1>

          <div className="mt-3 text-sm text-gray-300">
            {wishlistItems.length} saved
          </div>

          <div className="mt-4 flex items-center gap-2">
            <span className="text-3xl font-bold">
              ₹{product.salePrice || product.price}
            </span>

            {product.salePrice && (
              <>
                <span className="line-through text-gray-500">
                  ₹{product.price}
                </span>
                <span className="text-orange-400 text-sm">
                  ({discount}% OFF)
                </span>
              </>
            )}
          </div>

          <p className="text-green-400 text-xs mt-1">
            Inclusive of all taxes
          </p>

          {/* SIZE */}
          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <h3 className="text-sm font-semibold">SELECT SIZE</h3>

              <button
                onClick={() => setShowSizeChart(true)}
                className="text-xs text-[#d6c2a8] z-10"
              >
                SIZE CHART
              </button>
            </div>

            <div className="flex gap-3 flex-wrap">
              {product.sizes?.map((s: string) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`w-12 h-12 rounded-full border ${
                    selectedSize === s
                      ? "bg-white text-black"
                      : "border-white/30"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {!selectedSize && (
              <p className="text-red-400 text-xs mt-2">
                Please select a size
              </p>
            )}
          </div>

          {/* BUTTONS */}
          <div className="flex items-center gap-4 mt-6">

            <button
              onClick={() => {
                if (!selectedSize) {
                  alert("Select size first");
                  return;
                }

                setCartItems((prev: any[]) => {
                  if (!Array.isArray(prev)) return [];

                  const exists = prev.find((p) => p.id === product.id);

                  if (exists) {
                    return prev.map((p) =>
                      p.id === product.id
                        ? { ...p, quantity: (p.quantity || 1) + 1 }
                        : p
                    );
                  }

                  return [...prev, { ...product, quantity: 1, size: selectedSize }];
                });
              }}
              className="flex-1 py-4 rounded-full border border-white hover:bg-white hover:text-black transition"
            >
              ADD TO BAG
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist(product);
              }}
              className="w-14 h-14 rounded-full border border-white/30"
            >
              {wishlistItems.some((i: any) => i.id === product.id)
                ? "❤️"
                : "♡"}
            </button>

          </div>

          {/* DELIVERY */}
          <div className="mt-8 border-t border-white/10 pt-6">
            <h3 className="text-sm font-semibold mb-3">
              DELIVERY OPTIONS
            </h3>

            <div className="flex border border-white/20 rounded overflow-hidden">
              <input
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter pincode"
                className="bg-black px-3 py-2 flex-1 outline-none"
              />

              <button
                onClick={() => {
                  if (pincode.length !== 6) {
                    setPincodeMsg("Invalid pincode");
                  } else {
                    setPincodeMsg("Delivery in 3-5 days 🚚");
                  }
                }}
                className="px-4"
              >
                Check
              </button>
            </div>

            {pincodeMsg && (
              <p className="text-xs mt-2 text-green-400">
                {pincodeMsg}
              </p>
            )}
          </div>

          {/* DETAILS */}
          <div className="mt-8 border-t border-white/10 pt-6">
            <h3 className="text-sm font-semibold mb-3">
              PRODUCT DETAILS
            </h3>

            <p className="text-gray-400 text-sm mb-4">
              {product.description || "No description available"}
            </p>
          </div>

        </div>
      </div>

      {/* SIMILAR + REVIEWS */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-[40%_60%] gap-12 border-t border-white/10">

        {/* SIMILAR */}
        <div>
          <h2 className="text-xl font-bold mb-6">
            Similar Products
          </h2>

          <div className="grid grid-cols-3 gap-4">
            {similarProducts.map((item: any) => (
              <Link key={item.id} href={`/products/${item.id}`}>
                <div className="bg-[#111] p-3 rounded-xl hover:scale-105 transition">
                  <img
                    src={item.mainImage}
                    className="w-full h-[180px] object-contain"
                  />
                  <p className="text-sm mt-2 line-clamp-1">
                    {item.name}
                  </p>
                  <p className="text-sm font-semibold">
                    ₹{item.salePrice || item.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* REVIEWS */}
        <div className="max-h-[600px] overflow-y-auto">
          <ProductReviews productId={product.id} />
        </div>

      </div>

      {/* IMAGE MODAL */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50"
        >
          <img src={previewImage} className="max-w-[90%] max-h-[90%]" />
        </div>
      )}

      {/* SIZE CHART */}
      {showSizeChart && (
        <div className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center">

          <div className="bg-[#111] w-[800px] max-w-[95%] rounded-xl">

            <div className="flex justify-between p-4 border-b border-white/10">
              <h2>Size Chart</h2>
              <button onClick={() => setShowSizeChart(false)}>✕</button>
            </div>

            <div className="flex border-b border-white/10">
              <button onClick={() => setActiveTab("size")} className="flex-1 py-3">
                Size
              </button>
              <button onClick={() => setActiveTab("measure")} className="flex-1 py-3">
                Measure
              </button>
            </div>

            <div className="p-6">

              {activeTab === "size" && (
                <table className="w-full text-center">
                  <tbody>
                    {sizes.map((row) => (
                      <tr key={row.size}>
                        <td>
                          <input
                            type="radio"
                            checked={selectedSize === row.size}
                            onChange={() => {
                              setSelectedSize(row.size);
                              setShowSizeChart(false);
                            }}
                          />
                        </td>
                        <td>{row.size}</td>
                        <td>{convert(row.bust)}</td>
                        <td>{convert(row.waist)}</td>
                        <td>{convert(row.length)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === "measure" && (
                <div className="text-center">
                  <img src="/size-guide.png" className="mx-auto max-h-[300px]" />
                </div>
              )}

            </div>

          </div>
        </div>
      )}

    </main>
  );
}