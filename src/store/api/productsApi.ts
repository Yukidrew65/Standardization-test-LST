import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Category, Product, ProductsResponse } from "@/types";

export interface ProductsArgs {
  limit?: number;
  skip?: number;
  select?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

const qs = (a: ProductsArgs) => {
  const p = new URLSearchParams();
  if (a.limit !== undefined) p.set("limit", String(a.limit));
  if (a.skip !== undefined) p.set("skip", String(a.skip));
  if (a.select) p.set("select", a.select);
  if (a.sortBy) p.set("sortBy", a.sortBy);
  if (a.order) p.set("order", a.order);
  return p.toString();
};

/** Covers every endpoint documented at https://dummyjson.com/docs/products */
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    /* ---------- reads ---------- */

    // Paginated list. Pages are merged into one cache entry so "Load more" appends.
    getProducts: builder.query<ProductsResponse, ProductsArgs>({
      query: (args) => `/products?${qs({ limit: 10, skip: 0, ...args })}`,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (current, incoming) => {
        const seen = new Set(current.products.map((p) => p.id));
        current.products.push(...incoming.products.filter((p) => !seen.has(p.id)));
        current.total = incoming.total;
        current.skip = incoming.skip;
        current.limit = incoming.limit;
      },
      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?.skip !== previousArg?.skip,
      providesTags: ["Product"],
    }),

    // Same endpoint, but a discrete cache entry per query (no merging).
    getProductsPage: builder.query<ProductsResponse, ProductsArgs>({
      query: (args) => `/products?${qs(args)}`,
      providesTags: ["Product"],
    }),

    getProduct: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
      providesTags: (_r, _e, id) => [{ type: "Product", id }],
    }),

    searchProducts: builder.query<ProductsResponse, string>({
      query: (q) => `/products/search?q=${encodeURIComponent(q)}`,
      providesTags: ["Product"],
    }),

    // Rich objects: { slug, name, url }
    getCategories: builder.query<Category[], void>({
      query: () => "/products/categories",
    }),

    // Plain slugs: ["beauty", "fragrances", "furniture", ...]
    getCategoryList: builder.query<string[], void>({
      query: () => "/products/category-list",
    }),

    getProductsByCategory: builder.query<ProductsResponse, string>({
      query: (category) => `/products/category/${encodeURIComponent(category)}`,
      providesTags: ["Product"],
    }),

    /* ---------- writes (dummyjson simulates these; nothing persists) ---------- */

    addProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({ url: "/products/add", method: "POST", body }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation<Product, { id: number } & Partial<Product>>({
      query: ({ id, ...body }) => ({ url: `/products/${id}`, method: "PUT", body }),
      invalidatesTags: (_r, _e, { id }) => [{ type: "Product", id }],
    }),

    deleteProduct: builder.mutation<Product & { isDeleted: boolean }, number>({
      query: (id) => ({ url: `/products/${id}`, method: "DELETE" }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsPageQuery,
  useGetProductQuery,
  useSearchProductsQuery,
  useGetCategoriesQuery,
  useGetCategoryListQuery,
  useGetProductsByCategoryQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
