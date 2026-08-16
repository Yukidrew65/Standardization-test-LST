export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  eyebrowClass = "",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  eyebrowClass?: string;
}) {
  return (
    <header className="flex flex-col items-center gap-[10px] text-center">
      {eyebrow && (
        <p className={`text-20 text-muted ${eyebrowClass}`}>{eyebrow}</p>
      )}
      <h2 className="text-24 font-bold text-navy">{title}</h2>
      {subtitle && (
        <p className="max-w-[330px] text-14 text-muted lg:max-w-none">{subtitle}</p>
      )}
    </header>
  );
}
