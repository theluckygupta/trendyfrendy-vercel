import type { Metadata } from "next";
import {
  WishlistProvider,
} from "@/context/WishlistContext";
import {
  AuthProvider,
} from "@/context/AuthContext";
import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import "./globals.css";

import {
  CartProvider,
} from "@/context/CartContext";

const geistSans = Geist({

  variable:
    "--font-geist-sans",

  subsets: ["latin"],

});

const geistMono =
  Geist_Mono({

    variable:
      "--font-geist-mono",

    subsets: ["latin"],

  });

export const metadata:
  Metadata = {

  title:
    "TrendyFrenzy",

  description:
    "Luxury Fashion Store by TrendyFrendy",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >

      <body className="min-h-full flex flex-col">
<AuthProvider>

  <WishlistProvider>

    <CartProvider>

      {children}

    </CartProvider>

  </WishlistProvider>

</AuthProvider>

      </body>

    </html>

  );

}