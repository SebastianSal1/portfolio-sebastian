interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "offset";
  dark?: boolean;
}

const alignMap: Record<NonNullable<SectionHeadingProps["align"]>, string> = {
  left: "text-left",
  center: "text-center mx-auto items-center",
  offset: "text-left md:ml-[8%]",
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
}: SectionHeadingProps) {
  return (
    <div className={`group mb-12 flex max-w-3xl flex-col ${alignMap[align]}`}>
      {eyebrow && (
        <p className={`caption mb-3 ${dark ? "text-paper/60" : "text-accent"}`}>
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display inline-block w-fit ${dark ? "text-paper" : "text-ink"}`}
        style={{ fontSize: "var(--text-h2)" }}
      >
        {title}
        {/* Orange underline is an interaction cue: hover / keyboard focus only. */}
        <span
          aria-hidden="true"
          className="mt-2 block h-1 origin-left scale-x-0 bg-orange transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-within:scale-x-100"
        />
      </h2>
      {description && (
        <p
          className={`mt-4 prose-body ${dark ? "text-paper/70" : "text-ink/70"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
