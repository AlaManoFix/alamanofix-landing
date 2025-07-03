// src/app/web-app/chat/layout.tsx
'use client';

import { ReactNode } from 'react';

export default function ChatLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {children}
    </div>
  );
}
