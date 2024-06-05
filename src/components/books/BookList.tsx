"use client";

import { FC } from "react";
import BookComponent from "./Book";

type Props = {
  books: Book[];
};

const BookList: FC<Props> = ({ books }) => {
  return (
    <div className="w-full">
      {books.map((b) => {
        return <BookComponent key={b.id} book={b} />;
      })}
    </div>
  );
};

export default BookList;
