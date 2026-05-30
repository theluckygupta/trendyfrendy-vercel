import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="text-center max-w-lg">

        <div className="text-6xl mb-6">
          🎉
        </div>

        <h1 className="text-4xl font-bold mb-4">
          Order Placed Successfully
        </h1>

        <p className="text-gray-400 mb-8">
          Thank you for shopping with TrendyFrenzy.
        </p>

        <Link
          href="/collections"
          className="inline-block px-8 py-4 rounded-full bg-white text-black font-semibold"
        >
          Continue Shopping
        </Link>

      </div>

    </main>
  );
}