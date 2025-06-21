'use client';

import {
  ThumbsUp,
  Clock,
  Star,
  Briefcase,
  Users,
  CalendarDays,
} from 'lucide-react';

const userBenefits = [
  {
    icon: <ThumbsUp className="w-6 h-6 text-orange-500" />,
    title: 'Confianza',
    description: 'Solo profesionistas verificados y con buenas calificaciones.',
  },
  {
    icon: <Clock className="w-6 h-6 text-orange-500" />,
    title: 'Rapidez',
    description: 'Solicita y programa un servicio en minutos.',
  },
  {
    icon: <Star className="w-6 h-6 text-orange-500" />,
    title: 'Calidad garantizada',
    description: 'Evalúa y recibe el mejor servicio cada vez.',
  },
];

const proBenefits = [
  {
    icon: <Briefcase className="w-6 h-6 text-orange-500" />,
    title: 'Más clientes',
    description: 'Accede a cientos de personas buscando tus servicios.',
  },
  {
    icon: <CalendarDays className="w-6 h-6 text-orange-500" />,
    title: 'Agenda flexible',
    description: 'Tú decides cuándo trabajar y qué trabajos aceptar.',
  },
  {
    icon: <Users className="w-6 h-6 text-orange-500" />,
    title: 'Reputación visible',
    description: 'Recibe más trabajos gracias a tus buenas calificaciones.',
  },
];

export default function BenefitsSection() {
  return (
    <section id="beneficios" className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Beneficios para todos
        </h2>
        <p className="text-gray-600 mb-12">
          Ya seas cliente o profesionista, AlaManoFix te ayuda a lograr más.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          {/* Usuarios */}
          <div>
            <h3 className="text-xl font-semibold text-orange-500 mb-4">
              Para usuarios
            </h3>
            <div className="space-y-6">
              {userBenefits.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  {item.icon}
                  <div>
                    <h4 className="text-lg font-medium">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Profesionistas */}
          <div>
            <h3 className="text-xl font-semibold text-orange-500 mb-4">
              Para profesionistas
            </h3>
            <div className="space-y-6">
              {proBenefits.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  {item.icon}
                  <div>
                    <h4 className="text-lg font-medium">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
