'use client';

import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import LoaderOverlay from '@/components/shared/LoaderOverlay';

type SearchCardProps = {
  data: {
    id: number;
    nombre: string;
    profesion: string;
    ciudad: string;
    rating: number;
    descripcion: string;
    imagen: string;
    precioMin: number;
    precioMax: number;
    precio: number;
  };
};

export default function SearchCard({ data }: SearchCardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      router.push(`/web-app/perfil/${data.id}`);
    }, 300);
  };
  

  return (
    <>
      {loading && <LoaderOverlay />}
      <div
        onClick={handleClick}
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition border border-gray-100 cursor-pointer"
      >
        <img
          src={data.imagen}
          alt={data.nombre}
          className="w-full h-40 object-cover"
        />
        <div className="p-4 flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-gray-800">{data.nombre}</h3>
          <p className="text-sm text-gray-600">{data.profesion}</p>
          <p className="text-xs text-gray-500 line-clamp-2">{data.descripcion}</p>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-1 text-sm text-yellow-500">
              <Star className="w-4 h-4 fill-yellow-400" />
              {data.rating}
            </div>
            <div className="text-sm font-semibold text-orange-500">
              ~ ${data.precio} MXN
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
