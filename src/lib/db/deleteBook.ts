import { Book } from '../../types';
import { supabase } from '../api';

export default async function updateBook(bookId: Book['id']) {
  const { error } = await supabase.from('books').delete().eq('id', bookId);

  if (error) throw error;
}
