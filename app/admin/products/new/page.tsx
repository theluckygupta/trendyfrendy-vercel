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

  const [topLength, setTopLength] =
    useState("");

  const [bottomLength, setBottomLength] =
    useState("");

  const [sleeves, setSleeves] =
    useState("");

  const [sizes, setSizes] =
    useState<string[]>([]);

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

    try {

      const uploadedUrls: string[] = [];

      for (const file of Array.from(files)) {

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

const response =
  await fetch(
    "https://api.cloudinary.com/v1_1/dk3unll8y/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

const uploadData =
  await response.json();

console.log(uploadData);

if (
  uploadData.secure_url
) {

  uploadedUrls.push(
    uploadData.secure_url
  );

}

      }

      setImages(uploadedUrls);

      console.log(uploadedUrls);

    } catch (error) {

      console.log(error);

      alert(
        "Image upload failed"
      );

    }

    setLoading(false);

  }

  async function saveProduct() {

    try {

      setLoading(true);

      const productData = {

        name:
          title || "",

        shortDescription:
          shortDescription || "",

        description:
          description || "",

        category:
          category || "",

        price:
          Number(price) || 0,

        salePrice:
          Number(salePrice) || 0,

        stock:
          Number(stock) || 0,

        topLength:
          topLength || "",

        bottomLength:
          bottomLength || "",

        sleeves:
          sleeves || "",

        sizes:
          sizes || [],

        mainImage:
          images[0] || "",

        images:
          images || [],

        createdAt:
          new Date().toISOString(),

      };

      console.log(productData);

      await addDoc(
        collection(
          db,
          "products"
        ),
        productData
      );

      alert(
        "Product Added Successfully"
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
            Shopify Style Product Creation
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

        <div className="space-y-6">

          <div className="bg-white border border-gray-200 rounded-2xl p-6">

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
              placeholder="One Piece Kurti"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
            />

          </div>

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
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
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
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
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
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
              />

              <div className="md:col-span-2">

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

          </div>

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

            <div className="grid grid-cols-3 gap-4 mt-6">

              {images.map(
                (
                  image,
                  index
                ) => (

                  <img
                    key={index}
                    src={image}
                    alt=""
                    className="w-full h-40 object-cover rounded-xl"
                  />

                )
              )}

            </div>

          </div>

        </div>

        <div className="space-y-6">

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
                    setStock(
                      e.target.value
                    )
                  }
                  placeholder="12"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
                />

              </div>

            </div>

          </div>

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

      </div>

    </div>

  );

}