'use client';

import { LogOut, Pencil, CalendarCheck, Star } from 'lucide-react';

export default function MiPerfilProfesionalPage() {
  const profesional = {
    nombre: 'Juan Pérez',
    profesion: 'Electricista',
    ciudad: 'Culiacán, Sinaloa',
    imagen: '/images/perfil-juan.jpg',
    calificacion: 4.8,
    experiencia: 'Más de 10 años de experiencia en instalaciones eléctricas residenciales e industriales.',
    servicios: ['Instalaciones', 'Reparaciones', 'Mantenimiento preventivo'],
  };

  return (
    <div className="pt-20 pb-20 px-4 max-w-xl mx-auto">
      {/* Perfil básico */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={profesional.imagen}
          alt={profesional.nombre}
          className="w-20 h-20 rounded-full object-cover border border-gray-300"
        />
        <div>
          <h2 className="text-xl font-bold text-gray-800">{profesional.nombre}</h2>
          <p className="text-sm text-gray-600">{profesional.profesion}</p>
          <p className="text-xs text-gray-500">{profesional.ciudad}</p>
        </div>
      </div>

      {/* Calificación */}
      <div className="flex items-center gap-1 text-yellow-500 mb-6">
        <Star className="w-4 h-4 fill-yellow-400" />
        <span className="text-sm font-medium text-gray-800">
          {profesional.calificacion.toFixed(1)} / 5.0
        </span>
      </div>

      {/* Experiencia */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-800 mb-1">Sobre mí</h3>
        <p className="text-sm text-gray-700">{profesional.experiencia}</p>
      </div>

      {/* Servicios ofrecidos */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-800 mb-1">Servicios que ofreces</h3>
        <ul className="list-disc list-inside text-sm text-gray-700">
          {profesional.servicios.map((servicio, i) => (
            <li key={i}>{servicio}</li>
          ))}
        </ul>
      </div>

      {/* Acciones */}
      <div className="grid grid-cols-1 gap-3 mb-10">
        <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition text-sm font-medium">
          <Pencil className="w-4 h-4" />
          Editar perfil
        </button>

        <button className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition text-sm font-medium">
          <CalendarCheck className="w-4 h-4" />
          Gestionar disponibilidad
        </button>
      </div>

      {/* Cerrar sesión */}
      <div className="flex justify-center">
        <button className="text-red-600 hover:underline flex items-center gap-1 text-sm font-medium">
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
