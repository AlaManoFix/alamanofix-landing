'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function RegistroProfesionalPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    profesion: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registrando profesionista:', formData);
    // Aquí iría tu lógica de registro con API/Auth
  };

  return (
    <>
      <Navbar />

      <section className="bg-gray-50 py-16">
        <div className="max-w-xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-2">Registro de Profesionistas</h1>
          <p className="text-center text-gray-600 mb-8">
            Crea tu cuenta gratuita para comenzar a recibir solicitudes de clientes.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-md">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Profesión u oficio</label>
              <input
                type="text"
                name="profesion"
                value={formData.profesion}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Teléfono</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Contraseña</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Confirmar contraseña</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-md font-semibold hover:bg-orange-600 transition"
            >
              Crear cuenta
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
