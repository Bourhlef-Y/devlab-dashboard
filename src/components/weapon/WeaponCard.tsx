import Image from 'next/image';
import Swal from 'sweetalert2';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

interface WeaponCardProps {
  weapon: {
    id: string;
    name: string;
    category: string;
    hash: string;
    image: string;
  };
}

const WeaponCard: React.FC<WeaponCardProps> = ({ weapon }) => {
  const handleCardClick = () => {
    navigator.clipboard.writeText(weapon.id)
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
    <Card className="cursor-pointer" onClick={handleCardClick}>
      <CardHeader>
        <CardTitle>{weapon.name}</CardTitle>
        <CardDescription>{weapon.category}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-48">
          <Image src={weapon.image} alt={weapon.name} layout="fill" objectFit="contain" />
        </div>
      </CardContent>
      <CardFooter>
        <div>ID: {weapon.id}</div>
      </CardFooter>
    </Card>
  );
};

export default WeaponCard;
