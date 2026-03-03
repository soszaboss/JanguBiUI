'use client';

import { Loader2 } from 'lucide-react';
import { useState } from 'react';

import { PageHeader } from '@/components/layouts/page-header';
import { useMinisters } from '@/features/allo-pretre/api/get-ministers';

import { DonDialog } from './don-dialog';
import { PretreFilters } from './pretre-filters';
import { PretreList } from './pretre-list';

export type PretreType = 'pretre' | 'moine' | 'soeur';

export interface Pretre {
  id: string;
  name: string;
  type: PretreType;
  paroisse: string;
  localisation: string;
  online: boolean;
  phone?: string;
}

function mapRoleToType(role?: string): PretreType {
  const r = (role || '').toUpperCase();
  if (r === 'SISTER') return 'soeur';
  if (r === 'RELIGIOUS') return 'moine';
  return 'pretre';
}

export function AlloPretreContent() {
  const { data: ministers, isLoading } = useMinisters();
  const [filters, setFilters] = useState({
    type: 'all' as 'all' | PretreType,
    localisation: '',
    onlineOnly: false,
  });
  const [donPretre, setDonPretre] = useState<Pretre | null>(null);

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const pretresData: Pretre[] = (ministers || []).map((m) => ({
    id: String(m.id),
    name: `${m.first_name} ${m.last_name}`.trim(),
    type: mapRoleToType(m.role),
    paroisse: m.parish?.name || 'Paroisse Inconnue',
    localisation:
      [m.parish?.city, m.parish?.address].filter(Boolean).join(', ') ||
      'Lieu Inconnu',
    online: !!m.is_active,
    phone: '', // Not provided in the List endpoint
  }));

  const filtered = pretresData
    .filter((p) => {
      if (filters.type !== 'all' && p.type !== filters.type) return false;
      if (filters.onlineOnly && !p.online) return false;
      if (
        filters.localisation &&
        !p.localisation
          .toLowerCase()
          .includes(filters.localisation.toLowerCase())
      )
        return false;
      return true;
    })
    .sort((a, b) => {
      if (a.online === b.online) return 0;
      return a.online ? -1 : 1;
    });

  return (
    <div className="flex flex-col">
      <PageHeader title="Allo Pretre" subtitle="Contactez un guide spirituel" />
      <div className="mx-auto w-full max-w-3xl p-4">
        <div className="flex flex-col gap-4">
          <PretreFilters filters={filters} onFiltersChange={setFilters} />
          <PretreList pretres={filtered} onDon={(p) => setDonPretre(p)} />
        </div>
      </div>
      {donPretre && (
        <DonDialog pretre={donPretre} onClose={() => setDonPretre(null)} />
      )}
    </div>
  );
}
