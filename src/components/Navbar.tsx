import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 text-xl font-bold font-[family-name:var(--font-space)] tracking-tight hover:opacity-90 transition">
            PROJECT <span className="text-red-500">V</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link
              href="/map"
              className="text-sm text-gray-300 hover:text-white transition font-medium"
            >
              Map
            </Link>
            <Link
              href="/search"
              className="text-sm text-gray-300 hover:text-white transition font-medium"
            >
              Search
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
