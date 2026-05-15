"use client";

import Link from "next/link";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../../../lib/firebase";

import {
  useEffect,
  useState,
} from "react";

export default function ProductsPage() {

  const [products, setProducts] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    fetchProducts();

  }, []);

  async function fetchProducts() {

    try {

      const querySnapshot =
        await getDocs(
          collection(db, "products")
        );

      const items =
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      setProducts(items);

    } catch (error) {

      console.log(error);

    }

  }

  async function handleDelete(
    id: string
  ) {

    const confirmDelete =
      confirm(
        "Delete this product?"
      );

    if (!confirmDelete) return;

    try {

      setLoading(true);

      await deleteDoc(
        doc(db, "products", id)
      );

      setProducts(
        products.filter(
          (item) => item.id !== id
        )
      );

    } catch (error) {

      console.log(error);

      alert("Delete failed");

    }

    setLoading(false);

  }

  return (

    <div>

      {/* HEADER */}

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-4xl font-bold mb-2">
            Products
          </h1>

          <p className="text-gray-500">
            Manage your products
          </p>

        </div>

        <Link
          href="/admin/products/new"
          className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
        >
          Add Product
        </Link>

      </div>

      {/* TABLE */}

      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50 border-b border-gray-200">

            <tr>

              <th className="text-left p-5">
                Product
              </th>

              <th className="text-left p-5">
                Price
              </th>

              <th className="text-left p-5">
                Inventory
              </th>

              <th className="text-left p-5">
                Status
              </th>

              <th className="text-right p-5">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {products.map((product) => (

              <tr
                key={product.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition"
              >

                {/* PRODUCT */}

                <td className="p-5">

                  <div className="flex items-center gap-4">

                    <img
                      src={
                        product.mainImage ||
                        "https://placehold.co/100x100"
                      }
                      alt=""
                      className="w-16 h-16 object-cover rounded-2xl"
                    />

                    <div>

                      <p className="font-semibold text-lg">
                        {product.name}
                      </p>

                      <p className="text-sm text-gray-500 line-clamp-1">
                        {product.shortDescription}
                      </p>

                    </div>

                  </div>

                </td>

                {/* PRICE */}

                <td className="p-5">

                  <div>

                    <p className="font-semibold text-lg">

                      ₹
                      {product.salePrice ||
                        product.price}

                    </p>

                    {product.salePrice && (

                      <p className="text-sm text-gray-400 line-through">

                        ₹{product.price}

                      </p>

                    )}

                  </div>

                </td>

                {/* STOCK */}

                <td className="p-5">

                  {product.stock || 0}

                </td>

                {/* STATUS */}

                <td className="p-5">

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                    Active

                  </span>

                </td>

                {/* ACTIONS */}

                <td className="p-5">

                  <div className="flex items-center justify-end gap-3">

                    <Link
                      href={`/products/${product.id}`}
                      target="_blank"
                      className="border border-gray-300 px-4 py-2 rounded-xl text-sm hover:bg-gray-100 transition"
                    >

                      View

                    </Link>

                    <Link
                      href={`/admin/products/edit/${product.id}`}
                      className="bg-blue-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-600 transition"
                    >

                      Edit

                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(
                          product.id
                        )
                      }
                      disabled={loading}
                      className="bg-red-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-red-600 transition"
                    >

                      Delete

                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}