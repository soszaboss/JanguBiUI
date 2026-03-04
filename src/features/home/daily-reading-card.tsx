'use client';

import { BookOpen, ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const todayReadings = [
  { label: '1ere Lecture', ref: 'Isaie 55, 10-11', type: 'lecture' },
  { label: 'Psaume', ref: 'Ps 33 (34)', type: 'psaume' },
  { label: 'Evangile', ref: 'Matthieu 6, 7-15', type: 'evangile' },
];

export function DailyReadingCard() {
  return (
    <Card className="gap-0 overflow-hidden border-border py-0">
      <CardHeader className="bg-primary/5 p-4 dark:bg-primary/10">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BookOpen className="size-5" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-base">Lectures du jour</CardTitle>
            <p className="text-xs text-muted-foreground">
              Temps ordinaire - Semaine XII
            </p>
          </div>
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary dark:bg-primary/20"
          >
            Aujourd&apos;hui
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-0 p-0">
        {todayReadings.map((reading) => (
          <Link
            key={reading.label}
            href="/app/bible"
            className="hover:bg-background-subtle flex items-center justify-between px-4 py-3 transition-colors"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-foreground">
                {reading.label}
              </span>
              <span className="text-xs text-muted-foreground">
                {reading.ref}
              </span>
            </div>
            <ChevronRight className="size-4 text-muted-foreground" />
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
