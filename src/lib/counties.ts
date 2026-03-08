// Michigan counties sourced from GeoJSON data (public/geo/counties/26.json)
// County names are stored as display names; slugs are lowercase with spaces replaced by hyphens

const MICHIGAN_COUNTIES = [
  "Alcona", "Alger", "Allegan", "Alpena", "Antrim", "Arenac", "Baraga", "Barry",
  "Bay", "Benzie", "Berrien", "Branch", "Calhoun", "Cass", "Charlevoix", "Cheboygan",
  "Chippewa", "Clare", "Clinton", "Crawford", "Delta", "Dickinson", "Eaton", "Emmet",
  "Genesee", "Gladwin", "Gogebic", "Grand Traverse", "Gratiot", "Hillsdale", "Houghton",
  "Huron", "Ingham", "Ionia", "Iosco", "Iron", "Isabella", "Jackson", "Kalamazoo",
  "Kalkaska", "Kent", "Keweenaw", "Lake", "Lapeer", "Leelanau", "Lenawee", "Livingston",
  "Luce", "Mackinac", "Macomb", "Manistee", "Marquette", "Mason", "Mecosta", "Menominee",
  "Midland", "Missaukee", "Monroe", "Montcalm", "Montmorency", "Muskegon", "Newaygo",
  "Oakland", "Oceana", "Ogemaw", "Ontonagon", "Osceola", "Oscoda", "Otsego", "Ottawa",
  "Presque Isle", "Roscommon", "Saginaw", "Sanilac", "Schoolcraft", "Shiawassee",
  "St. Clair", "St. Joseph", "Tuscola", "Van Buren", "Washtenaw", "Wayne", "Wexford",
];

// Map of state slugs to their county lists
// Add more states here as they are supported
const STATE_COUNTIES: Record<string, string[]> = {
  michigan: MICHIGAN_COUNTIES,
};

/**
 * Convert a county name to a URL slug.
 * e.g., "Grand Traverse" -> "grand-traverse", "St. Clair" -> "st.-clair"
 */
function countyNameToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

/**
 * Check if a slug matches a county name for a given state.
 * Returns the display name of the county if found, or null if not a county.
 */
export function getCountyBySlug(stateSlug: string, slug: string): string | null {
  const counties = STATE_COUNTIES[stateSlug];
  if (!counties) return null;

  for (const county of counties) {
    if (countyNameToSlug(county) === slug) {
      return county;
    }
  }
  return null;
}
