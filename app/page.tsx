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

import Link from "next/link";

import PageTransition from "@/components/PageTransition";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import {
  useCart,
} from "@/context/CartContext";

export default function Home() {

  const [products, setProducts] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [searchQuery, setSearchQuery] =
    useState("");

  const [selectedProduct, setSelectedProduct] =
    useState<any>(null);

  const [cartOpen, setCartOpen] =
    useState(false);

  const {
    cartItems,
    setCartItems,
    cartTotal,
  } = useCart();

  useEffect(() => {

    async function fetchProducts() {

      try {

        const querySnapshot =
          await getDocs(
            collection(
              db,
              "products"
            )
          );

        const fetchedProducts =
          querySnapshot.docs.map(
            (doc) => ({

              id:
                doc.id,

              ...doc.data(),

            })
          );

        setProducts(
          fetchedProducts
        );

      } catch (error) {

        console.log(error);

      }

      setLoading(false);

    }

    fetchProducts();

  }, []);

  const filteredProducts =
    products.filter(
      (product) => {

        const matchesCategory =

          selectedCategory === "All" ||

          product.category ===
            selectedCategory;

        const matchesSearch =

          product.name
            ?.toLowerCase()
            .includes(
              searchQuery.toLowerCase()
            );

        return (
          matchesCategory &&
          matchesSearch
        );

      }
    );

  return (

    <PageTransition>

      <main className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">

        {/* NAVBAR */}

        <Navbar
  cartCount={
    cartItems.length
  }
/>
        {/* HERO */}

        <Hero />

        {/* PRODUCTS */}

        <section
          id="collections"
          className="px-6 py-28 max-w-7xl mx-auto"
        >

          {/* HEADING */}

          <div className="text-center mb-20">

            <p className="uppercase tracking-[0.35em] text-[#d6c2a8] text-sm mb-5">

              Premium Collections

            </p>

            <h2 className="text-5xl md:text-7xl font-black mb-8">

              Discover Luxury Fashion

            </h2>

            <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-8">

              Explore our premium collection of designer kurties,
              festive wear and modern ethnic fashion.

            </p>

          </div>

          {/* SEARCH */}

          <div className="flex justify-center mb-10">

            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(
                  e.target.value
                )
              }
              className="w-full max-w-2xl bg-[#111] border border-white/10 rounded-full px-6 py-4 text-white outline-none focus:border-[#d6c2a8] transition"
            />

          </div>

          {/* CATEGORY FILTER */}

          <div className="flex flex-wrap justify-center gap-4 mb-20">

            {[
              "All",
              "Cotton",
              "Festive",
              "Designer",
              "Casual",
            ].map((category) => (

              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(
                    category
                  )
                }
                className={`px-6 py-3 rounded-full border transition duration-300 ${
                  selectedCategory ===
                  category
                    ? "bg-white text-black border-white"
                    : "border-white/20 hover:border-[#d6c2a8] hover:text-[#d6c2a8]"
                }`}
              >

                {category}

              </button>

            ))}

          </div>

          {/* LOADING */}

          {loading ? (

            <div className="text-center py-32 text-2xl text-gray-400">

              Loading Products...

            </div>

          ) : filteredProducts.length === 0 ? (

            <div className="text-center py-32 text-2xl text-gray-400">

              No Products Found

            </div>

          ) : (

            <ProductGrid
              products={
                filteredProducts
              }
              setSelectedProduct={
                setSelectedProduct
              }
              setCartItems={
                setCartItems
              }
              setCartOpen={
                setCartOpen
              }
            />

          )}

        </section>

        {/* FEATURE SECTION */}

        <section className="px-6 pb-32">

          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

            <div className="bg-[#111] border border-white/10 rounded-[2rem] p-10">

              <h3 className="text-3xl font-bold mb-5">

                Premium Fabric

              </h3>

              <p className="text-gray-400 leading-8">

                High-quality breathable fabrics designed for comfort and luxury.

              </p>

            </div>

            <div className="bg-[#111] border border-white/10 rounded-[2rem] p-10">

              <h3 className="text-3xl font-bold mb-5">

                Fast Delivery

              </h3>

              <p className="text-gray-400 leading-8">

                Quick and secure delivery across India with trusted shipping partners.

              </p>

            </div>

            <div className="bg-[#111] border border-white/10 rounded-[2rem] p-10">

              <h3 className="text-3xl font-bold mb-5">

                Trusted Brand

              </h3>

              <p className="text-gray-400 leading-8">

                Loved by customers for premium fashion and modern ethnic styling.

              </p>

            </div>

          </div>

        </section>

        {/* FOOTER */}

        <Footer />

        {/* CART DRAWER */}

        <CartDrawer
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
          cartItems={cartItems}
          setCartItems={setCartItems}
          cartTotal={cartTotal}
        />

        {/* QUICK VIEW MODAL */}

        {selectedProduct && (

          <div className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center p-6">

            <div className="bg-[#111] border border-white/10 rounded-[2rem] max-w-5xl w-full grid md:grid-cols-2 overflow-hidden relative">

              <button
                onClick={() =>
                  setSelectedProduct(
                    null
                  )
                }
                className="absolute top-5 right-5 text-3xl hover:text-[#d6c2a8]"
              >

                ×

              </button>

              <img
                src={
                  selectedProduct.mainImage ||
                  selectedProduct.image
                }
                alt={
                  selectedProduct.name
                }
                className="w-full h-full object-cover"
              />

              <div className="p-10 flex flex-col justify-center">

                <p className="uppercase tracking-[0.3em] text-[#d6c2a8] text-sm mb-5">

                  {selectedProduct.category ||
                    "Luxury Collection"}

                </p>

                <h2 className="text-5xl font-black mb-6">

                  {selectedProduct.name}

                </h2>

                <p className="text-gray-400 leading-8 mb-8">

                  {selectedProduct.shortDescription ||
                    selectedProduct.description}

                </p>

                <div className="flex items-center gap-4 mb-10">

                  <p className="text-5xl font-bold">

                    ₹
                    {selectedProduct.salePrice ||
                      selectedProduct.price}

                  </p>

                  {selectedProduct.salePrice && (

                    <p className="text-gray-500 line-through text-2xl">

                      ₹
                      {selectedProduct.price}

                    </p>

                  )}

                </div>

                <div className="flex gap-4">

                  <Link
                    href={`/products/${selectedProduct.id}`}
                    className="px-8 py-4 rounded-full border border-white/10 hover:border-[#d6c2a8] hover:text-[#d6c2a8] transition"
                  >

                    View Product

                  </Link>

                  <button
                    onClick={() => {

                      setCartItems(
                        (prev: any[]) => [

                          ...prev,

                          {
                            ...selectedProduct,
                            quantity: 1,
                          },

                        ]
                      );

                      setCartOpen(true);

                      setSelectedProduct(
                        null
                      );

                    }}
                    className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-[#d6c2a8] transition"
                  >

                    Add to Cart

                  </button>

                </div>

              </div>

            </div>

          </div>

        )}

        {/* WHATSAPP BUTTON */}

        <a
          href="https://wa.me/917019650441"
          target="_blank"
          className="fixed bottom-6 right-6 bg-[#25D366] hover:scale-110 transition text-white px-8 py-4 rounded-full font-semibold shadow-2xl z-50"
        >

          WhatsApp

        </a>

      </main>

    </PageTransition>

  );

}