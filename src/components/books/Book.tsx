import { FC } from "react";
import Link from "next/link";

type Props = {
  book: Book;
};

const Book: FC<Props> = ({ book: { id, title, summary } }) => {
  return (
    <div className="p-2 rounded flex flex-col bg-slate-200 my-2">
      <div>
        <b>{title}</b>
      </div>
      <div className="truncate w-full inline-block">{summary}</div>
      <div className="ml-auto mt-2">
        <Link href={`/books/reviews/${id}`}>Voir les reviews</Link>
      </div>
    </div>
  );
};

export default Book;
