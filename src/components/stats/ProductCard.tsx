import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export function ProductCard() {
  return (
    <Card className="overflow-hidden">
      <div className="grid grid-cols-2">
        <div className="relative h-[400px]">
          <Image 
            src="/images/gav-banner.jpg" 
            alt="Système de Garde à Vue"
            fill
            className="object-center"
            priority
          />
        </div>

        <div className="flex flex-col justify-between p-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">Police Cell Management</CardTitle>

            </div>
            <CardDescription className="text-lg">
            Discover a complete and intuitive detention cell management system <br /> 
            designed specifically for your FiveM server. <br /> This script provides optimized and seamless functionality, <br /> allowing players to interact with cells in a realistic and immersive way. <br /> With features like inmate management and advanced customization options, <br /> this tool integrates perfectly into your RP scenarios. <br /> Provide your players with a high-quality experience while simplifying <br /> the management of your servers police facilities.   
            </CardDescription>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold">12.00€</span>
            </div>
            <Link 
                href="https://devlab.sellhub.cx/product/Systme-de-Garde-Vue/" 
                target="_blank" 
                rel="noopener noreferrer" 
                passHref>
                <Button size="lg">Acheter maintenant</Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
} 