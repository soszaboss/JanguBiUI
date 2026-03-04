import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { components } from '@/types/api';

export type RosaryGroup = components['schemas']['Group'];

export const getRosaryGroups = async (): Promise<RosaryGroup[]> => {
  const res: any = await api.get('/v1/rosary/groups/');
  return res.results ?? res;
};

export const getRosaryGroupsQueryOptions = () => {
  return queryOptions({
    queryKey: ['rosary', 'groups'],
    queryFn: getRosaryGroups,
  });
};

export const useRosaryGroups = () => useQuery(getRosaryGroupsQueryOptions());
