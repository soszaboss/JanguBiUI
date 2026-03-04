'use client';

import { BookOpen, Music, BookMarked, Loader2 } from 'lucide-react';
import { useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import {
  useLiturgyToday,
  LiturgyReading,
} from '@/features/bible/api/get-liturgy-today';

import { ReadingView } from './reading-view';

function getReadingIcon(type: string) {
  const lowerType = type.toLowerCase();
  if (lowerType.includes('psaume')) return Music;
  if (lowerType.includes('evangile') || lowerType.includes('évangile'))
    return BookMarked;
  return BookOpen;
}

function getReadingColorClass(type: string) {
  const lowerType = type.toLowerCase();
  if (lowerType.includes('psaume')) return 'bg-accent/10 text-accent';
  if (lowerType.includes('evangile') || lowerType.includes('évangile'))
    return 'bg-warning/10 text-warning';
  if (lowerType.includes('deux') || lowerType.includes('2'))
    return 'bg-info/10 text-info';
  return 'bg-primary/10 text-primary';
}

export function MasseTab() {
  const { data, isLoading } = useLiturgyToday();
  const [selectedReading, setSelectedReading] = useState<LiturgyReading | null>(
    null,
  );

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const readings = data?.readings || [];

  if (selectedReading) {
    return (
      <ReadingView
        title={selectedReading.type || 'Lecture'}
        reference={selectedReading.citation || ''}
        text={selectedReading.text || ''}
        isHtml={true}
        onBack={() => setSelectedReading(null)}
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">
        Lectures de la messe du {data?.date || 'jour'}
      </p>

      {readings.length === 0 && (
        <div className="text-sm text-muted-foreground italic py-4">
          Aucune lecture disponible pour aujourd&apos;hui.
        </div>
      )}

      {readings.map((reading) => {
        const Icon = getReadingIcon(reading.type);
        const colorClass = getReadingColorClass(reading.type);

        return (
          <Card
            key={reading.id}
            className="hover:bg-background-subtle cursor-pointer gap-0 py-0 transition-colors"
            onClick={() => setSelectedReading(reading)}
          >
            <CardContent className="flex items-center gap-4 p-4">
              <div
                className={`flex size-10 items-center justify-center rounded-lg ${colorClass}`}
              >
                <Icon className="size-5" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-sm font-semibold text-foreground">
                  {reading.type}
                </span>
                <span className="text-xs text-muted-foreground">
                  {reading.citation}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
