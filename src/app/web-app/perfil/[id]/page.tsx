// File: src/app/web-app/perfil/[id]/page.tsx
"use client";

import Image from "next/image";
import { Star, MapPin } from "lucide-react";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState } from "react";

// Datos simulados
const mockData = {
  id: "1",
  nombre: "Juan Pérez",
  profesion: "Electricista",
  descripcion:
    "Especialista en instalaciones eléctricas residenciales y comerciales. 10 años de experiencia, certificado por la CFE.",
  rating: 4.7,
  zona: "Ciudad de México",
  rangoPrecios: "$500 - $2,500 MXN",
  fotos: [
    "/images/trabajo1.jpg",
    "/images/trabajo2.jpg",
    "/images/trabajo3.jpg",
  ],
  ubicacion: "https://maps.google.com/?q=19.4326,-99.1332",
  telefono: "+5215512345678",
  portada: "/images/portada.jpg",
  imagen: "/images/perfil.jpg",
  valoraciones: [
    {
      usuario: "Carlos M.",
      comentario: "¡Muy profesional y puntual!",
      estrellas: 5,
    },
    {
      usuario: "Ana L.",
      comentario: "Buen trabajo, aunque tardó un poco.",
      estrellas: 4,
    },
    {
      usuario: "Luis R.",
      comentario: "Excelente servicio, lo recomiendo.",
      estrellas: 5,
    },
    {
      usuario: "Marta G.",
      comentario: "Muy amable y atento a mis necesidades.",
      estrellas: 4,
    },
    {
      usuario: "Pedro S.",
      comentario: "Buen trabajo, pero podría mejorar la comunicación.",
      estrellas: 3,
    },
  ],
};

export default function PerfilPage() {
  const { id } = useParams();

  const [filtroEstrellas, setFiltroEstrellas] = useState<number | "all">("all");

  // En un futuro esto será una búsqueda por ID en una base de datos
  const profesional = mockData.id === id ? mockData : null;

  if (!profesional) {
    return <p className="p-6">Profesional no encontrado</p>;
  }

  const valoracionesFiltradas = profesional.valoraciones.filter((v) => {
    if (filtroEstrellas === "all") return true;
    if (filtroEstrellas === 3) return v.estrellas <= 3;
    return v.estrellas === filtroEstrellas;
  });

  const totalReseñas = profesional.valoraciones.length;
  const count5 = profesional.valoraciones.filter(
    (v) => v.estrellas === 5
  ).length;
  const count4 = profesional.valoraciones.filter(
    (v) => v.estrellas === 4
  ).length;
  const count3oMenos = profesional.valoraciones.filter(
    (v) => v.estrellas <= 3
  ).length;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Portada + Avatar */}
      <div className="relative h-40 sm:h-56 bg-gray-200">
        <Image
          src={profesional.portada || "/default-cover.jpg"}
          alt="Portada"
          fill
          className="object-cover rounded-b-xl"
        />
        <div className="absolute -bottom-10 left-6 w-20 h-20 rounded-full border-4 border-white overflow-hidden shadow-md">
          <Image
            src={profesional.imagen || "/default-avatar.jpg"}
            alt="Foto de perfil"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-14 px-4 pb-20">
        <h1 className="text-xl font-bold text-gray-800">
          {profesional.nombre}
        </h1>
        <p className="text-orange-600 font-medium">{profesional.profesion}</p>

        <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            {profesional.rating} estrellas
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {profesional.zona}
          </span>
        </div>

        <div className="flex gap-4 mt-4">
          <a
            href={`https://wa.me/${profesional.telefono.replace(/\D/g, "")}`}
            target="_blank"
            className="bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow hover:bg-green-600"
          >
            WhatsApp
          </a>
          <button className="bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow hover:bg-blue-600">
            Chat App
          </button>
        </div>

        {/* Descripción */}
        <div className="mt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-1">
            Descripción
          </h2>
          <p className="text-sm text-gray-600">{profesional.descripcion}</p>
        </div>

        {/* Rango de precios */}
        <div className="mt-4">
          <h2 className="text-base font-semibold text-gray-800 mb-1">
            Rango de precios aproximados
          </h2>
          <p className="text-sm text-gray-600">{profesional.rangoPrecios}</p>
        </div>

        {/* Galería de trabajos con Swiper */}
        <div className="mt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-2">
            Galería de trabajos
          </h2>
          <Swiper spaceBetween={12} slidesPerView={1.5} className="w-full">
            {profesional.fotos.map((foto, index) => (
              <SwiperSlide key={index}>
                <div className="rounded-md overflow-hidden h-36 sm:h-40">
                  <Image
                    src={foto}
                    alt={`Foto trabajo ${index + 1}`}
                    width={400}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Ubicación */}
        <div className="mt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-1">
            Ubicación
          </h2>
          <a
            href={profesional.ubicacion}
            target="_blank"
            className="block bg-gray-200 w-full h-40 rounded-lg flex items-center justify-center text-gray-600 text-sm"
          >
            Ver en el mapa
          </a>
        </div>

        {/* Valoraciones */}
        <div className="mt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-2">
            Valoraciones
          </h2>

          {/* Filtros de valoraciones mejorados */}
          <div className="flex flex-wrap gap-2 mt-2 mb-4">
            {[
              { label: `Todas (${totalReseñas})`, value: "all" },
              { label: `5 ★ (${count5})`, value: 5 },
              { label: `4 ★ (${count4})`, value: 4 },
              { label: `≤ 3 ★ (${count3oMenos})`, value: 3 },
            ].map((filtro) => (
              <button
                key={filtro.value}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all border shadow-sm ${
                  filtroEstrellas === filtro.value
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => setFiltroEstrellas(filtro.value as number | 'all')}
              >
                {filtro.label}
              </button>
            ))}
          </div>

          {/* Lista con scroll interno si hay muchas */}
          <div className="flex flex-col gap-3 max-h-[260px] overflow-y-auto pr-1">
            {valoracionesFiltradas.length > 0 ? (
              valoracionesFiltradas.map((val, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-md px-4 py-3 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm text-gray-800">
                      {val.usuario}
                    </span>
                    <div className="flex items-center gap-1 text-yellow-500 text-xs">
                      {[...Array(val.estrellas)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{val.comentario}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                No hay valoraciones con ese filtro.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
