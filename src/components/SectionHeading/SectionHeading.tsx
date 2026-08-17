import "./SectionHeading.css";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  hideEyebrowOnMobile = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  hideEyebrowOnMobile?: boolean;
}) {
  return (
    <header className="section-heading">
      {eyebrow && (
        <p className={`eyebrow${hideEyebrowOnMobile ? " eyebrow--desktop" : ""}`}>
          {eyebrow}
        </p>
      )}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-sub">{subtitle}</p>}
    </header>
  );
}
