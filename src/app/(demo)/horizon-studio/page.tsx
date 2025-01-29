"use client";

import { ProductCard } from "@/components/stats/ProductCard";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";

export default function HorizonStudioPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="relative w-12 h-12">
            <Image
              src="/Logo_DEV_PNG.png"
              alt="Horizon Studio Logo"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold">Horizon Studio</CardTitle>
            <CardDescription className="text-lg">
              Découvrez notre collection de scripts et outils pour FiveM
            </CardDescription>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6">
        <ProductCard />
        {/* Autres produits à venir */}
      </div>
    </div>
  );
} 