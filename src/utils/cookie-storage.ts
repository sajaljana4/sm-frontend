"use server";

import { cookies } from "next/headers";

const TOKEN_KEY = "raibar_auth_token";

export const getCookie = async (key: string) => {
  return (await cookies()).get(key)?.value;
};

export const setAuthToken = async (token: string) => {
  try {
    (await cookies()).set(TOKEN_KEY, token);
  } catch (error) {
    console.error("Error setting auth token:", error);
    throw new Error("Failed to set token");
  }
};

export const getAuthToken = async () => {
  return await getCookie(TOKEN_KEY);
};

export const removeAuthToken = async () => {
  try {
    (await cookies()).delete(TOKEN_KEY);
  } catch (error) {
    console.error("Error removing auth token:", error);
    // Don't throw - just log the error to avoid breaking logout flow
  }
};
