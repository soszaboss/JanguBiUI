'use client';

import { Search, Filter } from 'lucide-react';

import { Button } from '@/components/ui/button/button';

import type { PretreType } from './allo-pretre-content';

interface FiltersState {
  type: 'all' | PretreType;
  localisation: string;
  onlineOnly: boolean;
}

interface PretreFiltersProps {
  filters: FiltersState;
  onFiltersChange: (f: FiltersState) => void;
}

const typeOptions: { key: 'all' | PretreType; label: string }[] = [
  { key: 'all', label: 'Tous' },
  { key: 'pretre', label: 'Pretres' },
  { key: 'moine', label: 'Moines' },
  { key: 'soeur', label: 'Soeurs' },
];

export function PretreFilters({
  filters,
  onFiltersChange,
}: PretreFiltersProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Rechercher par zone..."
          value={filters.localisation}
          onChange={(e) =>
            onFiltersChange({ ...filters, localisation: e.target.value })
          }
          className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 pl-10 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {/* Type filters + online toggle */}
      <div className="flex items-center gap-2 overflow-x-auto">
        {typeOptions.map((opt) => (
          <button
            key={opt.key}
            onClick={() => onFiltersChange({ ...filters, type: opt.key })}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              filters.type === opt.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {opt.label}
          </button>
        ))}
        <div className="ml-auto" />
        <Button
          variant={filters.onlineOnly ? 'default' : 'outline'}
          size="sm"
          onClick={() =>
            onFiltersChange({ ...filters, onlineOnly: !filters.onlineOnly })
          }
          className="shrink-0 gap-1.5 text-xs"
        >
          <Filter className="size-3" />
          En ligne
        </Button>
      </div>
    </div>
  );
}
