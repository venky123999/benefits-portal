import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-700 text-white p-5">
        <h1 className="text-3xl font-bold">
          National Social Benefits Portal
        </h1>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto py-20 px-6 text-center">
        <h2 className="text-5xl font-bold text-gray-800">
          Apply for Government Welfare Schemes
        </h2>

        <p className="mt-6 text-lg text-gray-600">
          A secure and accessible portal to apply for pensions,
          scholarships, subsidies, and other government benefits.
        </p>

        <Link href="/apply">
  <button className="mt-10 bg-blue-700 text-white px-8 py-4 rounded-lg hover:bg-blue-800">
    Apply Now
  </button>
</Link>
             </section>
    </main>
  );
}