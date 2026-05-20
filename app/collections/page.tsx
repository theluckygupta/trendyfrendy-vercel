"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";

export default function CollectionsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortOption, setSortOption] = useState("recommended");

  // ✅ FETCH PRODUCTS
  useEffect(() => {
    async function fetchProducts() {
      const snapshot = await getDocs(collection(db, "products"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(data);
    }

    fetchProducts();
  }, []);

  // ✅ CATEGORIES
  const categories = [
    "All",
    ...new Set(products.map((p: any) => p.category)),
  ];

  // ✅ FILTER LOGIC
  const filteredProducts = products
    .filter((p: any) =>
      selectedCategory === "All"
        ? true
        : p.category === selectedCategory
    )
    .filter((p: any) => {
      const price = p.salePrice || p.price;

      if (priceFilter === "low") return price < 500;
      if (priceFilter === "mid") return price >= 500 && price <= 1000;
      if (priceFilter === "high") return price > 1000;

      return true;
    });

  // ✅ SORT LOGIC (FIXED POSITION)
  const sortedProducts = [...filteredProducts].sort((a: any, b: any) => {
    const priceA = a.salePrice || a.price;
    const priceB = b.salePrice || b.price;

    if (sortOption === "low") return priceA - priceB;
    if (sortOption === "high") return priceB - priceA;

    return 0;
  });

  return (
    <>
      <Navbar cartCount={0} />

      <main className="bg-[#0a0a0a] text-white min-h-screen pt-24">
        <div className="max-w-7xl mx-auto px-4 flex gap-6">

          {/* LEFT FILTERS */}
          <div className="w-[250px] bg-[#111] border border-white/10 p-4 rounded-lg h-fit sticky top-28">
            <h2 className="font-bold mb-4">FILTERS</h2>

            {/* CATEGORY */}
            <div className="mb-6">
              <p className="font-semibold mb-2">Categories</p>

              <div className="space-y-2 text-sm">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block text-left w-full ${
                      selectedCategory === cat
                        ? "text-[#d6c2a8]"
                        : "text-gray-400"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* PRICE */}
            <div>
              <p className="font-semibold mb-2">Price</p>

              <div className="space-y-2 text-sm">
                <button onClick={() => setPriceFilter("all")} className="block text-left text-gray-400">
                  All
                </button>
                <button onClick={() => setPriceFilter("low")} className="block text-left text-gray-400">
                  Below ₹500
                </button>
                <button onClick={() => setPriceFilter("mid")} className="block text-left text-gray-400">
                  ₹500 - ₹1000
                </button>
                <button onClick={() => setPriceFilter("high")} className="block text-left text-gray-400">
                  Above ₹1000
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex-1">

            {/* TOP BAR */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-lg">
                {selectedCategory === "All"
                  ? "All Products"
                  : selectedCategory}
              </h2>

              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-[#111] border border-white/10 px-3 py-2 rounded-md text-sm text-white"
              >
                <option value="recommended">Recommended</option>
                <option value="low">Price Low to High</option>
                <option value="high">Price High to Low</option>
              </select>
            </div>

            {/* PRODUCTS */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedProducts.length === 0 ? (
                <p className="text-gray-400">No products found</p>
              ) : (
                sortedProducts.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </div>

          </div>
        </div>
      </main>
    </>
  );
}