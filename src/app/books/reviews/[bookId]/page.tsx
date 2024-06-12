import { FC } from "react";
import getReviewsByBook from "./getReviewsByBook";
import ReviewList from "./ReviewList";

type Props = {
  params: {
    bookId: string;
  };
};

const BooksReviews: FC<Props> = async ({ params }) => {
  const reviews = await getReviewsByBook(params.bookId);

  return <ReviewList reviews={reviews} />
};

export default BooksReviews;
