import { AppShell } from '@/components/layouts/app-shell';
import { BibleContent } from '@/features/bible/components/bible-content';

export default function BiblePage() {
  return (
    <AppShell>
      <BibleContent />
    </AppShell>
  );
}
