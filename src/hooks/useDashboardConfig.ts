import { useState, useCallback } from 'react';

interface DashboardCard {
  id: string;
  title: string;
  type: string;
  visible: boolean;
}

const defaultCards: DashboardCard[] = [
  { id: 'weapons', title: 'Weapons', type: 'weapons', visible: true },
  { id: 'vehicles', title: 'Vehicles', type: 'vehicles', visible: true },
  { id: 'peds', title: 'Peds', type: 'peds', visible: true },
  { id: 'scripts', title: 'Scripts', type: 'scripts', visible: true }
];

export function useDashboardConfig() {
  const [config, setConfig] = useState({ cards: defaultCards });

  const toggleCardVisibility = useCallback((cardId: string) => {
    setConfig(prev => ({
      cards: prev.cards.map(card => 
        card.id === cardId ? { ...card, visible: !card.visible } : card
      )
    }));
  }, []);

  return { config, toggleCardVisibility };
} 