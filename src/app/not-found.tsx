import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f5f5f7] px-6 text-center">
      <span className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary/70">Not Found</span>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">This page went missing</h1>
      <p className="mt-4 max-w-md text-base text-foreground/60">
        The content you are looking for doesn&apos;t exist. Let&apos;s guide you back to the main experience.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-[26px] bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_12px_24px_rgba(214,182,133,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_28px_rgba(214,182,133,0.32)]"
      >
        Return home
      </Link>
    </main>
  );
}
