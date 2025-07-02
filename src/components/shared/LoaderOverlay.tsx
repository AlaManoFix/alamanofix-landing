// src/components/shared/LoaderOverlay.tsx
'use client';

import Loader from '@/components/Loader';

export default function LoaderOverlay() {
  return (
    <div className="fixed inset-0 z-[999] bg-white/70 backdrop-blur-sm flex items-center justify-center">
      <Loader />
    </div>
  );
}
