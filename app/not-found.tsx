import { MagneticButton } from "@/components/ui/MagneticButton";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden />
      <div className="container-grid relative py-32 text-center">
        <p className="label-mono text-copper-700">Error / 404</p>
        <h1 className="font-display mt-6 text-5xl font-semibold tracking-tight md:text-7xl">Off the drawing.</h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-slate-600">The page you&apos;re looking for isn&apos;t on our plans.</p>
        <div className="mt-10 flex justify-center gap-3">
          <MagneticButton href="/">Back to home</MagneticButton>
          <MagneticButton href="/contact" variant="outline">Contact us</MagneticButton>
        </div>
      </div>
    </section>
  );
}
