"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";

export default function CheckoutPage() {

  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const [countryCode, setCountryCode] = useState("+91");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [house, setHouse] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
useEffect(() => {
  console.log("Current User:", user);
}, [user]);

useEffect(() => {
  async function fetchLocation() {
    if (pincode.length !== 6) return;

    try {
      const res = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );

      const data = await res.json();

      if (
        data[0]?.Status === "Success" &&
        data[0]?.PostOffice?.length
      ) {
        const postOffice = data[0].PostOffice[0];

        setCity(postOffice.District || "");
        setState(postOffice.State || "");
      }
    } catch (error) {
      console.error(error);
    }
  }

  fetchLocation();
}, [pincode]);

  const totalMRP = cartItems.reduce(
    (total: number, item: any) =>
      total + Number(item.price) * (item.quantity || 1),
    0
  );

  const totalAmount = cartItems.reduce(
    (total: number, item: any) =>
      total +
      Number(item.salePrice || item.price) *
      (item.quantity || 1),
    0
  );

  const discount = totalMRP - totalAmount;
  async function placeOrder() {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !phone.trim() ||
      !house.trim() ||
      !street.trim() ||
      !landmark.trim() ||
      !city.trim() ||
      !state.trim() ||
      !pincode.trim()
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (!/^[A-Za-z ]+$/.test(firstName)) {
      alert("Enter valid first name");
      return;
    }

    if (!/^[A-Za-z ]+$/.test(lastName)) {
      alert("Enter valid last name");
      return;
    }

    if (!/^[A-Za-z ]+$/.test(city)) {
      alert("Enter valid city");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      alert("Enter valid 10 digit phone number");
      return;
    }

    if (!/^[0-9]{6}$/.test(pincode)) {
      alert("Enter valid 6 digit pincode");
      return;
    }


    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        orderId: "TF" + Date.now(),

        userId: user.uid,
        userEmail: user.email,

        customerName: `${firstName} ${lastName}`,

        phone: `${countryCode}${phone}`,
        countryCode,

        address: {
          house,
          street,
          landmark,
          city,
          state,
          pincode,
        },

        items: cartItems,

        totalMRP,
        discount,
        totalAmount,

        status: "Pending",

        createdAt: Date.now(),
      });

      clearCart();

      window.location.href = "/order-success";

    } catch (error) {
      console.error(error);
      alert("Failed to place order");
    }
  }
console.log("Checkout user:", user);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">

            <div className="flex items-center gap-6 text-sm tracking-[4px] uppercase">

              <div className="text-gray-500">
                Bag
              </div>

              <div className="text-gray-600">
                ----------
              </div>

              <div className="text-green-400 font-semibold">
                Address
              </div>

              <div className="text-gray-600">
                ----------
              </div>

              <div className="text-gray-500">
                Payment
              </div>

            </div>

            <div className="text-green-400 text-sm font-semibold">
              🔒 100% Secure
            </div>

          </div>

          <div className="grid lg:grid-cols-[65%_35%] gap-10">

            {/* LEFT */}
            <div className="bg-[#111] border border-white/10 rounded-2xl p-6">

              <h2 className="text-2xl font-bold mb-6">
                Delivery Address
              </h2>

              <div className="space-y-4">

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) =>
                      setFirstName(
                        e.target.value.replace(/[^a-zA-Z ]/g, "")
                      )
                    }
                    className="bg-black border border-white/20 rounded-lg px-4 py-3"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) =>
                      setLastName(
                        e.target.value.replace(/[^a-zA-Z ]/g, "")
                      )
                    }
                    className="bg-black border border-white/20 rounded-lg px-4 py-3"
                    required
                  />
                </div> {/* closes grid-cols-2 */}

                <div className="flex gap-3">

                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="bg-black border border-white/20 rounded-lg px-4 py-3"
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+971">🇦🇪 +971</option>
                  </select>

                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");

                      if (value.length <= 10) {
                        setPhone(value);
                      }
                    }}
                    maxLength={10}
                    className="flex-1 bg-black border border-white/20 rounded-lg px-4 py-3 outline-none"
                    required
                  />

                </div>

                <input
                  type="text"
                  placeholder="House No / Flat / Floor"
                  value={house}
                  onChange={(e) => setHouse(e.target.value)}
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3"
                />

                <input
                  type="text"
                  placeholder="Street / Area / Locality"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3"
                />

                <input
                  type="text"
                  placeholder="Landmark"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3"
                />

                <div className="grid md:grid-cols-3 gap-4">

                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) =>
                      setCity(
                        e.target.value.replace(/[^a-zA-Z ]/g, "")
                      )
                    }
                    className="bg-black border border-white/20 rounded-lg px-4 py-3 outline-none"
                    required
                  />

                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="bg-black border border-white/20 rounded-lg px-4 py-3 outline-none"
                  >
                    <option value="">Select State</option>

                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Pincode"
                    value={pincode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");

                      if (value.length <= 6) {
                        setPincode(value);
                      }
                    }}
                    maxLength={6}
                    className="bg-black border border-white/20 rounded-lg px-4 py-3 outline-none"
                    required
                  />
          </div>

            </div>

          </div>

        {/* RIGHT */}
        <div>

          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 sticky top-28">

            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">

              {cartItems.map(
                (item: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {item.name}
                      {" "}
                      x
                      {" "}
                      {item.quantity}
                    </span>

                    <span>
                      ₹
                      {(item.salePrice ||
                        item.price) *
                        item.quantity}
                    </span>
                  </div>
                )
              )}

            </div>

            <div className="border-t border-white/10 pt-4 space-y-4">

              <div className="flex justify-between">
                <span>Total MRP</span>
                <span>₹{totalMRP}</span>
              </div>

              <div className="flex justify-between">
                <span>Discount on MRP</span>
                <span className="text-green-400">
                  -₹{discount}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Coupon Discount</span>
                <span className="text-green-400">
                  -₹0
                </span>
              </div>

              <div className="flex justify-between">
                <span>Platform Fee</span>
                <span className="text-green-400">
                  FREE
                </span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-400">
                  FREE
                </span>
              </div>

              <div className="border-t border-white/10 pt-4 flex justify-between items-start text-xl font-bold">

                <div>
                  <p>Total Amount</p>
                  <p className="text-xs text-gray-500 font-normal mt-1">
                    Inclusive of GST
                  </p>
                </div>

                <span>
                  ₹{totalAmount}
                </span>

              </div>

            </div>

            <button
              onClick={placeOrder}
              className="w-full mt-6 py-4 rounded-full bg-white text-black font-bold hover:opacity-90 transition"
            >
              PLACE ORDER
            </button>
          </div> {/* Order Summary Card */}
        </div>   {/* Right Column */}

      </div>     {/* Grid */}

    </div > {/* max-w-7xl */ }
    </main >
  </>
 );
}