"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useScriptLikes } from "@/hooks/useScriptLikes";
import { scripts, Script } from "@/data/scripts";

export default function ScriptsPage() {
  const { toast } = useToast();
  const [filter, setFilter] = useState("all");
  const { likes, userLikes, toggleLike } = useScriptLikes();

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copied!",
      description: "The code has been copied to your clipboard.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Scripts Library</h1>
      
      <div className="flex gap-2 mb-6">
        <Button 
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button 
          variant={filter === "favorites" ? "default" : "outline"}
          onClick={() => setFilter("favorites")}
        >
          Favorites
          {userLikes.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {userLikes.length}
            </Badge>
          )}
        </Button>
        <Button 
          variant={filter === "Vehicle" ? "default" : "outline"}
          onClick={() => setFilter("Vehicle")}
        >
          Vehicle
        </Button>
        <Button 
          variant={filter === "Weapon" ? "default" : "outline"}
          onClick={() => setFilter("Weapon")}
        >
          Weapon
        </Button>
        <Button 
          variant={filter === "Utility" ? "default" : "outline"}
          onClick={() => setFilter("Utility")}
        >
          Utility
        </Button>
        <Button 
          variant={filter === "World" ? "default" : "outline"}
          onClick={() => setFilter("World")}
        >
          World
        </Button>
        <Button 
          variant={filter === "Ped" ? "default" : "outline"}
          onClick={() => setFilter("Ped")}
        >
          Ped
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {scripts
            .filter(script => {
              if (filter === "favorites") return userLikes.includes(script.title);
              if (filter === "all") return true;
              return script.category === filter;
            })
            .map((script, index) => (
              <motion.div
                key={script.title}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="flex flex-col h-full">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{script.title}</span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleLike(script.title)}
                          className={cn(
                            "hover:text-red-500",
                            userLikes.includes(script.title) && "text-red-500"
                          )}
                        >
                          <div className="flex items-center gap-1">
                            {userLikes.includes(script.title) ? (
                              <Heart className="w-4 h-4 fill-current" />
                            ) : (
                              <Heart className="w-4 h-4" />
                            )}
                            <span className="text-sm">{likes[script.title] || 0}</span>
                          </div>
                        </Button>
                        <Badge>{script.language}</Badge>
                      </div>
                    </CardTitle>
                    <CardDescription>{script.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <pre className="bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto max-h-[200px] overflow-y-auto">
                      <code>{script.code}</code>
                    </pre>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => copyToClipboard(script.code)}
                      className="w-full"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Code
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
} 