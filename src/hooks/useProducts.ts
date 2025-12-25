import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/products-service";

export function useProducts(pageNumber: number, pageLength: number) {
  return useQuery({
    queryKey: ["products", pageNumber],
    queryFn: () => fetchProducts(pageLength, (pageNumber - 1) * pageLength),
    placeholderData: (previousData) => previousData,
  });
}
