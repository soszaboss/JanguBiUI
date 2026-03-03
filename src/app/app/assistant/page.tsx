import { AppShell } from '@/components/layouts/app-shell';
import { AssistantChat } from '@/features/assistant/components/assistant-chat';

export default function AssistantPage() {
  return (
    <AppShell>
      <AssistantChat />
    </AppShell>
  );
}
