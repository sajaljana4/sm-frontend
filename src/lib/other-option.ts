/**
 * Shared helpers for "Other" dropdown handling.
 *
 * Every option list that allows a free-text fallback uses the single sentinel
 * value below (e.g. `{ value: OTHER_OPTION_VALUE, label: "Others" }`). When the
 * user picks it, the UI reveals a text input and writes the typed value back
 * into the SAME form key, replacing the sentinel. The Zod schemas reject any
 * value still equal to the sentinel via {@link OTHER_OPTION_REGEX}, so a user
 * who selects "Others" is forced to specify a value.
 */
export const OTHER_OPTION_VALUE = "others";

/** True when a stored value is the un-specified "Others" sentinel. */
export const isOtherOption = (value?: string | null): boolean =>
  (value ?? "").trim().toLowerCase() === OTHER_OPTION_VALUE;

/**
 * Rejects any value containing the sentinel ("others"). Use inside Zod string
 * schemas so an un-specified "Others" selection fails validation.
 */
export const OTHER_OPTION_REGEX = /^(?!.*others).*$/i;
