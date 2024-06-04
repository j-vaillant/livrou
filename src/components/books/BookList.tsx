"use client";

import { FC, useEffect, useState } from "react";
import BookComponent from "./Book";

type BookRequest = {
  books: Book[];
};

const fetchBooks = async (): Promise<BookRequest> => {
  const books = await fetch("/api/books", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await books.json();
};

const BookList: FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBooks();

      setBooks(data.books);
    };

    fetchData();
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
