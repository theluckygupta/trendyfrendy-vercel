"use client";

import { useState } from "react";

export default function AdminPage() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loggedIn, setLoggedIn] =
    useState(false);

  function login() {

    if (
      email === "theluckygupta" &&
      password === "Lucky@1998$"
    ) {

      setLoggedIn(true);

    } else {

      alert("Invalid credentials");

    }

  }

  if (loggedIn) {

    return (

      <main className="min-h-screen bg-black text-white px-6 py-20">

        <div className="max-w-6xl mx-auto">

          <div className="flex justify-between items-center mb-16">

            <div>

              <p className="uppercase tracking-[0.3em] text-[#d6c2a8] text-sm mb-4">
                TrendyFrendy
              </p>

              <h1 className="text-5xl font-bold">
                Admin Dashboard
              </h1>

            </div>

            <button
              onClick={() =>
                setLoggedIn(false)
              }
              className="border border-white/10 px-6 py-3 rounded-full hover:border-[#d6c2a8] hover:text-[#d6c2a8] transition"
            >
              Logout
            </button>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-[#111] rounded-[2rem] p-10 border border-white/10">

              <p className="text-gray-400 mb-4">
                Total Products
              </p>

              <h2 className="text-5xl font-bold">
                3
              </h2>

            </div>

            <div className="bg-[#111] rounded-[2rem] p-10 border border-white/10">

              <p className="text-gray-400 mb-4">
                Orders
              </p>

              <h2 className="text-5xl font-bold">
                0
              </h2>

            </div>

            <div className="bg-[#111] rounded-[2rem] p-10 border border-white/10">

              <p className="text-gray-400 mb-4">
                Revenue
              </p>

              <h2 className="text-5xl font-bold">
                ₹0
              </h2>

            </div>

          </div>

        </div>

      </main>

    );

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