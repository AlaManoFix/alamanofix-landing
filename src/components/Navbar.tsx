'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';

const navLinks = [
  { label: 'Inicio', href: '#hero' },
  { label: '¿Cómo funciona?', href: '#como-funciona' },
  { label: 'Soy profesionista', href: '/profesionales' }
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        
        {/* Logo */}
        <Link href="#hero" className="text-2xl font-bold text-orange-500">
          AlaManoFix
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-gray-700 hover:text-orange-500 transition-colors text-sm font-medium"
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
        <div className="md:hidden bg-white px-4 pb-4 shadow-sm">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block py-2 text-gray-800 hover:text-orange-500 text-sm"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/app"
            className="mt-3 block text-center bg-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 hover:scale-105 transition-all shadow-md"
            onClick={() => setMenuOpen(false)}
          >
            Usa la app
          </Link>
        </div>
      )}
    </header>
  );
}
