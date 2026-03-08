import Link from "next/link";
import Image from "next/image";
import LobbyTags from "./LobbyTags";

interface Official {
  id: number;
  name: string;
  slug: string;
  title?: string;
  office?: string;
  office_sought?: string;
  party?: string;
  photo_url?: string;
}

interface Tag {
  person_id: number;
  industry: string;
  total_amount: number;
  tag_color: string;
}

export default function OfficialsList({
  officials,
  tags,
  state,
  personType,
}: {
  officials: Official[];
  tags: Tag[];
  state: string;
  personType: string;
}) {
  if (!officials.length) {
    return <p className="text-gray-500">No {personType}s found.</p>;
  }

  // Group by office
  const byOffice: Record<string, Official[]> = {};
  for (const o of officials) {
    const office = o.title || o.office || o.office_sought || "Other";
    if (!byOffice[office]) byOffice[office] = [];
    byOffice[office].push(o);
  }

  return (
    <div className="space-y-8">
      {Object.entries(byOffice).map(([office, people]) => (
        <div key={office}>
          <h3 className="text-xl font-semibold text-gray-300 mb-3 border-b border-gray-800 pb-2">
            {office}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {people.map((person) => {
              const personTags = tags.filter((t) => t.person_id === person.id);
              const href = `/${state}/${person.slug}`;

              return (
                <Link
                  key={person.id}
                  href={href}
                  className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition group"
                >
                  <div className="flex items-center gap-3">
                    {person.photo_url && (
                      <Image
                        src={person.photo_url}
                        alt={person.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover"
                        unoptimized
                      />
                    )}
                    <div>
                      <p className="text-white font-semibold group-hover:text-red-400 transition">
                        {person.name}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {person.party && `(${person.party})`}
                      </p>
                    </div>
                  </div>
                  {personTags.length > 0 && (
                    <div className="mt-3">
                      <LobbyTags tags={personTags} />
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
