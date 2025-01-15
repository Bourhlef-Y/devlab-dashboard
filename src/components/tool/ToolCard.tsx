import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ToolCardProps {
  tool: {
    name: string;
    description: string;
    download: string;
    image?: string;
    author: string;
  };
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>{tool.name}</CardTitle>
          <CardDescription>{tool.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          {tool.image && (
            <div className="relative w-full h-48 mb-4">
              <Image
                src={tool.image}
                alt={tool.name}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          )}
          <p className="text-sm text-muted-foreground">Author: {tool.author}</p>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <a href={tool.download} target="_blank" rel="noopener noreferrer">
              <Download className="w-4 h-4 mr-2" />
              Download
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ToolCard;
