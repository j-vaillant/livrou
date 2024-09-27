import { FC } from "react";
import { ReviewWithName } from "./getBookById";

type Props = {
  reviews?: ReviewWithName[];
  book?: Book;
};

const ReviewList: FC<Props> = ({ reviews, book }) => {
  return (
    <div>
      <span className="font-bold inline-block w-full text-center">
        Review du livre {book?.title}
      </span>
      {reviews?.map(({ text, id, name }) => {
        return (
          <div key={id} className="p-2 rounded flex flex-col bg-slate-200 my-2">
            <div className="truncate w-full inline-block">{text}</div>
            <div className="ml-auto mt-2">Proposé par {name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewList;
