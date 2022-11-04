import { Book } from '../../types';
import { supabase } from '../api';

export default async function createBook(
  values: Book
): Promise<{ data: Book }> {
  const { data, error } = await supabase.from('books').insert(values).select();

  if (error) throw error;

  return { data: Array.isArray(data) ? data[0] : data };
}
