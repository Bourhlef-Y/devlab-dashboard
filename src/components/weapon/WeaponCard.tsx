// Import necessary modules and components
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";

// Define the props for the WeaponCard component
interface WeaponCardProps {
  weapon: {
    id: string;
    name: string;
    category: string;
    hash: string;
    image: string;
  };
}

// Define the WeaponCard functional component
const WeaponCard: React.FC<WeaponCardProps> = ({ weapon }) => {
  // Handle the click event on the card to copy the weapon ID to the clipboard
  const handleCardClick = () => {
    navigator.clipboard.writeText(weapon.id)
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
        <CardTitle>{weapon.name}</CardTitle>
        <CardDescription>{weapon.category}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-48">
          {/* Display the weapon image using next/image */}
          <Image src={weapon.image} alt={weapon.name} layout="fill" objectFit="contain" />
        </div>
      </CardContent>
      <CardFooter>
        <div>ID: {weapon.id}</div>
      </CardFooter>
    </Card>
  );
};

// Export the WeaponCard component as the default export
export default WeaponCard;
