"use client";

import { useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  isNext?: boolean;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingsCount?: number;
}

export default function CustomPagination({
  currentPage,
  isNext,
  totalPages,
  onPageChange,
  siblingsCount = 1,
}: PaginationProps) {
  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingsCount + 5;

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingsCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingsCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingsCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, "DOTS", totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingsCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, "DOTS", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, "DOTS", ...middleRange, "DOTS", lastPageIndex];
    }
  }, [totalPages, currentPage, siblingsCount]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className={cn("", currentPage == 1 && "opacity-30")}>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              if (currentPage === 1) {
                return;
              }
              e.preventDefault();
              onPageChange(currentPage - 1);
            }}
            aria-disabled={currentPage === 1}
            className={cn("hover:text-white hover:bg-secondary ", {
              "pointer-events-none hover:bg-transparent hover:text-secondary":
                currentPage === 1,
            })}
          />
        </PaginationItem>
        {isNext == undefined &&
          paginationRange?.map((pageNumber, index) =>
            pageNumber === "DOTS" ? (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(pageNumber as number);
                  }}
                  isActive={pageNumber === currentPage}
                  className="hover:text-white hover:bg-secondary font-secondary font-[400]"
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            )
          )}
        <PaginationItem
          className={cn(
            "flex items-center",
            ((!isNext && isNext !== undefined) ||
              (isNext == undefined && currentPage == totalPages)) &&
              "opacity-30"
          )}
        >
          <PaginationNext
            href="#"
            onClick={(e) => {
              const isLastPage = currentPage === totalPages;
              const isBlocked =
                isNext === false || (isNext === undefined && isLastPage);

              if (isBlocked) return;

              e.preventDefault();
              onPageChange(currentPage + 1);
            }}
            aria-disabled={currentPage === totalPages}
            className={cn("hover:text-white hover:bg-secondary ", {
              "pointer-events-none hover:bg-transparent hover:text-secondary":
                (!isNext && isNext !== undefined) ||
                (isNext == undefined && currentPage == totalPages),
            })}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function range(start: number, end: number) {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
}
