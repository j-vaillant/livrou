"use client";

import {
  DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS,
  FC,
  useState,
} from "react";
import { ReviewWithName } from "./getReviewsByBook";
import Link from "next/link";
import voteForReview from "./voteForReview";
import { useCurrentSession } from "@/app/SessionManager";

type Props = {
  reviews?: ReviewWithName[];
  voteMap: Record<string, number[]>;
  bookId: string;
};

const ReviewList: FC<Props> = ({ reviews = [], bookId, voteMap }) => {
  const book = reviews[0];
  const [localVoteMap, setLocalVoteMap] = useState(voteMap);
  const session = useCurrentSession();

  const handleVote = async (reviewId: string) => {
    const res = await voteForReview(reviewId);

    setLocalVoteMap((prev) => ({
      ...prev,
      [reviewId]: [
        ...(prev[reviewId] ?? []),
        parseInt(session?.data?.user?.id ?? "", 10),
      ],
    }));
  };

  console.log(localVoteMap);

  return (
    <div>
      {reviews.length > 0 && (
        <div>
          <span className="font-bold inline-block w-full text-center">
            Review du livre {book.title}
          </span>
          {reviews?.map(({ text, id, name }) => {
            return (
              <div
                key={id}
                className="p-2 rounded flex flex-col bg-slate-200 my-2"
              >
                <div className="truncate w-full inline-block">{text}</div>
                <div className="w-full">
                  <div className="ml-auto mt-2">Proposé par {name}</div>
                  <div
                    onClick={() => handleVote(String(id))}
                    className="ml-auto mt-2 cursor-pointer text-blue-500"
                  >
                    {session.status === "authenticated" &&
                      localVoteMap[id] &&
                      !localVoteMap[id].includes(
                        //@ts-ignore work with int
                        parseInt(session.data?.user?.id, 10)
                      ) && <span>{"J'aime"}</span>}
                    {session.status === "authenticated" &&
                      !localVoteMap[id] && <span>{"J'aime"}</span>}
                  </div>

                  <span>
                    {localVoteMap[id] ? localVoteMap[id].length : 0} vote(s)
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <Link className="text-blue-800" href={`/addReview/${bookId}`}>
        Proposer une nouvelle review
      </Link>
    </div>
  );
};

export default ReviewList;
