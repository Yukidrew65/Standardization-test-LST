"use client";

import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useGetProductsQuery } from "@/lib/store/api/productsApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { addToCart, toggleWishlist } from "@/lib/store/slices/cartSlice";
import { money, originalPrice, type Product } from "@/lib/types";

const PAGE = 10;

function Card({ product, hideOnMobile }: { product: Product; hideOnMobile: boolean }) {
  const dispatch = useAppDispatch();
  const wishlisted = useAppSelector((s) => s.cart.wishlist.includes(product.id));

  return (
    <article
      className={`group mx-auto flex w-[295px] flex-col lg:mx-0 lg:w-auto ${
        hideOnMobile ? "hidden lg:flex" : "flex"
      }`}
    >
      <div className="relative h-[360px] w-full overflow-hidden lg:h-[238px]">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="h-full w-full bg-light object-cover"
        />

        {/* Actions sit over the image so the static card design is untouched. */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center gap-[10px] p-[12px] opacity-100 transition-opacity lg:opacity-0 lg:group-hover:opacity-100">
          <button
            onClick={() => dispatch(addToCart({ product }))}
            aria-label={`Add ${product.title} to cart`}
            className="flex items-center gap-[6px] rounded-[5px] bg-primary px-[14px] py-[8px] text-12 font-bold text-white shadow hover:opacity-90"
          >
            <ShoppingCart size={14} />
            Add to Cart
          </button>
          <button
            onClick={() => dispatch(toggleWishlist(product.id))}
            aria-label={`${wishlisted ? "Remove from" : "Add to"} wishlist`}
            aria-pressed={wishlisted}
            className="rounded-[5px] bg-white px-[10px] py-[8px] shadow"
          >
            <Heart
              size={14}
              className={wishlisted ? "fill-danger text-danger" : "text-navy"}
            />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-[10px] px-[6px] py-[25px] text-center">
        <h3 className="line-clamp-1 text-16 font-bold text-navy">{product.title}</h3>
        <p className="text-14t font-bold capitalize text-muted">{product.category}</p>
        <p className="flex items-center gap-[5px] text-16 font-bold">
          <span className="text-gray-soft line-through">
            {money(originalPrice(product))}
          </span>
          <span className="text-success">{money(product.price)}</span>
        </p>
      </div>
    </article>
  );
}

function Skeleton({ hideOnMobile }: { hideOnMobile: boolean }) {
  return (
    <div
      className={`mx-auto w-[295px] animate-pulse lg:mx-0 lg:w-auto ${
        hideOnMobile ? "hidden lg:block" : "block"
      }`}
    >
      <div className="h-[360px] w-full bg-light lg:h-[238px]" />
      <div className="flex flex-col items-center gap-[10px] py-[25px]">
        <div className="h-[14px] w-3/4 bg-light" />
        <div className="h-[12px] w-1/2 bg-light" />
        <div className="h-[14px] w-1/3 bg-light" />
      </div>
    </div>
  );
}

export default function BestSellers() {
  const [skip, setSkip] = useState(0);
  const { data, isLoading, isFetching, isError, refetch } = useGetProductsQuery({
    limit: PAGE,
    skip,
  });

  const products = data?.products ?? [];
  const total = data?.total ?? 0;
  const hasMore = products.length < total;
  // The mobile frame shows only 5 products; once the user pages, show them all.
  const collapseMobile = skip === 0;

  return (
    <section className="py-[80px] lg:py-[105px]">
      <div className="wrap flex flex-col items-center">
        <SectionHeading
          eyebrow="Featured Products"
          eyebrowClass="hidden lg:block"
          title="BESTSELLER PRODUCTS"
          subtitle="Problems trying to resolve the conflict between"
        />

        {isError ? (
          <div className="mt-[48px] flex flex-col items-center gap-[15px]">
            <p className="text-14 text-muted">Couldn’t load products.</p>
            <button
              onClick={() => refetch()}
              className="rounded-[5px] border border-primary px-[30px] py-[10px] text-14t font-bold text-primary hover:bg-primary hover:text-white"
            >
              Try again
            </button>
          </div>
        ) : (
          <>
            <div className="mt-[48px] grid w-full grid-cols-1 gap-x-[30px] gap-y-[30px] lg:grid-cols-5">
              {isLoading
                ? Array.from({ length: PAGE }, (_, i) => (
                    <Skeleton key={i} hideOnMobile={i >= 5} />
                  ))
                : products.map((p, i) => (
                    <Card
                      key={p.id}
                      product={p}
                      hideOnMobile={collapseMobile && i >= 5}
                    />
                  ))}
            </div>

            {hasMore && (
              <button
                onClick={() => setSkip(products.length)}
                disabled={isFetching}
                className="mt-[24px] rounded-[5px] border border-primary px-[40px] py-[15px] text-14t font-bold text-primary transition-colors hover:bg-primary hover:text-white disabled:opacity-50"
              >
                {isFetching ? "LOADING…" : "LOAD MORE PRODUCTS"}
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
}
