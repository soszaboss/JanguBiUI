import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { components } from '@/types/api';

export type Testament = components['schemas']['TestamentWithBooksOutput'];

export const getTestaments = (): Promise<Testament[]> => {
  return api.get('/v1/bible/testaments/');
};

export const getTestamentsQueryOptions = () => {
  return queryOptions({
    queryKey: ['testaments'],
    queryFn: getTestaments,
  });
};

export const useTestaments = () => useQuery(getTestamentsQueryOptions());
