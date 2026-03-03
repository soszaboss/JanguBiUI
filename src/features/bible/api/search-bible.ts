import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { components } from '@/types/api';

export type SearchResult = components['schemas']['SearchBookGroupOutput'];

export type SearchBibleOptions = {
  q: string;
  hybrid?: boolean;
  limit?: number;
  testament?: string | null;
  book_slug?: string | null;
  chapter_number?: number | null;
};

export const searchBible = (
  options: SearchBibleOptions,
): Promise<SearchResult[]> => {
  return api.get('/v1/bible/search/', { params: options });
};

export const searchBibleQueryOptions = (options: SearchBibleOptions) => {
  return queryOptions({
    queryKey: ['bible-search', options],
    queryFn: () => searchBible(options),
    enabled: options.q.length >= 3, // API requires minLength: 3
  });
};

export const useSearchBible = (options: SearchBibleOptions) =>
  useQuery(searchBibleQueryOptions(options));
