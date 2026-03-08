// Local data access layer for development without Supabase
// Mirrors the Supabase query patterns used by page components

import {
  officials,
  candidates,
  lobbyTags,
  reports,
  contributions,
  lawsuits,
  transparencyScores,
} from "@/data/michigan";

export function getOfficialBySlug(slug: string) {
  return officials.find((o) => o.slug === slug) || null;
}

export function getCandidateBySlug(slug: string) {
  return candidates.find((c) => c.slug === slug) || null;
}

export function getStateOfficials(state: string) {
  return officials
    .filter((o) => o.state === state && o.level === "state")
    .sort((a, b) => a.office.localeCompare(b.office) || a.name.localeCompare(b.name));
}

export function getStateCandidates(state: string) {
  return candidates
    .filter((c) => c.state === state && (c.level === "state" || c.level === "federal"))
    .sort((a, b) => a.office_sought.localeCompare(b.office_sought) || a.name.localeCompare(b.name));
}

export function getLobbyTags(personId: number, personType: string) {
  return lobbyTags
    .filter((t) => t.person_id === personId && t.person_type === personType)
    .sort((a, b) => b.total_amount - a.total_amount);
}

export function getReport(personId: number, personType: string) {
  return reports.find((r) => r.person_id === personId && r.person_type === personType) || null;
}

export function getContributions(personId: number, personType: string) {
  return contributions
    .filter((c) => c.person_id === personId && c.person_type === personType)
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 100);
}

export function getLawsuits(personId: number, personType: string) {
  return lawsuits.filter((l) => l.person_id === personId && l.person_type === personType);
}

export function getTransparencyScore(personId: number, personType: string) {
  return transparencyScores.find((s) => s.person_id === personId && s.person_type === personType) || null;
}

export function searchByName(query: string) {
  const q = query.toLowerCase();
  const matchedOfficials = officials.filter((o) => o.name.toLowerCase().includes(q));
  const matchedCandidates = candidates.filter((c) => c.name.toLowerCase().includes(q));
  return { officials: matchedOfficials, candidates: matchedCandidates };
}
