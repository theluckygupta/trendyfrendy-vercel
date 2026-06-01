"use client";

import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";

export default function WishlistPage() {
  const { user, loginWithGoogle } = useAuth();
  const { wishlistItems, toggleWishlist } = useWishlist();

  // 🔒 LOGIN REQUIRED
  if (!user) {
    return (
      <>
        <Navbar/>
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
          <p>Login to view wishlist</p>
          <button
            onClick={loginWithGoogle}
            className="bg-white text-black px-6 py-3 rounded-full"
          >
            Login
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar/>

      <main className="bg-[#0a0a0a] text-white min-h-screen pt-24 px-6">
        <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
  <h2 className="text-2xl font-semibold mb-3">
    Your Wishlist is Empty 💔
  </h2>
  <p className="text-gray-400 mb-6">
    Save items you love and find them here later
  </p>

  <a
    href="/collections"
    className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-[#d6c2a8] transition"
  >
    Browse Products
  </a>
</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fadeIn">
            
            {wishlistItems.map((item: any) => (
             <div
  key={item.id}
  className="relative group transition duration-300 hover:scale-[1.02]"
>

                {/* PRODUCT */}
                <ProductCard product={item.productData} />

                {/* REMOVE BUTTON */}
                <button
  onClick={() => toggleWishlist(item.productData)}
  className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-md hover:scale-110 transition z-20"
>
  ❌
</button>

              </div>
            ))}

          </div>
        )}
      </main>
    </>
  );
}