'use client';

import { PageHeader } from '@/components/layouts/page-header';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs/tabs';
import { AdminMinisters } from '@/features/allo-pretre/components/admin-ministers';
import { AdminParishes } from '@/features/allo-pretre/components/admin-parishes';
import { AdminServices } from '@/features/allo-pretre/components/admin-services';

export default function AvailabilityAdminPage() {
  return (
    <div className="flex flex-col h-full bg-background-surface">
      <PageHeader
        title="Admin Disponibilites"
        subtitle="Gerer les paroisses, les services et les ministres"
      />
      <div className="flex-1 p-4 md:p-6 mx-auto w-full max-w-5xl">
        <Tabs defaultValue="ministers" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="ministers">Ministres</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="parishes">Paroisses</TabsTrigger>
          </TabsList>

          <TabsContent value="ministers" className="space-y-4">
            <AdminMinisters />
          </TabsContent>

          <TabsContent value="services" className="space-y-4">
            <AdminServices />
          </TabsContent>

          <TabsContent value="parishes" className="space-y-4">
            <AdminParishes />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
