// src/components/web-app/NavbarWebApp.tsx
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

  const handleSearch = (query: string) => {
    setIsSearchOpen(false); // Cierra el modal
    if (query.trim()) {
      router.push(`/resultados?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <>
      {/* AppBar mobile */}
      {/* AppBar mobile mejorado con botón de regreso */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-orange-600 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            {/* Botón de regreso si no estamos en /web-app */}
            {pathname !== "/web-app" ? (
              <button
                onClick={() => router.back()}
                className="text-white p-1 rounded hover:bg-orange-700"
                aria-label="Volver"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            ) : (
              <DrawerMobile />
            )}
            <h1 className="text-white font-semibold text-lg">AlaManoFix</h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="text-white"
              aria-label="Buscar"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="w-5 h-5" />
            </button>
            <button className="text-white" aria-label="Notificaciones">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal animado buscador */}
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
