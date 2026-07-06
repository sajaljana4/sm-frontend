import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

interface PaginationProps {
  limit?: number;
  setLimit?: (limit: number) => void;
  totalCount?: number;
  skip?: number;
  setSkip?: (skip: number) => void;
}

export function Pagination({
  totalCount = 0,
  limit = 10,
  setLimit,
  skip = 0,
  setSkip,
}: Readonly<PaginationProps>) {
  const [currentPage, setCurrentPage] = useState(Math.floor(skip / limit) + 1);
  const totalPages = Math.ceil(totalCount / limit);

  // Sync currentPage with skip and limit props
  useEffect(() => {
    setCurrentPage(Math.floor(skip / limit) + 1);
  }, [skip, limit]);

  const handlePageChange = (newPage: number) => {
    const newSkip = (newPage - 1) * limit;
    setCurrentPage(newPage);
    setSkip?.(newSkip);
  };

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="flex items-center justify-between space-x-6 lg:space-x-8">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Items per page</p>
        <Select
          value={`${limit}`}
          onValueChange={(value) => {
            const newLimit = Number(value);
            setLimit?.(newLimit);
            // Reset to first page when changing limit
            setCurrentPage(1);
            setSkip?.(0);
          }}
        >
          <SelectTrigger className="h-8 w-25">
            <SelectValue placeholder={limit} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 25, 30, 40, 50, 100].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex w-25 items-center justify-center text-sm font-medium">
          Page {currentPage} of {totalPages || 1}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => handlePageChange(1)}
            disabled={!canGoPrevious}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!canGoPrevious}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!canGoNext}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => handlePageChange(totalPages)}
            disabled={!canGoNext}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
