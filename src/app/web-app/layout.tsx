// src/app/web-app/layout.tsx
'use client';

import { usePathname } from 'next/navigation';
import NavbarWebApp from '@/components/web-app/NavbarWebApp';
import BottomBar from '@/components/web-app/BottomBar';

export default function WebAppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isChatPage = pathname.startsWith('/web-app/chat');

  return (
    <div className="min-h-screen flex flex-col">
      {!isChatPage && <NavbarWebApp />}
      <main className="flex-1">{children}</main>
      {!isChatPage && <BottomBar />}
    </div>
  );
}
