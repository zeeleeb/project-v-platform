import LobbyTags from "./LobbyTags";
import MoneySection from "./MoneySection";
import FindingsSection from "./FindingsSection";
import Link from "next/link";
import Image from "next/image";

interface Person {
  id: string;
  name: string;
  slug: string;
  title?: string;
  office_sought?: string;
  jurisdiction: string;
  party?: string;
  photo_url?: string;
}

interface LobbyTag {
  industry: string;
  total_amount: number;
  tag_color: string;
}

interface Contribution {
  donor_name: string;
  donor_type: string;
  amount: number;
  date: string;
  industry_name: string;
}

interface Report {
  report_markdown?: string;
}

interface Lawsuit {
  case_name: string;
  court: string;
  filed_date: string;
  description: string;
  settlement_amount?: number;
  taxpayer_cost?: number;
  status: string;
}

interface TransparencyScore {
  overall_grade: string;
  foia_compliance: number;
  meetings_compliance: number;
  disclosure_score: number;
}

interface DossierPageProps {
  person: Person;
  personType: string;
  lobbyTags: LobbyTag[];
  report: Report | null;
  contributions: Contribution[];
  lawsuits: Lawsuit[];
  transparencyScore: TransparencyScore | null;
}

function gradeColor(grade: string): string {
  switch (grade) {
    case "A": return "text-green-400";
    case "B": return "text-blue-400";
    case "C": return "text-yellow-400";
    case "D": return "text-orange-400";
    case "F": return "text-red-400";
    default: return "text-gray-400";
  }
}

export default function DossierPage({
  person,
  personType,
  lobbyTags,
  report,
  contributions,
  lawsuits,
  transparencyScore,
}: DossierPageProps) {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <Link href="/map" className="text-red-400 hover:text-red-300 text-sm">
          &larr; Back to Map
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-start gap-6 mb-6">
          {person.photo_url && (
            <Image
              src={person.photo_url}
              alt={person.name}
              width={96}
              height={96}
              className="w-24 h-24 rounded-lg object-cover"
              unoptimized
            />
          )}
          <div>
            <h1 className="text-4xl font-bold font-[family-name:var(--font-space)]">
              {person.name}
            </h1>
            <p className="text-xl text-gray-400 mt-1">
              {person.title || person.office_sought} -- {person.jurisdiction}
              {person.party && ` (${person.party})`}
            </p>
            {personType === "candidate" && (
              <span className="inline-block mt-2 px-3 py-1 bg-blue-900 text-blue-300 rounded text-sm font-semibold">
                CANDIDATE
              </span>
            )}
            <LobbyTags tags={lobbyTags} />
          </div>
        </div>

        {transparencyScore && (
          <div className="bg-gray-900 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold mb-3">Transparency Score</h2>
            <div className="flex items-center gap-4">
              <span className={`text-6xl font-bold ${gradeColor(transparencyScore.overall_grade)}`}>
                {transparencyScore.overall_grade}
              </span>
              <div className="text-sm text-gray-400 space-y-1">
                <p>FOIA Compliance: {transparencyScore.foia_compliance}%</p>
                <p>Open Meetings: {transparencyScore.meetings_compliance}%</p>
                <p>Financial Disclosure: {transparencyScore.disclosure_score}%</p>
              </div>
            </div>
          </div>
        )}

        <MoneySection contributions={contributions} />

        <FindingsSection report={report} />

        {lawsuits.length > 0 && (
          <section className="bg-gray-900 rounded-xl p-6 mt-6">
            <h2 className="text-2xl font-bold mb-4">Lawsuits</h2>
            {lawsuits.map((l: Lawsuit, i: number) => (
              <div key={i} className="border-b border-gray-800 py-4 last:border-0">
                <h3 className="text-white font-semibold">{l.case_name}</h3>
                <p className="text-gray-400 text-sm">{l.court} -- Filed: {l.filed_date}</p>
                <p className="text-gray-300 mt-1">{l.description}</p>
                {l.settlement_amount && (
                  <p className="text-red-400 font-semibold mt-1">
                    Settlement: ${l.settlement_amount.toLocaleString()}
                    {l.taxpayer_cost && ` (Taxpayer cost: $${l.taxpayer_cost.toLocaleString()})`}
                  </p>
                )}
                <span className={`inline-block mt-2 text-xs px-2 py-1 rounded ${
                  l.status === "settled" ? "bg-yellow-900 text-yellow-300" :
                  l.status === "dismissed" ? "bg-gray-800 text-gray-400" :
                  "bg-red-900 text-red-300"
                }`}>
                  {l.status}
                </span>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
