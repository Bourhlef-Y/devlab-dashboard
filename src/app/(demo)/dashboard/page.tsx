"use client";

import { useState, useEffect, useCallback } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { supabase } from "@/lib/supabaseClient";
import StatCard from "@/components/stats/StatCard";
import DiscordCard from "@/components/stats/DiscordCard";
import { scripts, Script } from "@/data/scripts";
import { Badge } from "@/components/ui/badge";
import { useDashboardConfig } from "@/hooks/useDashboardConfig";
import { motion, AnimatePresence } from "framer-motion";

interface DashboardData {
  weapons: number;
  vehicles: number;
  peds: number;
  scripts: number;
}

interface CountResult {
  count: number;
}

interface Activity {
  id: string;
  type: 'weapon' | 'vehicle' | 'ped' | 'script' | 'feature' | 'update' | 'improvement';
  name: string;
  date: string;
  description?: string;
}

export default function DashboardPage() {
  const { config, toggleCardVisibility, reorderCards } = useDashboardConfig();
  const [counts, setCounts] = useState<DashboardData>({
    weapons: 0,
    vehicles: 0,
    peds: 0,
    scripts: scripts.length
  });
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isConfiguring, setIsConfiguring] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [weaponsCount, vehiclesCount, pedsCount] = await Promise.all([
        fetchWeapons(),
        fetchVehicles(),
        fetchPeds()
      ]);

      setCounts({
        weapons: weaponsCount?.count || 0,
        vehicles: vehiclesCount?.count || 0,
        peds: pedsCount?.count || 0,
        scripts: scripts.length
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchWeapons = async (): Promise<CountResult> => {
    const { data, error } = await supabase
      .from('weapons')
      .select('count');
    if (error) throw error;
    return data[0];
  };

  const fetchVehicles = async (): Promise<CountResult> => {
    const { data, error } = await supabase
      .from('vehicles')
      .select('count');
    if (error) throw error;
    return data[0];
  };

  const fetchPeds = async (): Promise<CountResult> => {
    const { data, error } = await supabase
      .from('peds')
      .select('count');
    if (error) throw error;
    return data[0];
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    reorderCards(result.source.index, result.destination.index);
  };

  return (
    <div className="container mx-auto px-4 py-8">
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
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                          >
                            <StatCard
                              title={card.title}
                              count={counts[card.type] || 0}
                              badge="Up to Date!"
                            />
                          </motion.div>
                        </div>
                      )}
                    </Draggable>
                  ))}
              </AnimatePresence>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
