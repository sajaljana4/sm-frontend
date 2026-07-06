/** Presentation helpers for rendering profile (UserType) data. */

/** Years from a date-of-birth string, or null when unavailable/invalid. */
export const calculateAge = (dob?: string): number | null => {
  if (!dob) return null;
  const birth = new Date(dob);
  if (Number.isNaN(birth.getTime())) return null;
  const diff = Date.now() - birth.getTime();
  return Math.abs(new Date(diff).getUTCFullYear() - 1970);
};

/** cm → feet/inches with the cm value in parentheses, e.g. `5'9" (175 cm)`. */
export const formatHeight = (height?: number): string => {
  if (!height) return "—";
  const totalInches = Math.round(height / 2.54);
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  return `${feet}'${inches}" (${height} cm)`;
};

/** Turn a stored value ("never_married", "self-employed") into a label. */
export const humanize = (value?: string | number | null): string => {
  if (value === undefined || value === null || value === "") return "—";
  return String(value)
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

/** Humanize a list, dropping empties. */
export const humanizeList = (values?: Array<string | number>): string[] =>
  (values ?? []).map((v) => humanize(v)).filter((v) => v !== "—");

export const fullName = (u: {
  firstName?: string;
  middleName?: string;
  lastName?: string;
}): string =>
  [u.firstName, u.middleName, u.lastName].filter(Boolean).join(" ").trim() ||
  "Unnamed";
