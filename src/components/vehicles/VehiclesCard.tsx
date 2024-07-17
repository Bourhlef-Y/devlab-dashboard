// Import necessary modules and components
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";

// Define the props for the VehicleCard component
interface VehicleCardProps {
  vehicle: {
    id: string;
    name: string;
    category: string;
    hash: string;
    image: string;
  };
}

// Define the VehicleCard functional component
const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  // Handle the click event on the card to copy the vehicle ID to the clipboard
  const handleCardClick = () => {
    navigator.clipboard.writeText(vehicle.id)
      .then(() => {
        // Show a success toast message
        toast("Copied to clipboard successfully!");
      })
      .catch((err) => {
        // Log any errors that occur during the copy process
        console.error('Failed to copy ID: ', err);
      });
  };

  return (
    // Define the structure of the card with click event handling
    <Card className="cursor-pointer" onClick={handleCardClick}>
      <CardHeader>
        <CardTitle>{vehicle.name}</CardTitle>
        <CardDescription>{vehicle.category}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-48">
          {/* Display the vehicle image using next/image */}
          <Image src={vehicle.image} alt={vehicle.name} layout="fill" objectFit="contain" />
        </div>
      </CardContent>
      <CardFooter>
        <div>ID: {vehicle.id}</div>
      </CardFooter>
    </Card>
  );
};

// Export the VehicleCard component as the default export
export default VehicleCard;
