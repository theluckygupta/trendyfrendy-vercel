import type { Metadata } from "next";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrendyFrenzy",
  description: "Luxury Fashion Store by TrendyFrendy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-[#0a0a0a] text-white antialiased">

        <AuthProvider>
          <WishlistProvider>
            <CartProvider>

              {/* 🔥 MAIN WRAPPER (FIXED) */}
              <div className="min-h-full flex flex-col bg-black text-white">
                {children}
              </div>

            </CartProvider>
          </WishlistProvider>
        </AuthProvider>

      </body>
    </html>
  );
}