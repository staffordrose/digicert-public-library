import { Book } from '../../types';
import { supabase } from '../api';

interface FetchBooksArgs {
  range: [number, number];
  eq?: { tableName: string; value: string };
}

export default async function fetchBooks({
  range = [0, 12],
  eq,
}: FetchBooksArgs): Promise<{ data: Book[]; count: number | null }> {
  let data: Book[] = [];
  let error = null;
  let count = null;

  if (eq) {
    const res = await supabase
      .from('books')
      .select('*, authors!inner(name), categories!inner(name)', {
        count: 'exact',
      })
      .eq(`${eq.tableName}.name`, eq.value)
      .order('title', { ascending: true })
      .range(range[0], range[1]);

    if (res.data) data = res.data;
    error = res.error;
    count = res.count;
  } else {
    const res = await supabase
      .from('books')
      .select('*', { count: 'exact' })
      .order('title', { ascending: true })
      .range(range[0], range[1]);

    if (res.data) data = res.data;
    error = res.error;
    count = res.count;
  }

  if (error) throw error;

  return { data, count };
}
