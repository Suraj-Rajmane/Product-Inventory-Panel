import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Product } from "@/interfaces/product";
import { ArrowUp, ArrowDown } from "lucide-react";

interface Props {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  sortField: "price" | "stock" | null;
  sortOrder: "asc" | "desc";
  onSort: (field: "price" | "stock") => void;
}

export function ProductsTable({
  products,
  isLoading,
  isError,
  sortField,
  sortOrder,
  onSort,
}: Props) {
  if (isLoading) return <div>Loading products...</div>;
  if (isError) return <div>Failed to load products</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-semibold text-foreground">Name</TableHead>
          <TableHead className="font-semibold text-foreground">
            Category
          </TableHead>
          <TableHead
            className="font-semibold text-foreground cursor-pointer select-none hover:text-primary transition-colors"
            onClick={() => onSort("price")}
          >
            <div className="flex items-center gap-1">
              Price
              {sortField === "price" ? (
                sortOrder === "asc" ? (
                  <ArrowUp size={16} className="text-primary" />
                ) : (
                  <ArrowDown size={16} className="text-primary" />
                )
              ) : (
                <ArrowUp
                  size={16}
                  className="text-muted-foreground opacity-60"
                />
              )}
            </div>
          </TableHead>

          <TableHead
            className="font-semibold text-foreground cursor-pointer select-none hover:text-primary transition-colors"
            onClick={() => onSort("stock")}
          >
            <div className="flex items-center gap-1">
              Stock
              {sortField === "stock" ? (
                sortOrder === "asc" ? (
                  <ArrowUp size={16} className="text-primary" />
                ) : (
                  <ArrowDown size={16} className="text-primary" />
                )
              ) : (
                <ArrowUp
                  size={16}
                  className="text-muted-foreground opacity-60"
                />
              )}
            </div>
          </TableHead>
          <TableHead className="font-semibold text-foreground">
            Status
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {products.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              No products found
            </TableCell>
          </TableRow>
        ) : (
          products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.title}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>₹{product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
