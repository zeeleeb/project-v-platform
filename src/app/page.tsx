import Link from "next/link";
import { officials, lobbyTags } from "@/data/michigan";

// Featured officials for the investigations section
const FEATURED_IDS = [1, 4, 6, 8]; // Whitmer, Nessel, Shirkey, Tate

function formatMoney(amount: number): string {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`;
  return `$${amount.toFixed(0)}`;
}

const TAG_COLORS: Record<string, string> = {
  "AIPAC / Pro-Israel": "bg-red-600",
  "Dark Money": "bg-purple-700",
  "Pharma / Healthcare": "bg-blue-600",
  "Fossil Fuel / Energy": "bg-yellow-700",
  "Real Estate / Development": "bg-green-700",
  "Defense / Military": "bg-gray-600",
  "Big Tech": "bg-cyan-700",
  "Banking / Finance": "bg-amber-700",
  "Private Prisons / Law Enforcement": "bg-orange-700",
  "Telecom": "bg-indigo-700",
};

export default function Home() {
  const featuredOfficials = officials.filter((o) => FEATURED_IDS.includes(o.id));

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-24 px-4 text-center">
        <h1 className="text-6xl sm:text-7xl font-bold font-[family-name:var(--font-space)] tracking-tight">
          PROJECT <span className="text-red-500">V</span>
        </h1>
        <p className="text-xl text-gray-400 mt-4 max-w-xl">
          Government Accountability Through Transparency
        </p>
      </section>

      {/* Feature Cards */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Interactive Map */}
          <Link
            href="/map"
            className="group bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-red-500/50 transition-all duration-200"
          >
            <div className="text-3xl mb-3">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition">
              Interactive Map
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Explore every state, county, and city
            </p>
          </Link>

          {/* Campaign Finance */}
          <Link
            href="/michigan"
            className="group bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-red-500/50 transition-all duration-200"
          >
            <div className="text-3xl mb-3">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition">
              Campaign Finance
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Track every dollar of dark money
            </p>
          </Link>

          {/* Search Officials */}
          <Link
            href="/search"
            className="group bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-red-500/50 transition-all duration-200"
          >
            <div className="text-3xl mb-3">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition">
              Search Officials
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Find any government official
            </p>
          </Link>
        </div>
      </section>

      {/* Featured Investigations */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-space)] mb-6">
          Featured Investigations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredOfficials.map((official) => {
            const tags = lobbyTags.filter(
              (t) => t.person_id === official.id && t.person_type === "official"
            );
            return (
              <Link
                key={official.id}
                href={`/michigan/${official.slug}`}
                className="group bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-red-500/50 transition-all duration-200"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`inline-block w-2 h-2 rounded-full ${official.party === "D" ? "bg-blue-500" : official.party === "R" ? "bg-red-500" : "bg-gray-500"}`} />
                  <span className="text-xs text-gray-500 uppercase tracking-wide">
                    {official.party === "D" ? "Democrat" : official.party === "R" ? "Republican" : "Appointed"}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-red-400 transition">
                  {official.name}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {official.title}
                </p>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {tags.map((tag) => (
                      <span
                        key={tag.industry}
                        className={`${TAG_COLORS[tag.industry] || "bg-gray-700"} px-2 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wide`}
                      >
                        {tag.industry} {formatMoney(tag.total_amount)}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 text-center">
        <p className="text-sm text-gray-500">
          Project V &mdash; Government Accountability
        </p>
      </footer>
    </main>
  );
}
