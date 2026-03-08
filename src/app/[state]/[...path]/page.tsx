import { supabase } from "@/lib/supabase";
import * as localData from "@/lib/local-data";
import DossierPage from "@/components/DossierPage";
import { notFound } from "next/navigation";

const useLocal = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co";

interface PageProps {
  params: { state: string; path: string[] };
}

export default async function PersonPage({ params }: PageProps) {
  const personSlug = params.path[params.path.length - 1];

  if (personSlug === "candidates") {
    return <div className="min-h-screen bg-gray-950 text-white p-8">Candidates page coming soon</div>;
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  let person: any = null;
  let personType = "official";
  let lobbyTags: any[] = [];
  let report: any = null;
  let contributionsList: any[] = [];
  let lawsuitsList: any[] = [];
  let score: any = null;

  if (useLocal) {
    // Try officials first, then candidates
    person = localData.getOfficialBySlug(personSlug);
    personType = "official";

    if (!person) {
      person = localData.getCandidateBySlug(personSlug);
      personType = "candidate";
    }

    if (!person) notFound();

    lobbyTags = localData.getLobbyTags(person.id, personType);
    report = localData.getReport(person.id, personType);
    contributionsList = localData.getContributions(person.id, personType);
    lawsuitsList = localData.getLawsuits(person.id, personType);
    score = localData.getTransparencyScore(person.id, personType);
  } else {
    // Try officials first, then candidates
    const { data: officialData } = await supabase
      .from("officials")
      .select("*")
      .eq("slug", personSlug)
      .single();

    person = officialData;
    personType = "official";

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
      { data: tagsData },
      { data: reportData },
      { data: contributionsData },
      { data: lawsuitsData },
      { data: scoreData },
    ] = await Promise.all([
      supabase.from("lobby_tags").select("*").eq("person_id", person.id).eq("person_type", personType).order("total_amount", { ascending: false }),
      supabase.from("investigation_reports").select("*").eq("person_id", person.id).eq("person_type", personType).single(),
      supabase.from("contributions").select("*").eq("person_id", person.id).eq("person_type", personType).order("amount", { ascending: false }).limit(100),
      supabase.from("lawsuits").select("*").eq("person_id", person.id).eq("person_type", personType),
      supabase.from("transparency_scores").select("*").eq("person_id", person.id).eq("person_type", personType).single(),
    ]);

    lobbyTags = tagsData || [];
    report = reportData;
    contributionsList = contributionsData || [];
    lawsuitsList = lawsuitsData || [];
    score = scoreData;
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */

  return (
    <DossierPage
      person={person}
      personType={personType}
      lobbyTags={lobbyTags}
      report={report}
      contributions={contributionsList}
      lawsuits={lawsuitsList}
      transparencyScore={score}
    />
  );
}
