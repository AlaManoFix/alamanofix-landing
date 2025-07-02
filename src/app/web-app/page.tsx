// src/app/web-app/page.tsx
"use client";

import SmartSearch from "@/components/web-app/SmartSearch";
import PopularServices from "@/components/web-app/PopularServices";
import TopRatedProfessionals from "@/components/web-app/TopRatedProfessionals";
import ExploreCategories from "@/components/web-app/ExploreCategories";
import BottomBar from "@/components/web-app/BottomBar";
import NavbarWebApp from "@/components/web-app/NavbarWebApp";

export default function WebAppHomePage() {
  return (
    <>
      <main className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10 pb-24 pt-[136px]">
        {/* Encabezado de bienvenida */}
        <section className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            ¿Qué necesitas resolver hoy?
          </h1>
          <p className="mt-2 text-gray-600 text-base sm:text-lg">
            Busca por servicio, problema o profesional. Es rápido y sin complicaciones.
          </p>
        </section>

        {/* Buscador inline solo visible en versión web */}
        <section className="max-w-2xl mx-auto mb-12 hidden md:block">
          <SmartSearch />
        </section>

        {/* Servicios más buscados */}
        <section className="max-w-6xl mx-auto mb-12">
          <PopularServices />
        </section>

        {/* Profesionales mejor valorados */}
        <section className="max-w-6xl mx-auto mb-12">
          <TopRatedProfessionals />
        </section>

        {/* Explorar por categoría */}
        <section className="max-w-6xl mx-auto">
          <ExploreCategories />
        </section>
      </main>
    </>
  );
}
