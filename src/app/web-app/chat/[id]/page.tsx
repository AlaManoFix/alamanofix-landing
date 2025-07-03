"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Mic, Paperclip, Send, MoreVertical } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ChatPage() {
  const { id } = useParams();
  const router = useRouter();
  const [mensaje, setMensaje] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);

  const mensajes = [
    {
      de: "yo",
      tipo: "texto",
      contenido: "Hola, ¿estás disponible para una instalación?",
      hora: "12:01 PM",
    },
    {
      de: "pro",
      tipo: "texto",
      contenido: "¡Hola! Sí, cuéntame qué necesitas.",
      hora: "12:03 PM",
    },
    {
      de: "yo",
      tipo: "texto",
      contenido: "Es una casa de 2 pisos, quiero renovar cableado.",
      hora: "12:04 PM",
    },
    {
      de: "yo",
      tipo: "imagen",
      contenido: "/images/trabajo1.jpg",
      hora: "12:05 PM",
    },
    {
      de: "pro",
      tipo: "audio",
      contenido: "/audios/respuesta.mp3",
      hora: "12:07 PM",
    },
    {
      de: "yo",
      tipo: "texto",
      contenido: "Perfecto, ¿cuándo podrías ir?",
      hora: "12:10 PM",
    },
    {
      de: "pro",
      tipo: "texto",
      contenido: "¿Te parece bien mañana a las 10 AM?",
      hora: "12:12 PM",
    },
    {
      de: "yo",
      tipo: "texto",
      contenido: "Sí, genial. Nos vemos entonces.",
      hora: "12:15 PM",
    },
    {
      de: "pro",
      tipo: "texto",
      contenido: "¡Listo! Te enviaré un recordatorio.",
      hora: "12:16 PM",
    },
  ];

  const enviarMensaje = () => {
    if (mensaje.trim()) {
      console.log("Enviar:", mensaje);
      setMensaje("");
    }
  };

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [mensajes]);

  return (
    <main className="relative h-screen bg-gray-100">
      {/* AppBar fijo */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-orange-600 px-4 py-3 flex items-center justify-between text-white shadow-md">
        <div className="flex items-center gap-2">
          <button onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <Image
              src="/images/perfil.jpg"
              alt="Foto"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold leading-none">Juan Pérez</p>
              <p className="text-xs text-white/80">🟢 En línea</p>
            </div>
          </div>
        </div>
        
      </div>

      {/* Área de mensajes scrollable */}
      <div
        ref={scrollRef}
        className="overflow-y-auto pt-[64px] pb-[70px] px-3 space-y-3 h-full"
      >
        {mensajes.map((m, i) => (
          <div
            key={i}
            className={`max-w-[75%] px-4 py-2 rounded-xl text-sm shadow-sm ${
              m.de === "yo"
                ? "bg-blue-100 self-end text-right ml-auto"
                : "bg-white self-start"
            }`}
          >
            {m.tipo === "texto" && (
              <p className="whitespace-pre-wrap">{m.contenido}</p>
            )}
            {m.tipo === "imagen" && (
              <Image
                src={m.contenido}
                alt="imagen"
                width={180}
                height={120}
                className="rounded-md"
              />
            )}
            {m.tipo === "audio" && (
              <audio controls className="mt-1">
                <source src={m.contenido} type="audio/mp3" />
                Tu navegador no soporta audio.
              </audio>
            )}
            <p className="text-[10px] text-gray-400 mt-1">{m.hora}</p>
          </div>
        ))}
      </div>

      {/* Footer fijo */}
      <div className="fixed bottom-0 left-0 right-0 bg-white px-3 py-2 flex items-center gap-2 border-t z-10">
        <button className="text-gray-500">
          <Paperclip className="w-5 h-5" />
        </button>
        <button className="text-gray-500">
          <Mic className="w-5 h-5" />
        </button>
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && enviarMensaje()}
        />
        <button
          onClick={enviarMensaje}
          className="text-blue-500 disabled:text-gray-400"
          disabled={!mensaje.trim()}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </main>
  );
}
