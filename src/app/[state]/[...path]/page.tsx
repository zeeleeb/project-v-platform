import { supabase } from "@/lib/supabase";
import DossierPage from "@/components/DossierPage";
import { notFound } from "next/navigation";

interface PageProps {
  params: { state: string; path: string[] };
}

export default async function PersonPage({ params }: PageProps) {
  const personSlug = params.path[params.path.length - 1];

  if (personSlug === "candidates") {
    return <div className="min-h-screen bg-gray-950 text-white p-8">Candidates page coming soon</div>;
  }

  // Try officials first, then candidates
  let { data: person } = await supabase
    .from("officials")
    .select("*")
    .eq("slug", personSlug)
    .single();

  let personType = "official";

  if (!person) {
    const { data: candidate } = await supabase
      .from("candidates")
      .select("*")
      .eq("slug", personSlug)
      .single();
    person = candidate;
    personType = "candidate";
  }

  if (!person) notFound();

  // Fetch related data in parallel
  const [
    { data: lobbyTags },
    { data: report },
    { data: contributions },
    { data: lawsuits },
    { data: score },
  ] = await Promise.all([
    supabase.from("lobby_tags").select("*").eq("person_id", person.id).eq("person_type", personType).order("total_amount", { ascending: false }),
    supabase.from("investigation_reports").select("*").eq("person_id", person.id).eq("person_type", personType).single(),
    supabase.from("contributions").select("*").eq("person_id", person.id).eq("person_type", personType).order("amount", { ascending: false }).limit(100),
    supabase.from("lawsuits").select("*").eq("person_id", person.id).eq("person_type", personType),
    supabase.from("transparency_scores").select("*").eq("person_id", person.id).eq("person_type", personType).single(),
  ]);

  return (
    <DossierPage
      person={person}
      personType={personType}
      lobbyTags={lobbyTags || []}
      report={report}
      contributions={contributions || []}
      lawsuits={lawsuits || []}
      transparencyScore={score}
    />
  );
}
