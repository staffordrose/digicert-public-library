import { Author } from './Author';
import { Category } from './Category';

export type Book = {
  id: string;
  created_at: string;
  updated_at: string;
  google_id: string;
  self_link: string;
  title: string;
  subtitle: string;
  publisher: string;
  published_date: string;
  description: string;
  image_link_small_thumb: string;
  image_link_thumb: string;
  language: string;
  canonical_volume_link: string;
  list_price_amount: number;
  list_price_currency: string;
  retail_price_amount: number;
  retail_price_currency: string;
  country: string;
  pdf_is_available: boolean;
  pdf_link: string;
  authors?: Author[];
  categories?: Category[];
};
