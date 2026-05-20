"use client";

import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

const WishlistContext = createContext<any>(null);

export function WishlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const { user, loginWithGoogle } = useAuth();

  const [wishlistItems, setWishlistItems] = useState<any[]>([]);

  // ✅ LOAD WISHLIST FROM FIREBASE
  useEffect(() => {
    async function fetchWishlist() {
      if (!user) {
        setWishlistItems([]);
        return;
      }

      const q = query(
        collection(db, "wishlist"),
        where("userId", "==", user.uid)
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setWishlistItems(data);
    }

    fetchWishlist();
  }, [user]);

  // ✅ TOGGLE WISHLIST (CORRECT PLACE)
  async function toggleWishlist(product: any) {

    // 🔒 FORCE LOGIN
    if (!user) {
      alert("Login required");
      await loginWithGoogle();

      setTimeout(() => {
        toggleWishlist(product); // retry
      }, 500);

      return;
    }

    const q = query(
      collection(db, "wishlist"),
      where("userId", "==", user.uid),
      where("productId", "==", product.id)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      // ❌ REMOVE
      snapshot.forEach(async (docItem) => {
        await deleteDoc(doc(db, "wishlist", docItem.id));
      });

      setWishlistItems((prev) =>
        prev.filter((item: any) => item.productId !== product.id)
      );

      alert("Removed from Wishlist 💔");
      return false;
    } else {
      // ✅ ADD
      const docRef = await addDoc(collection(db, "wishlist"), {
        userId: user.uid,
        productId: product.id,
        productData: product,
        createdAt: Date.now(),
      });

      setWishlistItems((prev) => [
        ...prev,
        {
          id: docRef.id,
          productId: product.id,
          productData: product,
        },
      ]);

      alert("Added to Wishlist ❤️");
      return true;
    }
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
  return useContext(WishlistContext);
}