"use client";

import { FC, useEffect, useState } from "react";
import BookComponent from "./Book";
import booksJSON from "./books.json";

const BookList: FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    setBooks(booksJSON);
  }, []);

  return (
    <div className="w-full">
      {books.map((b) => {
        return <BookComponent key={b.id} book={b} />;
      })}
    </div>
  );
};

export default BookList;
