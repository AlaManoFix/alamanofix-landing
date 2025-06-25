'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import SearchCard from '@/components/web-app/SearchCard';
import { dummySearchResults } from '@/data/dummySearchResults'; // Simulated data

export default function WebAppSearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  const [filtroCiudad, setFiltroCiudad] = useState('');
  const [filtroProfesion, setFiltroProfesion] = useState('');

  const resultadosFiltrados = useMemo(() => {
    return dummySearchResults.filter((item) => {
      const coincideTexto =
        item.nombre.toLowerCase().includes(query) ||
        item.profesion.toLowerCase().includes(query) ||
        item.descripcion.toLowerCase().includes(query);

      const coincideCiudad = filtroCiudad ? item.ciudad === filtroCiudad : true;
      const coincideProfesion = filtroProfesion ? item.profesion === filtroProfesion : true;

      return coincideTexto && coincideCiudad && coincideProfesion;
    });
  }, [query, filtroCiudad, filtroProfesion]);

  return (
    <div className="min-h-screen pt-[120px] pb-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Resultados para: <span className="text-orange-500">{query}</span>
      </h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={filtroProfesion}
          onChange={(e) => setFiltroProfesion(e.target.value)}
          className="px-3 py-2 rounded-md border border-gray-300 bg-white shadow-sm text-sm"
        >
          <option value="">Todos los oficios</option>
          {[...new Set(dummySearchResults.map((d) => d.profesion))].map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <select
          value={filtroCiudad}
          onChange={(e) => setFiltroCiudad(e.target.value)}
          className="px-3 py-2 rounded-md border border-gray-300 bg-white shadow-sm text-sm"
        >
          <option value="">Todas las ciudades</option>
          {[...new Set(dummySearchResults.map((d) => d.ciudad))].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {resultadosFiltrados.length === 0 ? (
        <p className="text-gray-500 text-sm">No se encontraron resultados.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resultadosFiltrados.map((item) => (
            <SearchCard key={item.id} data={item} />
          ))}
        </div>
      )}
    </div>
  );
}
