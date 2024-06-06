"use server";

import { executeQuery, createConnection } from "@/utils/mysql";
import { z } from "zod";

const NewBookSchema = z.object({
  title: z.string().min(1, { message: "ne peut être vide" }),
  summary: z.string().min(1, { message: "ne peut être vide" }),
});

const insertBook = async (_prevState: unknown, formData: FormData) => {
  const data = {
    summary: formData.get("summary") as string,
    title: formData.get("title") as string,
  };

  const validation = NewBookSchema.safeParse(data);

  if (!validation.success) {
    return {
      errors: validation.error.issues.reduce((errorMap, nextError) => {
        return { ...errorMap, [nextError.path[0]]: nextError.message };
      }, {}),
    };
  }

  try {
    const connection = await createConnection();

    await executeQuery<Promise<void>, { title: string; summary: string }>(
      connection,
      "INSERT INTO books SET ?",
      { title: data.title, summary: data.summary }
    );

    connection.end();

    return {
      message: "Livre créé avec succès",
    };
  } catch (e) {
    return {
      message: e instanceof Error ? e.message : "une erreur est survenue",
    };
  }
};

export default insertBook;
