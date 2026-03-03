import { AppShell } from '@/components/layouts/app-shell';
import { HomeContent } from '@/features/home/home-content';

export default function HomePage() {
  return (
    <AppShell>
      <HomeContent />
    </AppShell>
  );
}
