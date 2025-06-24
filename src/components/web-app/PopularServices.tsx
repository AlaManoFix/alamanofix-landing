'use client';

import { Wrench, Droplet, Zap, Brush, Monitor, Home } from 'lucide-react';

const services = [
  { name: 'Reparaciones', icon: Wrench },
  { name: 'Plomería', icon: Droplet },
  { name: 'Electricidad', icon: Zap },
  { name: 'Limpieza', icon: Brush },
  { name: 'Soporte técnico', icon: Monitor },
  { name: 'Construcción', icon: Home },
];

export default function PopularServices() {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Servicios más buscados
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {services.map(({ name, icon: Icon }) => (
          <button
            key={name}
            className="flex flex-col items-center justify-center gap-2 bg-white p-4 rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-all border border-gray-100"
            onClick={() => console.log(`Buscar por: ${name}`)}
          >
            <Icon className="w-6 h-6 text-orange-500" />
            <span className="text-sm font-medium text-gray-700 text-center">
              {name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
