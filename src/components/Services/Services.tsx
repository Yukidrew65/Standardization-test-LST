import { BookOpen, LayoutGrid, TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading/SectionHeading";
import { services } from "@/data/content";
import "./Services.css";

const icons = { book: BookOpen, grid: LayoutGrid, trend: TrendingUp } as const;

export function Services() {
  return (
    <section className="services">
      <div className="wrap services__inner">
        <SectionHeading
          eyebrow="Featured Products"
          title="THE BEST SERVICES"
          subtitle="Problems trying to resolve the conflict between"
        />

        <div className="services__grid">
          {services.map((service) => {
            const Icon = icons[service.icon];
            return (
              <article className="service" key={service.title}>
                <Icon size={48} strokeWidth={2} className="service__icon" />
                <h3 className="service__title">{service.title}</h3>
                <p className="service__body">{service.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
