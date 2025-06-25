'use client';

import { useEffect, useState, useRef } from 'react';
import { Search, Mic } from 'lucide-react';
import { MiniLoader } from '@/components/Loader';

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

const placeholderSuggestions = [
  'necesito arreglar una fuga',
  'buscar un plomero',
  'reparar el calentador',
  'instalar un ventilador',
  'cambiar focos LED',
];

const dummySuggestions = [
  'Electricista',
  'Plomero',
  'Carpintero',
  'Falla en enchufe',
  'Reparación de aire acondicionado',
  'Cambio de focos',
  'Filtración de agua',
  'Instalación de ventilador de techo',
  'Reparación de grifo',
  'Instalación de calentador de agua',
];

export default function SmartSearch({ onSearch }: { onSearch?: (query: string) => void }) {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [placeholder, setPlaceholder] = useState('');
  const recognitionRef = useRef<any>(null);

  // Placeholder animado
  useEffect(() => {
    let currentPhrase = 0;
    let currentChar = 0;
    let forward = true;

    const interval = setInterval(() => {
      const phrase = placeholderSuggestions[currentPhrase];

      if (forward) {
        setPlaceholder(phrase.slice(0, currentChar + 1));
        currentChar++;

        if (currentChar === phrase.length) {
          forward = false;
          setTimeout(() => {}, 1000);
        }
      } else {
        setPlaceholder((prev) => prev.slice(0, -1));
        currentChar--;

        if (currentChar === 0) {
          forward = true;
          currentPhrase = (currentPhrase + 1) % placeholderSuggestions.length;
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Reconocimiento de voz
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-MX';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        filterSuggestions(transcript);
      };

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
    }
  }, []);

  const handleVoiceSearch = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    } else {
      alert('Tu navegador no soporta reconocimiento de voz.');
    }
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    setFilteredSuggestions([]);
    setIsLoading(true);

    // Simula búsqueda
    setTimeout(() => {
      onSearch?.(query.trim());
      setIsLoading(false);
    }, 1000);
  };

  const filterSuggestions = (text: string) => {
    if (text.trim().length > 1) {
      const filtered = dummySuggestions.filter((s) =>
        s.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    filterSuggestions(value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setFilteredSuggestions([]);
    setIsLoading(true);

    setTimeout(() => {
      onSearch?.(suggestion);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="relative bg-white rounded-xl shadow-md p-4 sm:p-6 flex flex-col gap-4">
      <div className="flex items-center gap-3 relative z-10">
        <Search className="text-gray-400 w-5 h-5" />

        <input
          type="text"
          placeholder={`Ej: ${placeholder}...`}
          className="flex-1 border-none outline-none text-sm sm:text-base placeholder-gray-400"
          value={query}
          onChange={handleChange}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />

        <button
          onClick={handleVoiceSearch}
          className={`text-gray-400 hover:text-orange-500 transition ${
            isListening ? 'animate-pulse text-orange-500' : ''
          }`}
          aria-label="Buscar por voz"
        >
          <Mic className="w-5 h-5" />
        </button>
      </div>

      {filteredSuggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
          {filteredSuggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 text-sm text-gray-800 hover:bg-orange-100 cursor-pointer"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={handleSearch}
        disabled={isLoading}
        className="self-end bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-6 py-2 rounded-full transition-all shadow flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {isLoading ? (
          <>
            <MiniLoader />
            Buscando...
          </>
        ) : (
          'Buscar'
        )}
      </button>
    </div>
  );
}
