/**
 * Formats product names by removing any automatic or legacy "SR " prefix.
 * Example: "SR Classic Black Frame" -> "Classic Black Frame"
 * "Classic Black Frame" -> "Classic Black Frame"
 */
export const formatProductName = (name?: string): string => {
  if (!name) return '';
  return name.replace(/^SR\s+/i, '').trim();
};
