'use client';

import { Clock, Sun, Sunset, Moon, Star, Loader2 } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  useLiturgyToday,
  LiturgyOffice,
} from '@/features/bible/api/get-liturgy-today';

import { ReadingView } from './reading-view';

function getOfficeConfig(name: string) {
  const lower = (name || '').toLowerCase();
  if (lower.includes('laude'))
    return { icon: Sun, time: 'Matin', color: 'bg-accent/10 text-accent' };
  if (lower.includes('vêpre') || lower.includes('vepre'))
    return { icon: Sunset, time: 'Soir', color: 'bg-warning/10 text-warning' };
  if (lower.includes('complie'))
    return { icon: Moon, time: 'Nuit', color: 'bg-primary/10 text-primary' };
  if (
    lower.includes('milieu') ||
    lower.includes('sexte') ||
    lower.includes('tierce') ||
    lower.includes('none')
  )
    return { icon: Clock, time: 'Jour', color: 'bg-info/10 text-info' };
  return {
    icon: Clock,
    time: 'Jour',
    color: 'bg-secondary text-secondary-foreground',
  };
}

function getCurrentOfficeName(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour <= 8) return 'Laudes';
  if (hour >= 9 && hour <= 11) return 'Tierce';
  if (hour >= 12 && hour <= 13) return 'Sexte';
  if (hour >= 14 && hour <= 16) return 'None';
  if (hour >= 17 && hour <= 20) return 'Vêpres';
  if (hour >= 21 || hour < 5) return 'Complies';
  return 'Laudes';
}

export function HeuresTab() {
  const { data, isLoading } = useLiturgyToday();
  const [selectedOffice, setSelectedOffice] = useState<LiturgyOffice | null>(
    null,
  );

  const currentOfficeRecommended = getCurrentOfficeName();

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const offices = data?.offices || [];

  if (selectedOffice) {
    // Generate text content for the office
    const textSections = [];
    if (selectedOffice.hymn) {
      textSections.push(`HYMNE\n${selectedOffice.hymn}`);
    }
    if (selectedOffice.psalms) {
      const psalmsText =
        typeof selectedOffice.psalms === 'string'
          ? selectedOffice.psalms
          : JSON.stringify(selectedOffice.psalms, null, 2);
      textSections.push(`PSAUMES\n${psalmsText}`);
    }
    if (selectedOffice.canticle) {
      textSections.push(`CANTIQUE\n${selectedOffice.canticle}`);
    }
    if ('readings' in selectedOffice && selectedOffice.readings) {
      const readingsText =
        typeof selectedOffice.readings === 'string'
          ? selectedOffice.readings
          : JSON.stringify(selectedOffice.readings, null, 2);
      textSections.push(`LECTURES\n${readingsText}`);
    }
    if (selectedOffice.intercessions) {
      textSections.push(`INTERCESSIONS\n${selectedOffice.intercessions}`);
    }

    // Convert to a singular formatted string
    const fullText =
      textSections.join('\n\n') || "Contenu de l'office non disponible.";

    return (
      <ReadingView
        title={selectedOffice.office_type || 'Office'}
        reference=""
        text={fullText}
        onBack={() => setSelectedOffice(null)}
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Star className="size-4 text-accent" />
        <p className="text-sm text-muted-foreground">
          Office recommandé en ce moment :{' '}
          <span className="font-medium text-accent">
            {currentOfficeRecommended}
          </span>
        </p>
      </div>

      {offices.length === 0 && (
        <div className="text-sm text-muted-foreground italic py-4">
          Aucun office disponible pour aujourd&apos;hui.
        </div>
      )}

      {offices.map((office) => {
        const config = getOfficeConfig(office.office_type || '');
        const Icon = config.icon;
        const isCurrent = (office.office_type || '')
          .toLowerCase()
          .includes(currentOfficeRecommended.toLowerCase().substring(0, 4));

        return (
          <Card
            key={office.id}
            onClick={() => setSelectedOffice(office)}
            className={`hover:bg-background-subtle cursor-pointer gap-0 py-0 transition-colors ${
              isCurrent ? 'border-accent/50 ring-1 ring-accent/20' : ''
            }`}
          >
            <CardContent className="flex items-center gap-4 p-4">
              <div
                className={`flex size-10 items-center justify-center rounded-lg ${
                  isCurrent ? 'bg-accent text-accent-foreground' : config.color
                }`}
              >
                <Icon className="size-5" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    {office.office_type}
                  </span>
                  {isCurrent && (
                    <Badge
                      variant="secondary"
                      className="bg-accent/10 text-xs text-accent"
                    >
                      En cours
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {config.time}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
