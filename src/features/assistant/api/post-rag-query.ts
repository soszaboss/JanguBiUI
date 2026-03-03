import { api } from '@/lib/api-client';
import type { components } from '@/types/api';

export type RagQuery = components['schemas']['RagQuery'];
export type RagResponse = components['schemas']['RagResponse'];

export const postRagQuery = async (data: RagQuery): Promise<RagResponse> => {
  return await api.post('/v1/rag/query/', data);
};
