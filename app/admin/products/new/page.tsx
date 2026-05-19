"use client";

import { useState } from "react";

import {
  collection,
  addDoc,
} from "firebase/firestore";

import {
  db,
} from "@/lib/firebase";

export default function NewProductPage() {
  const [productCode, setProductCode] =
  useState("");

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

  const [topLength, setTopLength] =
    useState("");

  const [bottomLength, setBottomLength] =
    useState("");

  const [sleeves, setSleeves] =
    useState("");

  const [sizes, setSizes] =
    useState<string[]>([]);

  const [mainImage, setMainImage] =
    useState("");

  const [leftImage, setLeftImage] =
    useState("");

  const [rightImage, setRightImage] =
    useState("");

  const [backImage, setBackImage] =
    useState("");

  const [productOnlyImage, setProductOnlyImage] =
    useState("");

  const [productVideo, setProductVideo] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function uploadFile(
    file: File,
    type: "image" | "video"
  ) {

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    formData.append(
      "upload_preset",
      "trendyfrenzy"
    );

    const endpoint =
      type === "video"

        ? "https://api.cloudinary.com/v1_1/dk3unll8y/video/upload"

        : "https://api.cloudinary.com/v1_1/dk3unll8y/image/upload";

    const response =
      await fetch(
        endpoint,
        {
          method: "POST",
          body: formData,
        }
      );

    const data =
      await response.json();

    return (
      data.secure_url || ""
    );

  }

  async function saveProduct() {

    try {

      setLoading(true);

      const productData = {

        name:
  `TR${productCode}-${title}`,
  
        shortDescription,

        description,

        category,

        price:
          Number(price),

        salePrice:
          Number(salePrice),

        stock:
          Number(stock),

        topLength,

        bottomLength,

        sleeves,

        sizes,

        mainImage,

        leftImage,

        rightImage,

        backImage,

        productOnlyImage,

        productVideo,

        createdAt:
          new Date().toISOString(),

      };

      await addDoc(
        collection(
          db,
          "products"
        ),
        productData
      );

      alert(
        "Product Added Successfully 😎"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed to save product"
      );

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

            Product Creation

          </p>

        </div>

        <button
          onClick={saveProduct}
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded-xl"
        >

          {loading
            ? "Uploading..."
            : "Save Product"}

        </button>

      </div>

      <div className="grid lg:grid-cols-[1fr_350px] gap-8">

        {/* LEFT */}

        <div className="space-y-6">

          {/* TITLE */}

          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="mb-6">

  <label className="block mb-3 font-medium">

    Product Code

  </label>

  <div className="flex items-center">

    <div className="bg-black text-white px-5 py-3 rounded-l-xl border border-black">

      TR

    </div>

    <input
      type="text"
      value={productCode}
      onChange={(e) =>
        setProductCode(
          e.target.value
        )
      }
      placeholder="2008"
      className="w-full border border-gray-300 rounded-r-xl px-4 py-3 outline-none"
    />

  </div>

</div>

            <label className="block mb-3 font-medium">

              Product Title

            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
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
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none"
            />

          </div>

          {/* FULL DESCRIPTION */}

          <div className="bg-white border border-gray-200 rounded-2xl p-6">

            <label className="block mb-3 font-medium">

              Full Description

            </label>

            <textarea
              rows={8}
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none"
            />

          </div>

          {/* PRODUCT DETAILS */}

          <div className="bg-white border border-gray-200 rounded-2xl p-6">

            <h2 className="text-xl font-semibold mb-6">

              Product Details

            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <input
                type="text"
                value={topLength}
                onChange={(e) =>
                  setTopLength(
                    e.target.value
                  )
                }
                placeholder="Top Length"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none"
              />

              <input
                type="text"
                value={bottomLength}
                onChange={(e) =>
                  setBottomLength(
                    e.target.value
                  )
                }
                placeholder="Bottom Length"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none"
              />

              <input
                type="text"
                value={sleeves}
                onChange={(e) =>
                  setSleeves(
                    e.target.value
                  )
                }
                placeholder="Sleeves"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none"
              />

            </div>

            <div className="mt-8">

              <label className="block mb-4 font-medium">

                Available Sizes

              </label>

              <div className="flex gap-3 flex-wrap">

                {[
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "3XL",
                  "4XL",
                  "5XL",
                  "6XL",
                  "7XL",
                  "8XL",
                  "9XL",
                  "10XL",
                ].map((item) => (

                  <button
                    key={item}
                    type="button"
                    onClick={() => {

                      if (
                        sizes.includes(
                          item
                        )
                      ) {

                        setSizes(
                          sizes.filter(
                            (s) =>
                              s !== item
                          )
                        );

                      } else {

                        setSizes([
                          ...sizes,
                          item,
                        ]);

                      }

                    }}
                    className={`px-5 py-3 rounded-xl border transition ${
                      sizes.includes(
                        item
                      )
                        ? "bg-black text-white border-black"
                        : "bg-white border-gray-300"
                    }`}
                  >

                    {item}

                  </button>

                ))}

              </div>

            </div>

          </div>

          {/* MEDIA */}

          <div className="bg-white border border-gray-200 rounded-2xl p-6">

            <h2 className="text-xl font-semibold mb-8">

              Product Media

            </h2>

            <div className="space-y-8">

              {[
                {
                  label:
                    "Main Image",
                  setter:
                    setMainImage,
                  type:
                    "image",
                },

                {
                  label:
                    "Left Side",
                  setter:
                    setLeftImage,
                  type:
                    "image",
                },

                {
                  label:
                    "Right Side",
                  setter:
                    setRightImage,
                  type:
                    "image",
                },

                {
                  label:
                    "Back Side",
                  setter:
                    setBackImage,
                  type:
                    "image",
                },

                {
                  label:
                    "Product Only Image",
                  setter:
                    setProductOnlyImage,
                  type:
                    "image",
                },

                {
                  label:
                    "Video / Reel",
                  setter:
                    setProductVideo,
                  type:
                    "video",
                },

              ].map(
                (
                  item,
                  index
                ) => (

                  <div key={index}>

                    <label className="block mb-3 font-medium">

                      {item.label}

                    </label>

                    <input
                      type="file"
                      accept={
                        item.type ===
                        "video"

                          ? "video/*"

                          : "image/*"
                      }
                      onChange={async (e) => {

                        const file =
                          e.target.files?.[0];

                        if (!file) return;

                        setLoading(true);

                        const url =
                          await uploadFile(
                            file,
                            item.type as any
                          );

                        item.setter(url);

                        setLoading(false);

                      }}
                    />

                  </div>

                )
              )}

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="space-y-6">

          {/* ORGANIZATION */}

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
                    setStock(
                      e.target.value
                    )
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
                />

              </div>

            </div>

          </div>

          {/* PRICING */}

          <div className="bg-white border border-gray-200 rounded-2xl p-6">

            <h2 className="text-xl font-semibold mb-6">

              Pricing

            </h2>

            <div className="space-y-5">

              <div>

                <label className="block mb-3 font-medium">

                  Original Price

                </label>

                <input
                  type="text"
                  value={price}
                  onChange={(e) =>
                    setPrice(
                      e.target.value
                    )
                  }
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