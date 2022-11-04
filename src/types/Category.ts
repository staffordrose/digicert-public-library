export type Category = {
  id: string;
  name: string;
};

export type CategoryWithBooksCount = Category & {
  books_count?: number;
};
