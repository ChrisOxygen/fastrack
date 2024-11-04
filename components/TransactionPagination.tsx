import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type TransactionPaginationProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalItems: number;
};

function TransactionPagination({
  currentPage,
  onPageChange,
  totalItems,
}: TransactionPaginationProps) {
  const totalPages = Math.ceil(totalItems / 10);

  const pagesToShow = totalPages > 3 ? 3 : totalPages;

  // create an array of pages to show objects with page number and active status

  const previousPages = currentPage - 1;
  const nextPages = currentPage + 1;
  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };
  const handlePreviousPage = () => {
    onPageChange(currentPage - 1);
  };

  console.log("currentPage", currentPage, "totalPages", totalPages);
  return (
    <div className="">
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious onClick={handlePreviousPage} />
            </PaginationItem>
          )}
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {/* {Array.from({ length: pagesToShow }, (_, i) => {
            const page = i + 1;
            return (
              <PaginationItem key={page}>
                <PaginationLink onClick={() => onPageChange(page)}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })} */}
          {
            <PaginationItem>
              <PaginationLink>{currentPage}</PaginationLink>
            </PaginationItem>
          }
          {currentPage !== totalPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {currentPage !== totalPages && (
            <PaginationItem>
              <PaginationNext onClick={handleNextPage} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default TransactionPagination;
