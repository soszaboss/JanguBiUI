'use client';

import {
  Bot,
  User,
  BookOpen,
  Heart,
  User as UserIcon,
  Sparkles,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface AppMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  intent?: Record<string, unknown>;
}

interface ChatMessageProps {
  message: AppMessage;
}

function IntentBadge({ intent }: { intent?: Record<string, unknown> }) {
  if (!intent || Object.keys(intent).length === 0) return null;

  // Render a dynamic badge based on the intent string (e.g. module: 'bible')
  const moduleStr =
    typeof intent.module === 'string' ? intent.module.toLowerCase() : '';
  const intentDesc =
    typeof intent.description === 'string' ? intent.description : '';

  let Icon = Sparkles;
  let label = moduleStr || 'Assistant';

  if (moduleStr.includes('bible') || intentDesc.includes('bible')) {
    Icon = BookOpen;
    label = 'Bible';
  } else if (moduleStr.includes('rosary') || intentDesc.includes('rosaire')) {
    Icon = Heart;
    label = 'Rosaire';
  } else if (
    moduleStr.includes('availability') ||
    moduleStr.includes('pretre')
  ) {
    Icon = UserIcon;
    label = 'Allo Pretre';
  }

  return (
    <Badge
      variant="secondary"
      className="mb-2 flex w-fit items-center gap-1.5 text-xs"
    >
      <Icon className="size-3" />
      <span className="capitalize">{label}</span>
    </Badge>
  );
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn('flex items-start gap-3', isUser && 'flex-row-reverse')}>
      {/* Avatar */}
      <div
        className={cn(
          'flex size-8 shrink-0 items-center justify-center rounded-full',
          isUser ? 'bg-accent/10' : 'bg-primary/10',
        )}
      >
        {isUser ? (
          <User className="size-4 text-accent" />
        ) : (
          <Bot className="size-4 text-primary" />
        )}
      </div>

      {/* Content */}
      <div
        className={cn('flex max-w-[85%] flex-col gap-2', isUser && 'items-end')}
      >
        <div
          className={cn(
            'rounded-2xl px-4 py-3 text-sm leading-relaxed',
            isUser
              ? 'rounded-tr-sm bg-primary text-primary-foreground'
              : 'rounded-tl-sm border border-border bg-background-surface text-foreground',
          )}
        >
          {/* Badge for Assistant's context intent */}
          {!isUser && message.intent && <IntentBadge intent={message.intent} />}

          <FormattedText text={message.content} />
        </div>
      </div>
    </div>
  );
}

/* ─── Formatted Text (handles line breaks & bold) ─── */
function FormattedText({ text }: { text: string }) {
  if (!text) return null;
  const lines = text.split('\n');
  return (
    <>
      {lines.map((line, i) => (
        <span key={i}>
          {line.split(/(\*\*[^*]+\*\*)/).map((segment, j) => {
            if (segment.startsWith('**') && segment.endsWith('**')) {
              return (
                <strong key={j} className="font-semibold">
                  {segment.slice(2, -2)}
                </strong>
              );
            }
            return <span key={j}>{segment}</span>;
          })}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}
