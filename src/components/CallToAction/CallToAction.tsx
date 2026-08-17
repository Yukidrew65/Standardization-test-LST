import { useSearchProductsQuery } from "@/store/api/productsApi";
import { money } from "@/types";
import "./CallToAction.css";

/** Resolved by search rather than a pinned id, so the section survives
 *  catalogue changes. "bedroom" returns the Annibale Colombo Bed first. */
export function CallToAction() {
  const { data } = useSearchProductsQuery("bedroom");
  const bed = data?.products?.[0];

  return (
    <section className="cta">
      <div className="wrap cta__inner">
        <div className="cta__copy">
          <p className="cta__eyebrow">Designing Better Experience</p>

          <h2 className="cta__title">
            Problems trying to resolve the conflict between
          </h2>

          <p className="cta__body">
            Problems trying to resolve the conflict between the two major realms
            of Classical physics:
          </p>

          <p className="cta__price">{bed ? money(bed.price) : "$16.48"}</p>

          <a className="btn btn--solid" href="#">
            ADD YOUR CALL TO ACTION
          </a>
        </div>

        {/* A transparent studio cutout, not a room scene — so it takes its own
            column instead of sitting full-bleed behind the copy. */}
        {bed && (
          <img
            className="cta__product"
            src={bed.images[1] ?? bed.thumbnail}
            alt={bed.title}
            loading="lazy"
          />
        )}
      </div>
    </section>
  );
}
