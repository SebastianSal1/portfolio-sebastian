interface FooterProps {
  monogram: string;
  email?: string;
  linkedin?: string;
  cvUrl?: string;
}

export default function Footer({
  monogram,
  email = "sebastiansalutare@gmail.com",
  linkedin = "https://linkedin.com/in/sebastian-salutare/",
  cvUrl = "/cv.pdf",
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="surface-night-close relative isolate overflow-hidden px-6 py-10 md:py-14">
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="font-display text-2xl tracking-wider text-orange">
            {monogram}
          </span>
          <span
            className="hidden h-4 w-px bg-paper/20 sm:block"
            aria-hidden="true"
          />
          <p className="text-sm text-paper/55">
            Industrial engineer · strategy, analysis, execution depth
          </p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-5">
          <a
            href={`mailto:${email}`}
            className="caption text-paper/55 transition-colors hover:text-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          >
            Email
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="caption text-paper/55 transition-colors hover:text-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          >
            LinkedIn
            <span className="sr-only"> (opens in new tab)</span>
          </a>
          <a
            href={cvUrl}
            className="caption text-paper/55 transition-colors hover:text-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          >
            CV
          </a>
          <span className="hidden h-4 w-px bg-paper/20 sm:block" aria-hidden="true" />
          <a
            href="#hero"
            className="caption text-paper/55 transition-colors hover:text-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          >
            Back to top
          </a>
          <p className="caption text-paper/40">&copy; {year} Sebastian Lumme</p>
        </nav>
      </div>
    </footer>
  );
}
