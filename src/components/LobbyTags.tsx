interface LobbyTag {
  industry: string;
  total_amount: number;
  tag_color: string;
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

function formatMoney(amount: number): string {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`;
  return `$${amount.toFixed(0)}`;
}

export default function LobbyTags({ tags }: { tags: LobbyTag[] }) {
  if (!tags.length) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {tags.map((tag) => (
        <span
          key={tag.industry}
          className={`${TAG_COLORS[tag.industry] || "bg-gray-700"} px-3 py-1 rounded-full text-sm font-bold text-white uppercase tracking-wide`}
        >
          {tag.industry} {formatMoney(tag.total_amount)}
        </span>
      ))}
    </div>
  );
}
