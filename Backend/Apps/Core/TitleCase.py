"""Title Case Conversion Helper For Python Backend."""

import re

PRESERVED_ACRONYMS = {
    "NIMS", "API", "JWT", "REST", "PDF", "XLSX", "CORS", "CSRF", "UI", "UX",
    "QR", "ID", "FIFO", "JSON", "SQL", "HTML", "CSS", "SPA", "IT", "HR",
    "LT", "AI", "NIET", "NDCH", "NIMC", "NLS", "NCP", "NCN"
}

LOWERCASE_WORDS = {
    "a", "an", "the", "and", "but", "or", "for", "nor", "on", "at", "to",
    "from", "by", "with", "in", "of", "as"
}


def to_title_case(text: str) -> str:
    """Convert String To Strict Title Case While Preserving Technical Acronyms."""
    if not text:
        return ""

    words = str(text).strip().split()
    if not words:
        return ""

    title_words = []
    for i, word in enumerate(words):
        cleaned = re.sub(r"[^A-Za-z0-9]", "", word)
        upper_cleaned = cleaned.upper()

        if upper_cleaned in PRESERVED_ACRONYMS:
            title_words.append(word.replace(cleaned, upper_cleaned))
        elif i > 0 and i < len(words) - 1 and cleaned.lower() in LOWERCASE_WORDS:
            title_words.append(word.replace(cleaned, cleaned.lower()))
        else:
            title_words.append(word.capitalize())

    return " ".join(title_words)

