import dynamic from "next/dynamic";

const DrillDownMap = dynamic(() => import("@/components/DrillDownMap"), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full flex items-center justify-center bg-gray-950 text-white">
      <div className="text-xl">Loading map...</div>
    </div>
  ),
});

export default function MapPage() {
  return (
    <main className="h-screen w-full">
      <DrillDownMap />
    </main>
  );
}
