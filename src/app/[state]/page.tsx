import { supabase } from "@/lib/supabase";
import * as localData from "@/lib/local-data";
import OfficialsList from "@/components/OfficialsList";
import Link from "next/link";

const STATE_NAMES: Record<string, string> = {
  michigan: "Michigan",
};

const useLocal = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co";

interface PageProps {
  params: { state: string };
}

export default async function StatePage({ params }: PageProps) {
  const stateName = STATE_NAMES[params.state] || params.state;
  const stateAbbrev = params.state === "michigan" ? "MI" : params.state.toUpperCase().slice(0, 2);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  let officials: any[] = [];
  let candidatesList: any[] = [];
  let tags: any[] = [];

  if (useLocal) {
    officials = localData.getStateOfficials(stateAbbrev);
    candidatesList = localData.getStateCandidates(stateAbbrev);
    tags = officials.flatMap((o: any) => localData.getLobbyTags(o.id, "official"));
  } else {
    // Fetch state-level officials
    const { data: officialsData } = await supabase
      .from("officials")
      .select("id, name, slug, title, office, level, party, photo_url")
      .eq("state", stateAbbrev)
      .eq("level", "state")
      .order("office")
      .order("name");
    officials = officialsData || [];

    // Fetch state-level candidates
    const { data: candidatesData } = await supabase
      .from("candidates")
      .select("id, name, slug, office_sought, level, party, photo_url")
      .eq("state", stateAbbrev)
      .eq("level", "state")
      .order("office_sought")
      .order("name");
    candidatesList = candidatesData || [];

    // Fetch lobby tags for all state officials
    const officialIds = officials.map((o: any) => o.id as number);
    const { data: tagsData } = officialIds.length
      ? await supabase
          .from("lobby_tags")
          .select("*")
          .eq("person_type", "official")
          .in("person_id", officialIds)
      : { data: [] };
    tags = tagsData || [];
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <Link href="/map" className="text-red-400 hover:text-red-300 text-sm">&larr; Map</Link>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-space)]">
          {stateName}
        </h1>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold mb-6">State Officials</h2>
        <OfficialsList
          officials={officials}
          tags={tags}
          state={params.state}
          personType="official"
        />

        {candidatesList.length > 0 && (
          <>
            <h2 className="text-3xl font-bold mb-6 mt-12">Candidates</h2>
            <OfficialsList
              officials={candidatesList}
              tags={[]}
              state={params.state}
              personType="candidate"
            />
          </>
        )}

        <h2 className="text-3xl font-bold mb-6 mt-12">Counties</h2>
        <p className="text-gray-400">
          <Link href="/map" className="text-red-400 hover:text-red-300">
            Use the interactive map
          </Link>{" "}
          to explore county-level officials.
        </p>
      </main>
    </div>
  );
}
