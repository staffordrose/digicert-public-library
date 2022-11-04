import { AuthorWithBooksCount } from '../../types';
import { supabase } from '../api';

export default async function fetchAuthorsWithBooksCount(): Promise<{
  data: AuthorWithBooksCount[];
}> {
  const { data, error } = await supabase
    .from('authors')
    .select(
      `
      id,
      name,
      books(id)
    `
    )
    .order('name', { ascending: true })
    .limit(24);

  if (error) throw error;

  return {
    data: data?.map(({ books, ...author }) => ({
      ...author,
      books_count: Array.isArray(books) ? books.length : 0,
    })),
  };
}
