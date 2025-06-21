'use client';

import { Wrench, UserCheck, CalendarCheck, Star } from 'lucide-react';

const steps = [
  {
    icon: <Wrench className="w-8 h-8 text-orange-500" />,
    title: 'Describe tu necesidad',
    description: 'Elige el tipo de servicio o completa un formulario simple.',
  },
  {
    icon: <UserCheck className="w-8 h-8 text-orange-500" />,
    title: 'Conecta con un profesional',
    description: 'Recibe opciones de expertos verificados cerca de ti.',
  },
  {
    icon: <CalendarCheck className="w-8 h-8 text-orange-500" />,
    title: 'Agenda y recibe el servicio',
    description: 'Programa una cita y recibe atención puntual en tu hogar o negocio.',
  },
  {
    icon: <Star className="w-8 h-8 text-orange-500" />,
    title: 'Califica y recomienda',
    description: 'Evalúa al profesional y ayuda a otros usuarios como tú.',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="como-funciona" className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
          ¿Cómo funciona AlaManoFix?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="mb-4 flex justify-center">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
