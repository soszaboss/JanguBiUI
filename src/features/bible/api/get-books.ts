import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { components } from '@/types/api';

export type Book = components['schemas']['BookMetadataOutput'];

// Array of books
export type BookList = Book[];

export type GetBooksOptions = {
  testament?: string | null;
  search?: string | null;
  limit?: number;
  offset?: number;
};

export const getBooks = (options?: GetBooksOptions): Promise<BookList> => {
  return api.get('/v1/bible/books/', { params: options });
};

export const getBooksQueryOptions = (options?: GetBooksOptions) => {
  return queryOptions({
    queryKey: ['books', options],
    queryFn: () => getBooks(options),
  });
};

export const useBooks = (options?: GetBooksOptions) =>
  useQuery(getBooksQueryOptions(options));
