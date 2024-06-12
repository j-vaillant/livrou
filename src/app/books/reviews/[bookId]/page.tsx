import { FC } from "react";
import getReviewsByBook from "./getReviewsByBook";
import ReviewList from "./ReviewList";
import getVoteByBook from "./getVotesByBook";
import { auth } from "@/auth";

type Props = {
  params: {
    bookId: string;
  };
};

const BooksReviews: FC<Props> = async ({ params }) => {
  const reviews = await getReviewsByBook(params.bookId);
  const votes = await getVoteByBook(params.bookId);
  const session = await auth();

  const map =
    votes?.reduce((acc, next) => {
      if (acc[next.voted_review]) {
        acc[next.voted_review].push(next.who);
      } else {
        acc[next.voted_review] = [next.who];
      }

      return acc;
    }, {} as Record<string, string[]>) ?? {};

  console.log(map, votes, "?");

  return <ReviewList voteMap={map} bookId={params.bookId} reviews={reviews} />;
};

export default BooksReviews;
