import PositiveOmikujiApp from "@/components/PositiveOmikujiApp";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-background">
      {/* 背景装飾（赤色） */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary rounded-br-full opacity-10"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary rounded-tl-full opacity-10"></div>
      <div className="fixed inset-0 pointer-events-none border-[16px] border-double border-primary/5 z-0"></div>
      
      <main className="w-full z-10">
        <PositiveOmikujiApp />
      </main>
    </div>
  );
}
