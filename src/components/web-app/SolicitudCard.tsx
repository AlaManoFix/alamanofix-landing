// File: src/components/web-app/SolicitudCard.tsx
'use client';

import { useRouter } from 'next/navigation';

export type EstadoSolicitud = 'todas' | 'pendiente' | 'aceptada' | 'rechazada' | 'cancelada' | 'completada';

export interface Solicitud {
  id: string; // ← CAMBIO aquí: era number, ahora string
  tipo: 'dirigida' | 'abierta';
  estado: EstadoSolicitud;
  servicio: string;
  descripcion: string;
  profesional?: {
    nombre: string;
    fotoUrl?: string;
  };
  fechaCreacion: string;
  ultimaAccion: string;
}

export default function SolicitudCard({ solicitud }: { solicitud: Solicitud }) {
  const router = useRouter();

  return (
    <div className="border p-4 rounded shadow-sm hover:shadow-md transition bg-white">
      <div className="flex justify-between">
        <h2 className="font-semibold text-lg">
          🛠️ {solicitud.servicio} ({solicitud.tipo})
        </h2>
        <span className="text-sm font-semibold uppercase text-orange-600">{solicitud.estado}</span>
      </div>

      {solicitud.profesional && (
        <p className="text-sm">👤 {solicitud.profesional.nombre}</p>
      )}

      <p className="text-sm text-gray-500">📅 {solicitud.fechaCreacion}</p>
      <p className="italic my-2 text-gray-700">“{solicitud.descripcion}”</p>

      <button
        onClick={() => router.push(`/web-app/solicitudes/${solicitud.id}`)}
        className="text-orange-600 font-medium hover:underline"
      >
        Ver detalles →
      </button>
    </div>
  );
}
