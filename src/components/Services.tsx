import { BookOpen, LayoutGrid, TrendingUp } from "lucide-react";
import { services } from "@/lib/data";
import SectionHeading from "./SectionHeading";

const icons = {
  book: BookOpen,
  grid: LayoutGrid,
  trend: TrendingUp,
} as const;

export default function Services() {
  return (
    <section className="py-[80px] lg:py-[112px]">
      <div className="wrap flex flex-col items-center">
        <SectionHeading
          eyebrow="Featured Products"
          title="THE BEST SERVICES"
          subtitle="Problems trying to resolve the conflict between"
        />

        <div className="mt-[48px] grid w-full grid-cols-1 gap-[80px] lg:mt-[80px] lg:grid-cols-3 lg:gap-[30px]">
          {services.map((s) => {
            const Icon = icons[s.icon];
            return (
              <article
                key={s.title}
                className="flex flex-col items-center gap-[20px] px-[30px] text-center"
              >
                <Icon size={48} strokeWidth={2} className="text-primary" />
                <h3 className="text-24 font-bold text-navy">{s.title}</h3>
                <p className="max-w-[220px] text-14 text-muted">{s.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
