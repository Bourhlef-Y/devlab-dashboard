"use client";

import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { supabase } from "@/lib/supabaseClient";
import StatCard from "@/components/stats/StatCard";
import DiscordCard from "@/components/stats/DiscordCard";
import { scripts } from "@/data/scripts";
import { Badge } from "@/components/ui/badge";
import { useDashboardConfig } from "@/hooks/useDashboardConfig";
import { Button } from "@/components/ui/button";
import { Settings, Check, GripHorizontal, Sword, Car, Users, Code, Box } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "@/components/stats/ProductCard";

interface Activity {
  id: string;
  type: 'weapon' | 'vehicle' | 'ped' | 'script' | 'feature' | 'update' | 'improvement';
  name: string;
  date: string;
  description?: string;
}

// Conversion des scripts en activités
const scriptActivities: Activity[] = scripts.map(script => ({
  id: script.title.toLowerCase().replace(/\s+/g, '-'),
  type: 'script',
  name: script.title,
  date: new Date().toISOString()
}));

// Ajout des nouvelles activités
const recentFeatures: Activity[] = [
  {
    id: 'server-page',
    type: 'feature',
    name: 'Server Configuration',
    description: 'Added server configuration page with templates and guides',
    date: new Date('2024-03-22').toISOString()
  },
  {
    id: 'scripts-library',
    type: 'feature',
    name: 'Scripts Library',
    description: 'New scripts library with categorized FiveM code snippets',
    date: new Date('2024-03-21').toISOString()
  },
  {
    id: 'motion-animations',
    type: 'improvement',
    name: 'Smooth Animations',
    description: 'Added Framer Motion animations across all components',
    date: new Date('2024-03-20').toISOString()
  },
  {
    id: 'dashboard-layout',
    type: 'update',
    name: 'Customizable Dashboard',
    description: 'Added drag-and-drop layout customization for dashboard cards',
    date: new Date('2024-03-18').toISOString()
  }
];

// Différentes couleurs selon le type d'activité
const getBadgeVariant = (type: Activity['type']) => {
  switch (type) {
    case 'feature': return 'default'
    case 'improvement': return 'secondary'
    case 'update': return 'outline'
    default: return 'outline'
  }
}

export default function DashboardPage() {
  const { config, toggleCardVisibility } = useDashboardConfig();
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [activities, setActivities] = useState<Activity[]>([]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Configure
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Dashboard Configuration</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              {config.cards.map((card) => (
                <div key={card.id} className="flex items-center justify-between">
                  <Label htmlFor={card.id}>{card.title}</Label>
                  <Switch
                    id={card.id}
                    checked={card.visible}
                    onCheckedChange={() => toggleCardVisibility(card.id)}
                  />
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {config.cards
            .filter(card => card.visible)
            .map((card) => (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <StatCard
                  title={card.title}
                  value={String(counts[card.type] || 0)}
                  icon={getIconForType(card.type)}
                />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      <div className="mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="rounded-lg border p-6">
              <h3 className="font-medium mb-4">Recent Updates</h3>
              <AnimatePresence mode="popLayout">
                {recentFeatures.map((activity) => (
                  <motion.div
                    key={activity.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-between p-4 hover:bg-muted/50 rounded-lg"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Badge variant={getBadgeVariant(activity.type)}>
                          {activity.type}
                        </Badge>
                        <span>{activity.name}</span>
                      </div>
                      {activity.description && (
                        <span className="text-sm text-muted-foreground">
                          {activity.description}
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(activity.date).toLocaleDateString()}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
          
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DiscordCard />
          </motion.div>
        </div>
      </div>

      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-6"
      >
        <ProductCard />
      </motion.div>
    </div>
  );
}

const getIconForType = (type: string) => {
  const icons = {
    weapons: <Sword className="w-4 h-4" />,
    vehicles: <Car className="w-4 h-4" />,
    peds: <Users className="w-4 h-4" />,
    scripts: <Code className="w-4 h-4" />
  };
  return icons[type as keyof typeof icons] || <Box className="w-4 h-4" />;
};

