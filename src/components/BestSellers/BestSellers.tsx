import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading/SectionHeading";
import { useGetProductsQuery } from "@/store/api/productsApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart, toggleWishlist } from "@/store/slices/cartSlice";
import { money, originalPrice, type Product } from "@/types";
import "./BestSellers.css";

const PAGE = 10;
/** The mobile frame carries only the first five products. */
const MOBILE_VISIBLE = 5;

function Card({ product, hidden }: { product: Product; hidden: boolean }) {
  const dispatch = useAppDispatch();
  const wishlisted = useAppSelector((s) => s.cart.wishlist.includes(product.id));

  return (
    <article className={`product${hidden ? " product--hidden-mobile" : ""}`}>
      <div className="product__media">
        <img src={product.thumbnail} alt={product.title} loading="lazy" />

        {/* The card in the frame has no buy control, so the actions sit over the
            image and leave its resting appearance untouched. */}
        <div className="product__actions">
          <button
            className="product__add"
            onClick={() => dispatch(addToCart({ product }))}
            aria-label={`Add ${product.title} to cart`}
          >
            <ShoppingCart size={14} />
            Add to Cart
          </button>
          <button
            className="product__wish"
            onClick={() => dispatch(toggleWishlist(product.id))}
            aria-label={`${wishlisted ? "Remove from" : "Add to"} wishlist`}
            aria-pressed={wishlisted}
          >
            <Heart
              size={14}
              className={wishlisted ? "is-wishlisted" : ""}
              fill={wishlisted ? "currentColor" : "none"}
            />
          </button>
        </div>
      </div>

      <div className="product__body">
        <h3 className="product__title">{product.title}</h3>
        <p className="product__category">{product.category}</p>
        <p className="product__prices">
          <span className="product__was">{money(originalPrice(product))}</span>
          <span className="product__now">{money(product.price)}</span>
        </p>
      </div>
    </article>
  );
}

function Skeleton({ hidden }: { hidden: boolean }) {
  return (
    <div className={`product product--skeleton${hidden ? " product--hidden-mobile" : ""}`}>
      <div className="product__media skeleton-block" />
      <div className="product__body">
        <span className="skeleton-line skeleton-line--lg" />
        <span className="skeleton-line skeleton-line--md" />
        <span className="skeleton-line skeleton-line--sm" />
      </div>
    </div>
  );
}

export function BestSellers() {
  const [skip, setSkip] = useState(0);
  const { data, isLoading, isFetching, isError, refetch } = useGetProductsQuery({
    limit: PAGE,
    skip,
  });

  const products = data?.products ?? [];
  const total = data?.total ?? 0;
  const hasMore = products.length < total;
  // Once the visitor pages, show everything loaded rather than clipping to five.
  const collapseMobile = skip === 0;

  return (
    <section className="bestsellers">
      <div className="wrap bestsellers__inner">
        <SectionHeading
          eyebrow="Featured Products"
          hideEyebrowOnMobile
          title="BESTSELLER PRODUCTS"
          subtitle="Problems trying to resolve the conflict between"
        />

        {isError ? (
          <div className="bestsellers__error">
            <p>Couldn’t load products.</p>
            <button className="btn btn--outline" onClick={() => refetch()}>
              Try again
            </button>
          </div>
        ) : (
          <>
            <div className="bestsellers__grid">
              {isLoading
                ? Array.from({ length: PAGE }, (_, i) => (
                    <Skeleton key={i} hidden={i >= MOBILE_VISIBLE} />
                  ))
                : products.map((p, i) => (
                    <Card
                      key={p.id}
                      product={p}
                      hidden={collapseMobile && i >= MOBILE_VISIBLE}
                    />
                  ))}
            </div>

            {hasMore && (
              <button
                className="btn btn--outline bestsellers__more"
                onClick={() => setSkip(products.length)}
                disabled={isFetching}
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
