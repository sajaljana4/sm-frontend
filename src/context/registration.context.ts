import { atom } from "jotai";
import type { RegistrationProfile } from "@/types/auth/registration-params.type";

const STORAGE_KEY = "raibar_registration_data";

function getInitialData(): Partial<RegistrationProfile> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export const registrationDataAtom =
  atom<Partial<RegistrationProfile>>(getInitialData());

/** Derived write atom – merges incoming data and persists to localStorage */
export const updateRegistrationDataAtom = atom(
  null,
  (get, set, update: Partial<RegistrationProfile>) => {
    const current = get(registrationDataAtom);
    const merged = { ...current, ...update };
    set(registrationDataAtom, merged);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  },
);

/** Reset atom – clears both state and localStorage */
export const resetRegistrationDataAtom = atom(null, (_get, set) => {
  set(registrationDataAtom, {});
  localStorage.removeItem(STORAGE_KEY);
});
