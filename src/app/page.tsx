import BookList from "@/components/books/BookList";
type BookResponse = {
  books: Book[];
};

const fetchBooks = async (): Promise<BookResponse> => {
  const books = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/books`, {
    cache: "no-store",
    next: {
      tags: ["books"],
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await books.json();
};

const Home = async () => {
  const data = await fetchBooks();
  return <BookList books={data.books} />;
};

export default Home;
