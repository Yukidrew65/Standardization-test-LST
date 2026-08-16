"use client";

import { useGetProductsByCategoryQuery } from "@/lib/store/api/productsApi";
import type { Product } from "@/lib/types";

/** The frames label every tile "FURNITURE / 5 Items" — which is exactly what
 *  /products/category/furniture returns, so the count is now live. */
const CATEGORY = "furniture";

/**
 * Desktop: 452 / 332 / 332 columns, 15px gaps (1146 total).
 * Tile 0 spans both rows; tile 1 spans both right-hand columns.
 *
 * `art` places the product so it never sits under the caption: tall and square
 * tiles drop it below the text, the wide tile gets a right-hand image column
 * (a square cutout letterboxed into a 679×182 strip renders uselessly small).
 */
const TILES = [
  {
    box: "lg:col-start-1 lg:row-span-2 lg:h-[616px]",
    art: "inset-x-0 bottom-0 top-[118px]",
  },
  {
    box: "lg:col-span-2 lg:col-start-2",
    art: "bottom-0 right-0 top-0 w-1/2 lg:w-[45%]",
  },
  { box: "lg:col-start-2 lg:row-start-2", art: "inset-x-0 bottom-0 top-[118px]" },
  { box: "lg:col-start-3 lg:row-start-2", art: "inset-x-0 bottom-0 top-[118px]" },
];

function Tile({
  product,
  count,
  box,
  art,
  loading,
}: {
  product?: Product;
  count: number;
  box: string;
  art: string;
  loading: boolean;
}) {
  return (
    <article
      className={`relative h-[300px] overflow-hidden bg-light ${box} ${
        loading ? "animate-pulse" : ""
      }`}
    >
      {/* dummyjson ships white-background cutouts, so no scrim — one would only
          grey the product out. Keep it clear of the text instead. */}
      {product && (
        <div className={`absolute p-[12px] ${art}`}>
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-contain"
          />
        </div>
      )}

      <div className="relative flex flex-col gap-[10px] p-[25px]">
        <p className="text-14t font-bold text-success">{count} Items</p>
        <h3 className="text-24 font-bold uppercase text-navy">{CATEGORY}</h3>
        <a
          href="#"
          title={product?.title}
          className="text-14t font-bold text-navy underline-offset-2 hover:underline"
        >
          Read More
        </a>
      </div>
    </article>
  );
}

export default function CategoryGrid() {
  const { data, isLoading } = useGetProductsByCategoryQuery(CATEGORY);
  const products = data?.products ?? [];
  const count = data?.total ?? 0;

  return (
    <section className="py-[24px] lg:py-[76px]">
      <div className="wrap-wide grid grid-cols-1 gap-[15px] lg:grid-cols-[452px_332px_332px] lg:grid-rows-[300px_300px]">
        {TILES.map((t, i) => (
          <Tile
            key={i}
            product={products[i]}
            count={count}
            box={t.box}
            art={t.art}
            loading={isLoading}
          />
        ))}
      </div>
    </section>
  );
}
