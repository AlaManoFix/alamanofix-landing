'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Home, Search, Star, User } from 'lucide-react';

const navItems = [
  { label: 'Inicio', icon: Home, href: '/web-app' },
  { label: 'Buscar', icon: Search, href: '/web-app#buscar' },
  { label: 'Favoritos', icon: Star, href: '/web-app#favoritos' },
  { label: 'Perfil', icon: User, href: '/perfil' },
];

export default function NavbarWebApp() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="hidden md:flex fixed top-0 z-50 w-full items-center justify-between px-8 h-16 bg-white shadow-sm border-b border-gray-200">
      {/* Logo */}
      <div
        className="text-2xl font-bold text-orange-500 cursor-pointer"
        onClick={() => router.push('/web-app')}
      >
        AlaManoFix
      </div>

      {/* Navegación */}
      <nav className="flex items-center gap-6">
        {navItems.map(({ label, icon: Icon, href }) => {
          const isActive = pathname === href;
          return (
            <button
              key={label}
              onClick={() => router.push(href)}
              className={`flex items-center gap-1 text-sm font-medium transition ${
                isActive ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
