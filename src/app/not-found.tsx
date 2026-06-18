import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 pt-[var(--header-height)] text-center">
      <h1 className="font-display text-6xl font-bold text-gradient">404</h1>
      <p className="mt-4 text-lg text-muted">Page not found</p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-white hover:brightness-110"
      >
        Back to Home
      </Link>
    </main>
  );
}
