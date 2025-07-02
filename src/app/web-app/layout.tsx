// src/app/web-app/layout.tsx
'use client';

import NavbarWebApp from '@/components/web-app/NavbarWebApp';
import BottomBar from '@/components/web-app/BottomBar';

export default function WebAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarWebApp />
      <main className="flex-1">{children}</main>
      <BottomBar />
    </div>
  );
}
