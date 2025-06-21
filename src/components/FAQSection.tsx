'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: '¿Cómo me registro en AlaManoFix?',
    answer: 'Solo debes hacer clic en “Regístrate” y seguir los pasos. Puedes registrarte como usuario o profesionista.',
  },
  {
    question: '¿Qué tipo de servicios puedo encontrar?',
    answer: 'Ofrecemos una gran variedad: plomería, electricidad, carpintería, limpieza, cerrajería y más.',
  },
  {
    question: '¿Es seguro contratar por la plataforma?',
    answer: 'Sí. Todos los profesionistas pasan por una verificación y puedes ver sus calificaciones antes de contratarlos.',
  },
  {
    question: '¿Tiene algún costo para los usuarios?',
    answer: 'No. El registro y uso para usuarios es totalmente gratuito. Solo pagas el servicio que contrates.',
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Preguntas frecuentes
        </h2>
        <p className="text-gray-600 mb-12">
          Resolvemos tus dudas más comunes sobre AlaManoFix.
        </p>

        <div className="space-y-4 text-left">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 transition"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-800"
              >
                {faq.question}
                {activeIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-orange-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-orange-500" />
                )}
              </button>
              {activeIndex === index && (
                <p className="mt-3 text-gray-600 text-base">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
