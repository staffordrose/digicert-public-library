import { Book } from '../../types';
import { supabase } from '../api';

export default async function updateBook(
  values: Book
): Promise<{ data: Book }> {
  const { data, error } = await supabase.from('books').upsert(values).select();

  if (error) throw error;

  return { data: Array.isArray(data) ? data[0] : data };
}
