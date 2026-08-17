import { Star } from "lucide-react";
import { testimonial } from "@/data/content";
import "./Testimonials.css";

export function Testimonials() {
  return (
    <section className="testimonials">
      <div className="wrap testimonials__inner">
        <div className="quote">
          <h2 className="quote__heading">What they say about us</h2>

          <img className="quote__avatar" src={testimonial.avatar} alt={testimonial.name} />

          <div className="quote__stars" aria-label={`${testimonial.rating} out of 5`}>
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                size={22}
                className="quote__star"
                fill={i < testimonial.rating ? "currentColor" : "none"}
              />
            ))}
          </div>

          <p className="quote__text">{testimonial.quote}</p>

          <p className="quote__name">{testimonial.name}</p>
          <p className="quote__role">{testimonial.role}</p>
        </div>

        <div className="gallery">
          {testimonial.gallery.map((src, i) => (
            <img key={i} src={src} alt="" loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  );
}
