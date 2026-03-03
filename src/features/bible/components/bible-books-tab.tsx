'use client';

import { Search, ChevronRight, Loader2, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator/separator';
import { useBooks, Book } from '@/features/bible/api/get-books';
import { useVerses } from '@/features/bible/api/get-verses';
import { ReadingView } from '@/features/bible/components/reading-view';

function ChapterSelection({
  book,
  onSelect,
  onBack,
}: {
  book: Book;
  onSelect: (chapter: number) => void;
  onBack: () => void;
}) {
  const chapters = Array.from({ length: book.chapter_count }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="gap-2 text-muted-foreground"
        >
          <ArrowLeft className="size-4" />
          Retour aux livres
        </Button>
      </div>
      <h2 className="text-xl font-semibold text-foreground px-1">
        {book.name} - Chapitres
      </h2>
      <ScrollArea className="bg-background-surface h-[400px] rounded-xl border border-border p-4">
        <div className="grid grid-cols-5 gap-3 sm:grid-cols-7 md:grid-cols-10">
          {chapters.map((chapter) => (
            <button
              key={chapter}
              onClick={() => onSelect(chapter)}
              className="flex aspect-square items-center justify-center rounded-md bg-secondary text-sm font-medium text-secondary-foreground hover:bg-primary/20 hover:text-primary transition-colors hover:shadow-sm"
            >
              {chapter}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function VerseReadingSection({
  book,
  chapterNumber,
  onBack,
}: {
  book: Book;
  chapterNumber: number;
  onBack: () => void;
}) {
  const {
    data: verses,
    isLoading,
    isError,
  } = useVerses({
    bookId: book.id,
    chapterNumber,
    limit: 500, // Assuming a chapter doesn't have more than 500 verses
  });

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !verses) {
    return (
      <div className="flex flex-col gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="w-fit text-muted-foreground"
        >
          <ArrowLeft className="size-4 mr-2" /> Retour
        </Button>
        <div className="p-8 text-center text-sm text-destructive">
          Erreur lors du chargement du chapitre.
        </div>
      </div>
    );
  }

  const combinedText = verses.map((v) => `${v.number}. ${v.text}`).join('\n\n');

  return (
    <ReadingView
      title={`${book.name} - Chapitre ${chapterNumber}`}
      reference={`${book.name} ${chapterNumber}`}
      text={combinedText}
      onBack={onBack}
    />
  );
}

export function BibleBooksTab() {
  const [search, setSearch] = useState('');
  const [selectedTestament, setSelectedTestament] = useState<
    'ancien' | 'nouveau'
  >('ancien');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  const {
    data: books,
    isLoading,
    isError,
  } = useBooks({
    testament: selectedTestament,
    search: search.trim() || undefined,
  });

  if (selectedChapter && selectedBook) {
    return (
      <VerseReadingSection
        book={selectedBook}
        chapterNumber={selectedChapter}
        onBack={() => setSelectedChapter(null)}
      />
    );
  }

  if (selectedBook) {
    return (
      <ChapterSelection
        book={selectedBook}
        onSelect={setSelectedChapter}
        onBack={() => setSelectedBook(null)}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Rechercher un livre ou un verset..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 pl-10 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {/* Testament selector */}
      <div className="flex gap-2">
        <button
          onClick={() => setSelectedTestament('ancien')}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            selectedTestament === 'ancien'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          Ancien Testament
        </button>
        <button
          onClick={() => setSelectedTestament('nouveau')}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            selectedTestament === 'nouveau'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          Nouveau Testament
        </button>
      </div>

      {/* Books list */}
      <ScrollArea className="bg-background-surface h-[400px] rounded-xl border border-border">
        {isLoading ? (
          <div className="flex h-full items-center justify-center p-8">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          </div>
        ) : isError ? (
          <div className="p-8 text-center text-sm text-destructive">
            Erreur lors du chargement des livres.
          </div>
        ) : (
          <div className="flex flex-col">
            {books?.map((book, i) => (
              <div key={book.id}>
                <button
                  onClick={() => setSelectedBook(book)}
                  className="hover:bg-background-subtle flex w-full items-center justify-between px-4 py-3 text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-xs font-medium text-primary">
                      {book.order ?? i + 1}
                    </span>
                    <div>
                      <span className="block text-sm font-medium text-foreground">
                        {book.name}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {book.chapter_count} ch.
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </button>
                {i < (books?.length || 0) - 1 && (
                  <Separator className="ml-14" />
                )}
              </div>
            ))}
            {books?.length === 0 && (
              <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                Aucun livre trouvé
              </p>
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
