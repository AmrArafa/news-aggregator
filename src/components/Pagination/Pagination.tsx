import { type ReactElement } from 'react';
import { PAGE_SIZE } from '../../utils/constants';

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export function Pagination({
  totalItems,
  currentPage,
  setCurrentPage,
}: PaginationProps): ReactElement {
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  function handlePreviousClick(): void {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  }

  function handleNextClick(): void {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  }

  return (
    <div className="flex justify-center items-center mt-4">
      <button
        className="border rounded-md p-2 disabled:bg-gray-200"
        onClick={handlePreviousClick}
        disabled={currentPage === 1 || totalItems === 0}
      >
        Previous
      </button>
      <span className="mx-4">{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        className="border rounded-md p-2 disabled:bg-gray-200"
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
