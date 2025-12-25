import type { Product } from "./product";

export interface ProductsData {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
