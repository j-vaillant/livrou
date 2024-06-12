import { createConnection, executeQuery } from "@/utils/mysql";
import NewReviewForm from "./NewReviewForm";
import { FC } from "react";

type Props = {
  params: {
    bookId: string;
  };
};

const fetchBookById = async (bookId: string) => {
  const connection = await createConnection();

  const res = await executeQuery<Book[], string[]>(
    connection,
    "select title from Books where id = ?",
    [bookId]
  );

  connection.quit();

  return res;
};

const AddReview: FC<Props> = async ({ params: { bookId } }) => {
  const book = await fetchBookById(bookId);

  return (
    <div className="w-full flex-col flex">
      <span className="inline-block w-full text-center">
        Nouvelle review pour {book[0].title}
      </span>
      <NewReviewForm />
    </div>
  );
};

export default AddReview;
