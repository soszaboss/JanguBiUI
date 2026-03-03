'use client';

import { MessageCircle, Heart, MapPin } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import type { Pretre } from './allo-pretre-content';

interface PretreListProps {
  pretres: Pretre[];
  onDon: (p: Pretre) => void;
}

const typeLabels: Record<string, string> = {
  pretre: 'Pretre',
  moine: 'Moine',
  soeur: 'Soeur',
};

export function PretreList({ pretres, onDon }: PretreListProps) {
  if (pretres.length === 0) {
    return (
      <div className="bg-background-surface flex flex-col items-center gap-3 rounded-xl border border-border py-12">
        <p className="text-sm text-muted-foreground">
          Aucun resultat avec ces filtres
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-muted-foreground">
        {pretres.length} resultat{pretres.length > 1 ? 's' : ''}
      </p>
      {pretres.map((pretre) => (
        <Card key={pretre.id} className="gap-0 py-0">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                {pretre.name
                  .split(' ')
                  .slice(1, 3)
                  .map((n) => n[0])
                  .join('')}
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground">
                    {pretre.name}
                  </h3>
                  {pretre.online && (
                    <span className="bg-success size-2 rounded-full" />
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {typeLabels[pretre.type]}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {pretre.paroisse}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="size-3" />
                  {pretre.localisation}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex gap-2">
              <Button
                size="sm"
                className="bg-success text-foreground-inverse hover:bg-success/90 flex-1 gap-2"
                asChild
                disabled={!pretre.phone}
              >
                {pretre.phone ? (
                  <a
                    href={`https://wa.me/${pretre.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="size-4" />
                    Contacter
                  </a>
                ) : (
                  <span className="cursor-not-allowed opacity-50">
                    <MessageCircle className="size-4" />
                    Non disponible
                  </span>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => onDon(pretre)}
              >
                <Heart className="size-4" />
                Don
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
