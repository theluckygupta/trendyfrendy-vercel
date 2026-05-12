"use client";

import { useState } from "react";

export default function AdminPage() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  function login() {

    if (
      email === "theluckygupta" &&
      password === "Lucky@1998$"
    ) {

      alert("Login successful");

    } else {

      alert("Invalid credentials");

    }

  }

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        <p className="uppercase tracking-[0.3em] text-[#d6c2a8] text-sm mb-4">
          TrendyFrendy
        </p>

        <h1 className="text-5xl font-bold mb-10">
          Admin Login
        </h1>

        <div className="space-y-6">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full bg-[#111] border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-[#d6c2a8]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full bg-[#111] border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-[#d6c2a8]"
          />

          <button
            onClick={login}
            className="w-full bg-white text-black py-5 rounded-full font-semibold hover:bg-[#d6c2a8] transition"
          >
            Login
          </button>

        </div>

      </div>

    </main>

  );
}