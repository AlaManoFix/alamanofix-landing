// File: src/components/web-app/ProfesionalAutocomplete.tsx
'use client';

import { useState, useEffect } from 'react';

interface Profesional {
    id: string;
    nombre: string;
    especialidad: string;
    ciudad: string;
    servicios: string[];
  }
  
  const profesionalesDummy: Profesional[] = [
    {
      id: '1',
      nombre: 'Juan Martínez',
      especialidad: 'Plomería',
      ciudad: 'CDMX',
      servicios: ['Fugas', 'Instalaciones', 'Mantenimiento', 'Otros'],
    },
    {
      id: '2',
      nombre: 'Ana López',
      especialidad: 'Electricista',
      ciudad: 'Guadalajara',
      servicios: ['Cortos', 'Instalaciones eléctricas', 'Cambio de focos', 'Otros'],
    },
    {
      id: '3',
      nombre: 'Carlos Pérez',
      especialidad: 'Limpieza',
      ciudad: 'Monterrey',
      servicios: ['Hogar', 'Oficinas', 'Post-construcción', 'Otros'],
    },
    {
      id: '4',
      nombre: 'Laura Gómez',
      especialidad: 'Carpintería',
      ciudad: 'Toluca',
      servicios: ['Muebles a medida', 'Reparaciones', 'Pintura de madera', 'Otros'],
    },
  ];
  

export default function ProfesionalAutocomplete({
  onSelect,
}: {
  onSelect: (profesional: Profesional) => void;
}) {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState<Profesional[]>([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  useEffect(() => {
    if (query.trim() === '') {
      setResultados([]);
      return;
    }

    const filtrados = profesionalesDummy.filter((p) =>
      p.nombre.toLowerCase().includes(query.toLowerCase())
    );

    setResultados(filtrados);
  }, [query]);

  const handleSelect = (p: Profesional) => {
    setQuery(p.nombre);
    setResultados([]);
    setMostrarResultados(false);
    onSelect(p);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setMostrarResultados(true);
        }}
        placeholder="Buscar profesional..."
        className="w-full border border-gray-300 rounded px-3 py-2"
      />

      {mostrarResultados && resultados.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-200 w-full mt-1 rounded shadow-md max-h-48 overflow-auto">
          {resultados.map((p) => (
            <li
              key={p.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
              onClick={() => handleSelect(p)}
            >
              👤 {p.nombre} — {p.especialidad} ({p.ciudad})
            </li>
          ))}
        </ul>
      )}

      {mostrarResultados && query && resultados.length === 0 && (
        <div className="absolute z-10 bg-white border border-gray-200 w-full mt-1 rounded shadow-md px-4 py-2 text-sm text-gray-500">
          No se encontraron profesionales.
        </div>
      )}
    </div>
  );
}
