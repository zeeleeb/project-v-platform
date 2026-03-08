import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold font-[family-name:var(--font-space)]">
        PROJECT <span className="text-red-500">V</span>
      </h1>
      <p className="text-xl text-gray-400 mt-4">
        Government Accountability Through Transparency
      </p>
      <Link
        href="/map"
        className="mt-8 px-8 py-4 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded-lg transition"
      >
        Explore the Map
      </Link>
    </main>
  );
}
