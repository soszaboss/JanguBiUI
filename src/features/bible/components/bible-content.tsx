'use client';

import { PageHeader } from '@/components/layouts/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { BibleBooksTab } from './bible-books-tab';
import { HeuresTab } from './heures-tab';
import { MasseTab } from './masse-tab';
import { TodayTab } from './today-tab';

export function BibleContent() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Bible & Liturgie"
        subtitle="Parole de Dieu au quotidien"
      />
      <div className="mx-auto w-full max-w-3xl p-4">
        <Tabs defaultValue="aujourdhui" className="w-full">
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="aujourdhui" className="flex-1">
              Aujourd&apos;hui
            </TabsTrigger>
            <TabsTrigger value="bible" className="flex-1">
              Bible
            </TabsTrigger>
            <TabsTrigger value="messe" className="flex-1">
              Messe
            </TabsTrigger>
            <TabsTrigger value="heures" className="flex-1">
              Heures
            </TabsTrigger>
          </TabsList>
          <TabsContent value="aujourdhui">
            <TodayTab />
          </TabsContent>
          <TabsContent value="bible">
            <BibleBooksTab />
          </TabsContent>
          <TabsContent value="messe">
            <MasseTab />
          </TabsContent>
          <TabsContent value="heures">
            <HeuresTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
