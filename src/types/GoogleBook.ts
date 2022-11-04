export type GoogleBook = {
  id: string;
  selfLink?: string;
  title: string;
  subtitle: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  categories: string[];
  imageLinks: {
    smallThumbnail?: string;
    thumbnail?: string;
  };
  language?: string;
  canonicalVolumeLink?: string;
  listPrice?: {
    amount: number;
    currencyCode: string;
  };
  retailPrice?: {
    amount: number;
    currencyCode: string;
  };
  country?: string;
  pdf?: {
    isAvailable: boolean;
    acsTokenLink: string;
  };
};
