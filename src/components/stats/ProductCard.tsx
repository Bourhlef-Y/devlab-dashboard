import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export function ProductCard() {
  return (
    <Card className="overflow-hidden">
      <div className="grid grid-cols-2">
        <div className="relative h-[400px]">
          <Image 
            src="/images/gav-banner.jpg" 
            alt="Système de Garde à Vue"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col justify-between p-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">🚔 Système de Garde à Vue - FiveM</CardTitle>
              <Badge variant="destructive" className="uppercase text-lg">Promo</Badge>
            </div>
            <CardDescription className="text-lg">
              Un système complet et intuitif de gestion des cellules de garde à vue pour votre serveur FiveM.
            </CardDescription>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold">7.99€</span>
              <span className="text-lg text-muted-foreground line-through">9.99€</span>
            </div>
            <Button size="lg">Acheter maintenant</Button>
          </div>
        </div>
      </div>
    </Card>
  );
} 