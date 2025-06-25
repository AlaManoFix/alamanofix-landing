// src/components/Loader.tsx
export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-white text-black">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
    </div>
  );
}

export function MiniLoader({ size = 16, color = 'border-white' }: { size?: number; color?: string }) {
  return (
    <div
      className={`animate-spin rounded-full border-2 border-t-transparent ${color}`}
      style={{ width: size, height: size }}
    />
  );
}
