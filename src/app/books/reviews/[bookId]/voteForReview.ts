"use server";

import { auth } from "@/auth";
import { createConnection, executeQuery } from "@/utils/mysql";
import { revalidatePath } from "next/cache";

const voteForReview = async (idReview: string) => {
  const session = await auth();

  try {
    const connection = await createConnection();

    await executeQuery<Promise<void>, { user_id: number; review_id: number }>(
      connection,
      "INSERT INTO Votes SET ?",
      {
        user_id: parseInt(session?.user?.id ?? "", 10),
        review_id: parseInt(idReview, 10),
      }
    );

    await connection.quit();

    revalidatePath("/books/reviews/[bookId]");

    return {
      message: "A voté",
    };
  } catch (e) {
    return {
      message: e instanceof Error ? e.message : "une erreur est survenue",
    };
  }
};

export default voteForReview;
