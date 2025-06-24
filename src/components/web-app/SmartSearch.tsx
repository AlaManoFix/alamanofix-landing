'use client';

import { useEffect, useState, useRef } from 'react';
import { Search, Mic } from 'lucide-react';

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

export default function SmartSearch() {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

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
    console.log('Buscando:', query);
    // Aquí irá la navegación o lógica real
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Search className="text-gray-400 w-5 h-5" />

        <input
          type="text"
          placeholder="Ej: necesito arreglar una fuga o buscar un plomero"
          className="flex-1 border-none outline-none text-sm sm:text-base placeholder-gray-400"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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

      <button
        onClick={handleSearch}
        className="self-end bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-6 py-2 rounded-full transition-all shadow"
      >
        Buscar
      </button>
    </div>
  );
}
