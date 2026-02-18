/**
 * Slugify string for use in URL hashes and element IDs.
 * Lowercase, spaces to hyphens, strip non-alphanumeric except hyphen.
 */
export function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}
