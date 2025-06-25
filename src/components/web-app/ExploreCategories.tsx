'use client';

import {
  Hammer,
  Paintbrush,
  Leaf,
  Laptop,
  Truck,
  Building,
} from 'lucide-react';

const categories = [
  { name: 'Albañilería', icon: Hammer },
  { name: 'Pintura', icon: Paintbrush },
  { name: 'Jardinería', icon: Leaf },
  { name: 'Tecnología', icon: Laptop },
  { name: 'Mudanzas', icon: Truck },
  { name: 'Remodelación', icon: Building },
];

export default function ExploreCategories() {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Explora por categoría
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map(({ name, icon: Icon }) => (
          <button
            key={name}
            className="flex flex-col items-center justify-center gap-2 bg-white p-4 rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-all border border-gray-100"
            onClick={() => console.log(`Explorar categoría: ${name}`)}
          >
            <Icon className="w-6 h-6 text-orange-500" />
            <span className="text-sm font-medium text-gray-700 text-center">
              {name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
