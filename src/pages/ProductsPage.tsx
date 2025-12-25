import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ProductsTable } from "./ProductsTable";

export default function ProductsPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Products</h1>

      <Input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <ProductsTable />
    </div>
  );
}
