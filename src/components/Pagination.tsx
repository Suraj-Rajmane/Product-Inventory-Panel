import { Button } from "@/components/ui/button";
import { getPageList } from "@/utils/get-page-list";

interface PaginationProps {
  pageNumber: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  pageNumber,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pageList = getPageList(totalPages, pageNumber);

  return (
    <div className="flex items-center gap-2 justify-center py-4">
      {/* Prev */}
      <Button
        variant="outline"
        disabled={pageNumber === 1}
        onClick={() => onPageChange(pageNumber - 1)}
      >
        Prev
      </Button>

      {/* Page numbers */}
      {pageList.map((page, index) => (
        <Button
          key={index}
          variant={page === pageNumber ? "default" : "outline"}
          disabled={page === "…"}
          onClick={() => typeof page === "number" && onPageChange(page)}
        >
          {page}
        </Button>
      ))}

      {/* Next */}
      <Button
        variant="outline"
        disabled={pageNumber === totalPages}
        onClick={() => onPageChange(pageNumber + 1)}
      >
        Next
      </Button>
    </div>
  );
}
