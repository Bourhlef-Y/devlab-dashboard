"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

// ... autres imports et interfaces ...

export default function GameReferencePage() {
  const [search, setSearch] = useState("");

  const filterItems = (items: any[]) => {
    return items.filter(item => 
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Game Reference</h1>
      
      <Input
        placeholder="Search..."
        className="max-w-sm mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Tabs defaultValue="vehicles">
        <TabsList>
          <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
          <TabsTrigger value="weapons">Weapons</TabsTrigger>
          <TabsTrigger value="peds">Peds</TabsTrigger>
        </TabsList>

        <TabsContent value="vehicles">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filterItems(vehicles).map((vehicle) => (
                <motion.div
                  key={vehicle.name}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>{vehicle.name}</CardTitle>
                      <CardDescription>{vehicle.class}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video bg-neutral-100 dark:bg-neutral-900 rounded-lg overflow-hidden">
                        {/* Image du véhicule */}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </TabsContent>

        <TabsContent value="weapons">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filterItems(weapons).map((weapon) => (
                <motion.div
                  key={weapon.name}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>{weapon.name}</CardTitle>
                      <CardDescription>{weapon.category}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video bg-neutral-100 dark:bg-neutral-900 rounded-lg overflow-hidden">
                        {/* Image de l'arme */}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </TabsContent>

        <TabsContent value="peds">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filterItems(peds).map((ped) => (
                <motion.div
                  key={ped.name}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>{ped.name}</CardTitle>
                      <CardDescription>{ped.type}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video bg-neutral-100 dark:bg-neutral-900 rounded-lg overflow-hidden">
                        {/* Image du ped */}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 