"use client";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

export default function AdminLoginPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleLogin() {

    try {

      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      localStorage.setItem(
        "admin-auth",
        "true"
      );

      router.push("/admin");

    } catch (error) {

      console.log(error);

      alert("Invalid credentials");

    }

    setLoading(false);

  }

  return (

    <main className="min-h-screen bg-black flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-[2rem] p-10 text-white">

        <h1 className="text-4xl font-black mb-3">
          Admin Login
        </h1>

        <p className="text-gray-400 mb-10">
          TrendyFrendy Admin Access
        </p>

        <div className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-5 py-4 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-5 py-4 outline-none"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-white text-black py-4 rounded-xl font-semibold hover:bg-[#d6c2a8] transition"
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>

        </div>

      </div>

    </main>

  );

}