import { createConnection, executeQuery } from "@/utils/mysql";

export type ReviewWithName = Review & {
  name: string;
  title: string;
};

const getBookById = async (bookId: string) => {
  try {
    const connection = await createConnection();

    const data = await executeQuery<Promise<Book[]>, string[]>(
      connection,
      "select * from Books WHERE id = ?",
      [bookId]
    );
    await connection.end();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export default getBookById;
