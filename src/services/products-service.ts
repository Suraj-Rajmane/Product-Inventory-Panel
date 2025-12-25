import type { ProductsData } from "@/interfaces/products-data";

export async function fetchProducts(
  pageLength: number,
  skip: number
): Promise<ProductsData> {
  const params = new URLSearchParams({
    limit: pageLength.toString(),
    skip: skip.toString(),
  });

  const res = await fetch(
    `https://dummyjson.com/products?${params.toString()}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}
