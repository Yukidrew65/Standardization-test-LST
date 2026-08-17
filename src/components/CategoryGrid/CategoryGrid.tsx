import { useGetProductsByCategoryQuery } from "@/store/api/productsApi";
import { categories } from "@/data/content";
import "./CategoryGrid.css";

/** The frames label every tile "FURNITURE / 5 Items", and this endpoint returns
 *  exactly five products — so the count is live even though the artwork is the
 *  design's own photography. */
const CATEGORY = "furniture";

/**
 * Desktop: 452 / 332 / 332 columns at 15px gaps (1146 total). Tile 1 spans both
 * rows; tile 2 spans both right-hand columns. Mobile stacks to one column.
 */
const VARIANTS = ["tile--lead", "tile--wide", "tile--bl", "tile--br"] as const;

export function CategoryGrid() {
  const { data } = useGetProductsByCategoryQuery(CATEGORY);
  const count = data?.total;

  return (
    <section className="categories">
      <div className="wrap wrap--wide categories__grid">
        {categories.map((category, i) => (
          <article
            key={i}
            className={`tile ${VARIANTS[i]}`}
            style={{ backgroundImage: `url(${category.image})` }}
          >
            <div className="tile__caption">
              <p className="tile__count">{count ?? 5} Items</p>
              <h3 className="tile__title">{category.title}</h3>
              <a className="tile__link" href="#">
                Read More
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
