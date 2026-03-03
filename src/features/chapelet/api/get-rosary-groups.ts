import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { components } from '@/types/api';

export type RosaryGroup = components['schemas']['Group'];

export const getRosaryGroups = (): Promise<RosaryGroup[]> => {
  return api.get('/v1/rosary/groups/');
};

export const getRosaryGroupsQueryOptions = () => {
  return queryOptions({
    queryKey: ['rosary', 'groups'],
    queryFn: getRosaryGroups,
  });
};

export const useRosaryGroups = () => useQuery(getRosaryGroupsQueryOptions());
