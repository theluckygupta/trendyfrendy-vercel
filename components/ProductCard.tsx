"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductCard({ product }: { product: any }) {
  const [hovered, setHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const { wishlistItems, toggleWishlist } = useWishlist();

  const liked = wishlistItems.some(
    (item: any) => item.productId === product.id
  );

  const images = [
    product.mainImage,
    product.leftImage,
    product.rightImage,
    product.backImage,
  ].filter(Boolean);

  function startSlider() {
    if (images.length <= 1) return;

    setHovered(true);

    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % images.length;
      setImageIndex(i);
    }, 800);

    setTimeout(() => clearInterval(interval), 4000);
  }

  function stopSlider() {
    setHovered(false);
    setImageIndex(0);
  }

  const discount =
    product.salePrice && product.price
      ? Math.round(
          ((product.price - product.salePrice) / product.price) * 100
        )
      : null;

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={startSlider}
      onMouseLeave={stopSlider}
    >
      <Link href={`/products/${product.id}`}>
        <div className="bg-[#111] rounded-md overflow-hidden relative">

          {/* IMAGE */}
          <div className="relative overflow-hidden">
            <img
              src={images[imageIndex]}
              alt={product.name}
              className="w-full h-[260px] object-cover transition duration-700 group-hover:scale-110 group-hover:blur-[2px]"
            />

            {/* GRADIENT */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

            {/* DOTS */}
            {hovered && images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                {images.map((_: any, i: number) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i === imageIndex ? "bg-pink-500" : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* ❤️ WISHLIST */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist(product);
              }}
              className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow hover:scale-110 transition z-20"
            >
              <Heart
                size={16}
                className={`transition ${
                  liked
                    ? "text-red-500 scale-125 animate-bounceOnce"
                    : "text-black"
                }`}
              />
            </button>
          </div>

          {/* CONTENT */}
          <div className="p-3 text-white">
            <h3 className="text-sm font-semibold">
              {product.brand || "TrendyFrenzy"}
            </h3>

            <p className="text-sm text-gray-400 line-clamp-1">
              {product.name}
            </p>

            {/* PRICE */}
            <div className="mt-1 flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold">
                ₹{product.salePrice || product.price}
              </span>

              {product.salePrice && (
                <>
                  <span className="text-xs text-gray-500 line-through">
                    ₹{product.price}
                  </span>

                  <span className="text-xs text-orange-400">
                    ({discount}% OFF)
                  </span>
                </>
              )}
            </div>

            {/* SIZES */}
            {product.sizes && (
              <p className="text-xs text-gray-400 mt-1">
                Sizes: {product.sizes.join(", ")}
              </p>
            )}
          </div>

        </div>
      </Link>
    </div>
  );
}