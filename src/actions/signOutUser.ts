"use server";

import { signOut } from "@/auth";

export const signOutUser = async () => {
  try {
    await signOut({ redirect: false });
  } catch (e) {
    throw e;
  }
};
