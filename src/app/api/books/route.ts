import { NextResponse } from "next/server";
import { createConnection, executeQuery } from "@/utils/mysql";

export async function GET() {
  const connexion = await createConnection();

  connexion.connect();

  const books = await executeQuery<Book[], undefined>(
    connexion,
    "select * from Books"
  );

  await connexion.quit();

  return NextResponse.json({ books }, { status: 200 });
}
