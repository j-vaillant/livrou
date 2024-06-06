import { NextRequest, NextResponse } from "next/server";
import { createConnection, executeQuery } from "@/utils/mysql";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const connexion = await createConnection();

  connexion.connect();

  try {
    await executeQuery<Book[], { text: string }>(
      connexion,
      "INSERT INTO reviews SET ?",
      {
        text: body.review,
      }
    );

    return NextResponse.json({ message: "Review ajoutée !" }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { error: "Une erreur est survenue !" },
      { status: 200 }
    );
  } finally {
    connexion.end();
  }
}
