"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export default function OrdersPage() {
  const { user } = useAuth();  
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid)
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(data);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    }

    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-4xl font-bold mb-10">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-[#111] border border-white/10 rounded-2xl p-8 text-center">
            <p className="text-gray-400">
              No orders found.
            </p>
          </div>
        ) : (
          <div className="space-y-6">

            {orders.map((order: any) => (
              <div
                key={order.id}
                className="bg-[#111] border border-white/10 rounded-2xl p-6"
              >

                <div className="flex flex-col md:flex-row md:justify-between gap-3 mb-4">

                  <div>
                    <p className="text-sm text-gray-400">
                      Order ID
                    </p>

                    <p className="font-semibold">
                      {order.orderId}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">
                      Status
                    </p>

                    <p className="text-green-400 font-semibold">
                      {order.status}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">
                      Amount
                    </p>

                    <p className="font-semibold">
                      ₹{order.totalAmount}
                    </p>
                  </div>

                </div>

                <div className="border-t border-white/10 pt-4">

                  <p className="font-semibold mb-3">
                    Products
                  </p>

                  <div className="space-y-2">

                    {order.items?.map(
                      (item: any, index: number) => (
                        <div
                          key={index}
                          className="flex justify-between text-sm"
                        >
                          <span>
                            {item.name} × {item.quantity}
                          </span>

                          <span>
                            Size: {item.size}
                          </span>
                        </div>
                      )
                    )}

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}