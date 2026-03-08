import { supabase } from "@/lib/supabase";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";

interface Official {
  id: number;
  name: string;
  slug: string;
  title: string | null;
  office: string | null;
  level: string | null;
  jurisdiction: string | null;
  party: string | null;
  state: string | null;
}

interface Candidate {
  id: number;
  name: string;
  slug: string;
  office_sought: string | null;
  level: string | null;
  jurisdiction: string | null;
  party: string | null;
  state: string | null;
}

interface PageProps {
  searchParams: { q?: string };
}

export default async function SearchPage({ searchParams }: PageProps) {
  const query = searchParams.q || "";
  let officials: Official[] = [];
  let candidates: Candidate[] = [];

  if (query.length >= 2) {
    const [officialRes, candidateRes] = await Promise.all([
      supabase
        .from("officials")
        .select("id, name, slug, title, office, level, jurisdiction, party, state")
        .ilike("name", `%${query}%`)
        .limit(20),
      supabase
        .from("candidates")
        .select("id, name, slug, office_sought, level, jurisdiction, party, state")
        .ilike("name", `%${query}%`)
        .limit(20),
    ]);
    officials = officialRes.data || [];
    candidates = candidateRes.data || [];
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <Link href="/map" className="text-red-400 hover:text-red-300 text-sm">&larr; Map</Link>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Search Officials &amp; Candidates</h1>
        <SearchBar initialQuery={query} />

        {query && (
          <div className="mt-8">
            <p className="text-gray-400 mb-4">
              {officials.length + candidates.length} results for &quot;{query}&quot;
            </p>

            {officials.map((o) => (
              <Link
                key={`o-${o.id}`}
                href={`/${o.state?.toLowerCase() === "mi" ? "michigan" : o.state}/${o.slug}`}
                className="block bg-gray-900 rounded-lg p-4 mb-3 hover:bg-gray-800 transition"
              >
                <p className="text-white font-semibold">{o.name}</p>
                <p className="text-gray-400 text-sm">
                  {o.title || o.office} -- {o.jurisdiction} {o.party && `(${o.party})`}
                </p>
              </Link>
            ))}

            {candidates.map((c) => (
              <Link
                key={`c-${c.id}`}
                href={`/${c.state?.toLowerCase() === "mi" ? "michigan" : c.state}/${c.slug}`}
                className="block bg-gray-900 rounded-lg p-4 mb-3 hover:bg-gray-800 transition"
              >
                <p className="text-white font-semibold">{c.name}</p>
                <p className="text-gray-400 text-sm">
                  Candidate for {c.office_sought} -- {c.jurisdiction} {c.party && `(${c.party})`}
                </p>
                <span className="text-xs bg-blue-900 text-blue-300 px-2 py-0.5 rounded mt-1 inline-block">
                  CANDIDATE
                </span>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
