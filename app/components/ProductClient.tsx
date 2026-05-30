"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ProductReviews from "@/components/ProductReviews";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";

export default function ProductClient({ productId }: { productId: string }) {
  const router = useRouter();
  const { cartItems, setCartItems } = useCart();
  const { wishlistItems, toggleWishlist } = useWishlist();
const [addedToCart, setAddedToCart] = useState(false);
const [showToast, setShowToast] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [similarProducts, setSimilarProducts] = useState<any[]>([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [pincode, setPincode] = useState("");
  const [pincodeMsg, setPincodeMsg] = useState("");

  const [showSizeChart, setShowSizeChart] = useState(false);
  const [activeTab, setActiveTab] = useState<"size" | "measure">("size");
  const [unit, setUnit] = useState<"in" | "cm">("in");

  // 🔥 FETCH DATA
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
  const isInCart = cartItems?.some(
  (item: any) =>
    item.id === product?.id &&
    item.size === selectedSize
);

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
              className="bg-[#111] rounded-xl overflow-hidden cursor-pointer"
            >
              <img
                src={img}
                className="w-full h-full object-contain hover:scale-105 transition"
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
            0 ★ | 0 Reviews
          </div>

          {/* PRICE */}
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
                  ({Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF)
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
                className="text-xs text-[#d6c2a8]"
              >
                SIZE CHART
              </button>
            </div>

        <div className="flex gap-3 flex-wrap">
  {product.sizes?.map((s: string) => {
    const sizeData = sizes.find((sz) => sz.size === s);

    return (
      <div key={s} className="relative group">
        <button
          onClick={() => setSelectedSize(s)}
          className={`w-12 h-12 rounded-full border ${
            selectedSize === s
              ? "bg-white text-black"
              : "border-white/30"
          }`}
        >
          {s}
        </button>

        {/* 🔥 HOVER TOOLTIP */}
        {sizeData && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-56 bg-white text-black text-xs p-3 rounded shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-none z-50">
            <p className="font-semibold">
              Garment Measurement: Bust - {convert(sizeData.bust)}{unit}
            </p>
            <p className="mt-1 text-gray-600">
              The model (height 5'8) is wearing size M
            </p>
          </div>
        )}
      </div>
    );
  })}
</div>

            {!selectedSize && (
              <p className="text-red-400 text-xs mt-2">
                Please select a size
              </p>
            )}
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-6">

            {/* ADD TO CART */}
          <button
  onClick={() => {

    // Already in cart
    if (isInCart) {
      router.push("/cart");
      return;
    }

    if (!selectedSize) {
      alert("Select size first");
      return;
    }

    setCartItems((prev: any[]) => {

      const exists = prev.find(
        (p) =>
          p.id === product.id &&
          p.size === selectedSize
      );

      if (exists) {
        return prev.map((p) =>
          p.id === product.id &&
          p.size === selectedSize
            ? {
                ...p,
                quantity: (p.quantity || 1) + 1,
              }
            : p
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
          size: selectedSize,
        },
      ];
    });

    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  }}
  className={`flex-1 py-4 rounded-full transition font-semibold ${
    isInCart
      ? "bg-white text-black"
      : "border border-white hover:bg-white hover:text-black"
  }`}
>
  {isInCart ? "GO TO BAG →" : "ADD TO BAG"}
</button>
            {/* WISHLIST */}
            <button
              onClick={() => toggleWishlist(product)}
              className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center"
            >
              {wishlistItems.some((i: any) => i.productid === product.id) ? "❤️" : "♡"}
            </button>

          </div>

          {/* PINCODE */}
          <div className="mt-8 border-t border-white/10 pt-6">
            <h3 className="text-sm font-semibold mb-3">DELIVERY OPTIONS</h3>

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
            <h3 className="text-sm font-semibold mb-3">PRODUCT DETAILS</h3>

            <p className="text-gray-400 text-sm mb-4">
              {product.description || "No description available"}
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
              <div>
                <p>Top Length</p>
                <p className="text-white">32</p>
              </div>
              <div>
                <p>Sleeves</p>
                <p className="text-white">18</p>
              </div>
              <div>
                <p>Category</p>
                <p className="text-white">{product.category}</p>
              </div>
              <div>
                <p>Fabric</p>
                <p className="text-white">Cotton</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* SIMILAR + REVIEWS */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-[40%_60%] gap-12 border-t border-white/10">

        <div>
          <h2 className="text-xl font-bold mb-6">Similar Products</h2>

          <div className="grid grid-cols-3 gap-4">
            {similarProducts.map((item: any) => (
              <Link key={item.id} href={`/products/${item.id}`}>
                <div className="bg-[#111] p-3 rounded-xl hover:scale-105 transition">
                  <div className="h-[180px] flex items-center justify-center">
                    <img src={item.mainImage} className="max-h-full object-contain" />
                  </div>
                  <p className="text-sm mt-2 text-gray-300 line-clamp-1">
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
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">

          <div className="bg-[#111] w-[800px] max-w-[95%] rounded-xl overflow-hidden">

            <div className="flex justify-between p-4 border-b border-white/10">
              <h2>Size Chart</h2>
              <button onClick={() => setShowSizeChart(false)}>✕</button>
            </div>

            <div className="flex border-b border-white/10">

  <button
    onClick={() => setActiveTab("size")}
    className={`flex-1 py-3 text-sm transition ${
      activeTab === "size"
        ? "border-b-2 border-white text-white font-semibold"
        : "text-gray-500 hover:text-white"
    }`}
  >
    Size Chart
  </button>

  <button
    onClick={() => setActiveTab("measure")}
    className={`flex-1 py-3 text-sm transition ${
      activeTab === "measure"
        ? "border-b-2 border-white text-white font-semibold"
        : "text-gray-500 hover:text-white"
    }`}
  >
    How to measure
  </button>
{activeTab === "measure" && (
  <div className="p-6 text-center">

    <h3 className="text-lg font-semibold mb-4">
      How to measure yourself
    </h3>

    <img
      src="/size-guide.png"
      alt="size guide"
      className="mx-auto max-h-[300px] object-contain"
    />

    <div className="text-gray-400 text-sm mt-4 space-y-2">
      <p><b>Bust:</b> Measure around fullest part</p>
      <p><b>Waist:</b> Measure natural waistline</p>
      <p><b>Length:</b> Shoulder to hem</p>
    </div>

  </div>
)}
</div>

            {activeTab === "size" && (
              <div className="p-6">
                <table className="w-full text-sm text-center">
                  <thead className="border-b border-white/10 text-gray-400">
  <tr>
    <th></th>
    <th>Size</th>
    <th>Bust ({unit})</th>
    <th>Waist ({unit})</th>
    <th>Length ({unit})</th>
  </tr>
</thead>
                  <tbody>
  {sizes.map((row) => (
    <tr
      key={row.size}
      className="border-b border-white/10 hover:bg-white/5"
    >
      {/* ✅ RADIO BACK */}
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

      {/* ✅ PROPER COLUMNS */}
      <td className="font-semibold">{row.size}</td>
      <td>{convert(row.bust)}</td>
      <td>{convert(row.waist)}</td>
      <td>{convert(row.length)}</td>
    </tr>
  ))}
</tbody>
                </table>
              </div>
            )}

          </div>
        </div>
      )}
{/* 🔥 ADD TO CART TOAST */}
{showToast && (
  <div className="fixed top-6 right-6 bg-[#111] border border-white/10 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 z-[9999] animate-fadeIn">

    <img
      src={product.mainImage}
      className="w-12 h-12 object-cover rounded"
    />

    <div>
      <p className="text-sm font-semibold">Added to bag</p>
      <p className="text-xs text-gray-400 line-clamp-1">
        {product.name}
      </p>
    </div>

  </div>
)}
    </main>
  );
}