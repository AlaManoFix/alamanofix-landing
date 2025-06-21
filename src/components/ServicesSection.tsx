'use client';

import {
  Hammer,
  ShieldCheck,
  Paintbrush,
  Plug,
  Droplets,
  Sparkles,
} from 'lucide-react';

const services = [
  {
    icon: <Hammer className="w-8 h-8 text-orange-500" />,
    title: 'Reparaciones generales',
    description: 'Manitas, carpinteros y expertos en mejoras del hogar.',
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-orange-500" />,
    title: 'Seguridad y cerrajería',
    description: 'Instalación y reparación de cerraduras y sistemas de seguridad.',
  },
  {
    icon: <Paintbrush className="w-8 h-8 text-orange-500" />,
    title: 'Pintura y acabados',
    description: 'Pintores profesionales para interiores y exteriores.',
  },
  {
    icon: <Plug className="w-8 h-8 text-orange-500" />,
    title: 'Electricidad',
    description: 'Instalaciones, reparaciones y mantenimiento eléctrico.',
  },
  {
    icon: <Droplets className="w-8 h-8 text-orange-500" />,
    title: 'Plomería',
    description: 'Fugas, instalaciones, desagües y más.',
  },
  {
    icon: <Sparkles className="w-8 h-8 text-orange-500" />,
    title: 'Limpieza',
    description: 'Servicios de limpieza para casas, oficinas y más.',
  },
];

export default function ServicesSection() {
  return (
    <section id="servicios" className="bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Servicios más solicitados
        </h2>
        <p className="text-gray-600 mb-12">
          Soluciones para tu hogar y negocio, a un clic de distancia.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition text-left"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
