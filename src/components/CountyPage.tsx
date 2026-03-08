import Link from "next/link";

interface Official {
  id: number;
  name: string;
  slug: string;
  title?: string;
  office?: string;
  party?: string;
  photo_url?: string;
}

export default function CountyPage({
  countyName,
  stateName,
  stateSlug,
  officials,
}: {
  countyName: string;
  stateName: string;
  stateSlug: string;
  officials: Official[];
}) {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <Link
          href={`/${stateSlug}`}
          className="text-red-400 hover:text-red-300 text-sm"
        >
          &larr; Back to {stateName}
        </Link>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-space)]">
          {countyName} County
        </h1>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            {countyName} County, {stateName}
          </h2>
          <p className="text-gray-400 text-lg">
            County officials and public accountability data
          </p>
        </div>

        {officials.length > 0 ? (
          <section className="mb-12">
            <h3 className="text-xl font-semibold text-gray-300 mb-4 border-b border-gray-800 pb-2">
              County Officials
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {officials.map((person) => (
                <Link
                  key={person.id}
                  href={`/${stateSlug}/${person.slug}`}
                  className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition group"
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-white font-semibold group-hover:text-red-400 transition">
                        {person.name}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {person.title || person.office}
                        {person.party && ` (${person.party})`}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : (
          <section className="mb-12">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center">
              <div className="text-4xl mb-4 text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                County Officials Coming Soon
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                County-level official data for {countyName} County, {stateName}{" "}
                is being compiled. Check back soon for detailed dossiers,
                campaign finance records, and transparency scores.
              </p>
            </div>
          </section>
        )}

        <div className="flex gap-4">
          <Link
            href="/map"
            className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-5 py-3 rounded-lg transition font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            Explore on Map
          </Link>
          <Link
            href={`/${stateSlug}`}
            className="inline-flex items-center gap-2 bg-red-900/30 hover:bg-red-900/50 text-red-400 px-5 py-3 rounded-lg transition font-medium border border-red-900/50"
          >
            View {stateName} Officials
          </Link>
        </div>
      </main>
    </div>
  );
}
