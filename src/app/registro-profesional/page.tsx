'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function RegistroProfesionalPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    profesion: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
  });

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
    setCaptchaError(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!captchaToken) {
    setCaptchaError(true);
    return;
  }

  const res = await fetch('/api/registro-profesional', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...formData, token: captchaToken }),
  });

  const data = await res.json();

  if (data.success) {
    alert('✅ Registro exitoso');
    // Redirigir o limpiar el form
  } else {
    alert(`❌ ${data.message}`);
  }
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
            {/* Campos del formulario */}
            {['nombre', 'profesion', 'email', 'telefono'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {field === 'email' ? 'Correo electrónico' : field}
                </label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2"
                />
              </div>
            ))}

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

            {/* reCAPTCHA */}
            <div className="flex justify-center">
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onChange={handleCaptchaChange}
              />
            </div>
            {captchaError && (
              <p className="text-red-500 text-sm text-center">Por favor, confirma que no eres un robot.</p>
            )}

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
