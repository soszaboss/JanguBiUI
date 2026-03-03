import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { components } from '@/types/api';

export type TodayRosary = components['schemas']['TodayRosaryOutput'];

export const getRosaryToday = (): Promise<TodayRosary> => {
  return api.get('/v1/rosary/today/');
};

export const getRosaryTodayQueryOptions = () => {
  return queryOptions({
    queryKey: ['rosary', 'today'],
    queryFn: getRosaryToday,
  });
};

export const useRosaryToday = () => useQuery(getRosaryTodayQueryOptions());
