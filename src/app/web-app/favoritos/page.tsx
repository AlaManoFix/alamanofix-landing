// src/app/web-app/favoritos/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Star, HeartOff } from "lucide-react";
import { useRouter } from "next/navigation";
import LoaderOverlay from "@/components/shared/LoaderOverlay";

type ProfesionalFavorito = {
  id: number;
  nombre: string;
  profesion: string;
  ciudad: string;
  rating: number;
  descripcion: string;
  imagen: string;
  precio: number;
};

const favoritosDummy: ProfesionalFavorito[] = [
  {
    id: 101,
    nombre: "Diana Torres",
    profesion: "Diseñadora de interiores",
    ciudad: "Culiacán, Sin.",
    rating: 4.9,
    descripcion: "Especialista en espacios modernos y funcionales.",
    imagen: "/images/profiles/interiores1.jpg",
    precio: 1200,
  },
  {
    id: 102,
    nombre: "Marco Ruiz",
    profesion: "Fontanero",
    ciudad: "Mazatlán, Sin.",
    rating: 4.8,
    descripcion: "Rápido, eficiente y confiable.",
    imagen: "/images/profiles/fontanero1.jpg",
    precio: 900,
  },
];

export default function FavoritosPage() {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleClick = (id: number) => {
    setLoadingId(id);
    setTimeout(() => {
      router.push(`/web-app/perfil/${id}`);
    }, 300);
  };

  useEffect(() => {
    // Aquí podrías ocultar un loader global si lo usas
  }, []);

  return (
    <div className="pt-20 pb-16 px-4 max-w-4xl mx-auto">
      {loadingId !== null && <LoaderOverlay />}

      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        ⭐ Tus favoritos
      </h1>

      {favoritosDummy.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          <p className="text-xl">Aún no tienes favoritos</p>
          <p className="text-sm">
            Guarda tus profesionales preferidos para acceder rápido
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favoritosDummy.map((pro) => (
            <div
              key={pro.id}
              className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition border border-gray-100"
            >
              {/* Botón de quitar (solo vista) */}
              <button
                className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-1 shadow-sm border"
                onClick={() => alert("Quitar de favoritos (solo vista)")}
              >
                <HeartOff className="w-5 h-5 text-red-500" />
              </button>

              <div
                onClick={() => handleClick(pro.id)}
                className="cursor-pointer"
              >
                <img
                  src={pro.imagen}
                  alt={pro.nombre}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 flex flex-col gap-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {pro.nombre}
                  </h3>
                  <p className="text-sm text-gray-600">{pro.profesion}</p>
                  <p className="text-xs text-gray-500">{pro.ciudad}</p>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {pro.descripcion}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1 text-sm text-yellow-500">
                      <Star className="w-4 h-4 fill-yellow-400" />
                      {pro.rating}
                    </div>
                    <div className="text-sm font-semibold text-orange-500">
                      ~ ${pro.precio} MXN
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
