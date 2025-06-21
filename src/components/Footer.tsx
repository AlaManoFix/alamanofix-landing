'use client';

import {
  Facebook,
  Instagram,
  Mail,
  Phone,
} from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo & Descripción */}
        <div>
          <h3 className="text-2xl font-bold text-orange-500 mb-2">AlaManoFix</h3>
          <p className="text-sm text-gray-400">
            Conectamos personas con profesionistas confiables para resolver cualquier necesidad.
          </p>
        </div>

        {/* Links útiles */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Enlaces</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#hero" className="hover:text-orange-400">Inicio</a></li>
            <li><a href="#como-funciona" className="hover:text-orange-400">¿Cómo funciona?</a></li>
            <li><a href="#servicios" className="hover:text-orange-400">Buscar servicios</a></li>
            <li><a href="#profesionales" className="hover:text-orange-400">Soy profesionista</a></li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contacto</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> contacto@alamanofix.com</li>
            <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +52 55 1234 5678</li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-orange-400"><Facebook className="w-5 h-5" /></Link>
            <Link href="#" className="hover:text-orange-400"><Instagram className="w-5 h-5" /></Link>
          </div>
        </div>
      </div>

      {/* Legal */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} AlaManoFix. Todos los derechos reservados.
      </div>
    </footer>
  );
}
