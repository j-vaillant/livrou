import { FC } from "react";

type Props = {
  book: Book;
};

const Book: FC<Props> = ({ book }) => {
  return (
    <div className="p-2 rounded bg-slate-200 my-2">
      <div>
        <b>{book.title}</b>
      </div>
      <div className="truncate w-full inline-block">{book.summary}</div>
    </div>
  );
};

export default Book;
