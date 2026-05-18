"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  auth,
} from "@/lib/firebase";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const AuthContext =
  createContext<any>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [user, setUser] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {

          setUser(currentUser);

          setLoading(false);

        }
      );

    return () =>
      unsubscribe();

  }, []);

  async function login() {

    const provider =
      new GoogleAuthProvider();

    await signInWithPopup(
      auth,
      provider
    );

  }

  async function logout() {

    await signOut(auth);

  }

  return (

    <AuthContext.Provider
      value={{

        user,

        login,

        logout,

      }}
    >

      {!loading &&
        children}

    </AuthContext.Provider>

  );

}

export function useAuth() {

  return useContext(
    AuthContext
  );

}