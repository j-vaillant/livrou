import { createConnection, executeQuery } from "@/utils/mysql";

export type Vote = {
  who: string;
  voted_review: string;
};

const getVotesByBook = async (bookId: string) => {
  try {
    const connection = await createConnection();

    const data = await executeQuery<Promise<Vote[]>, string[]>(
      connection,
      "select reviews.id as voted_review, votes.user_id as who from Votes JOIN Reviews ON Reviews.id = Votes.review_id JOIN Books on Books.id = Reviews.book_id WHERE Books.id = ?",
      [bookId]
    );
    await connection.quit();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export default getVotesByBook;
