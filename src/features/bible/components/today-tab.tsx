'use client';

import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card';
import { Separator } from '@/components/ui/separator/separator';
import { useLiturgyToday } from '@/features/bible/api/get-liturgy-today';
import { DailyMysteryCard } from '@/features/home/daily-mystery-card';

import { ReadingView } from './reading-view';

export function TodayTab() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { data, isLoading } = useLiturgyToday();
  const [selectedReading, setSelectedReading] = useState<{
    title: string;
    ref: string;
    text: string;
  } | null>(null);

  const dateStr = data?.date
    ? new Date(data.date).toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      })
    : currentDate.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      });

  const navigateDay = (offset: number) => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + offset);
    setCurrentDate(next);
  };

  if (selectedReading) {
    return (
      <ReadingView
        title={selectedReading.title}
        reference={selectedReading.ref}
        text={selectedReading.text}
        isHtml={true}
        onBack={() => setSelectedReading(null)}
      />
    );
  }

  const readings = data?.readings || [];
  const headerText = data?.mystery
    ? `${data.season ? data.season + ' - ' : ''}${data.mystery}`
    : 'Lectures du jour';

  return (
    <div className="flex flex-col gap-4">
      {/* Date navigator */}
      <div className="bg-background-surface flex items-center justify-between rounded-lg p-3">
        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          onClick={() => navigateDay(-1)}
          aria-label="Jour precedent"
        >
          <ChevronLeft className="size-4" />
        </Button>
        <div className="flex items-center gap-2 text-sm font-medium capitalize text-foreground">
          <Calendar className="size-4 text-muted-foreground" />
          {dateStr}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          onClick={() => navigateDay(1)}
          aria-label="Jour suivant"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>

      {/* Chaplet component */}
      <DailyMysteryCard />

      {/* Readings list */}
      <Card className="gap-0 overflow-hidden py-0">
        <CardHeader className="px-4 py-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {headerText}
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-col gap-0 p-0">
          {!isLoading && readings.length === 0 && (
            <div className="text-sm text-muted-foreground italic p-4">
              Aucune lecture disponible.
            </div>
          )}
          {readings.map((reading) => (
            <button
              key={reading.id}
              onClick={() =>
                setSelectedReading({
                  title: reading.type,
                  ref: reading.citation || '',
                  text: reading.text || '',
                })
              }
              className="hover:bg-background-subtle flex items-center justify-between px-4 py-3 text-left transition-colors"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-foreground capitalize">
                  {reading.type.replace('_', ' ')}
                </span>
                <span className="text-xs text-muted-foreground">
                  {reading.citation}
                </span>
              </div>
              <ChevronRight className="size-4 text-muted-foreground" />
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
