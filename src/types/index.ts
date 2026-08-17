/** Shape returned by https://dummyjson.com/docs/products */
export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  availabilityStatus: string;
  images: string[];
  thumbnail: string;
}

/** GET /products/categories returns these; /products/category-list returns slugs only. */
export interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

/** dummyjson returns the *discounted* price, so recover the pre-discount one. */
export function originalPrice(p: Pick<Product, "price" | "discountPercentage">) {
  return p.price / (1 - p.discountPercentage / 100);
}

export const money = (n: number) => `$${n.toFixed(2)}`;
