"use client";

import { useState } from "react";

import {
  collection,
  addDoc,
} from "firebase/firestore";

import {
  db,
} from "../../../../lib/firebase";

export default function NewProductPage() {

  const [title, setTitle] =
    useState("");

  const [shortDescription, setShortDescription] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [salePrice, setSalePrice] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [stock, setStock] =
    useState("");

  const [images, setImages] =
    useState<string[]>([]);

  const [loading, setLoading] =
    useState(false);

  async function handleImages(
  e: React.ChangeEvent<HTMLInputElement>
) {

  const files = e.target.files;

  if (!files) return;

  setLoading(true);

  const uploadedUrls: string[] = [];

  try {

    for (const file of Array.from(files)) {

      const reader =
        new FileReader();

      const base64Promise =
        new Promise<string>((resolve) => {

          reader.onloadend = () => {

            resolve(
              reader.result as string
            );

          };

        });

      reader.readAsDataURL(file);

      const base64 =
        await base64Promise;

      const response =
        await fetch("/api/upload", {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            file: base64,
          }),

        });

      const data =
        await response.json();

      uploadedUrls.push(data.url);

    }

    setImages(uploadedUrls);

  } catch (error) {

    console.log(error);

    alert("Image upload failed");

  }

  setLoading(false);

}
  async function saveProduct() {

    try {

      setLoading(true);

      await addDoc(
        collection(db, "products"),
        {
          name: title,

          shortDescription,

          description,

          category,

          price,

          salePrice,

          stock,

          mainImage: images[0] || "",

          images,

          createdAt:
            new Date(),
        }
      );

      alert("Product Added Successfully");

      setTitle("");
      setShortDescription("");
      setDescription("");
      setPrice("");
      setSalePrice("");
      setCategory("");
      setStock("");
      setImages([]);

    } catch (error) {

      console.log(error);

      alert("Error adding product");

    }

    setLoading(false);

  }

  return (

    <div className="max-w-7xl mx-auto py-10">

      <div className="flex items-center justify-between mb-10">

        <div>

          <h1 className="text-4xl font-bold mb-2">
            Add Product
          </h1>

          <p className="text-gray-500">
            Shopify Style Product Creation
          </p>

        </div>

        <button
          onClick={saveProduct}
          className="bg-black text-white px-6 py-3 rounded-xl"
        >

          {loading
            ? "Saving..."
            : "Save Product"}

        </button>

      </div>

      <div className="grid lg:grid-cols-[1fr_350px] gap-8">

        {/* LEFT */}

        <div className="space-y-6">

          {/* TITLE */}

          <div className="bg-white border border-gray-200 rounded-2xl p-6">

            <label className="block mb-3 font-medium">
              Product Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="One Piece Kurti"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
            />

          </div>

          {/* SHORT DESCRIPTION */}

          <div className="bg-white border border-gray-200 rounded-2xl p-6">

            <label className="block mb-3 font-medium">
              Short Description
            </label>

            <textarea
              rows={3}
              value={shortDescription}
              onChange={(e) =>
                setShortDescription(
                  e.target.value
                )
              }
              placeholder="Short product summary"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none"
            />

          </div>

          {/* DESCRIPTION */}

          <div className="bg-white border border-gray-200 rounded-2xl p-6">

            <label className="block mb-3 font-medium">
              Full Description
            </label>

            <textarea
              rows={10}
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              placeholder="Write full product description"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none"
            />

          </div>

          {/* MEDIA */}

          <div className="bg-white border border-gray-200 rounded-2xl p-6">

            <label className="block mb-4 font-medium">
              Product Images
            </label>

            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center">

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImages}
              />

            </div>

            {/* PREVIEW */}

            <div className="grid grid-cols-3 gap-4 mt-6">

              {images.map((image, index) => (

                <img
                  key={index}
                  src={image}
                  alt=""
                  className="w-full h-40 object-cover rounded-xl"
                />

              ))}

            </div>

          </div>

          {/* PRICING */}

          <div className="bg-white border border-gray-200 rounded-2xl p-6">

            <h2 className="text-xl font-semibold mb-6">
              Pricing
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <label className="block mb-3 font-medium">
                  Original Price
                </label>

                <input
                  type="text"
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value)
                  }
                  placeholder="1299"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
                />

              </div>

              <div>

                <label className="block mb-3 font-medium">
                  Sale Price
                </label>

                <input
                  type="text"
                  value={salePrice}
                  onChange={(e) =>
                    setSalePrice(
                      e.target.value
                    )
                  }
                  placeholder="999"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
                />

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="space-y-6">

          {/* CATEGORY */}

          <div className="bg-white border border-gray-200 rounded-2xl p-6">

            <h2 className="text-xl font-semibold mb-6">
              Organization
            </h2>

            <div className="space-y-5">

              <div>

                <label className="block mb-3 font-medium">
                  Category
                </label>

                <input
                  type="text"
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value
                    )
                  }
                  placeholder="Cotton"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
                />

              </div>

              <div>

                <label className="block mb-3 font-medium">
                  Stock
                </label>

                <input
                  type="text"
                  value={stock}
                  onChange={(e) =>
                    setStock(e.target.value)
                  }
                  placeholder="12"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
                />

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}