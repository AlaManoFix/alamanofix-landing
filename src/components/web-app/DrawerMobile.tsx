'use client';

import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { X, User, Repeat, HelpCircle, LogOut } from 'lucide-react';

export default function DrawerMobile() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="text-white" aria-label="Menú">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-[101]">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-y-0 left-0 w-72 bg-white p-5 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-orange-500 font-bold text-lg">AlaManoFix</h2>
            <button onClick={() => setOpen(false)} aria-label="Cerrar">
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          <nav className="space-y-4">
            <button className="flex items-center gap-3 text-sm text-gray-800 w-full text-left">
              <User className="w-5 h-5" />
              Mis datos
            </button>

            <button className="flex items-center gap-3 text-sm text-gray-800 w-full text-left">
              <Repeat className="w-5 h-5" />
              Cambiar a modo profesional
            </button>

            <button className="flex items-center gap-3 text-sm text-gray-800 w-full text-left">
              <HelpCircle className="w-5 h-5" />
              Centro de ayuda
            </button>

            <button className="flex items-center gap-3 text-sm text-red-600 w-full text-left">
              <LogOut className="w-5 h-5" />
              Cerrar sesión
            </button>
          </nav>
        </div>
      </Dialog>
    </>
  );
}
