'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SolicitudCard, { Solicitud, EstadoSolicitud } from '@/components/web-app/SolicitudCard';

const solicitudesDummy: Solicitud[] = [
  {
    id: 1,
    tipo: 'dirigida',
    estado: 'pendiente',
    servicio: 'Plomería',
    descripcion: 'Tengo una fuga en el baño.',
    profesional: { nombre: 'Juan Martínez' },
    fechaCreacion: '2025-07-01',
    ultimaAccion: 'Esperando respuesta del profesional',
  },
  {
    id: 2,
    tipo: 'abierta',
    estado: 'aceptada',
    servicio: 'Electricista',
    descripcion: 'Se fue la luz en la cocina.',
    fechaCreacion: '2025-06-29',
    ultimaAccion: 'Profesional aceptó la solicitud',
  },
  {
    id: 3,
    tipo: 'dirigida',
    estado: 'rechazada',
    servicio: 'Jardinería',
    descripcion: 'Necesito podar el jardín.',
    profesional: { nombre: 'Ana López' },
    fechaCreacion: '2025-06-28',
    ultimaAccion: 'Profesional rechazó la solicitud',
  },
  {
    id: 4,
    tipo: 'abierta',
    estado: 'cancelada',
    servicio: 'Pintura',
    descripcion: 'Quiero pintar la sala de mi casa.',
    fechaCreacion: '2025-06-27',
    ultimaAccion: 'Solicitud cancelada por el cliente',
  },
  {
    id: 5,
    tipo: 'dirigida',
    estado: 'completada',
    servicio: 'Limpieza',
    descripcion: 'Limpieza profunda de la casa.',
    profesional: { nombre: 'Carlos Pérez', fotoUrl: '/images/carlos.jpg' },
    fechaCreacion: '2025-06-26',
    ultimaAccion: 'Trabajo completado por el profesional',
  },
  {
    id: 6,
    tipo: 'abierta',
    estado: 'pendiente',
    servicio: 'Fontanería',
    descripcion: 'Reparar grifo que gotea.',
    fechaCreacion: '2025-06-25',
    ultimaAccion: 'Esperando profesionales interesados',
  },
  {
    id: 7,
    tipo: 'dirigida',
    estado: 'pendiente',
    servicio: 'Carpintería',
    descripcion: 'Necesito una estantería a medida.',
    profesional: { nombre: 'Laura Gómez' },
    fechaCreacion: '2025-06-24',
    ultimaAccion: 'Esperando respuesta del profesional',
  },
  {
    id: 8,
    tipo: 'abierta',
    estado: 'aceptada',
    servicio: 'Cerrajería',
    descripcion: 'Cambiar cerradura de la puerta principal.',
    fechaCreacion: '2025-06-23',
    ultimaAccion: 'Profesional aceptó la solicitud',
  },
];

export default function SolicitudesPage() {
  const router = useRouter();
  const [filtro, setFiltro] = useState<EstadoSolicitud>('todas');

  const solicitudesFiltradas = solicitudesDummy.filter(
    (s) => filtro === 'todas' || s.estado === filtro
  );

  return (
    <div className="pt-20 pb-16 px-4 max-w-3xl mx-auto">
      {/* Botón publicar */}
      <div className="mb-4 flex justify-center">
        <button
          onClick={() => router.push('/web-app/solicitudes/nueva')}
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
        >
          Publicar nueva solicitud
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {['todas', 'pendiente', 'aceptada', 'rechazada', 'cancelada', 'completada'].map((estado) => (
          <button
            key={estado}
            onClick={() => setFiltro(estado as EstadoSolicitud)}
            className={`px-3 py-1 rounded-full text-sm font-medium border ${
              filtro === estado
                ? 'bg-orange-600 text-white border-orange-600'
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {estado.charAt(0).toUpperCase() + estado.slice(1)}
          </button>
        ))}
      </div>

      {/* Lista de solicitudes */}
      <div className="space-y-4">
        {solicitudesFiltradas.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            <p className="text-xl">🗂️ No tienes solicitudes en este estado</p>
            <p>¡Publica tu primera solicitud para encontrar al mejor profesional!</p>
            <button
              onClick={() => router.push('/web-app/solicitudes/nueva')}
              className="mt-4 bg-orange-600 text-white px-4 py-2 rounded"
            >
              Publicar nueva solicitud
            </button>
          </div>
        ) : (
          solicitudesFiltradas.map((s) => (
            <SolicitudCard key={s.id} solicitud={s} />
          ))
        )}
      </div>
    </div>
  );
}
