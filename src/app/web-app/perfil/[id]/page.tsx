'use client';

import Image from 'next/image';
import { Star, MapPin } from 'lucide-react';
import { useParams } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// Datos simulados
const mockData = {
  id: '1',
  nombre: 'Juan Pérez',
  profesion: 'Electricista',
  descripcion:
    'Especialista en instalaciones eléctricas residenciales y comerciales. 10 años de experiencia, certificado por la CFE.',
  rating: 4.7,
  zona: 'Ciudad de México',
  rangoPrecios: '$500 - $2,500 MXN',
  fotos: [
    '/images/trabajo1.jpg',
    '/images/trabajo2.jpg',
    '/images/trabajo3.jpg',
  ],
  ubicacion: 'https://maps.google.com/?q=19.4326,-99.1332',
  telefono: '+5215512345678',
  portada: '/images/portada.jpg',
  imagen: '/images/perfil.jpg',
  valoraciones: [
    { usuario: 'Carlos M.', comentario: '¡Muy profesional y puntual!', estrellas: 5 },
    { usuario: 'Ana L.', comentario: 'Buen trabajo, aunque tardó un poco.', estrellas: 4 },
  ],
};

export default function PerfilPage() {
  const { id } = useParams();

  // En un futuro esto será una búsqueda por ID en una base de datos
  const profesional = mockData.id === id ? mockData : null;

  if (!profesional) {
    return <p className="p-6">Profesional no encontrado</p>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Portada + Avatar */}
      <div className="relative h-40 sm:h-56 bg-gray-200">
        <Image
          src={profesional.portada || '/default-cover.jpg'}
          alt="Portada"
          fill
          className="object-cover rounded-b-xl"
        />
        <div className="absolute -bottom-10 left-6 w-20 h-20 rounded-full border-4 border-white overflow-hidden shadow-md">
          <Image
            src={profesional.imagen || '/default-avatar.jpg'}
            alt="Foto de perfil"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-14 px-4 pb-10">
        <h1 className="text-xl font-bold text-gray-800">{profesional.nombre}</h1>
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
            href={`https://wa.me/${profesional.telefono.replace(/\D/g, '')}`}
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
          <h2 className="text-base font-semibold text-gray-800 mb-1">Descripción</h2>
          <p className="text-sm text-gray-600">{profesional.descripcion}</p>
        </div>

        {/* Rango de precios */}
        <div className="mt-4">
          <h2 className="text-base font-semibold text-gray-800 mb-1">Rango de precios</h2>
          <p className="text-sm text-gray-600">{profesional.rangoPrecios}</p>
        </div>

        {/* Galería de trabajos con Swiper */}
        <div className="mt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-2">Galería de trabajos</h2>
          <Swiper
            spaceBetween={12}
            slidesPerView={1.5}
            className="w-full"
          >
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
          <h2 className="text-base font-semibold text-gray-800 mb-1">Ubicación</h2>
          <a
            href={profesional.ubicacion}
            target="_blank"
            className="block bg-gray-200 w-full h-40 rounded-lg flex items-center justify-center text-gray-600 text-sm"
          >
            Ver en el mapa
          </a>
        </div>
      </div>
    </div>
  );
}
