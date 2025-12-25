import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getPageList } from "@/utils/get-page-list";

export function ProductsTable() {
  const [pageNumber, setPageNumber] = useState(1);
  const PAGE_LENGTH = 10;

  const { data, isLoading, isError } = useProducts(pageNumber, PAGE_LENGTH);

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (isError || !data) {
    return <div>Failed to load products</div>;
  }

  const totalPages = Math.ceil(data.total / PAGE_LENGTH);
  const pageList = getPageList(totalPages, pageNumber);

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No products found
              </TableCell>
            </TableRow>
          ) : (
            data.products.map((product) => (
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

      {/* Pagination */}
      <div className="flex items-center gap-2 justify-center py-4">
        {/* Prev button */}
        <Button
          variant="outline"
          disabled={pageNumber === 1}
          onClick={() => setPageNumber((p) => Math.max(1, p - 1))} // Never go below page 1
        >
          Prev
        </Button>

        {/* Page number buttons */}
        {pageList.map((item, idx) => (
          <Button
            key={idx}
            variant={item === pageNumber ? "default" : "outline"}
            disabled={item === "…"}
            onClick={() => typeof item === "number" && setPageNumber(item)}
          >
            {item}
          </Button>
        ))}

        {/* Next button */}
        <Button
          variant="outline"
          disabled={pageNumber === totalPages}
          onClick={() => setPageNumber((p) => Math.min(totalPages, p + 1))} // Never go beyond the last page
        >
          Next
        </Button>
      </div>
    </div>
  );
}
