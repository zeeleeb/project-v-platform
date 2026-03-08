interface Finding {
  category: string;
  description: string;
  severity: number;
  statute: string;
  prosecution_status: string;
}

function severityColor(sev: number): string {
  if (sev >= 8) return "text-red-400";
  if (sev >= 6) return "text-orange-400";
  if (sev >= 4) return "text-yellow-400";
  return "text-gray-400";
}

interface Report {
  report_markdown?: string;
}

export default function FindingsSection({ report, findings }: { report: Report | null; findings?: Finding[] }) {
  return (
    <section className="bg-gray-900 rounded-xl p-6 mt-6">
      <h2 className="text-2xl font-bold text-white mb-4">Investigation Report</h2>

      {report?.report_markdown && (
        <div
          className="prose prose-invert max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: report.report_markdown }}
        />
      )}

      {findings && findings.length > 0 && (
        <div className="space-y-4">
          {findings.map((f, i) => (
            <div key={i} className="border-l-4 border-red-500 pl-4 py-2">
              <div className="flex items-center gap-3 mb-1">
                <span className={`text-lg font-bold ${severityColor(f.severity)}`}>
                  [{f.severity}/10]
                </span>
                <span className="text-xs uppercase bg-gray-800 px-2 py-0.5 rounded text-gray-300">
                  {f.category}
                </span>
                <span className={`text-xs uppercase px-2 py-0.5 rounded ${
                  f.prosecution_status === "not_prosecuted"
                    ? "bg-red-900 text-red-300"
                    : f.prosecution_status === "prosecuted"
                    ? "bg-green-900 text-green-300"
                    : "bg-gray-800 text-gray-400"
                }`}>
                  {f.prosecution_status}
                </span>
              </div>
              <p className="text-white">{f.description}</p>
              {f.statute && (
                <p className="text-gray-500 text-sm mt-1">Statute: {f.statute}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
