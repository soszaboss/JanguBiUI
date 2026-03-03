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
import { DailyMysteryCard } from '@/features/home/daily-mystery-card';

import { ReadingView } from './reading-view';

const sampleReadings = {
  premiere: {
    title: 'Premiere Lecture',
    ref: 'Isaie 55, 10-11',
    text: "Ainsi parle le Seigneur : la pluie et la neige qui descendent des cieux n'y retournent pas sans avoir arrose la terre, sans l'avoir fecondee et l'avoir fait germer, donnant la semence au semeur et le pain a celui qui doit manger ; ainsi ma parole, qui sort de ma bouche, ne me reviendra pas sans resultat, sans avoir fait ce qui me plait, sans avoir accompli sa mission.",
  },
  psaume: {
    title: 'Psaume responsorial',
    ref: 'Ps 33 (34), 4-5, 6-7, 16-17, 18-19',
    text: 'R/ De toutes leurs angoisses, Dieu delivre les justes.\n\nMagnifiez avec moi le Seigneur,\nexaltons tous ensemble son nom.\nJe cherche le Seigneur, il me repond :\nde toutes mes frayeurs, il me delivre.\n\nQui regarde vers lui resplendira,\nsans ombre ni honte sur le visage.\nUn pauvre crie ; le Seigneur entend :\nil le sauve de toutes ses angoisses.',
  },
  evangile: {
    title: 'Evangile',
    ref: 'Matthieu 6, 7-15',
    text: "En ce temps-la, Jesus disait a ses disciples : \"Lorsque vous priez, ne rabachaz pas comme les paiens : ils s'imaginent qu'a force de paroles ils seront exauces. Ne les imitez donc pas, car votre Pere sait de quoi vous avez besoin, avant meme que vous l'ayez demande. Vous donc, priez ainsi :\n\nNotre Pere, qui es aux cieux,\nque ton nom soit sanctifie,\nque ton regne vienne,\nque ta volonte soit faite\nsur la terre comme au ciel.\nDonne-nous aujourd'hui notre pain de ce jour.\nPardonne-nous nos offenses,\ncomme nous pardonnons aussi\na ceux qui nous ont offenses.\nEt ne nous laisse pas entrer en tentation,\nmais delivre-nous du Mal.\"",
  },
};

export function TodayTab() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedReading, setSelectedReading] = useState<string | null>(null);

  const dateStr = currentDate.toLocaleDateString('fr-FR', {
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
    const reading =
      sampleReadings[selectedReading as keyof typeof sampleReadings];
    return (
      <ReadingView
        title={reading.title}
        reference={reading.ref}
        text={reading.text}
        onBack={() => setSelectedReading(null)}
      />
    );
  }

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
            Temps ordinaire - Semaine XII
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-col gap-0 p-0">
          {Object.entries(sampleReadings).map(([key, reading]) => (
            <button
              key={key}
              onClick={() => setSelectedReading(key)}
              className="hover:bg-background-subtle flex items-center justify-between px-4 py-3 text-left transition-colors"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-foreground">
                  {reading.title}
                </span>
                <span className="text-xs text-muted-foreground">
                  {reading.ref}
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
