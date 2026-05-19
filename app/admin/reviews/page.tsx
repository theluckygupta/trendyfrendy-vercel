"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import {
  db,
} from "@/lib/firebase";

export default function ReviewsPage() {

  const [reviews, setReviews] =
    useState<any[]>([]);

  async function fetchReviews() {

    const snapshot =
      await getDocs(
        collection(
          db,
          "reviews"
        )
      );

    const data =
      snapshot.docs.map(
        (doc) => ({

          id:
            doc.id,

          ...doc.data(),

        })
      );

    setReviews(data);

  }

  async function deleteReview(
    id: string
  ) {

    const confirmDelete =
      confirm(
        "Delete Review?"
      );

    if (
      !confirmDelete
    ) return;

    await deleteDoc(
      doc(
        db,
        "reviews",
        id
      )
    );

    fetchReviews();

  }

  useEffect(() => {

    fetchReviews();

  }, []);

  return (

    <div className="p-10">

      <div className="flex items-center justify-between mb-10">

        <h1 className="text-5xl font-black">

          Reviews

        </h1>

        <p className="text-gray-500">

          {reviews.length}
          {" "}
          Reviews

        </p>

      </div>

      <div className="space-y-6">

        {reviews.map(
          (item: any) => (

            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-3xl p-8"
            >

              <div className="flex items-center justify-between mb-5">

                <div>

                  <h2 className="text-2xl font-bold">

                    {item.name ||
                      "Anonymous"}

                  </h2>

                  <p className="text-gray-500">

                    {item.userEmail}

                  </p>

                </div>

                <button
                  onClick={() =>
                    deleteReview(
                      item.id
                    )
                  }
                  className="bg-red-500 text-white px-5 py-3 rounded-xl"
                >

                  Delete

                </button>

              </div>

              <div className="text-yellow-500 text-2xl mb-4">

                {"★".repeat(
                  item.rating
                )}

              </div>

              <p className="text-gray-700 text-lg leading-8">

                {item.review}

              </p>

            </div>

          )
        )}

      </div>

    </div>

  );

}