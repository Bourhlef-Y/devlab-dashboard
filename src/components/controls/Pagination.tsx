// components/Pagination.tsx

// Define the Pagination functional component with props
const Pagination = ({
  controlsPerPage,    // Number of controls to display per page
  totalControls,      // Total number of controls
  paginate,           // Function to handle page changes
  currentPage         // Current active page
}: {
  controlsPerPage: number,
  totalControls: number,
  paginate: (number: number) => void,
  currentPage: number
}) => {
  
  // Array to store the page numbers
  const pageNumbers = [];

  // Calculate the total number of pages and add them to the pageNumbers array
  for (let i = 1; i <= Math.ceil(totalControls / controlsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="inline-flex -space-x-px">
        {/* Map through the pageNumbers array to create the pagination links */}
        {pageNumbers.map(number => (
          <li key={number} className={currentPage === number ? 'active' : ''}>
            <a
              onClick={() => paginate(number)} // Call the paginate function with the page number when clicked
              href="#!"
              className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {number} {/* Display the page number */}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// Export the Pagination component as the default export
export default Pagination;
