'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReCAPTCHA from 'react-google-recaptcha';

export default function LoginProfesionalPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
    setCaptchaError(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');

    if (!captchaToken) {
      setCaptchaError(true);
      return;
    }

    const res = await fetch('/api/login-profesional', {
      method: 'POST',
      body: JSON.stringify({ ...formData, token: captchaToken }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push('/app');
    } else {
      setError(data.message || 'Error al iniciar sesión');
    }
  };

  return (
    <>
      <Navbar />

      <section className="bg-gray-50 py-16">
        <div className="max-w-md mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-6">Iniciar sesión</h1>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-md">
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

            <div className="flex justify-center">
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onChange={handleCaptchaChange}
              />
            </div>

            {captchaError && (
              <p className="text-red-500 text-sm text-center">
                Por favor, confirma que no eres un robot.
              </p>
            )}

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-md font-semibold hover:bg-orange-600 transition"
            >
              Ingresar
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
