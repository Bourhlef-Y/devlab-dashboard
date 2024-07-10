// components/stats/DiscordCard.tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { DiscordLogoIcon } from "@radix-ui/react-icons";

const DiscordCard: React.FC = () => {
  return (
    <Card className="relative w-full">
      <Badge variant="outline" className="absolute top-2 right-2">Join Us!</Badge>
      <CardHeader>
        <CardTitle>Join our Discord </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg">Stay updated with the latest news and interact with the community on our Discord server.</p>
      </CardContent>
      <CardFooter>
        <Link href="https://discord.gg/PqRxDwDCnp" target="_blank" rel="noopener noreferrer" passHref>
          <Button as="a">
            Join Discord ‎ 
            <DiscordLogoIcon className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default DiscordCard;
