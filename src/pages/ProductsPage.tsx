import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { useProducts } from "@/hooks/useProducts";
import { ProductsTable } from "./ProductsTable";
import { Pagination } from "@/components/Pagination";

const PAGE_LENGTH = 10;

export default function ProductsPage() {
  const { data, isLoading, isError } = useProducts();

  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const debouncedSearch = useDebounce(search);

  type SortField = "price" | "stock" | null;
  type SortOrder = "asc" | "desc";

  const [sortField, setSortField] = useState<SortField>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  /* Categories */
  const categories = useMemo(() => {
    if (!data) return [];
    return Array.from(new Set(data.products.map((p) => p.category)));
  }, [data]);

  /* Search + Filter */
  const filteredProducts = useMemo(() => {
    if (!data) return [];

    let result = [...data.products];

    if (debouncedSearch) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    if (sortField) {
      result.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      });
    }

    return result;
  }, [data, debouncedSearch, category, sortField, sortOrder]);

  /* Pagination */
  const totalPages = Math.ceil(filteredProducts.length / PAGE_LENGTH);

  const paginatedProducts = useMemo(() => {
    const start = (pageNumber - 1) * PAGE_LENGTH;
    return filteredProducts.slice(start, start + PAGE_LENGTH);
  }, [filteredProducts, pageNumber]);

  /* Reset page when filters change */
  if (pageNumber > totalPages && totalPages > 0) {
    setPageNumber(1);
  }

  function handleSort(field: SortField) {
    setPageNumber(1);

    if (sortField === field) {
      // toggle direction
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      // new column => default to asc
      setSortField(field);
      setSortOrder("asc");
    }
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Products</h1>

      <div className="flex gap-4">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <ProductsTable
        products={paginatedProducts}
        isLoading={isLoading}
        isError={isError}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
      />

      <Pagination
        pageNumber={pageNumber}
        totalPages={totalPages}
        onPageChange={setPageNumber}
      />
    </div>
  );
}
