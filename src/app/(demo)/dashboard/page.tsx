"use client";

import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { supabase } from "@/lib/supabaseClient";
import StatCard from "@/components/stats/StatCard";
import DiscordCard from "@/components/stats/DiscordCard";
import { scripts } from "@/app/(demo)/scripts/page";
import { Badge } from "@/components/ui/badge";
import { useDashboardConfig } from "@/hooks/useDashboardConfig";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

// Ajout d'une interface pour les activités
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
    id: 'server-templates',
    type: 'feature',
    name: 'Server Templates',
    description: 'Added server configuration templates (server.cfg, resources.cfg, permissions.cfg)',
    date: new Date('2024-03-21').toISOString()
  },
  {
    id: 'scripts-page',
    type: 'feature',
    name: 'New Scripts Page',
    description: 'Development of the scripts library',
    date: new Date('2024-03-20').toISOString()
  },
  {
    id: 'motion-cards',
    type: 'improvement',
    name: 'Card Animations',
    description: 'Added Framer Motion animations to reference cards',
    date: new Date('2024-03-19').toISOString()
  },
  {
    id: 'dashboard-config',
    type: 'update',
    name: 'Configurable Dashboard',
    description: 'Added dashboard layout customization',
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
  const { config, toggleCardVisibility, reorderCards } = useDashboardConfig();
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isConfiguring, setIsConfiguring] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const { count: weaponCount } = await supabase
          .from('weapons')
          .select('*', { count: 'exact', head: true });
        const { count: vehicleCount } = await supabase
          .from('vehicles')
          .select('*', { count: 'exact', head: true });
        const { count: pedCount } = await supabase
          .from('peds')
          .select('*', { count: 'exact', head: true });

        setCounts({
          weapons: weaponCount || 0,
          vehicles: vehicleCount || 0,
          peds: pedCount || 0,
          scripts: scripts.length
        });

        // Récupérer les dernières armes ajoutées
        const { data: recentWeapons } = await supabase
          .from('weapons')
          .select('name, created_at')
          .order('created_at', { ascending: false })
          .limit(3);

        // Récupérer les derniers véhicules ajoutés
        const { data: recentVehicles } = await supabase
          .from('vehicles')
          .select('name, created_at')
          .order('created_at', { ascending: false })
          .limit(3);

        // Récupérer les derniers peds ajoutés
        const { data: recentPeds } = await supabase
          .from('peds')
          .select('name, created_at')
          .order('created_at', { ascending: false })
          .limit(3);

        // Combiner toutes les activités
        const allActivities: Activity[] = [
          ...(recentWeapons?.map(w => ({
            id: w.name.toLowerCase().replace(/\s+/g, '-'),
            type: 'weapon' as const,
            name: w.name,
            date: w.created_at
          })) || []),
          ...(recentVehicles?.map(v => ({
            id: v.name.toLowerCase().replace(/\s+/g, '-'),
            type: 'vehicle' as const,
            name: v.name,
            date: v.created_at
          })) || []),
          ...(recentPeds?.map(p => ({
            id: p.name.toLowerCase().replace(/\s+/g, '-'),
            type: 'ped' as const,
            name: p.name,
            date: p.created_at
          })) || []),
          ...recentFeatures
        ];

        // Trier par date et prendre les 10 plus récents
        const sortedActivities = allActivities
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 10);

        setActivities(sortedActivities);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchAllData();
  }, []);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    reorderCards(result.source.index, result.destination.index);
  };

  const filterActivities = (type: Activity['type']) => {
    // Implementation of filterActivities
  };

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

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="dashboard-cards" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {config.cards
                  .filter(card => card.visible)
                  .sort((a, b) => a.position - b.position)
                  .map((card, index) => (
                    <Draggable
                      key={card.id}
                      draggableId={card.id}
                      index={index}
                      isDragDisabled={!isConfiguring}
                    >
                      {(provided) => (
                        <motion.div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          layout
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <StatCard
                            title={card.title}
                            count={counts[card.type] || 0}
                            badge="Up to Date!"
                          />
                        </motion.div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </AnimatePresence>
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Activity</h2>
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
                <div className="space-y-3">
                  {activities.map((activity) => (
                    <motion.div
                      key={activity.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Badge variant={getBadgeVariant(activity.type)}>{activity.type}</Badge>
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
                </div>
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
    </div>
  );
}
