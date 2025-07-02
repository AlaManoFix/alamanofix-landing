// File: src/components/web-app/TopRatedProfessionals.tsx
'use client';

import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import LoaderOverlay from '@/components/shared/LoaderOverlay';

const professionals = [
  {
    id: 1,
    name: 'Carlos Herrera',
    service: 'Electricista',
    rating: 4.9,
    location: 'Culiacán, Sin.',
    avatarUrl: '/images/profiles/electricista1.jpg',
  },
  {
    id: 2,
    name: 'Laura Martínez',
    service: 'Plomería',
    rating: 4.8,
    location: 'Mazatlán, Sin.',
    avatarUrl: '/images/profiles/plomera1.jpg',
  },
  {
    id: 3,
    name: 'Juan Pérez',
    service: 'Reparaciones generales',
    rating: 4.7,
    location: 'Los Mochis, Sin.',
    avatarUrl: '/images/profiles/reparador1.jpg',
  },
];

export default function TopRatedProfessionals() {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleClick = (id: number) => {
    setLoadingId(id);
    setTimeout(() => {
      router.push(`/web-app/perfil/${id}`);
    }, 300);
  };

  return (
    <section>
      {loadingId !== null && <LoaderOverlay />}

      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Profesionales mejor valorados
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {professionals.map((pro) => (
          <div
            key={pro.id}
            onClick={() => handleClick(pro.id)}
            className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
          >
            <img
              src={pro.avatarUrl}
              alt={pro.name}
              className="w-14 h-14 rounded-full object-cover border border-gray-200"
            />

            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-800">{pro.name}</h3>
              <p className="text-xs text-gray-600">{pro.service}</p>
              <p className="text-xs text-gray-500">{pro.location}</p>

              <div className="flex items-center gap-1 mt-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-medium text-gray-700">
                  {pro.rating.toFixed(1)}
                </span>
              </div>
            </div>

            <span className="text-sm text-orange-500 hover:underline font-medium">
              Ver perfil
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
