interface Contribution {
  donor_name: string;
  donor_type: string;
  amount: number;
  date: string;
  industry_name: string;
}

function formatMoney(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
}

export default function MoneySection({ contributions }: { contributions: Contribution[] }) {
  const totalRaised = contributions.reduce((sum, c) => sum + c.amount, 0);

  // Group by industry
  const byIndustry: Record<string, number> = {};
  for (const c of contributions) {
    const ind = c.industry_name || "Uncategorized";
    byIndustry[ind] = (byIndustry[ind] || 0) + c.amount;
  }
  const sortedIndustries = Object.entries(byIndustry).sort((a, b) => b[1] - a[1]);

  return (
    <section className="bg-gray-900 rounded-xl p-6 mt-6">
      <h2 className="text-2xl font-bold text-white mb-4">Who Funds Them</h2>

      <div className="text-3xl font-bold text-green-400 mb-6">
        Total Raised: {formatMoney(totalRaised)}
      </div>

      <div className="space-y-3">
        {sortedIndustries.slice(0, 15).map(([industry, amount]) => {
          const pct = totalRaised > 0 ? (amount / totalRaised) * 100 : 0;
          return (
            <div key={industry}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">{industry}</span>
                <span className="text-white font-semibold">{formatMoney(amount)}</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3">
                <div
                  className="bg-red-500 h-3 rounded-full transition-all"
                  style={{ width: `${Math.min(pct, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <h3 className="text-lg font-semibold text-white mt-8 mb-3">Top Contributions</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-gray-800">
              <th className="text-left py-2">Donor</th>
              <th className="text-left py-2">Type</th>
              <th className="text-right py-2">Amount</th>
              <th className="text-left py-2">Industry</th>
            </tr>
          </thead>
          <tbody>
            {contributions.slice(0, 20).map((c, i) => (
              <tr key={i} className="border-b border-gray-800/50">
                <td className="py-2 text-white">{c.donor_name}</td>
                <td className="py-2 text-gray-400">{c.donor_type}</td>
                <td className="py-2 text-right text-green-400 font-mono">{formatMoney(c.amount)}</td>
                <td className="py-2 text-gray-400">{c.industry_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
