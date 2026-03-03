'use client';

import { X, Heart, Check } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button/button';

import type { Pretre } from './allo-pretre-content';

interface DonDialogProps {
  pretre: Pretre;
  onClose: () => void;
}

const suggestedAmounts = [500, 1000, 2000, 5000];

export function DonDialog({ pretre, onClose }: DonDialogProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount;

  const handleConfirm = () => {
    setIsConfirmed(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-foreground/40"
        onClick={onClose}
        aria-hidden
      />

      {/* Dialog */}
      <div className="bg-background-surface relative z-10 w-full max-w-md rounded-t-2xl p-6 sm:rounded-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
          aria-label="Fermer"
        >
          <X className="size-5" />
        </button>

        {isConfirmed ? (
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="bg-success/10 flex size-16 items-center justify-center rounded-full">
              <Check className="text-success size-8" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Merci !</h3>
            <p className="text-center text-sm text-muted-foreground">
              Votre don de {finalAmount?.toLocaleString()} FCFA pour{' '}
              {pretre.name} a ete enregistre.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <Heart className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Don de soutien
                </h3>
                <p className="text-xs text-muted-foreground">
                  Pour {pretre.name}
                </p>
              </div>
            </div>

            {/* Suggested amounts */}
            <div className="mb-4 grid grid-cols-2 gap-2">
              {suggestedAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount('');
                  }}
                  className={`rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                    selectedAmount === amount && !customAmount
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'bg-background-subtle border-border text-foreground hover:border-primary/50'
                  }`}
                >
                  {amount.toLocaleString()} FCFA
                </button>
              ))}
            </div>

            {/* Custom amount */}
            <div className="mb-6">
              <label
                htmlFor="custom-amount"
                className="mb-1.5 block text-xs font-medium text-muted-foreground"
              >
                Montant libre (FCFA)
              </label>
              <input
                id="custom-amount"
                type="number"
                placeholder="Saisir un montant"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* Confirm */}
            <Button
              size="lg"
              className="w-full"
              disabled={!finalAmount || finalAmount <= 0}
              onClick={handleConfirm}
            >
              Confirmer le don de{' '}
              {finalAmount ? `${finalAmount.toLocaleString()} FCFA` : '...'}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
