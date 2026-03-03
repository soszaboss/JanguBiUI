import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import type { components } from '@/types/api';

export type Minister = components['schemas']['MinisterList'];

export const getMinisters = async (): Promise<Minister[]> => {
  const res = (await api.get('/v1/availability/ministers/')) as any;
  return res.results || res;
};

export const useMinisters = () => {
  return useQuery({
    queryKey: ['ministers'],
    queryFn: getMinisters,
  });
};
