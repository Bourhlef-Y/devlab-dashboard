"use client";

import { useState, useEffect, useCallback } from 'react';
import { ServerData } from '@/types/server';
import { toast } from "sonner";

interface FiveMApiResponse {
  Data: {
    hostname: string;
    clients: number;
    sv_maxclients: number;
    server: string;
    players: Array<{
      name: string;
      id: number;
      identifiers: string[];
      ping: number;
    }>;
    vars: {
      gametype: string;
      mapname: string;
      enhancedHostSupport: boolean;
      onesync_enabled?: string;
      sv_enforceGameBuild?: string;
      locale?: string;
      [key: string]: any;
    };
  };
  EndPoint: string;
}

export const useServerData = (cfxLink: string) => {
  const [serverData, setServerData] = useState<ServerData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [playersPerPage, setPlayersPerPage] = useState(10);

  // Fonction pour ajuster le nombre de joueurs par page selon la taille de l'écran
  const adjustPlayersPerPage = () => {
    const height = window.innerHeight;
    // Calculer approximativement combien de lignes peuvent tenir dans la vue
    // En supposant qu'une ligne fait environ 53px de hauteur (incluant padding/margin)
    const availableHeight = height - 400; // Soustraire l'espace pour les headers/footers
    const rowHeight = 53;
    const possibleRows = Math.floor(availableHeight / rowHeight);
    
    // Limiter entre 10 et 25 joueurs par page
    setPlayersPerPage(Math.max(10, Math.min(25, possibleRows)));
  };

  // Écouter les changements de taille d'écran
  useEffect(() => {
    adjustPlayersPerPage();
    window.addEventListener('resize', adjustPlayersPerPage);
    return () => window.removeEventListener('resize', adjustPlayersPerPage);
  }, []);

  const extractCfxCode = (link: string) => {
    const match = link.match(/cfx\.re\/join\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
  };

  const fetchServerData = useCallback(async () => {
    const isFirstLoad = !serverData;
    if (isFirstLoad) {
      setIsLoading(true);
    }

    try {
      const cfxCode = extractCfxCode(cfxLink);
      if (!cfxCode) {
        throw new Error('Code CFX invalide');
      }

      const response = await fetch(
        `/api/fivem?code=${cfxCode}`,
        {
          headers: {
            'Accept': 'application/json'
          },
          cache: 'no-store'
        }
      );
      
      if (!response.ok) {
        throw new Error(response.status === 404 ? 'Serveur introuvable' : 'Serveur hors ligne');
      }

      const data: FiveMApiResponse = await response.json();
      
      if (!data.Data) {
        throw new Error('Format de données invalide');
      }

      setServerData({
        hostname: data.Data.hostname || 'Serveur inconnu',
        clients: data.Data.clients || 0,
        sv_maxclients: data.Data.sv_maxclients || 0,
        players: data.Data.players.map(player => ({
          id: player.id,
          name: player.name,
          identifiers: player.identifiers,
          ping: player.ping,
          discordId: player.identifiers.find(id => id.startsWith('discord:'))?.replace('discord:', '') || undefined
        })),
        online: true,
        serverVersion: data.Data.server || 'Version inconnue',
        oneSyncEnabled: data.Data.vars?.onesync_enabled === 'true',
        endPoint: data.EndPoint || 'Adresse inconnue',
        gameVersion: data.Data.vars?.sv_enforceGameBuild || 'Version inconnue',
        locale: data.Data.vars?.locale || 'fr'
      });
      
      const maxPages = Math.ceil((data.Data.players?.length || 0) / playersPerPage);
      if (currentPage > maxPages) {
        setCurrentPage(1);
      }
      
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      if (serverData) {
        setServerData({
          ...serverData,
          online: false
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [serverData, cfxLink, currentPage, playersPerPage]);

  useEffect(() => {
    if (!cfxLink) return;
    
    // Faire le fetch initial
    fetchServerData();
    
    // Puis mettre en place l'intervalle
    const interval = setInterval(fetchServerData, 30000);

    // Cleanup
    return () => clearInterval(interval);
  }, [cfxLink, fetchServerData]);

  const nextPage = () => {
    if (serverData && currentPage < Math.ceil(serverData.players.length / playersPerPage)) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const getCurrentPagePlayers = () => {
    if (!serverData) return [];
    
    // Calculer l'index de début et de fin pour la page actuelle
    const start = (currentPage - 1) * playersPerPage;
    const end = start + playersPerPage;
    
    // Retourner seulement les joueurs de la page actuelle
    return serverData.players.slice(start, end);
  };

  // Ajouter une fonction pour obtenir le nombre total de joueurs
  const getTotalPlayers = () => {
    return serverData?.players.length || 0;
  };

  // Ajouter une fonction de rafraîchissement manuel
  const refreshData = () => {
    fetchServerData();
    toast.success("Données actualisées");
  };

  return {
    serverData,
    isLoading,
    error,
    currentPage,
    nextPage,
    previousPage,
    getCurrentPagePlayers,
    totalPages: serverData 
      ? Math.ceil(serverData.players.length / playersPerPage)
      : 0,
    totalPlayers: getTotalPlayers(),
    playersPerPage,
    refreshData
  };
}; 