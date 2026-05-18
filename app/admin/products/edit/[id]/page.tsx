"use client";

import {
  doc,
  getDoc,
  updateDoc,
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
  useRouter,
} from "next/navigation";

export default function EditProductPage() {

  const params =
    useParams();

  const router =
    useRouter();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [product, setProduct] =
    useState<any>(null);

  useEffect(() => {

    fetchProduct();

  }, []);

  async function fetchProduct() {

    try {

      const docRef = doc(
        db,
        "products",
        String(params.id)
      );

      const docSnap =
        await getDoc(docRef);

      if (docSnap.exists()) {

        setProduct({

          id:
            docSnap.id,

          ...docSnap.data(),

        });

      }

    } catch (error) {

      console.log(error);

    }

    setLoading(false);

  }

  async function handleImages(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    const files =
      e.target.files;

    if (!files) return;

    setSaving(true);

    const uploadedUrls: string[] = [];

    try {

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

        if (
          uploadData.secure_url
        ) {

          uploadedUrls.push(
            uploadData.secure_url
          );

        }

      }

      setProduct({

        ...product,

        mainImage:
          product.mainImage ||
          uploadedUrls[0],

        images: [
          ...(product.images || []),
          ...uploadedUrls,
        ],

      });

    } catch (error) {

      console.log(error);

      alert("Upload failed");

    }

    setSaving(false);

  }

  async function saveProduct() {

    try {

      setSaving(true);

      await updateDoc(
        doc(
          db,
          "products",
          String(params.id)
        ),
        {

          name:
            product.name,

          shortDescription:
            product.shortDescription,

          description:
            product.description,

          category:
            product.category,

          price:
            product.price,

          salePrice:
            product.salePrice,

          stock:
            product.stock,

          sizes:
            product.sizes || [],

          mainImage:
            product.mainImage,

          images:
            product.images || [],

        }
      );

      alert(
        "Product Updated"
      );

      router.push(
        "/admin/products"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Update failed"
      );

    }

    setSaving(false);

  }

  if (loading) {

    return (

      <div className="p-10">

        Loading...

      </div>

    );

  }

  return (

    <div className="max-w-5xl mx-auto py-10">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-10">

        <div>

          <h1 className="text-4xl font-bold mb-2">

            Edit Product

          </h1>

          <p className="text-gray-500">

            Update product details

          </p>

        </div>

        <button
          onClick={saveProduct}
          disabled={saving}
          className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
        >

          {saving
            ? "Saving..."
            : "Save Changes"}

        </button>

      </div>

      <div className="space-y-6">

        {/* IMAGES */}

        <div className="bg-white border border-gray-200 rounded-3xl p-6">

          <label className="block mb-4 font-semibold">

            Product Images

          </label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImages}
            className="mb-6"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {(product.images || []).map(
              (
                image: string,
                index: number
              ) => (

                <div
                  key={index}
                  className="relative"
                >

                  <img
                    src={image}
                    alt=""
                    className="w-full h-48 rounded-2xl object-cover border"
                  />

                  <button
                    type="button"
                    onClick={() => {

                      const updated =
                        (
                          product.images || []
                        ).filter(
                          (
                            _: string,
                            i: number
                          ) =>
                            i !== index
                        );

                      setProduct({

                        ...product,

                        images:
                          updated,

                        mainImage:
                          updated[0] || "",

                      });

                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full"
                  >

                    ✕

                  </button>

                </div>

              )
            )}

          </div>

        </div>

        {/* NAME */}

        <div className="bg-white border border-gray-200 rounded-3xl p-6">

          <label className="block mb-3 font-semibold">

            Product Name

          </label>

          <input
            type="text"
            value={product.name || ""}
            onChange={(e) =>
              setProduct({

                ...product,

                name:
                  e.target.value,

              })
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
          />

        </div>

        {/* SHORT DESCRIPTION */}

        <div className="bg-white border border-gray-200 rounded-3xl p-6">

          <label className="block mb-3 font-semibold">

            Short Description

          </label>

          <textarea
            rows={3}
            value={
              product.shortDescription || ""
            }
            onChange={(e) =>
              setProduct({

                ...product,

                shortDescription:
                  e.target.value,

              })
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none"
          />

        </div>

        {/* DESCRIPTION */}

        <div className="bg-white border border-gray-200 rounded-3xl p-6">

          <label className="block mb-3 font-semibold">

            Full Description

          </label>

          <textarea
            rows={8}
            value={
              product.description || ""
            }
            onChange={(e) =>
              setProduct({

                ...product,

                description:
                  e.target.value,

              })
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none"
          />

        </div>

        {/* PRICES */}

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white border border-gray-200 rounded-3xl p-6">

            <label className="block mb-3 font-semibold">

              Original Price

            </label>

            <input
              type="text"
              value={product.price || ""}
              onChange={(e) =>
                setProduct({

                  ...product,

                  price:
                    e.target.value,

                })
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
            />

          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6">

            <label className="block mb-3 font-semibold">

              Sale Price

            </label>

            <input
              type="text"
              value={
                product.salePrice || ""
              }
              onChange={(e) =>
                setProduct({

                  ...product,

                  salePrice:
                    e.target.value,

                })
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
            />

          </div>

        </div>

        {/* SIZES */}

        <div className="bg-white border border-gray-200 rounded-3xl p-6">

          <label className="block mb-4 font-semibold">

            Available Sizes

          </label>

          <div className="flex gap-3 flex-wrap">

            {[
              "XS",
              "S",
              "M",
              "L",
              "XL",
              "2XL",
              "3XL",
              "4XL",
              "5XL",
              "6XL",
              "7XL",
              "8XL",
              "9XL",
              "10XL",
            ].map((size) => (

              <button
                key={size}
                type="button"
                onClick={() => {

                  const current =
                    product.sizes || [];

                  if (
                    current.includes(
                      size
                    )
                  ) {

                    setProduct({

                      ...product,

                      sizes:
                        current.filter(
                          (
                            s: string
                          ) =>
                            s !== size
                        ),

                    });

                  } else {

                    setProduct({

                      ...product,

                      sizes: [
                        ...current,
                        size,
                      ],

                    });

                  }

                }}
                className={`px-5 py-3 rounded-xl border transition ${
                  (
                    product.sizes || []
                  ).includes(size)
                    ? "bg-black text-white border-black"
                    : "bg-white border-gray-300"
                }`}
              >

                {size}

              </button>

            ))}

          </div>

        </div>

        {/* CATEGORY + STOCK */}

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white border border-gray-200 rounded-3xl p-6">

            <label className="block mb-3 font-semibold">

              Category

            </label>

            <input
              type="text"
              value={
                product.category || ""
              }
              onChange={(e) =>
                setProduct({

                  ...product,

                  category:
                    e.target.value,

                })
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
            />

          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6">

            <label className="block mb-3 font-semibold">

              Stock

            </label>

            <input
              type="text"
              value={
                product.stock || ""
              }
              onChange={(e) =>
                setProduct({

                  ...product,

                  stock:
                    e.target.value,

                })
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
            />

          </div>

        </div>

      </div>

    </div>

  );

}