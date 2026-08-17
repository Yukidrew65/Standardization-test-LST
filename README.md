# Bandage

An e-commerce homepage built from a Figma design and wired to a live product API.

The layout is a faithful implementation of the supplied design, built against
both breakpoints — the `sample_ecommerce-mobile-5` frame at 414px and
`sample_ecommerce-desktop-5` at 1440px. Product data, category imagery and
pricing come from [dummyjson.com](https://dummyjson.com/docs/products) through
Redux Toolkit Query.

**Live dev server:** `http://localhost:3000` after `npm run dev`.

---

## Tech stack

| Concern | Choice |
| --- | --- |
| Library | React 19 |
| Build tool | Vite 6 |
| Language | TypeScript (strict) |
| Styling | CSS — no framework, no component library |
| State | Redux Toolkit |
| Data fetching | RTK Query |
| Icons | lucide-react |
| Font | Montserrat |

---

## Installation

Requires **Node.js 20.19 or newer** (Vite 6 minimum). Deploys pin Node 22 via `netlify.toml`.

```bash
git clone https://github.com/Yukidrew65/Standardization-test-LST.git
cd Standardization-test-LST
npm install
```

No environment variables are needed. The product API is public and unauthenticated.

---

## Running the application locally

```bash
npm run dev
```

Serves on <http://localhost:3000> with hot reload.

If port 3000 is occupied, pass another:

```bash
npm run dev -- -p 3010
```

Next.js also prints a LAN address (e.g. `http://192.168.1.96:3000`) — useful for
checking the mobile breakpoint on a real device rather than a resized window.

### Other scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Vite dev server with hot module replacement |
| `npm run build` | Type-check, then build to `dist/` |
| `npm run preview` | Serve the production build locally |

---

## Build and deployment

```bash
npm run build     # tsc -b, then vite build -> dist/
npm run preview   # serve dist/ locally
```

`npm run build` type-checks before bundling, so a type error fails the build
rather than shipping. The output is a plain static bundle in `dist/` — no server
runtime, no secrets, and product data is fetched in the browser at runtime.

### Deploying

The app is a standard Next.js project and deploys without configuration to any
platform with Node support.

**Vercel**

```bash
npx vercel        # preview
npx vercel --prod # production
```

**Netlify**

```bash
npx netlify deploy --build          # preview
npx netlify deploy --build --prod   # production
```

**Self-hosted / container**

```bash
npm ci
npm run build
# serve dist/ with any static file server, e.g.
npx serve dist
```

Build settings, if a dashboard asks: build command `npm run build`, publish
directory `dist`, install command `npm ci`. `netlify.toml` already supplies
these, along with a catch-all redirect to `index.html` so a refresh on any path
is served by the app rather than 404ing.

Because the output is fully static, `dist/` can also be uploaded directly to any
host — including a Netlify drag-and-drop — without connecting a Git repository.

One deployment note: remote product images load from `cdn.dummyjson.com` and are
rendered with plain `<img>` tags, so no host allowlist or image proxy is needed.

---

## Project structure

Each component owns its stylesheet, so markup and styles sit together and there
is no shared file to hunt through.

```
index.html               Vite entry, Montserrat link tag
src/
  main.tsx               Mounts React and the Redux provider
  App.tsx                Section composition, in frame order
  index.css              Design tokens, reset, shared layout/type/button rules
  components/
    TopBar/              Utility bar (desktop only)
    Header/              Logo, nav, cart & wishlist counters
    CategoryGrid/        Hero grid — live furniture category
    BestSellers/         Product grid, paginated
    Services/            Three feature columns
    FeaturedPosts/       Blog cards
    Testimonials/        Quote + image gallery
    CallToAction/        "Designing Better Experience"
    Footer/              Link columns + subscribe form
    SectionHeading/      Shared eyebrow / title / subtitle
  store/
    index.ts             configureStore + API middleware + setupListeners
    hooks.ts             Typed useAppSelector / useAppDispatch
    api/productsApi.ts   RTK Query — all documented endpoints
    slices/cartSlice.ts  Cart and wishlist
  types/index.ts         Product/Category types, price helpers
  data/content.ts        Copy and assets transcribed from the frames
public/images/           34 assets exported from the design
netlify.toml             Build command, publish dir, Node version, SPA redirect
```

---

## Design fidelity

Tokens were read out of the design rather than eyeballed from screenshots.
The palette (`#252B42`, `#23A6F0`, `#23856D`, `#E74040`, `#2DC071`, `#F3CD03`)
and the Montserrat type scale are declared as custom properties on `:root` in
`src/index.css`, and every component references those names rather than
repeating literals. Layout constants
came from the same source: a 1050px content column, a 1146px hero grid built
from 452/332/332 columns at 15px gaps, and a five-across product grid of 183px
cards at 30px gaps.

Rendered output was measured against the frames rather than assumed. Desktop
section heights land within a few pixels, and the header block matches exactly:

| Section | Figma | Built |
| --- | --- | --- |
| Header block | 916 | 916 |
| Product grid | 1241 | 1230 |
| Testimonials | 682 | 680 |
| Call to action | 640 | 630 |

Mobile sections run consistently ~8% shorter — proportional padding rather than
a broken layout.

---

## API integration

`src/lib/store/api/productsApi.ts` covers every endpoint documented for the
products API:

| Hook | Endpoint |
| --- | --- |
| `useGetProductsQuery` | `/products` — paginated, pages merged |
| `useGetProductsPageQuery` | `/products` — discrete cache entry per query |
| `useGetProductQuery` | `/products/:id` |
| `useSearchProductsQuery` | `/products/search?q=` |
| `useGetCategoriesQuery` | `/products/categories` |
| `useGetCategoryListQuery` | `/products/category-list` |
| `useGetProductsByCategoryQuery` | `/products/category/:slug` |
| `useAddProductMutation` | `POST /products/add` |
| `useUpdateProductMutation` | `PUT /products/:id` |
| `useDeleteProductMutation` | `DELETE /products/:id` |

`getProducts` sets `serializeQueryArgs` and `merge` so successive pages collapse
into a single cache entry — without that, RTK Query caches each `skip` value
separately and "LOAD MORE PRODUCTS" would replace the grid instead of extending
it.

---

## Assumptions and implementation notes

**The design is static; the app is not.** Several elements are inert in Figma
and needed behaviour invented around them. Each choice below is a decision, not
an oversight.

- **Mobile navigation is a toggle.** The mobile frame draws the nav permanently
  expanded. Shipping that would mean ~400px of open menu above the fold on every
  page load, so it is behind the hamburger. Set the initial `open` state in
  `Header.tsx` to `true` for a literal reading.

- **Product cards gained an action overlay.** The card in the frame has no way to
  add to cart. "Add to Cart" and a wishlist heart fade in on hover at desktop and
  are always visible on mobile, where hover does not exist. The card's resting
  appearance is unchanged.

- **Mobile shows 5 products, desktop shows 10.** This mirrors the frames rather
  than being a responsive accident. Once "Load more" is pressed, mobile shows
  everything subsequently loaded.

- **Prices are reversed out of the discount.** The API returns `price` already
  discounted, while the design shows a struck-through original beside a sale
  price. `originalPrice()` in `lib/types.ts` recovers it via
  `discountPercentage`.

- **The hero reads the `furniture` category.** The frames label every hero tile
  "FURNITURE / 5 Items", and `/products/category/furniture` returns exactly five
  products — so the count is live rather than hardcoded. The category has only
  five items total, which caps how many distinct tiles are possible.

- **The call-to-action resolves its subject by search.** It queries
  `search?q=bedroom` and takes the first result (the Annibale Colombo Bed) rather
  than pinning a product id, so the section survives catalogue changes.

- **API imagery is studio cutouts, not photography.** The design was drawn
  against atmospheric interior shots; dummyjson ships transparent,
  white-background product cutouts. Two adaptations follow: no scrim over hero
  tiles (it
  greys the product out), and product art positioned clear of captions rather
  than full-bleed behind them. The call-to-action lost its concrete-texture
  backdrop because the utensils were baked into the same PNG — keeping it would
  have shown utensils and a bed together.

- **The store is built by a factory,** not exported as a ready-made singleton, so
  tests can create an isolated store per case rather than sharing one.

- **Grid tracks use `minmax(0, 1fr)`.** Plain `1fr` resolves to
  `minmax(auto, 1fr)`, and the product cards' content pushed the five columns to
  unequal widths until this was pinned.

- **Cart state does not persist** across reloads. Add `redux-persist` or a
  `localStorage` subscriber if that is wanted.

- **Write endpoints are simulated.** `POST`, `PUT`, `PATCH` and `DELETE` all
  return plausible success responses, but dummyjson persists nothing — a refetch
  will not reflect the change.

- **The API blocks non-browser user agents.** Requests without a browser
  `User-Agent` return `403 Cloudflare error 1010` on every endpoint. Irrelevant
  from the browser, but it will break any server-side route or script that calls
  the API directly.

- **Content outside the product grid is transcribed from the design.** Blog
  posts, testimonials and services copy live in `lib/data.ts` with assets in
  `public/images/`; the API has no equivalent content for them.

---

## Scope

This repository covers the homepage at both breakpoints. The design also
contains four product-detail frames (`1:3776`, `1:4051` mobile; `1:4403`,
`1:4797` desktop) which are not yet implemented. The API layer is already in
place for them — `useGetProductQuery` returns everything a detail page needs.
