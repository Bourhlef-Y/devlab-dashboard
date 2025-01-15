import Image from 'next/image';
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";

interface VehicleCardProps {
  vehicle: {
    id: string;
    name: string;
    category: string;
    hash: string;
    image: string;
  };
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const handleCardClick = () => {
    navigator.clipboard.writeText(vehicle.id)
      .then(() => {
        toast("Copied to clipboard successfully!");
      })
      .catch((err) => {
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
      <Card className="cursor-pointer" onClick={handleCardClick}>
        <CardHeader>
          <CardTitle>{vehicle.name}</CardTitle>
          <CardDescription>{vehicle.category}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-48">
            <Image src={vehicle.image} alt={vehicle.name} layout="fill" objectFit="contain" />
          </div>
        </CardContent>
        <CardFooter>
          <div>ID: {vehicle.id}</div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default VehicleCard; 