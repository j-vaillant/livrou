"use server";

import { signIn } from "@/auth";

export const signInUser = async (_prevState: unknown, formData: FormData) => {
  let shouldRedirect = false;
  let message = "";

  try {
    await signIn("credentials", {
      login: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });
    shouldRedirect = true;
  } catch (error) {
    message = "impossible de se connecter";
  } finally {
    return { message, shouldRedirect };
  }
};
