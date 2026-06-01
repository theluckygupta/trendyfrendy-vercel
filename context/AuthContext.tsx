"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "@/lib/firebase";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";

const AuthContext = createContext<any>(null);
export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ KEEP USER LOGGED IN
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ GOOGLE LOGIN (FIXED NAME)
  async function loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      setUser(result.user);
    } catch (error) {
      console.log("Login error:", error);
    }
  }

  // ✅ LOGOUT
  async function logout() {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.log("Logout error:", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithGoogle, // ✅ FIXED (matches wishlist)
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

// ✅ HOOK
export function useAuth() {
  return useContext(AuthContext);
}