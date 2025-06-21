'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section id="hero" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        
        {/* Text content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Conecta con profesionales de confianza
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            AlaManoFix te ayuda a encontrar expertos locales para tus necesidades del hogar o negocio.
          </p>
          <Link
            href="#servicios"
            className="inline-block bg-orange-500 text-white text-lg font-medium px-6 py-3 rounded-full hover:bg-orange-600 transition"
          >
            Buscar servicios
          </Link>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2">
          <Image
            src="/hero-illustration.png" // ⚠️ Coloca esta imagen en public/
            alt="Profesionales confiables"
            width={600}
            height={400}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
}
