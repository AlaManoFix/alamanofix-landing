'use client';

import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

const solicitudesDummy = [
  {
    id: '1',
    tipo: 'dirigida',
    estado: 'pendiente',
    servicio: 'Plomería',
    descripcion: 'Tengo una fuga en el baño.',
    profesional: { nombre: 'Juan Martínez' },
    fechaCreacion: '2025-07-01',
    ultimaAccion: 'Esperando respuesta del profesional',
  },
  {
    id: '2',
    tipo: 'abierta',
    estado: 'aceptada',
    servicio: 'Electricista',
    descripcion: 'Se fue la luz en la cocina.',
    profesional: null,
    fechaCreacion: '2025-06-29',
    ultimaAccion: 'Profesional aceptó la solicitud',
  },
];

export default function DetallesSolicitudPage() {
  const router = useRouter();
  const { id } = useParams();

  const solicitud = solicitudesDummy.find((s) => s.id === id);

  if (!solicitud) {
    return (
      <div className="pt-20 px-4 text-center text-gray-600">
        <p className="text-xl">Solicitud no encontrada</p>
        <button
          className="mt-4 text-orange-600 underline"
          onClick={() => router.push('/web-app/solicitudes')}
        >
          Volver al listado
        </button>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16 px-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Detalles de la solicitud</h1>

      <div className="bg-white rounded shadow-sm p-4 border space-y-4">
        <div>
          <span className="text-sm text-gray-500">Tipo:</span>
          <p className="font-medium capitalize">{solicitud.tipo}</p>
        </div>

        <div>
          <span className="text-sm text-gray-500">Estado actual:</span>
          <p className="font-semibold text-orange-600 uppercase">{solicitud.estado}</p>
        </div>

        <div>
          <span className="text-sm text-gray-500">Servicio solicitado:</span>
          <p className="font-medium">{solicitud.servicio}</p>
        </div>

        <div>
          <span className="text-sm text-gray-500">Descripción:</span>
          <p className="italic text-gray-800">{solicitud.descripcion}</p>
        </div>

        <div>
          <span className="text-sm text-gray-500">Fecha de creación:</span>
          <p className="text-sm">{solicitud.fechaCreacion}</p>
        </div>

        <div>
          <span className="text-sm text-gray-500">Última acción:</span>
          <p className="text-sm text-gray-700">{solicitud.ultimaAccion}</p>
        </div>

        {solicitud.tipo === 'dirigida' && solicitud.profesional && (
          <div>
            <span className="text-sm text-gray-500">Profesional asignado:</span>
            <p className="text-sm font-medium">👤 {solicitud.profesional.nombre}</p>
          </div>
        )}
      </div>

      <button
        onClick={() => router.back()}
        className="mt-6 text-sm text-gray-600 underline"
      >
        ← Volver
      </button>
    </div>
  );
}
