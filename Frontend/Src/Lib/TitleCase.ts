/**
 * Title Case Conversion Utility For Frontend.
 */

const PRESERVED_ACRONYMS = new Set([
  "NIMS", "API", "JWT", "REST", "PDF", "XLSX", "CORS", "CSRF", "UI", "UX",
  "QR", "ID", "FIFO", "JSON", "SQL", "HTML", "CSS", "SPA", "IT", "HR",
  "LT", "AI", "NIET", "NDCH", "NIMC", "NLS", "NCP", "NCN"
]);

const LOWERCASE_WORDS = new Set([
  "a", "an", "the", "and", "but", "or", "for", "nor", "on", "at", "to",
  "from", "by", "with", "in", "of", "as"
]);

export function ToTitleCase(text: string): string {
  if (!text) return "";

  const words = text.trim().split(/\s+/);
  return words
    .map((word, index) => {
      const clean = word.replace(/[^a-zA-Z0-9]/g, "");
      const upper = clean.toUpperCase();

      if (PRESERVED_ACRONYMS.has(upper)) {
        return word.replace(clean, upper);
      }
      if (index > 0 && index < words.length - 1 && LOWERCASE_WORDS.has(clean.toLowerCase())) {
        return word.replace(clean, clean.toLowerCase());
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

