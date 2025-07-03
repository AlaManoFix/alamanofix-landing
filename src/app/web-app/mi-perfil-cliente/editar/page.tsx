// src/app/web-app/mi-perfil-cliente/editar/page.tsx
'use client';

import { Save, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function EditarPerfilCliente() {
  const router = useRouter();

  // Dummy inicial (simula datos precargados)
  const [form, setForm] = useState({
    nombre: 'María Rodríguez',
    email: 'maria@example.com',
    ciudad: 'Culiacán, Sin.',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos actualizados:', form);
    // Aquí se haría la llamada al backend
    
  };

  return (
    <div className="pt-20 pb-28 px-4 max-w-xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Editar Perfil</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Nombre */}
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre completo
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Ciudad */}
        <div>
          <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700 mb-1">
            Ciudad
          </label>
          <input
            type="text"
            id="ciudad"
            name="ciudad"
            value={form.ciudad}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Guardar */}
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-medium flex justify-center items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
