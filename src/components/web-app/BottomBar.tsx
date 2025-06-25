'use client';

import { Home, Search, Star, User } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { label: 'Inicio', icon: Home, href: '/web-app' },
  { label: 'Buscar', icon: Search, href: '/web-app#buscar' },
  { label: 'Favoritos', icon: Star, href: '/web-app#favoritos' },
  { label: 'Perfil', icon: User, href: '/perfil' }, // En el futuro
];

export default function BottomBar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-white shadow-t border-t border-gray-200 md:hidden">
      <div className="flex justify-around items-center h-14">
        {navItems.map(({ label, icon: Icon, href }) => {
          const isActive = pathname === href;
          return (
            <button
              key={label}
              onClick={() => router.push(href)}
              className={`flex flex-col items-center justify-center text-xs font-medium transition ${
                isActive ? 'text-orange-500' : 'text-gray-500 hover:text-orange-400'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
