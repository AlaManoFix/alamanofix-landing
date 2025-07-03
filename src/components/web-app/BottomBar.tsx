// File: src/components/web-app/BottomBar.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Home, ClipboardList, Heart, User, Briefcase, CalendarCheck } from 'lucide-react';
import { useState } from 'react';

type UserRole = 'cliente' | 'profesional';

export default function BottomBar({ role = 'cliente' }: { role?: UserRole }) {
  const pathname = usePathname();
  const router = useRouter();

  const itemsCliente = [
    { label: 'Inicio', icon: Home, href: '/web-app' },
    { label: 'Solicitudes', icon: ClipboardList, href: '/web-app/solicitudes' },
    { label: 'Favoritos', icon: Heart, href: '/web-app/favoritos' },
    { label: 'Perfil', icon: User, href: '/web-app/mi-perfil-cliente' },
  ];

  const itemsProfesional = [
    { label: 'Inicio', icon: Home, href: '/web-app' },
    { label: 'Mis trabajos', icon: Briefcase, href: '/mis-trabajos' },
    { label: 'Disponibilidad', icon: CalendarCheck, href: '/disponibilidad' },
    { label: 'Perfil', icon: User, href: '/perfil' },
  ];

  const navItems = role === 'profesional' ? itemsProfesional : itemsCliente;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-t border-t border-gray-200 flex justify-around items-center h-14 md:hidden">
      {navItems.map(({ label, icon: Icon, href }) => {
        const isActive = pathname === href;
        return (
          <button
            key={label}
            onClick={() => router.push(href)}
            className={`flex flex-col items-center justify-center text-xs transition ${
              isActive ? 'text-orange-500 font-semibold' : 'text-gray-600 hover:text-orange-500'
            }`}
          >
            <Icon className="w-5 h-5 mb-0.5" />
            {label}
          </button>
        );
      })}
    </nav>
  );
}
