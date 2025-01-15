// components/stats/DiscordCard.tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";

const DiscordCard: React.FC = () => {
  return (
    <Card className="relative w-full ">
      <Badge variant="outline" className="absolute top-2 right-2 bg-discord-color-500">Join Us!</Badge>
      <CardHeader className="flex flex-col gap-2 ">
        <CardTitle>Join our Discord</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg">Stay updated with the latest news and interact with the community on our Discord server.</p>
      </CardContent>
      <CardFooter>
      <motion.div
                animate={{ rotate: [-1, 1, -1] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.5,
                  ease : "circIn"
                }}
                whileHover={{ rotate: 0 }}
              >
          <Link 
            href="https://discord.gg/PqRxDwDCnp" 
            target="_blank" 
            rel="noopener noreferrer" 
            passHref
          >
            <Button className="flex items-center gap-2 bg-discord-color-500">
              Join Discord
              <DiscordLogoIcon className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </Link>
        </motion.div>
      </CardFooter>
    </Card>
  );
};

export default DiscordCard;
