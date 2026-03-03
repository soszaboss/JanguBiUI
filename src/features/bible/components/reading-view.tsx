'use client';

import { ArrowLeft, Minus, Plus, Bookmark } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button/button';

interface ReadingViewProps {
  title: string;
  reference: string;
  text: string;
  onBack: () => void;
}

export function ReadingView({
  title,
  reference,
  text,
  onBack,
}: ReadingViewProps) {
  const [fontSize, setFontSize] = useState(16);

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="gap-2 text-muted-foreground"
        >
          <ArrowLeft className="size-4" />
          Retour
        </Button>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => setFontSize((s) => Math.max(12, s - 2))}
            aria-label="Reduire la taille du texte"
          >
            <Minus className="size-4" />
          </Button>
          <span className="min-w-8 text-center text-xs text-muted-foreground">
            {fontSize}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => setFontSize((s) => Math.min(24, s + 2))}
            aria-label="Augmenter la taille du texte"
          >
            <Plus className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            aria-label="Marquer comme favori"
          >
            <Bookmark className="size-4" />
          </Button>
        </div>
      </div>

      {/* Reading content */}
      <article
        className="bg-background-surface mx-auto w-full rounded-xl p-6"
        style={{ maxWidth: '720px' }}
      >
        <header className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          <p className="text-sm text-primary">{reference}</p>
        </header>
        <div
          className="text-foreground-secondary whitespace-pre-line leading-relaxed"
          style={{ fontSize: `${fontSize}px`, lineHeight: 1.75 }}
        >
          {text}
        </div>
      </article>
    </div>
  );
}
