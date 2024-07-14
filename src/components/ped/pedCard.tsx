import Image from 'next/image';
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

interface PedCardProps {
  ped: {
    id: string;
    category: string;
    hash: string;
    image: string;
  };
}

const PedCard: React.FC<PedCardProps> = ({ ped }) => {
  const handleCardClick = () => {
    navigator.clipboard.writeText(ped.id)
      .then(() => {
        toast("Copied to clipboard successfully!");
      })
      .catch((err) => {
        console.error('Failed to copy ID: ', err);
      });
  };

  return (
    <Card className="cursor-pointer max-w-52 w-full h-full" onClick={handleCardClick}>
      <CardContent>
        <div className="relative w-full h-48">
          <Image src={ped.image} alt={ped.id} layout="fill" objectFit="contain" />
        </div>
      </CardContent>
      <CardFooter>
        <div className="truncate">ID: {ped.id}</div>
      </CardFooter>
    </Card>
  );
};

export default PedCard;
