'use client';

import { Loader2, Plus, Edit } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  useMinisters,
  type Minister,
} from '@/features/allo-pretre/api/get-ministers';

import { MinisterForm } from './minister-form';

export function AdminMinisters() {
  const { data: ministers, isLoading } = useMinisters();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMinister, setSelectedMinister] = useState<Minister | null>(
    null,
  );

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const handleCreate = () => {
    setSelectedMinister(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (minister: Minister) => {
    setSelectedMinister(minister);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedMinister(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Ministres</h2>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="size-4" />
          Nouveau Ministre
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(ministers || []).map((minister) => (
          <Card key={minister.id}>
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div className="flex items-center gap-3">
                <div className="relative size-10 overflow-hidden rounded-full bg-muted">
                  {minister.photo ? (
                    <Image
                      src={minister.photo}
                      alt={`${minister.first_name} ${minister.last_name}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="flex size-full items-center justify-center text-xs text-muted-foreground">
                      {minister.first_name[0]}
                      {minister.last_name[0]}
                    </span>
                  )}
                </div>
                <CardTitle className="text-base font-medium">
                  {minister.first_name} {minister.last_name}
                </CardTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 text-muted-foreground"
                onClick={() => handleEdit(minister)}
              >
                <Edit className="size-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2 mt-2 text-sm text-muted-foreground">
                <Badge variant="secondary" className="w-fit">
                  {minister.role_display}
                </Badge>
                <span>{minister.parish?.name}</span>
                <div className="mt-1 flex items-center gap-2">
                  <span
                    className={`size-2 rounded-full ${
                      minister.is_active ? 'bg-success' : 'bg-muted'
                    }`}
                  />
                  <span>{minister.is_active ? 'Actif' : 'Inactif'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {selectedMinister ? 'Modifier le ministre' : 'Nouveau ministre'}
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[80vh] overflow-y-auto px-1 -mx-1">
            {isDialogOpen && (
              <MinisterForm
                minister={selectedMinister}
                onSuccess={handleCloseDialog}
                onCancel={handleCloseDialog}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
