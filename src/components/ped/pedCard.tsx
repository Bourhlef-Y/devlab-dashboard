// Import necessary modules and components
import Image from 'next/image';
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";

// Define the props for the PedCard component
interface PedCardProps {
  ped: {
    id: string;
    category: string;
    hash: string;
    image: string;
  };
}

// Define the PedCard functional component
const PedCard: React.FC<PedCardProps> = ({ ped }) => {
  // Handle the click event on the card to copy the ped ID to the clipboard
  const handleCardClick = () => {
    navigator.clipboard.writeText(ped.id)
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
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="col-span-1"
    >
      <Card className="cursor-pointer max-w-52 w-full h-full" onClick={handleCardClick}>
        <CardContent>
          <div className="relative w-full h-48">
            {/* Display the ped image using next/image */}
            <Image src={ped.image} alt={ped.id} layout="fill" objectFit="contain" />
          </div>
        </CardContent>
        <CardFooter>
          <div className="truncate">ID: {ped.id}</div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

// Export the PedCard component as the default export
export default PedCard;
