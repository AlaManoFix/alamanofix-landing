'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';
import { Briefcase, CalendarDays, Users } from 'lucide-react';

export default function ProfesionalesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRedirect = async (path: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    router.push(path);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-orange-50 py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ¿Eres profesionista independiente?
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Únete a AlaManoFix y conecta con más clientes en tu zona. Administra
            tu tiempo, mejora tu reputación y aumenta tus ingresos.
          </p>
          <button
            onClick={() => handleRedirect('/registro-profesional')}
            className="inline-block bg-orange-500 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-orange-600 transition"
          >
            Regístrate ahora
          </button>
        </div>
      </section>

      {/* Beneficios */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Beneficios para profesionistas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {[
              {
                icon: <Briefcase className="w-6 h-6 text-orange-500" />,
                title: "Consigue más trabajos",
                desc: "Accede a personas que ya están buscando tus servicios.",
              },
              {
                icon: <CalendarDays className="w-6 h-6 text-orange-500" />,
                title: "Organiza tu horario",
                desc: "Tú decides cuándo trabajar. ¡Sin jefes, sin horarios forzados!",
              },
              {
                icon: <Users className="w-6 h-6 text-orange-500" />,
                title: "Haz crecer tu reputación",
                desc: "Tus buenas calificaciones generan más clientes y confianza.",
              },
            ].map((b, i) => (
              <div
                key={i}
                className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div className="mb-3">{b.icon}</div>
                <h3 className="text-xl font-semibold mb-1">{b.title}</h3>
                <p className="text-gray-600">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-orange-500 py-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
        <p className="mb-6 text-lg">Regístrate gratis y empieza a recibir solicitudes de clientes hoy mismo.</p>
        <button
          onClick={() => handleRedirect('/registro-profesional')}
          className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
        >
          Crear cuenta como profesionista
        </button>
      </section>

      <Footer />
    </>
  );
}
