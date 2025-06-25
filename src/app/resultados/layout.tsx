'use client';

import NavbarWebApp from '@/components/web-app/NavbarWebApp';
import BottomBar from '@/components/web-app/BottomBar';

export default function ResultadosLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* AppBar fijo */}
      <NavbarWebApp />

      {/* Contenido principal con padding para no tapar AppBar y BottomNav */}
      <main className="pt-16 pb-20 min-h-screen bg-gray-50">
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomBar />
    </>
  );
}
