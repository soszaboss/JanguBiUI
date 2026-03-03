import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import type { components } from '@/types/api';

export type LiturgicalDate = components['schemas']['LiturgicalDate'];
export type LiturgyReading = components['schemas']['Reading'];
export type LiturgyOffice = components['schemas']['Office'];

// We cast readings and offices since OpenAPI incorrectly types them as string
// when they likely return arrays of objects or URLs.
export interface LiturgicalTodayResponse
  extends Omit<LiturgicalDate, 'readings' | 'offices'> {
  readings: LiturgyReading[];
  offices: LiturgyOffice[];
}

export async function fetchLiturgyToday(): Promise<LiturgicalTodayResponse> {
  return api.get('/v1/liturgy/today/');
}

export function useLiturgyToday() {
  return useQuery({
    queryKey: ['liturgy', 'today'],
    queryFn: fetchLiturgyToday,
  });
}
