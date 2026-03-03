'use client';

import { DailyMysteryCard } from './daily-mystery-card';
import { DailyReadingCard } from './daily-reading-card';
import { QuickAccessGrid } from './quick-access-grid';
import { WelcomeBanner } from './welcome-banner';

export function HomeContent() {
  return (
    <div className="mx-auto max-w-lg px-4 py-6">
      <div className="flex flex-col gap-6">
        <WelcomeBanner />
        <DailyReadingCard />
        <DailyMysteryCard />
        <QuickAccessGrid />
      </div>
    </div>
  );
}
