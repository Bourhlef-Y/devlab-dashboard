import { useEffect, useState } from "react"; // Import hooks for state and lifecycle management
import Papa from "papaparse"; // Import the PapaParse library for CSV parsing
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // Import Table components
import { toast } from "sonner"; // Import toast for notifications
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"; // Import Pagination components
import { Input } from "@/components/ui/input"; // Import Input component

// Define the structure of a Control object
interface Control {
  id: string;
  name: string;
  control: string;
  xbox: string;
}

// Define the ControlsTable functional component
const ControlsTable = () => {
  // State for storing control data
  const [controlsData, setControlsData] = useState<Control[]>([]);
  // State for current page in pagination
  const [currentPage, setCurrentPage] = useState(1);
  // Number of items per page for pagination
  const [itemsPerPage] = useState(17);
  // State for the search term
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch the controls data when the component mounts
  useEffect(() => {
    fetch('/controls.csv')
      .then(response => response.text())
      .then(data => {
        Papa.parse(data, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setControlsData(results.data as Control[]);
          },
        });
      });
  }, []);

  // Handle copying text to clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast("Copied to clipboard!");
    }).catch((error) => {
      console.error('Error copying to clipboard:', error);
    });
  };

  // Handle page change for pagination
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Filter data based on the search term
  const filteredData = controlsData.filter(control =>
    control.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    control.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    control.control.toLowerCase().includes(searchTerm.toLowerCase()) ||
    control.xbox.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate indexes for current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages for pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <>
      <div className="flex justify-start mb-4">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Control</TableHead>
            <TableHead>Xbox Controller</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((control, index) => (
            <TableRow className="cursor-pointer" key={index}>
              <TableCell onClick={() => handleCopy(control.id)}>{control.id}</TableCell>
              <TableCell onClick={() => handleCopy(control.name)}>{control.name}</TableCell>
              <TableCell onClick={() => handleCopy(control.control)}>{control.control}</TableCell>
              <TableCell onClick={() => handleCopy(control.xbox)}>{control.xbox}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className="fixed bottom-5 ml-44 justify-start">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                isActive={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

// Export the ControlsTable component as the default export
export default ControlsTable;
