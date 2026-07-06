import { UserType } from "@/types/common/user.type";
import { atom } from "jotai";

export const loginDialogAtom = atom<boolean>(false);
export const userprofileAtom = atom<UserType | null>(null);
