'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export function Pagination({ totalPages, currentPage }: PaginationProps) {
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `?${params.toString()}`;
  };

  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center items-center gap-4 mt-12">
      <Link
        href={createPageURL(currentPage - 1)}
        className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
          currentPage === 1 ? 'pointer-events-none text-gray-400' : 'bg-white text-black hover:bg-gray-200'
        }`}
      >
        Previous
      </Link>

      <div className="flex gap-2">
        {pageNumbers.map((page) => (
          <Link
            key={page}
            href={createPageURL(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-md text-sm font-semibold transition-colors ${
              currentPage === page ? 'bg-[#43d3ff] text-black' : 'bg-white text-black hover:bg-gray-200'
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      <Link
        href={createPageURL(currentPage + 1)}
        className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
          currentPage === totalPages ? 'pointer-events-none text-gray-400' : 'bg-white text-black hover:bg-gray-200'
        }`}
      >
        Next
      </Link>
    </nav>
  );
}