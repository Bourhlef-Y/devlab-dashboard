// components/vehicle/VehicleCard.tsx
import Image from 'next/image';
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

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
    <Card className="cursor-pointer max-w-xs" onClick={handleCardClick}>
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
        <div className="truncate">ID: {vehicle.id}</div>
      </CardFooter>
    </Card>
  );
};

export default VehicleCard;
