import { Star } from "lucide-react";
import { testimonial } from "@/lib/data";

export default function Testimonials() {
  return (
    <section className="py-[80px] lg:py-[85px]">
      <div className="wrap grid grid-cols-1 items-center gap-[80px] lg:grid-cols-2 lg:gap-[30px]">
        {/* Quote */}
        <div className="flex flex-col items-center gap-[20px] text-center">
          <h2 className="hidden text-24 font-bold text-navy lg:block">
            What they say about us
          </h2>

          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="h-[90px] w-[90px] rounded-full object-cover"
          />

          <div className="flex gap-[5px]">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                size={22}
                className={
                  i < testimonial.rating
                    ? "fill-warning text-warning"
                    : "text-warning"
                }
              />
            ))}
          </div>

          <p className="max-w-[330px] text-14t font-bold text-navy">
            {testimonial.quote}
          </p>

          <div className="flex flex-col gap-[5px]">
            <p className="text-14t font-bold text-primary">{testimonial.name}</p>
            <p className="text-14t font-bold text-navy">{testimonial.role}</p>
          </div>
        </div>

        {/* 3×3 image grid */}
        <div className="grid grid-cols-3 gap-[15px]">
          {testimonial.gallery.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="aspect-square w-full object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
