import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedShinyButton from "../ui/animated-shiny-button";

interface ProductCardProps {
  title?: string;
  description?: string;
  price?: string;
  image?: string;
  productUrl?: string;
}

export function ProductCard({
  title = "Police Cell Management",
  description = "Discover a complete and intuitive detention cell management system...",
  price = "12.00€",
  image = "/images/gav-banner.jpg",
  productUrl = "https://horizonstudio.shop/products/police-cell-management"
}: ProductCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="grid grid-cols-2">
        <div className="relative h-[400px]">
          <Image 
            src={image}
            alt={title}
            fill
            className="object-center"
            priority
          />
        </div>

        <div className="flex flex-col justify-between p-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">{title}</CardTitle>
              <Link href="https://horizonstudio.shop/" target="_blank" rel="noopener noreferrer">
                <AnimatedShinyButton 
                  className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-discord-color-300 hover:duration-300 hover:dark:text-discord-color-200 bg-[#000000] dark:bg-[#ffffff]"
                >
                  <div className="relative w-5 h-5 ml-1 mr-2">
                    <Image
                      src="/Logo_DEV_PNG.png"
                      alt="Horizon Studio Logo"
                      fill
                      className="object-contain transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 dark:hidden"
                    />
                    <Image
                      src="/Logo_DEV2_PNG.png"
                      alt="Horizon Studio Logo"
                      fill
                      className="object-contain transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 hidden dark:block"
                    />
                  </div>
                  <span>Horizon Studio</span>
                </AnimatedShinyButton>
              </Link>
            </div>

            <CardDescription className="text-lg">
              {description}
            </CardDescription>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold">{price}</span>
            </div>
            <Link 
              href={productUrl}
              target="_blank" 
              rel="noopener noreferrer" 
              passHref
            >
              <Button size="lg">Buy Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
} 