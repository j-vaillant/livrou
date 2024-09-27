"use server";

import { signIn } from "@/auth";
import { revalidatePath } from "next/cache";

export const signInUser = async (_prevState: unknown, formData: FormData) => {
  try {
    await signIn("credentials", {
      login: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    revalidatePath("/");
  } catch (error) {
    return {
      message: "une erreur est survenue",
    };
  } finally {
    return { success: true };
  }
};
