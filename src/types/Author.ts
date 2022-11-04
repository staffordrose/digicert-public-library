export type Author = {
  id: string;
  name: string;
};

export type AuthorWithBooksCount = Author & {
  books_count?: number;
};
