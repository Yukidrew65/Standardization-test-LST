"use client";

import { useSearchProductsQuery } from "@/lib/store/api/productsApi";
import { money } from "@/lib/types";

/** `search?q=bedroom` returns the Annibale Colombo Bed first, so the section
 *  pulls its subject semantically rather than pinning a product id. */
export default function CTA() {
  const { data } = useSearchProductsQuery("bedroom");
  const bed = data?.products?.[0];

  return (
    <section className="relative isolate overflow-hidden bg-light">
      <div className="wrap flex flex-col items-center gap-[20px] py-[130px] text-center lg:flex-row lg:gap-[40px] lg:py-[110px] lg:text-center">
        <div className="flex flex-col items-center gap-[20px] lg:flex-1">
        <p className="text-14t font-bold text-primary">
          Designing Better Experience
        </p>

        {/* max-w must stay clamped at mobile: under items-center a fixed
            max-width overflows the container instead of shrinking. */}
        <h2 className="max-w-full text-40 font-bold text-navy lg:max-w-[570px]">
          Problems trying to resolve the conflict between
        </h2>

        <p className="max-w-full text-14 text-muted lg:max-w-[375px]">
          Problems trying to resolve the conflict between the two major realms of
          Classical physics:
        </p>

        <p className="text-24 font-bold text-green">
          {bed ? money(bed.price) : "$16.48"}
        </p>

        <a
          href="#"
          className="rounded-[5px] bg-primary px-[40px] py-[15px] text-14t font-bold text-white transition-opacity hover:opacity-90"
        >
          ADD YOUR CALL TO ACTION
        </a>
        </div>

        {/* The API ships a transparent studio cutout, not a room scene, so it
            gets its own column: full-bleed would sit a bed behind the copy, and
            overlapping it the way the utensils did buries the headline. */}
        {bed && (
          <img
            src={bed.images[1] ?? bed.thumbnail}
            alt={bed.title}
            className="mt-[20px] h-[240px] w-full object-contain lg:mt-0 lg:h-[380px] lg:w-[420px] lg:shrink-0"
          />
        )}
      </div>
    </section>
  );
}
