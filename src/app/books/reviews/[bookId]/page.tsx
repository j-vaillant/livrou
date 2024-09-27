import { FC } from "react";
import getReviewsByBook from "./getReviewsByBook";
import getBookById from "./getBookById";
import ReviewList from "./ReviewList";

type Props = {
  params: {
    bookId: string;
  };
};

const BooksReviews: FC<Props> = async ({ params }) => {
  const reviews = await getReviewsByBook(params.bookId);
  const book = await getBookById(params.bookId);

  console.log(book, "BOOK?");

  if (!book) {
    return null;
  }

  return <ReviewList book={book[0]} reviews={reviews} />;
};

export default BooksReviews;
