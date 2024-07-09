import Image from 'next/image';
import Swal from 'sweetalert2';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

interface PedCardProps {
  ped: {
    id: string;
    name: string;
    category: string;
    hash: string;
    image: string;
  };
}

const PedCard: React.FC<PedCardProps> = ({ ped }) => {
  const handleCardClick = () => {
    navigator.clipboard.writeText(ped.id)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Copy ID to clipboard successfully!",
          showConfirmButton: false,
          timer: 500,
          background: '#333',
        });
      })
      .catch((err) => {
        console.error('Failed to copy ID: ', err);
      });
  };

  return (
    <Card className="cursor-pointer max-w-52 w-full h-full" onClick={handleCardClick}>
      <CardContent>
        <div className="relative w-full h-48">
          <Image src={ped.image} alt={ped.name} layout="fill" objectFit="contain" />
        </div>
      </CardContent>
      <CardFooter>
        <div className="truncate">ID: {ped.id}</div>
      </CardFooter>
    </Card>
  );
};

export default PedCard;
