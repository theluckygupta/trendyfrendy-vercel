"use client";

import { useState } from "react";

import {
  collection,
  addDoc,
} from "firebase/firestore";

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { db, storage } from "@/lib/firebase";

export default function AdminPage() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [imageFile, setImageFile] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  async function addProduct() {

    if (
      !name ||
      !price ||
      !description ||
      !category ||
      !imageFile
    ) {
      alert("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      const storageRef = ref(
        storage,
        `products/${Date.now()}-${imageFile.name}`
      );

      await uploadBytes(
        storageRef,
        imageFile
      );

      const imageUrl =
        await getDownloadURL(storageRef);

      await addDoc(
        collection(db, "products"),
        {
          name,
          price,
          description,
          category,
          image: imageUrl,
          createdAt: Date.now(),
        }
      );

      alert("Product Added Successfully!");

      setName("");
      setPrice("");
      setDescription("");
      setCategory("");
      setImageFile(null);

    } catch (error) {

      console.error(error);

      alert("Something went wrong");

    } finally {

      setLoading(false);

    }

  }

  return (

    <main className="min-h-screen bg-black text-white px-6 py-20">

      <div className="max-w-3xl mx-auto">

        <div className="mb-16">

          <p className="uppercase tracking-[0.3em] text-[#d6c2a8] text-sm mb-4">
            TrendyFrendy
          </p>

          <h1 className="text-5xl font-bold">
            Admin Dashboard
          </h1>

        </div>

        <div className="space-y-6">

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full bg-[#111] border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-[#d6c2a8]"
          />

          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            className="w-full bg-[#111] border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-[#d6c2a8]"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full bg-[#111] border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-[#d6c2a8]"
          />

          <textarea
            placeholder="Description"
            rows={5}
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full bg-[#111] border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-[#d6c2a8]"
          />

          <input
            type="file"
            onChange={(e) =>
              setImageFile(
                e.target.files?.[0]
              )
            }
            className="w-full bg-[#111] border border-white/10 rounded-2xl px-6 py-5"
          />

          <button
            onClick={addProduct}
            disabled={loading}
            className="w-full bg-white text-black py-5 rounded-full text-lg font-semibold hover:bg-[#d6c2a8] transition"
          >
            {loading
              ? "Adding Product..."
              : "Add Product"}
          </button>

        </div>

      </div>

    </main>

  );
}