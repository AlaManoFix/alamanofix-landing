// src/app/web-app/mi-perfil-cliente/page.tsx
"use client";

import { LogOut, Mail, MapPin, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";


export default function MiPerfilCliente() {
  // 🔸 Datos dummy por ahora
  const usuario = {
    nombre: "María Rodríguez",
    email: "maria@example.com",
    ciudad: "Culiacán, Sin.",
    rol: "cliente",
    imagen: "/images/profiles/cliente-default.jpg",
  };

  const cerrarSesion = () => {
    console.log("Cerrar sesión");
  };

  const router = useRouter();

  return (
    <div className="pt-20 pb-28 px-4 max-w-xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center gap-3 mb-6 text-center">
        <img
          src={usuario.imagen}
          alt={usuario.nombre}
          className="w-24 h-24 rounded-full object-cover border-2 border-orange-500"
        />
        <h2 className="text-xl font-semibold text-gray-800">
          {usuario.nombre}
        </h2>
        <p className="text-sm text-gray-500 capitalize">{usuario.rol}</p>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Mail className="w-4 h-4" />
          <span>{usuario.email}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-orange-500" />
          <span>{usuario.ciudad}</span>
        </div>

        <button
          onClick={() => router.push("/web-app/mi-perfil-cliente/editar")}
          className="text-sm text-orange-500 flex items-center gap-1 mt-1"
        >
          <Pencil className="w-4 h-4" />
          Editar perfil
        </button>
      </div>

      {/* Mensaje informativo */}
      <div className="text-center text-gray-600 text-sm px-4">
        <p>
          Este es tu perfil como <strong>cliente</strong>.
        </p>
        <p className="mt-1">
          Próximamente podrás editar tu información, preferencias y métodos de
          contacto.
        </p>
      </div>

      {/* Cerrar sesión */}
      <button
        onClick={cerrarSesion}
        className="w-full bg-red-500 text-white py-3 rounded-xl text-sm font-medium mt-8 hover:bg-red-600 transition"
      >
        <LogOut className="inline w-4 h-4 mr-2" />
        Cerrar sesión
      </button>
    </div>
  );
}
