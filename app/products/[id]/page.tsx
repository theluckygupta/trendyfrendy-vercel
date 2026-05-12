import Link from "next/link";
import PageTransition from "@/components/PageTransition";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {

  const { id } = await params;

  const products = [
    {
      id: "black-kurti",
      name: "Black Cotton Kurti",
      price: "₹1499",
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop",
      description:
        "Elegant premium cotton kurti crafted for modern ethnic fashion.",
    },

    {
      id: "festive-set",
      name: "Festive Designer Set",
      price: "₹2499",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      description:
        "Luxury festive collection with elegant detailing and premium fabric.",
    },

    {
      id: "luxury-style",
      name: "Luxury Ethnic Wear",
      price: "₹3299",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
      description:
        "Modern designer ethnic wear inspired by luxury fashion aesthetics.",
    },
  ];

  const product = products.find(
    (p) => p.id === id
  );

  if (!product) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Product not found
      </main>
    );
  }

  return (
    <PageTransition>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-10 py-5 bg-black border-b border-white/10 z-50">

        <Link
          href="/"
          className="text-2xl font-bold tracking-[0.2em] uppercase text-white"
        >
          TrendyFrendy
        </Link>

        <Link
          href="/"
          className="border border-white/20 text-white px-6 py-3 rounded-full hover:border-[#d6c2a8] hover:text-[#d6c2a8] transition"
        >
          Home
        </Link>

      </nav>

      <main className="min-h-screen bg-black text-white px-6 pt-32 pb-20">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-start">

          {/* LEFT */}
          <div className="md:sticky md:top-32">

            <div className="overflow-hidden rounded-[2rem] mb-4">

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[700px] object-cover"
              />

            </div>

            <div className="grid grid-cols-3 gap-4">

              {[1, 2, 3].map((i) => (

                <div
                  key={i}
                  className="overflow-hidden rounded-2xl border border-white/10"
                >

                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-32 w-full object-cover"
                  />

                </div>

              ))}

            </div>

          </div>

          {/* RIGHT */}
          <div>

            <p className="uppercase tracking-[0.3em] text-[#d6c2a8] text-sm mb-4">
              TrendyFrendy Collection
            </p>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {product.name}
            </h1>

            <p className="text-3xl text-[#d6c2a8] mb-8">
              {product.price}
            </p>

            {/* SIZE */}
            <div className="mb-10">

              <p className="uppercase tracking-[0.3em] text-sm text-[#d6c2a8] mb-4">
                Select Size
              </p>

              <div className="flex gap-4">

                {["S", "M", "L", "XL"].map((size) => (

                  <button
                    key={size}
                    className="border border-white/20 px-6 py-3 rounded-full hover:border-[#d6c2a8] hover:text-[#d6c2a8] transition"
                  >
                    {size}
                  </button>

                ))}

              </div>

            </div>

            {/* DETAILS */}
            <div className="space-y-4 mb-12">

              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-gray-400">
                  Fabric
                </span>

                <span>
                  Premium Cotton
                </span>
              </div>

              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-gray-400">
                  Fit
                </span>

                <span>
                  Regular Fit
                </span>
              </div>

              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-gray-400">
                  Shipping
                </span>

                <span>
                  Free Pan India
                </span>
              </div>

              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-gray-400">
                  Delivery
                </span>

                <span>
                  4–7 Working Days
                </span>
              </div>

            </div>

            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              {product.description}
            </p>

            <a
              href="https://wa.me/917019650441"
              target="_blank"
              className="inline-block bg-white text-black px-10 py-4 rounded-full text-lg font-semibold hover:bg-[#d6c2a8] transition"
            >
              Order on WhatsApp
            </a>

          </div>

        </div>

        {/* RELATED */}
        <section className="max-w-7xl mx-auto mt-32">

          <div className="mb-16">

            <p className="uppercase tracking-[0.3em] text-[#d6c2a8] text-sm mb-4">
              You May Also Like
            </p>

            <h2 className="text-5xl font-bold">
              Related Styles
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-10">

            {products.map((item) => (

              <Link
                key={item.id}
                href={`/products/${item.id}`}
                className="group transition duration-500 hover:-translate-y-2"
              >

                <div className="overflow-hidden rounded-[2rem] bg-[#111] hover:shadow-[0_0_40px_rgba(214,194,168,0.15)]">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-[450px] w-full object-cover group-hover:scale-110 transition duration-700"
                  />

                </div>

                <div className="mt-6">

                  <div className="flex justify-between items-center">

                    <h3 className="text-2xl font-semibold">
                      {item.name}
                    </h3>

                    <span className="text-[#d6c2a8] text-lg">
                      {item.price}
                    </span>

                  </div>

                </div>

              </Link>

            ))}

          </div>

        </section>

      </main>

    </PageTransition>
  );
}