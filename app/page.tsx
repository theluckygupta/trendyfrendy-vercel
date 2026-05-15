"use client";
import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {

  async function fetchProducts() {

    const querySnapshot = await getDocs(
      collection(db, "products")
    );

    const fetchedProducts =
      querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

    setProducts(fetchedProducts);

  }

  fetchProducts();

}, []);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const cartTotal = cartItems.reduce((total, item) => {
    const numericPrice = Number(item.price.replace("₹", ""));
    return total + numericPrice;
  }, 0);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <PageTransition>
      <main className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">

        {/* TOP BAR */}
        <div className="w-full bg-[#d6c2a8] text-black text-center py-2 text-sm tracking-widest uppercase font-medium">
          New Festive Collection Available Now ✨
        </div>

        {/* NAVBAR */}
        <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-8 py-5 bg-black z-50 border-b border-white/10">

          <Link href="/">
  <img
    src="/nav.png"
    alt="TrendyFrenzy Logo"
    className="h-12 md:h-14 w-auto"
  />
</Link>

          <div className="hidden md:flex gap-6 text-sm uppercase tracking-widest">
            <a href="#collections" className="hover:text-[#d6c2a8] transition">
              Collections
            </a>

            <a href="#contact" className="hover:text-[#d6c2a8] transition">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-4">

            <button
              onClick={() => setCartOpen(true)}
              className="border border-white/20 text-white px-5 py-2 rounded-full hover:border-[#d6c2a8] hover:text-[#d6c2a8] transition"
            >
              Cart ({cartItems.length})
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-3xl"
            >
              ☰
            </button>

          </div>

        </nav>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="fixed top-0 left-0 w-full h-screen bg-black z-40 flex flex-col justify-center items-center gap-10 text-2xl uppercase tracking-widest">

            <a
              href="#collections"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#d6c2a8]"
            >
              Collections
            </a>

            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#d6c2a8]"
            >
              Contact
            </a>

          </div>
        )}

        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative h-screen flex flex-col justify-center items-center text-center px-6"
        >

          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1600&auto=format&fit=crop')",
            }}
          />

          <div className="absolute inset-0 bg-black/70" />

          <div className="relative z-10">

            <p className="uppercase tracking-[0.4em] text-sm text-[#d6c2a8] mb-6">
              Surat Premium Fashion
            </p>

            <h1 className="text-6xl md:text-8xl font-black leading-tight">
              TRENDY
              <br />
              FRENZY
            </h1>

            <p className="mt-8 text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto">
              Luxury Kurties & Ethnic Fashion Crafted For Modern Women
            </p>

            <a
              href="https://wa.me/917019650441"
              target="_blank"
              className="inline-block mt-10 px-10 py-4 bg-white text-black rounded-full text-lg font-semibold hover:bg-[#d6c2a8] transition duration-300"
            >
              Shop on WhatsApp
            </a>

          </div>

        </motion.section>

        {/* MARQUEE */}
        <div className="overflow-hidden border-y border-white/10 py-4 bg-black">
          <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite] text-[#d6c2a8] uppercase tracking-[0.4em] text-sm">

            <span className="mx-8">New Arrivals</span>
            <span className="mx-8">Premium Ethnic Wear</span>
            <span className="mx-8">Surat Collection</span>
            <span className="mx-8">Luxury Kurties</span>
            <span className="mx-8">Festive Fashion</span>

          </div>
        </div>

        {/* PRODUCTS */}
        <section
          id="collections"
          className="px-6 py-28 max-w-7xl mx-auto"
        >

          <div className="mb-20 text-center">

            <div className="flex justify-center mb-8">
              <input
                type="text"
                placeholder="Search kurties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-xl bg-[#111] border border-white/10 rounded-full px-6 py-4 text-white outline-none focus:border-[#d6c2a8] transition"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-10">
              {["All", "Cotton", "Festive", "Designer"].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full border transition duration-300 ${
                    selectedCategory === category
                      ? "bg-white text-black border-white"
                      : "border-white/20 hover:border-[#d6c2a8] hover:text-[#d6c2a8]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <p className="uppercase tracking-[0.3em] text-[#d6c2a8] text-sm mb-4 mt-10">
              Trending Collections
            </p>

            <h2 className="text-5xl md:text-6xl font-bold">
              Featured Styles
            </h2>

          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-14">

            {filteredProducts.map((product) => (

              <Link
  key={product.id}
  href={`/products/${product.id}`}
  className="group transition duration-500 hover:-translate-y-2"
>

  {/* IMAGE */}

  <div className="relative overflow-hidden rounded-[32px] bg-[#111] h-[520px] mb-6 hover:shadow-[0_0_40px_rgba(214,194,168,0.15)]">

    <img
      src={product.mainImage || product.image}
      alt={product.name}
      className="h-full w-full object-cover group-hover:scale-110 transition duration-700"
    />

    {/* OVERLAY */}

    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

    {/* BADGE */}

    <div className="absolute top-5 left-5 bg-white text-black text-xs px-4 py-2 rounded-full font-semibold">

      NEW

    </div>

  </div>

  {/* INFO */}

  <div>

    <p className="uppercase tracking-[0.25em] text-[#d6c2a8] text-xs mb-3">

      {product.category || "Luxury Collection"}

    </p>

    <h3 className="text-2xl font-semibold mb-3">
      {product.name}
    </h3>

    <p className="text-gray-400 mb-5 leading-7 line-clamp-2">

      {product.shortDescription || product.description}

    </p>

    {/* PRICE */}

    <div className="flex items-center gap-4 mb-6">

      <p className="text-3xl font-bold">

        ₹{product.salePrice || product.price}

      </p>

      {product.salePrice && (

        <p className="text-gray-500 line-through">

          ₹{product.price}

        </p>

      )}

    </div>

    {/* BUTTONS */}

    <div className="flex gap-4">

      <button
        onClick={(e) => {
          e.preventDefault();
          setSelectedProduct(product);
        }}
        className="border border-white/10 px-6 py-3 rounded-full hover:border-[#d6c2a8] hover:text-[#d6c2a8] transition"
      >
        Quick View
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          setCartItems((prev) => [...prev, product]);
          setCartOpen(true);
        }}
        className="border border-white/10 px-6 py-3 rounded-full bg-white text-black hover:bg-[#d6c2a8] transition"
      >
        Add to Cart
      </button>

    </div>

  </div>

</Link>

            ))}

          </div>

        </section>

        {/* FOOTER */}
        <footer
          id="contact"
          className="border-t border-white/10 py-10 text-center text-gray-500"
        >
          <p>
            © 2026 TrendyFrenzy — Surat Fashion Brand
          </p>
        </footer>

        {/* WHATSAPP */}
        <a
          href="https://wa.me/917019650441"
          target="_blank"
          className="fixed bottom-6 right-6 bg-[#25D366] text-white px-6 py-4 rounded-full shadow-2xl text-lg font-semibold hover:scale-110 hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] transition duration-300 z-50"
        >
          WhatsApp
        </a>

        {/* PRODUCT MODAL */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center px-6">

            <div className="bg-[#111] max-w-5xl w-full rounded-[2rem] overflow-hidden grid md:grid-cols-2 relative">

              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 text-3xl z-10 hover:text-[#d6c2a8]"
              >
                ×
              </button>

              <div>
                <img
                  src={selectedProduct.mainImage || selectedProduct.image}
                  alt={selectedProduct.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-10 flex flex-col justify-center">

                <p className="uppercase tracking-[0.3em] text-[#d6c2a8] text-sm mb-4">
                  TrendyFrenzy Collection
                </p>

                <h2 className="text-5xl font-bold mb-6">
                  {selectedProduct.name}
                </h2>

                <p className="text-3xl text-[#d6c2a8] mb-8">
                  ₹{selectedProduct.salePrice || selectedProduct.price}
                </p>

                <p className="text-gray-400 leading-relaxed mb-10">
                  {selectedProduct.description}
                </p>

                <a
                  href="https://wa.me/917019650441"
                  target="_blank"
                  className="inline-block bg-white text-black px-10 py-4 rounded-full text-lg font-semibold hover:bg-[#d6c2a8] transition text-center"
                >
                  Order on WhatsApp
                </a>

              </div>

            </div>

          </div>
        )}

        {/* CART */}
        {cartOpen && (
          <div className="fixed top-0 right-0 h-screen w-full md:w-[450px] bg-[#111] z-[120] border-l border-white/10 p-8 overflow-y-auto">

            <div className="flex justify-between items-center mb-10">

              <h2 className="text-3xl font-bold">
                Your Cart
              </h2>

              <button
                onClick={() => setCartOpen(false)}
                className="text-3xl hover:text-[#d6c2a8]"
              >
                ×
              </button>

            </div>

            <div className="space-y-6">

              {cartItems.map((item, index) => (

                <div
                  key={index}
                  className="flex gap-4 border-b border-white/10 pb-6"
                >

                  <img
                    src={item.mainImage || item.image}
                    alt={item.name}
                    className="w-24 h-28 object-cover rounded-xl"
                  />

                  <div>

                    <h3 className="text-xl font-semibold">
                      {item.name}
                    </h3>

                    <p className="text-[#d6c2a8] mt-2">
                      {item.price}
                    </p>

                    <button
                      onClick={() =>
                        setCartItems((prev) =>
                          prev.filter((_, i) => i !== index)
                        )
                      }
                      className="mt-3 text-sm text-red-400 hover:text-red-300 transition"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))}

              <div className="border-t border-white/10 mt-10 pt-6">

                <div className="flex justify-between items-center text-2xl font-semibold">

                  <span>Total</span>

                  <span className="text-[#d6c2a8]">
                    ₹{cartTotal}
                  </span>

                </div>

                <Link
  href="/checkout"
  className="block mt-6 bg-white text-black text-center py-4 rounded-full font-semibold hover:bg-[#d6c2a8] transition"
>
  Proceed to Checkout
</Link>

              </div>

            </div>

          </div>
        )}

      </main>
    </PageTransition>
  );
}