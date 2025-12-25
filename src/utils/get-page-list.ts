// Always show first & last pages

// Show two pages before and after current

// Use ellipsis when skipping pages

export function getPageList(
  totalPages: number,
  current: number,
  siblingCount = 2
): (number | "…")[] {
  const pages: (number | "…")[] = [];

  const left = Math.max(1, current - siblingCount);
  const right = Math.min(totalPages, current + siblingCount);

  // always show 1
  pages.push(1);

  if (left > 2) {
    pages.push("…");
  }

  for (let page = left; page <= right; page++) {
    if (page > 1 && page < totalPages) {
      pages.push(page);
    }
  }

  if (right < totalPages - 1) {
    pages.push("…");
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}
