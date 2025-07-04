'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { dummySearchResults } from '@/data/dummySearchResults';
import SearchCard from '@/components/web-app/SearchCard';
import Loader from '@/components/Loader';

const categorias = ['Todos', ...Array.from(new Set(dummySearchResults.map((d) => d.profesion)))];
const ordenamientos = ['Relevancia', 'Mejor valorados', 'Precio ascendente', 'Precio descendente'];

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(dummySearchResults);
  const [categoria, setCategoria] = useState('Todos');
  const [orden, setOrden] = useState('Relevancia');
  const [isLoading, setIsLoading] = useState(true);

  // Simula carga inicial (por query)
  useEffect(() => {
    const q = searchParams.get('query') || '';
    setQuery(q);

    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [searchParams]);

  // Simula carga al cambiar filtros
  useEffect(() => {
    setIsLoading(true);

    const timeout = setTimeout(() => {
      let filtrados = [...dummySearchResults];

      if (categoria !== 'Todos') {
        filtrados = filtrados.filter((item) => item.profesion === categoria);
      }

      if (orden === 'Mejor valorados') {
        filtrados.sort((a, b) => b.rating - a.rating);
      } else if (orden === 'Precio ascendente') {
        filtrados.sort((a, b) => a.precio - b.precio);
      } else if (orden === 'Precio descendente') {
        filtrados.sort((a, b) => b.precio - a.precio);
      }

      if (query.trim()) {
        filtrados = filtrados.filter((item) =>
          `${item.nombre} ${item.profesion} ${item.descripcion}`.toLowerCase().includes(query.toLowerCase())
        );
      }

      setResults(filtrados);
      setIsLoading(false);
    }, 1000); // un poco más corto que el inicial

    return () => clearTimeout(timeout);
  }, [categoria, orden, query]);

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">
        Resultados de búsqueda
      </h1>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoria(cat)}
              className={`px-4 py-1.5 text-sm rounded-full border ${
                categoria === cat
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'text-gray-600 hover:bg-orange-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <select
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
          className="px-3 py-2 text-sm rounded-md border border-gray-300 bg-white focus:outline-none"
        >
          {ordenamientos.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      {/* Resultados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.length > 0 ? (
          results.map((item) => <SearchCard key={item.id} data={item} />)
        ) : (
          <p className="text-gray-500 text-sm">No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
}
