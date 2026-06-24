import kent from "@/data/kent.json";

const RUBRICS = kent.rubrics;
const REMEDIES = kent.remedies;
const BY_ID = Object.fromEntries(RUBRICS.map((r) => [r.id, r]));

export function remedyName(abbr) {
  return REMEDIES[abbr] || abbr;
}

// Normaliza para búsquedas tolerantes a acentos y mayúsculas
function norm(s) {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Busca rúbricas por coincidencia de palabras en el texto (en/es) o capítulo
export function searchRubrics(query, limit = 8) {
  const q = norm(query).trim();
  if (!q) return [];
  const terms = q.split(/[\s,]+/).filter(Boolean);

  const scored = RUBRICS.map((r) => {
    const hay = norm(r.chapter + " " + r.rubric + " " + r.rubric_es);
    let hits = 0;
    for (const t of terms) if (hay.includes(t)) hits += 1;
    return { r, hits };
  })
    .filter((x) => x.hits > 0)
    .sort((a, b) => b.hits - a.hits);

  return scored.slice(0, limit).map((x) => x.r);
}

export function getRubricsByIds(ids = []) {
  return ids.map((id) => BY_ID[id]).filter(Boolean);
}

// Repertorización clásica: por cada remedio, suma de grados y cobertura
// (en cuántas rúbricas aparece). Se ordena por cobertura y luego por puntaje.
export function repertorize(rubrics) {
  const acc = {};
  for (const r of rubrics) {
    for (const [abbr, grade] of r.remedies) {
      if (!acc[abbr]) acc[abbr] = { abbr, name: remedyName(abbr), score: 0, count: 0 };
      acc[abbr].score += grade;
      acc[abbr].count += 1;
    }
  }
  return Object.values(acc).sort(
    (a, b) => b.count - a.count || b.score - a.score || a.name.localeCompare(b.name)
  );
}

// Resuelve rúbricas a partir de ids explícitos o de una consulta de texto,
// y devuelve el análisis completo.
export function analyze({ rubricIds, query, limit = 6 }) {
  let rubrics = [];
  if (Array.isArray(rubricIds) && rubricIds.length) {
    rubrics = getRubricsByIds(rubricIds);
  } else if (query) {
    rubrics = searchRubrics(query, limit);
  }
  return { rubrics, remedies: repertorize(rubrics) };
}

export const meta = {
  repertory: kent.repertory,
  license: kent.license,
  totalRubrics: RUBRICS.length,
  totalRemedies: Object.keys(REMEDIES).length,
};
