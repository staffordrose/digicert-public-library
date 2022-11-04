import { GoogleBook } from '../../types';
import { supabase } from '../api';

async function insertMappedRows(
  bookId: string,
  resource: 'author' | 'category',
  tableName: 'authors' | 'categories',
  rows: string[]
) {
  try {
    if (Array.isArray(rows) && rows.length) {
      const promiseArray = rows.map(async (name) => {
        const {
          data: inserted,
          error: insertedError,
          status: insertedStatus,
        } = await supabase.from(tableName).insert([{ name }]).select('id');

        let existingId = '';

        if (insertedError) {
          console.log(`Error inserting ${resource}: `, insertedError.message);

          if (insertedStatus === 409) {
            const { data: existing, error: existingError } = await supabase
              .from(tableName)
              .select('id, name')
              .eq('name', name);

            if (existingError) throw existingError;

            existingId = existing[0].id;
          }
        }

        if (bookId && (existingId || inserted?.[0].id)) {
          const { error: insertedMapError } = await supabase
            .from(`books_${tableName}_map`)
            .insert([
              {
                book_id: bookId,
                [`${resource}_id`]: existingId || inserted?.[0].id,
              },
            ]);

          if (insertedMapError) {
            console.log(
              `Error mapping book and ${resource}: `,
              insertedMapError.message
            );
          }
        }
      });

      await Promise.all(promiseArray);
    }
  } catch (error: any) {
    console.log(error.message);
  }
}

export default async function insertGoogleBooks(books: GoogleBook[]) {
  try {
    const promiseArray = books.map(async (b) => {
      const { data: insertedBook, error: insertedBookError } = await supabase
        .from('books')
        .insert([
          {
            google_id: b.id,
            self_link: b.selfLink,
            title: b.title,
            subtitle: b.subtitle,
            publisher: b.publisher,
            published_date: b.publishedDate,
            description: b.description,
            image_link_small_thumb: b.imageLinks.smallThumbnail,
            image_link_thumb: b.imageLinks.thumbnail,
            language: b.language,
            canonical_volume_link: b.canonicalVolumeLink,
            list_price_amount: b.listPrice?.amount,
            list_price_currency: b.listPrice?.currencyCode,
            retail_price_amount: b.retailPrice?.amount,
            retail_price_currency: b.retailPrice?.currencyCode,
            country: b.country,
            pdf_is_available: b.pdf?.isAvailable,
            pdf_link: b.pdf?.acsTokenLink,
          },
        ])
        .select('id');

      if (insertedBookError) throw insertedBookError;

      if (Array.isArray(b.authors) && b.authors.length) {
        await insertMappedRows(
          insertedBook[0].id,
          'author',
          'authors',
          b.authors
        );
      }

      if (Array.isArray(b.categories) && b.categories.length) {
        await insertMappedRows(
          insertedBook[0].id,
          'category',
          'categories',
          b.categories
        );
      }
    });

    await Promise.all(promiseArray);
  } catch (error) {
    throw error;
  }
}
