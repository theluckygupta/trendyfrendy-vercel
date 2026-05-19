"use client";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import {
  db,
} from "@/lib/firebase";

import {
  useEffect,
  useState,
} from "react";

export default function AdminDashboard() {

  const [productsCount, setProductsCount] =
    useState(0);

  const [reviewsCount, setReviewsCount] =
    useState(0);

  const [customersCount, setCustomersCount] =
    useState(0);

  const [revenue, setRevenue] =
    useState(0);

  useEffect(() => {

    async function fetchCounts() {

      try {

        const products =
          await getDocs(
            collection(
              db,
              "products"
            )
          );

        const reviews =
          await getDocs(
            collection(
              db,
              "reviews"
            )
          );

        const customers =
          await getDocs(
            collection(
              db,
              "users"
            )
          );

        const orders =
          await getDocs(
            collection(
              db,
              "orders"
            )
          );

        setProductsCount(
          products.size
        );

        setReviewsCount(
          reviews.size
        );

        setCustomersCount(
          customers.size
        );

        let totalRevenue = 0;

        orders.docs.forEach(
          (doc) => {

            const data: any =
              doc.data();

            totalRevenue +=
              Number(
                data.total || 0
              );

          }
        );

        setRevenue(
          totalRevenue
        );

      } catch (error) {

        console.log(error);

      }

    }

    fetchCounts();

  }, []);

  return (

    <div>

      <div className="mb-10">

        <h1 className="text-4xl font-bold mb-2">

          Dashboard

        </h1>

        <p className="text-gray-500">

          Welcome back, Lucky 👋

        </p>

      </div>

      <div className="grid md:grid-cols-4 gap-6">

        {/* PRODUCTS */}

        <div className="bg-white rounded-2xl p-6 border border-gray-200">

          <p className="text-gray-500 mb-2">

            Products

          </p>

          <h2 className="text-4xl font-bold">

            {productsCount}

          </h2>

        </div>

        {/* REVIEWS */}

        <div className="bg-white rounded-2xl p-6 border border-gray-200">

          <p className="text-gray-500 mb-2">

            Reviews

          </p>

          <h2 className="text-4xl font-bold">

            {reviewsCount}

          </h2>

        </div>

        {/* CUSTOMERS */}

        <div className="bg-white rounded-2xl p-6 border border-gray-200">

          <p className="text-gray-500 mb-2">

            Customers

          </p>

          <h2 className="text-4xl font-bold">

            {customersCount}

          </h2>

        </div>

        {/* REVENUE */}

        <div className="bg-white rounded-2xl p-6 border border-gray-200">

          <p className="text-gray-500 mb-2">

            Revenue

          </p>

          <h2 className="text-4xl font-bold">

            ₹{revenue}

          </h2>

        </div>

      </div>

    </div>

  );

}