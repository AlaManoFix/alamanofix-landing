// File: src/components/web-app/ServicioAutocomplete.tsx
'use client';

import { useState, useEffect } from 'react';

export default function ServicioAutocomplete({
  serviciosDisponibles = [],
  onSelect,
}: {
  serviciosDisponibles: string[];
  onSelect: (servicio: string) => void;
}) {
  const [query, setQuery] = useState('');
  const [sugerencias, setSugerencias] = useState<string[]>([]);
  const [mostrarLista, setMostrarLista] = useState(false);

  useEffect(() => {
    if (query.trim() === '') {
      setSugerencias([]);
      return;
    }

    const filtrados = serviciosDisponibles.filter((s) =>
      s.toLowerCase().includes(query.toLowerCase())
    );

    setSugerencias(filtrados);
  }, [query, serviciosDisponibles]);

  const handleSelect = (s: string) => {
    setQuery(s);
    setMostrarLista(false);
    onSelect(s);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setMostrarLista(true);
        }}
        placeholder="Buscar servicio..."
        className="w-full border border-gray-300 rounded px-3 py-2"
      />

      {mostrarLista && sugerencias.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-200 w-full mt-1 rounded shadow-md max-h-48 overflow-auto">
          {sugerencias.map((s, idx) => (
            <li
              key={idx}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
              onClick={() => handleSelect(s)}
            >
              {s}
            </li>
          ))}
        </ul>
      )}

      {mostrarLista && query && sugerencias.length === 0 && (
        <div className="absolute z-10 bg-white border border-gray-200 w-full mt-1 rounded shadow-md px-4 py-2 text-sm text-gray-500">
          Ningún servicio coincide.
        </div>
      )}
    </div>
  );
}
