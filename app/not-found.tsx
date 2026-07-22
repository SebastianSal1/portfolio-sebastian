import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col justify-center px-6">
      <div className="mx-auto w-full max-w-6xl">
        <p className="caption mb-3 text-accent">Error 404</p>
        <h1
          className="font-display uppercase tracking-tight"
          style={{ fontSize: "var(--text-h1)", lineHeight: "var(--leading-display)" }}
        >
          Page not found
        </h1>
        <p className="mt-6 max-w-xl text-lg text-ink/70">
          That page doesn&apos;t exist — it may have moved, or the link was wrong.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-[48px] items-center rounded-full border border-accent/40 px-6 text-sm font-medium text-ink transition-colors hover:border-orange hover:text-orange"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
