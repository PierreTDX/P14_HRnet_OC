import { normalizeString } from "../../utils/tools/normalizeString";

// Fonction de comparaison des chaînes en ignorant les accents
export const compareStringIgnoreAccent = (a, b) => {
  const normalizedA = normalizeString(a);
  const normalizedB = normalizeString(b);
  return normalizedA.localeCompare(normalizedB);
};

// Fonction dynamique de tri
export const sortByFieldIgnoreAccent = (field) => (a, b) =>
  compareStringIgnoreAccent(a[field], b[field]);