import type { ProductsData } from "@/interfaces/products-data";

export async function fetchProducts(): Promise<ProductsData> {
  const res = await fetch("https://dummyjson.com/products?limit=1000");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}
