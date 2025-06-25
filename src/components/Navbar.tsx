'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Loader from '@/components/Loader';
import { Menu, X, ArrowRight } from 'lucide-react';

const navLinks = [
  { label: 'Inicio', href: '/#hero' },
  { label: '¿Cómo funciona?', href: '/#como-funciona' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Navegación con loader y protección si ya estás en la ruta
  const handleRedirect = async (path: string) => {
    if (pathname === path) return;
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 500)); // Simula breve espera
    router.push(path);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <Loader />
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

        {/* Logo */}
        <a href="/#hero" className="text-2xl font-bold text-orange-500">
          AlaManoFix
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                isLinkActive(item.href)
                  ? 'text-orange-500 font-semibold border-b-2 border-orange-500 pb-1'
                  : 'text-gray-700 hover:text-orange-500'
              }`}
            >
              {item.label}
            </a>
          ))}

          {/* Soy profesionista */}
          <button
            onClick={() => handleRedirect('/profesionales')}
            className={`text-sm font-medium transition-colors ${
              pathname === '/profesionales'
                ? 'text-orange-500 font-semibold'
                : 'text-gray-700 hover:text-orange-500'
            }`}
          >
            Soy profesionista
          </button>

          {/* Usa la app */}
          <button
            onClick={() => handleRedirect('/web-app')}
            className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-orange-600 hover:scale-105 transition-all shadow-md"
          >
            Usa la app
            <ArrowRight className="w-4 h-4" />
          </button>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 shadow-sm space-y-2">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`block py-2 text-sm ${
                isLinkActive(item.href)
                  ? 'text-orange-500 font-semibold'
                  : 'text-gray-800 hover:text-orange-500'
              }`}
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false);
              handleRedirect('/web-app');
            }}
            className="mt-3 block w-full text-center bg-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 hover:scale-105 transition-all shadow-md"
          >
            Usa la app
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              handleRedirect('/profesionales');
            }}
            className={`mt-2 block w-full text-center text-sm font-medium transition-colors ${
              pathname === '/profesionales'
                ? 'text-orange-500 font-semibold'
                : 'text-gray-700 hover:text-orange-500'
            }`}
          >
            Soy profesionista
          </button>
        </div>
      )}
    </header>
  );
}
