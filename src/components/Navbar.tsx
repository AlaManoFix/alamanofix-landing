'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';

const navLinks = [
  { label: 'Inicio', href: '/#hero' },
  { label: '¿Cómo funciona?', href: '/#como-funciona' },
  { label: 'Soy profesionista', href: '/profesionales' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>('');

  // Scroll suave para navegación con hash
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.style.scrollBehavior = 'smooth';
    }

    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };

    handleHashChange(); // capturar hash actual si carga directa
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isLinkActive = (href: string) => {
    // Si es una sección de la landing
    if (href.startsWith('/#')) {
      const sectionHash = href.replace('/#', '#');
      return pathname === '/' && activeHash === sectionHash;
    }
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-orange-500">
          AlaManoFix
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                isLinkActive(item.href)
                  ? 'text-orange-500 font-semibold border-b-2 border-orange-500 pb-1'
                  : 'text-gray-700 hover:text-orange-500'
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* CTA button */}
          <Link
            href="/app"
            className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-orange-600 hover:scale-105 transition-all shadow-md"
          >
            Usa la app
            <ArrowRight className="w-4 h-4" />
          </Link>
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
            <Link
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
            </Link>
          ))}
          <Link
            href="/app"
            className="block text-center bg-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 hover:scale-105 transition-all shadow-md"
            onClick={() => setMenuOpen(false)}
          >
            Usa la app
          </Link>
        </div>
      )}
    </header>
  );
}
