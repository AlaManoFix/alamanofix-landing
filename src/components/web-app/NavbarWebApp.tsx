"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Home, Search, Star, User, Bell, X, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SmartSearch from "@/components/web-app/SmartSearch";
import DrawerMobile from "./DrawerMobile";

const navItems = [
  { label: "Inicio", icon: Home, href: "/web-app" },
  { label: "Favoritos", icon: Star, href: "/web-app#favoritos" },
  { label: "Perfil", icon: User, href: "/perfil" },
];

export default function NavbarWebApp() {
  const pathname = usePathname();
  const router = useRouter();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // 🔔 Notificaciones dummy por ahora
  const notificaciones = [
    "Tu solicitud ha sido aceptada.",
    "Un profesional respondió tu mensaje.",
    "Nueva promoción disponible.",
    "Recordatorio: tienes una cita mañana.",
    "Tu perfil ha sido actualizado.",
    "Nuevo profesional disponible en tu área.",
    "Tu pago ha sido procesado correctamente.",
    "Tienes un nuevo mensaje de un profesional.",
    "Tu solicitud ha sido rechazada.",
    "Un profesional ha actualizado su disponibilidad.",
  ];

  const handleSearch = (query: string) => {
    setIsSearchOpen(false);
    if (query.trim()) {
      router.push(`/resultados?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <>
      {/* AppBar mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-orange-600 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            {pathname !== "/web-app" && (
              <button
                onClick={() => router.back()}
                className="text-white p-1 rounded hover:bg-orange-700"
                aria-label="Volver"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}

            <h1 className="text-white font-semibold text-lg">AlaManoFix</h1>
          </div>

          <div className="flex items-center gap-4 relative">
            <button
              className="text-white"
              aria-label="Buscar"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              className="text-white relative"
              aria-label="Notificaciones"
              onClick={() => setIsNotificationsOpen(true)}
            >
              <Bell className="w-5 h-5" />
              {notificaciones.length > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white"></span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Buscador modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            key="search-modal"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col px-4 pt-6 pb-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Buscar</h2>
              <button
                className="text-gray-600"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Cerrar"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <SmartSearch onSearch={handleSearch} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel de notificaciones */}
      <AnimatePresence>
        {isNotificationsOpen && (
          <motion.div
            key="notifications-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-[100] border-l border-gray-200 flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h2 className="text-lg font-semibold text-gray-800">
                Notificaciones
              </h2>
              <button
                onClick={() => setIsNotificationsOpen(false)}
                aria-label="Cerrar"
                className="text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3">
              {notificaciones.map((mensaje, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-3 shadow-sm"
                >
                  <p className="text-sm text-gray-700">{mensaje}</p>
                  <span className="text-xs text-gray-400">Hace {idx + 1}h</span>
                </div>
              ))}
              {notificaciones.length === 0 && (
                <p className="text-sm text-gray-500 mt-4 text-center">
                  No tienes notificaciones nuevas.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AppBar desktop */}
      <header className="hidden md:flex fixed top-0 z-50 w-full items-center justify-between px-8 h-16 bg-white shadow-sm border-b border-gray-200">
        <div
          className="text-2xl font-bold text-orange-500 cursor-pointer"
          onClick={() => router.push("/web-app")}
        >
          AlaManoFix
        </div>

        <nav className="flex items-center gap-6">
          {navItems.map(({ label, icon: Icon, href }) => {
            const isActive = pathname === href;
            return (
              <button
                key={label}
                onClick={() => router.push(href)}
                className={`flex items-center gap-1 text-sm font-medium transition ${
                  isActive
                    ? "text-orange-500"
                    : "text-gray-600 hover:text-orange-500"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            );
          })}
        </nav>
      </header>
    </>
  );
}
