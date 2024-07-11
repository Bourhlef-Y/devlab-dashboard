// components/Pagination.tsx
const Pagination = ({ controlsPerPage, totalControls, paginate, currentPage }: { controlsPerPage: number, totalControls: number, paginate: (number: number) => void, currentPage: number }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalControls / controlsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <ul className="inline-flex -space-x-px">
          {pageNumbers.map(number => (
            <li key={number} className={currentPage === number ? 'active' : ''}>
              <a
                onClick={() => paginate(number)}
                href="#!"
                className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  
  export default Pagination;
  