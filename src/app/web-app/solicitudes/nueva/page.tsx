"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProfesionalAutocomplete from "@/components/web-app/ProfesionalAutocomplete";
import ServicioAutocomplete from "@/components/web-app/ServicioAutocomplete";

type TipoSolicitud = "abierta" | "dirigida";

interface Profesional {
  id: string;
  nombre: string;
  especialidad: string;
  ciudad: string;
  servicios: string[];
}

export default function NuevaSolicitudPage() {
  const router = useRouter();
  const [tipo, setTipo] = useState<TipoSolicitud>("abierta");
  const [profesional, setProfesional] = useState<Profesional | null>(null);
  const [servicio, setServicio] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      tipo,
      profesionalId: tipo === "dirigida" ? profesional?.id : null,
      servicio,
      descripcion,
    };

    console.log("Solicitud enviada:", payload);
    alert("Solicitud publicada correctamente");
    router.push("/web-app/solicitudes");
  };

  return (
    <div className="pt-20 pb-16 px-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Publicar nueva solicitud</h1>

      {/* Tipo de solicitud */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Tipo de solicitud:</label>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setTipo("abierta");
              setProfesional(null);
              setServicio("");
            }}
            className={`px-4 py-2 rounded-full border ${
              tipo === "abierta"
                ? "bg-orange-600 text-white border-orange-600"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            Abierta
          </button>
          <button
            onClick={() => {
              setTipo("dirigida");
              setServicio("");
            }}
            className={`px-4 py-2 rounded-full border ${
              tipo === "dirigida"
                ? "bg-orange-600 text-white border-orange-600"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            Dirigida
          </button>
        </div>
      </div>

      {/* Profesional */}
      {tipo === "dirigida" && (
        <div className="mb-4">
          <label className="block font-medium mb-2">Profesional:</label>
          <ProfesionalAutocomplete onSelect={(p) => setProfesional(p)} />
          {profesional && (
            <p className="mt-2 text-sm text-gray-500">
              Profesional seleccionado: <strong>{profesional.nombre}</strong>
            </p>
          )}
        </div>
      )}

      {/* Servicio */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Servicio requerido:</label>
        {tipo === "dirigida" && profesional ? (
          <>
            <ServicioAutocomplete
              serviciosDisponibles={profesional.servicios}
              onSelect={(s) => setServicio(s)}
            />
            {servicio && (
              <p className="mt-2 text-sm text-gray-500">
                Servicio seleccionado: <strong>{servicio}</strong>
              </p>
            )}
          </>
        ) : (
          <input
            type="text"
            value={servicio}
            onChange={(e) => setServicio(e.target.value)}
            placeholder="Ej: Plomería, Electricidad, Limpieza..."
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        )}
      </div>

      {/* Descripción */}
      <div className="mb-6">
        <label className="block font-medium mb-2">
          Descripción del problema o requerimiento:
        </label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Describe brevemente qué necesitas..."
          className="w-full border border-gray-300 rounded px-3 py-2 h-32 resize-none"
        />
      </div>

      {/* Botón de publicar */}
      <button
        onClick={handleSubmit}
        className="bg-orange-600 text-white px-6 py-3 rounded hover:bg-orange-700 transition w-full"
      >
        Publicar solicitud
      </button>
    </div>
  );
}
