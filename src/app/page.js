import StressTrendChart from '@/components/StressTrendChart';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-2xl">
        <StressTrendChart />
      </div>
    </main>
  );
}