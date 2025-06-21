'use client';

const testimonials = [
  {
    name: 'María Gutiérrez',
    role: 'Cliente',
    comment:
      'Solicité un plomero un domingo por la mañana y en menos de 1 hora ya tenía el problema resuelto. ¡Excelente servicio!',
    avatar: 'M',
  },
  {
    name: 'Carlos Méndez',
    role: 'Profesionista',
    comment:
      'Gracias a AlaManoFix he conseguido trabajos estables y clientes que me recomiendan. Es una plataforma seria y confiable.',
    avatar: 'C',
  },
  {
    name: 'Laura Ríos',
    role: 'Cliente',
    comment:
      'La app es súper fácil de usar y me ha salvado más de una vez. Me encanta poder calificar a los profesionales.',
    avatar: 'L',
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonios" className="bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Lo que dicen nuestros usuarios
        </h2>
        <p className="text-gray-600 mb-12">
          Historias reales de confianza, calidad y rapidez.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition"
            >
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center text-xl font-bold mb-4">
                {t.avatar}
              </div>
              {/* Nombre y rol */}
              <h3 className="text-lg font-semibold">{t.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{t.role}</p>
              {/* Comentario */}
              <p className="text-gray-700 text-base italic">“{t.comment}”</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
