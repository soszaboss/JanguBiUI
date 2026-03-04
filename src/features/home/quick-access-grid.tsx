'use client';

import { BookOpen, Phone, Calendar, Clock, MessageCircle } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

const quickLinks = [
  {
    label: 'Bible complete',
    description: 'Ancien & Nouveau Testament',
    href: '/app/bible?tab=bible',
    icon: BookOpen,
    color: 'bg-primary/10 text-primary',
  },
  {
    label: 'Allo Pretre',
    description: 'Contacter un pretre',
    href: '/app/allo-pretre',
    icon: Phone,
    color: 'bg-success/10 text-success',
  },
  {
    label: 'Calendrier',
    description: 'Fetes et temps liturgiques',
    href: '/app/bible?tab=calendrier',
    icon: Calendar,
    color: 'bg-warning/10 text-warning',
  },
  {
    label: 'Liturgie des Heures',
    description: 'Offices du jour',
    href: '/app/bible?tab=heures',
    icon: Clock,
    color: 'bg-info/10 text-info',
  },
  {
    label: 'Assistant',
    description:
      'Posez vos questions sur la Bible, le chapelet ou trouvez un pretre',
    href: '/app/assistant',
    icon: MessageCircle,
    color: 'bg-accent/10 text-accent',
    featured: true,
  },
] as const;

export function QuickAccessGrid() {
  return (
    <section aria-label="Acces rapide">
      <h2 className="text-foreground-secondary mb-3 text-sm font-semibold">
        Acces rapide
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          const isFeatured = 'featured' in link && link.featured;
          return (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                'flex rounded-xl border border-border bg-background-surface p-4 transition-colors hover:bg-background-subtle',
                isFeatured
                  ? 'col-span-2 flex-row items-center gap-4'
                  : 'flex-col gap-3',
              )}
            >
              <div
                className={cn(
                  'flex shrink-0 items-center justify-center rounded-lg',
                  isFeatured ? 'size-12' : 'size-10',
                  link.color,
                )}
              >
                <Icon className={isFeatured ? 'size-6' : 'size-5'} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-foreground">
                  {link.label}
                </span>
                <span className="text-xs text-muted-foreground">
                  {link.description}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
