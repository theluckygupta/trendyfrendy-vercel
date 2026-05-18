"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const WishlistContext =
  createContext<any>(null);

export function WishlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [wishlistItems, setWishlistItems] =
  useState<any[]>([]);

const [mounted, setMounted] =
  useState(false);

  useEffect(() => {

  const savedWishlist =
    localStorage.getItem(
      "wishlist"
    );

  if (savedWishlist) {

    setWishlistItems(
      JSON.parse(
        savedWishlist
      )
    );

  }

  setMounted(true);

}, []);

  useEffect(() => {

  if (!mounted) return;

  localStorage.setItem(
    "wishlist",
    JSON.stringify(
      wishlistItems
    )
  );

}, [
  wishlistItems,
  mounted,
]);
  function toggleWishlist(
    product: any
  ) {

    const exists =
      wishlistItems.find(
        (
          item: any
        ) =>

          item.id ===
          product.id
      );

    if (exists) {

      setWishlistItems(
        wishlistItems.filter(
          (
            item: any
          ) =>

            item.id !==
            product.id
        )
      );

      alert(
  "Removed from Wishlist 💔"
);

      return false;

    }

    setWishlistItems([
      ...wishlistItems,
      product,
    ]);

    alert(
  "Favorited ❤️"
);

    return true;

  }

  return (

    <WishlistContext.Provider
      value={{

        wishlistItems,

        toggleWishlist,

      }}
    >

      {children}

    </WishlistContext.Provider>

  );

}

export function useWishlist() {

  return useContext(
    WishlistContext
  );

}