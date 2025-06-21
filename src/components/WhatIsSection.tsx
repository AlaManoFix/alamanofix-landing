'use client';

import {
  Search,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';

const items = [
  {
    icon: <Search className="w-8 h-8 text-orange-500" />,
    title: 'Encuentra lo que necesitas',
    description: 'Reparaciones, plomería, limpieza y más — todo en un solo lugar.',
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-orange-500" />,
    title: 'Profesionales verificados',
    description: 'Con perfiles evaluados y opiniones reales de otros usuarios.',
  },
  {
    icon: <Smartphone className="w-8 h-8 text-orange-500" />,
    title: 'Fácil, rápido y seguro',
    description: 'Solicita servicios desde tu móvil o computadora en minutos.',
  },
];

export default function WhatIsSection() {
  return (
    <section id="que-es" className="bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          ¿Qué es AlaManoFix?
        </h2>
        <p className="text-gray-600 mb-12">
          La forma más rápida, segura y confiable de conectar con profesionistas cerca de ti.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {items.map((item, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
