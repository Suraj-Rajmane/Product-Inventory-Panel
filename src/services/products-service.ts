import type { ProductsData } from "@/interfaces/products-data";
import type { ProductFormData } from "@/schemas/product.schema";

export async function fetchProducts(): Promise<ProductsData> {
  const res = await fetch("https://dummyjson.com/products?limit=1000");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function createProduct(
  data: ProductFormData
): Promise<ProductFormData> {
  // simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("Product submitted:", data);

  return data;
}
