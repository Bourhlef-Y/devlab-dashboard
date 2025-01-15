import { useState, useEffect } from 'react';
import { DashboardConfig, defaultConfig } from '@/types/dashboard';

export function useDashboardConfig() {
  const [config, setConfig] = useState<DashboardConfig>(defaultConfig);

  useEffect(() => {
    // Charger la config depuis le localStorage
    const savedConfig = localStorage.getItem('dashboard-config');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  }, []);

  const updateConfig = (newConfig: DashboardConfig) => {
    setConfig(newConfig);
    localStorage.setItem('dashboard-config', JSON.stringify(newConfig));
  };

  const toggleCardVisibility = (cardId: string) => {
    const newConfig = {
      ...config,
      cards: config.cards.map(card => 
        card.id === cardId ? { ...card, visible: !card.visible } : card
      )
    };
    updateConfig(newConfig);
  };

  const reorderCards = (startIndex: number, endIndex: number) => {
    const newCards = [...config.cards];
    const [removed] = newCards.splice(startIndex, 1);
    newCards.splice(endIndex, 0, removed);
    
    const newConfig = {
      ...config,
      cards: newCards.map((card, index) => ({ ...card, position: index }))
    };
    updateConfig(newConfig);
  };

  return { config, toggleCardVisibility, reorderCards };
} 