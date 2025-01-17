"use client";

import { useState, useEffect } from 'react';
import { ServerData } from '@/types/server';

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 14;

  const extractCfxCode = (link: string) => {
    const match = link.match(/cfx\.re\/join\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
  };

  const fetchServerData = async () => {
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
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const startFetching = async () => {
      await fetchServerData();
      intervalId = setInterval(fetchServerData, 15000);
    };

    startFetching();

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [cfxLink]);

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
    const start = (currentPage - 1) * playersPerPage;
    return serverData.players.slice(start, start + playersPerPage);
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
    refresh: fetchServerData
  };
}; 