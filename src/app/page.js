import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import StressTrendChart from '@/components/StressTrendChart';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Uji Komponen Card dan Button dari shadcn/ui */}
        <Card>
          <CardHeader>
            <CardTitle>Uji Komponen shadcn/ui</CardTitle>
            <CardDescription>
              Memastikan preset Nova dan Tailwind CSS berjalan normal di Next.js.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-wrap gap-3">
            <Button>Tombol Utama (Default)</Button>
            <Button variant="secondary">Tombol Secondary</Button>
            <Button variant="outline">Tombol Outline</Button>
            <Button variant="destructive">Tombol Destructive</Button>
          </CardContent>

          <CardFooter className="text-xs text-slate-500">
            Komponen berasal dari src/components/ui/
          </CardFooter>
        </Card>

        {/* Komponen grafik dari uji coba sebelumnya */}
        <StressTrendChart />
      </div>
    </main>
  );
}