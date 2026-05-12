"use client";

import { useState } from "react";

import {
  collection,
  addDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export default function AdminPage() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<any>(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function addProduct() {

    if (
      !name ||
      !price ||
      !image ||
      !description
    ) {
      alert("Please fill all fields");
      return;
    }

    try {

      setLoading(true);
      let imageUrl = "";

if (imageFile) {

  const storageRef = ref(
    storage,
    `products/${Date.now()}-${imageFile.name}`
  );

  await uploadBytes(
    storageRef,
    imageFile
  );

  imageUrl = await getDownloadURL(
    storageRef
  );

}

      await addDoc(
        collection(db, "products"),
        {
          name,
          price,
          image: imageUrl,
          description,
          createdAt: Date.now(),
        }
      );

      alert("Product Added!");

      setName("");
      setPrice("");
      setImage("");
      setDescription("");
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

        <h1 className="text-5xl font-bold mb-16">
          Admin Dashboard
        </h1>

        <div className="space-y-6">

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#111] border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-[#d6c2a8]"
          />

          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full bg-[#111] border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-[#d6c2a8]"
          />

          <input
  type="file"
  onChange={(e) =>
    setImageFile(e.target.files?.[0])
  }
  className="w-full bg-[#111] border border-white/10 rounded-2xl px-6 py-5 outline-none"
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

          <button
            onClick={addProduct}
            disabled={loading}
            className="w-full bg-white text-black py-5 rounded-full text-lg font-semibold hover:bg-[#d6c2a8] transition"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>

        </div>

      </div>

    </main>

  );
}