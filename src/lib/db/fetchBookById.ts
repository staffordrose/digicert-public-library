import { Book } from '../../types';
import { supabase } from '../api';

export default async function fetchBookById(
  id: Book['id']
): Promise<{ data: Book }> {
  const { data, error } = await supabase
    .from('books')
    .select(
      `
      *,
      authors(name),
      categories(name)
    `
    )
    .eq('id', id)
    .single();

  if (error) throw error;

  return { data };
}
