"use client";

import {
  useState,
} from "react";

export default function ProductClient({
  product,
}: {
  product: any;
}) {

  const [selectedImage] =
    useState(
      product.mainImage
    );

  return (

    <main className="min-h-screen bg-[#0a0a0a] text-white px-6 py-24">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">

        <div>

          <div className="overflow-hidden rounded-[2rem] bg-[#111]">

            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-[750px] object-cover"
            />

          </div>

        </div>

        <div className="flex flex-col justify-center">

          <p className="uppercase tracking-[0.35em] text-sm text-[#d6c2a8] mb-5">

            {product.category ||
              "Luxury Collection"}

          </p>

          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-8">

            {product.name}

          </h1>

          <p className="text-gray-300 text-xl leading-relaxed mb-10">

            {product.shortDescription}

          </p>

          <div className="flex items-center gap-5 mb-10">

            <p className="text-5xl font-bold">

              ₹
              {product.salePrice ||
                product.price}

            </p>

            {product.salePrice && (

              <p className="text-2xl text-gray-500 line-through">

                ₹{product.price}

              </p>

            )}

          </div>

          <a
            href={`https://wa.me/917019650441?text=Hi, I want to order ${product.name}`}
            target="_blank"
            className="bg-white text-black px-10 py-5 rounded-full font-semibold w-fit hover:bg-[#d6c2a8] transition"
          >

            Order on WhatsApp

          </a>

        </div>

      </div>

    </main>

  );

}