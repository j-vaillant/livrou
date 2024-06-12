import { NextRequest, NextResponse } from "next/server";
import { createConnection, executeQuery } from "@/utils/mysql";
import mysql from "serverless-mysql";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const connexion = await createConnection();

  connexion.connect();

  try {
    await executeQuery<
      Book[],
      { text: string; user_id: string; book_id: string }
    >(connexion, "INSERT INTO Reviews SET ?", {
      text: body.review,
      user_id: body.userId,
      book_id: body.bookId,
    });

    return NextResponse.json({ message: "Review ajoutée !" }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { error: "Une erreur est survenue !" },
      { status: 200 }
    );
  } finally {
  }
}
