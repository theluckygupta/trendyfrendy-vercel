"use client";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  db,
} from "@/lib/firebase";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

export default function ProductClient() {

  const params =
    useParams();

  const [product, setProduct] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [selectedImage, setSelectedImage] =
    useState("");

  useEffect(() => {

    async function fetchProduct() {

      try {

        if (!params?.id) {

          setLoading(false);

          return;

        }

        const docRef = doc(
          db,
          "products",
          String(params.id)
        );

        const docSnap =
          await getDoc(docRef);

        if (docSnap.exists()) {

          const data: any = {

            id:
              docSnap.id,

            ...docSnap.data(),

          };

          setProduct(data);

          setSelectedImage(
            data.mainImage || ""
          );

        }

      } catch (error) {

        console.log(error);

      }

      setLoading(false);

    }

    fetchProduct();

  }, [params]);

  if (loading) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center">

        Loading...

      </div>

    );

  }

  if (!product) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center">

        Product Not Found

      </div>

    );

  }

  return (

    <main className="min-h-screen bg-[#0a0a0a] text-white px-6 py-24">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">

        {/* IMAGE */}

        <div>

          <div className="overflow-hidden rounded-[2rem] bg-[#111]">

            {(selectedImage ||
              product.mainImage) ? (

              <img
                src={
                  selectedImage ||
                  product.mainImage
                }
                alt={product.name}
                className="w-full h-[750px] object-cover"
              />

            ) : (

              <div className="w-full h-[750px] flex items-center justify-center text-gray-500">

                No Image

              </div>

            )}

          </div>

        </div>

        {/* CONTENT */}

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

          {/* DETAILS */}

          <div className="space-y-3 mb-10 text-gray-300">

            <p>
              Top Length:
              {" "}
              {product.topLength || "-"}
            </p>

            <p>
              Bottom Length:
              {" "}
              {product.bottomLength || "-"}
            </p>

            <p>
              Sleeves:
              {" "}
              {product.sleeves || "-"}
            </p>

            <p>
              Size:
              {" "}
              {product.size || "-"}
            </p>

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