type SectionHeadingProps = {
  title: string;
  subtitle?: string;
};

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
      {subtitle ? <p className="text-slate-600">{subtitle}</p> : null}
    </div>
  );
}
