import { CategoryWithBooksCount } from '../../types';
import { supabase } from '../api';

export default async function fetchCategoriesWithBooksCount(): Promise<{
  data: CategoryWithBooksCount[];
}> {
  const { data, error } = await supabase
    .from('categories')
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
    data: data?.map(({ books, ...category }) => ({
      ...category,
      books_count: Array.isArray(books) ? books.length : 0,
    })),
  };
}
