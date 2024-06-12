import { createConnection, executeQuery } from "@/utils/mysql";

export type ReviewWithName = Review & {
  name: string;
  title: string;
  vote: number;
};

const getReviewsByBook = async (bookId: string) => {
  try {
    const connection = await createConnection();

    const data = await executeQuery<Promise<ReviewWithName[]>, string[]>(
      connection,
      "select R.text, R.id as reviewId, Books.title, R.id, Users.name from Reviews R JOIN Books ON R.book_id = Books.id JOIN Users ON Users.id = R.user_id WHERE R.book_id = ?",
      [bookId]
    );
    await connection.quit();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export default getReviewsByBook;
