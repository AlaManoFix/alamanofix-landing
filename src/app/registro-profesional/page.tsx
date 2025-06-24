'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';
import { Eye, EyeOff } from 'lucide-react';

export default function RegistroProfesionalPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    profesion: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    symbol: false,
  });

  const updatePasswordChecks = (password: string) => {
    setPasswordChecks({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      symbol: /[@$!%*?&.#]/.test(password),
    });
  };

  const validateEmail = (email: string) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const validatePassword = (password: string) =>
    Object.values(passwordChecks).every(Boolean);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'email') {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value) ? '' : 'Correo no válido',
      }));
    }

    if (name === 'password') {
      updatePasswordChecks(value);
      setErrors((prev) => ({
        ...prev,
        password: validatePassword(value)
          ? ''
          : 'La contraseña no cumple con los requisitos.',
      }));
    }

    if (name === 'confirmPassword') {
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          value === formData.password ? '' : 'Las contraseñas no coinciden',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEmailValid = validateEmail(formData.email);
    const isPasswordValid = validatePassword(formData.password);
    const doPasswordsMatch = formData.password === formData.confirmPassword;

    if (!isEmailValid || !isPasswordValid || !doPasswordsMatch) {
      setErrors({
        email: isEmailValid ? '' : 'Correo no válido',
        password: isPasswordValid ? '' : 'La contraseña no cumple con los requisitos.',
        confirmPassword: doPasswordsMatch ? '' : 'Las contraseñas no coinciden',
      });
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Registrando profesionista:', formData);
    } catch (error) {
      console.error('Error al registrar:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    'mt-1 block w-full px-3 py-2 rounded-md shadow-sm border input-bordered';

  return (
    <>
      <Navbar />

      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <section className="bg-gray-50 py-16">
          <div className="max-w-xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-center mb-2">
              Registro de Profesionistas
            </h1>
            <p className="text-center text-gray-600 mb-8">
              Crea tu cuenta gratuita para comenzar a recibir solicitudes de clientes.
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-white p-6 rounded-xl shadow-md"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre completo
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Profesión u oficio
                </label>
                <input
                  type="text"
                  name="profesion"
                  value={formData.profesion}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`${inputClass} ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={`${inputClass} pr-10 ${
                      errors.password ? 'border-red-500' : ''
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute top-2.5 right-2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="mt-2 text-sm text-gray-600 space-y-1">
                  <p className={passwordChecks.length ? 'text-green-600' : ''}>
                    • Al menos 8 caracteres
                  </p>
                  <p className={passwordChecks.uppercase ? 'text-green-600' : ''}>
                    • Una letra mayúscula
                  </p>
                  <p className={passwordChecks.lowercase ? 'text-green-600' : ''}>
                    • Una letra minúscula
                  </p>
                  <p className={passwordChecks.number ? 'text-green-600' : ''}>
                    • Un número
                  </p>
                  <p className={passwordChecks.symbol ? 'text-green-600' : ''}>
                    • Un símbolo (@$!%*?&.#)
                  </p>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirmar contraseña
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className={`${inputClass} pr-10 ${
                      errors.confirmPassword ? 'border-red-500' : ''
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute top-2.5 right-2 text-gray-500"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
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
      )}

      <Footer />
    </>
  );
}
