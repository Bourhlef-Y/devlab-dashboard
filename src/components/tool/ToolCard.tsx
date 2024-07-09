import { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface ToolCardProps {
  tool: {
    name: string;
    description: string;
    link: string;
    image?: string; // Image optionnelle
    author: string;
  };
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <Card className="w-full max-w-md mx-auto mb-6">
        <CardHeader>
          <CardTitle>{tool.name}</CardTitle>
          <p className="text-sm text-gray-500">by {tool.author}</p>
        </CardHeader>
        <CardContent>
          {tool.image && (
            <div className="relative w-full h-48 cursor-pointer" onClick={handleImageClick}>
              <Image src={tool.image} alt={tool.name} layout="fill" objectFit="cover" className="rounded-t-lg" />
            </div>
          )}
          <CardDescription className="mt-4">{tool.description}</CardDescription>
        </CardContent>
        <CardFooter>
          <Link href={tool.link} passHref>
            <Button as="a" target="_blank">
              Download
            </Button>
          </Link>
        </CardFooter>
      </Card>

      {isModalOpen && tool.image && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50" onClick={handleCloseModal} onKeyDown={handleKeyDown} tabIndex={0}>
          <div className="relative">
            <Image src={tool.image} alt={tool.name} layout="intrinsic" width={800} height={800} objectFit="contain" className="max-w-11 max-h-98px" />
            <Button className="absolute top-2 right-2" onClick={handleCloseModal}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolCard;
