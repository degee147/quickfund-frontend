import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <section className="text-center py-12">
        <h2 className="text-4xl font-bold mb-4 text-blue-700">
          Welcome to QuickFund
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Fast, secure micro-loans at your fingertips.
        </p>
        <Link
          href="/register"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
}
