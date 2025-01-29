"use client";

import { useState } from 'react';
import { useServerData } from '@/hooks/useServerData';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Users, Tag, Zap, Search } from 'lucide-react';
import StatCard from '@/components/stats/StatCard';
import { ServerData } from '@/types/server';

const StatusBadge = ({ online }: { online: boolean }) => {
  if (online) {
    return (
      <Badge variant="secondary" className="bg-green-500 text-white hover:bg-green-600">
        En ligne
      </Badge>
    );
  }
  return (
    <Badge variant="destructive">
      Hors ligne
    </Badge>
  );
};

const StatusIndicator = ({ online }: { online: boolean }) => (
  <div className={cn(
    "flex items-center gap-2",
    "px-3 py-1 rounded-full",
    online ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" 
    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
  )}>
    <div className={cn(
      "w-2 h-2 rounded-full animate-pulse",
      online ? "bg-green-500" : "bg-red-500"
    )} />
    <span>{online ? "En ligne" : "Hors ligne"}</span>
  </div>
);

const ServerStats = ({ data }: { data: ServerData }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <StatCard
      title="Joueurs"
      value={`${data.clients}/${data.sv_maxclients}`}
      icon={<Users className="w-4 h-4" />}
    />
    <StatCard
      title="Version"
      value={data.gameVersion}
      icon={<Tag className="w-4 h-4" />}
    />
    <StatCard
      title="OneSync"
      value={data.oneSyncEnabled ? "Activé" : "Désactivé"}
      icon={<Zap className="w-4 h-4" />}
    />
  </div>
);

const PlayerFilters = ({ 
  searchQuery, 
  setSearchQuery
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) => (
  <div className="mb-6">
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Rechercher un joueur..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-8"
      />
    </div>
  </div>
);

export const ServerStatus: React.FC = () => {
  const [cfxInput, setCfxInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCfxLink, setActiveCfxLink] = useState<string | null>(null);

  const {
    serverData,
    isLoading,
    error,
    currentPage,
    nextPage,
    previousPage,
    getCurrentPagePlayers,
    totalPages,
    totalPlayers,
    playersPerPage,
    refreshData
  } = useServerData(activeCfxLink || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedInput = cfxInput.includes('cfx.re/join/') 
      ? cfxInput 
      : `cfx.re/join/${cfxInput}`;
    setActiveCfxLink(formattedInput);
  };

  const getFilteredPlayers = () => {
    const players = getCurrentPagePlayers();
    if (!searchQuery) return players;

    const query = searchQuery.toLowerCase();
    return players.filter(player => 
      player.name.toLowerCase().includes(query) ||
      player.id.toString().includes(query) ||
      player.identifiers.some(id => id.toLowerCase().includes(query))
    );
  };

  return (
    <div className="space-y-4 h-[calc(100vh-2rem)]">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Entrez le code CFX du serveur</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              placeholder="Code CFX (ex: abcd123) ou lien complet"
              value={cfxInput}
              onChange={(e) => setCfxInput(e.target.value)}
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={!cfxInput || cfxInput.length < 3}
            >
              Rechercher
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="w-full flex-1 flex flex-col h-[calc(100vh-12rem)]">
        <CardHeader className="flex-none">
          <div className="flex items-center justify-between">
            <CardTitle>
              {!activeCfxLink 
                ? 'En attente d\'un code CFX...'
                : serverData?.hostname || 'Serveur inconnu'
              }
            </CardTitle>
            {activeCfxLink && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refreshData}
                  disabled={isLoading}
                >
                  Actualiser
                </Button>
                <StatusIndicator online={serverData?.online ?? false} />
              </div>
            )}
          </div>
          {serverData && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>
                    Joueurs: {serverData.clients || 0}/{serverData.sv_maxclients || 0}
                  </span>
                  <div className="flex items-center gap-4">
                    <span>
                      Version: {serverData.serverVersion}
                    </span>
                    <Badge variant="outline" className={`mt-2 ${serverData.oneSyncEnabled ? 'bg-green-500/10' : 'bg-yellow-500/10'}`}>
                      OneSync {serverData.oneSyncEnabled ? 'Activé' : 'Désactivé'}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex gap-4">
                    <span>Adresse: {serverData.endPoint}</span>
                    <span>Version GTA: {serverData.gameVersion}</span>
                    <span>Langue: {serverData.locale.toUpperCase()}</span>
                  </div>
                </div>
              </div>
              <PlayerFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
          )}
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden flex flex-col p-0">
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-auto">
              {!activeCfxLink ? (
                <p className="text-center py-4">Entrez un code CFX pour voir les informations du serveur</p>
              ) : isLoading && !serverData ? (
                <p className="text-center py-4">Chargement des données...</p>
              ) : error && !serverData ? (
                <p className="text-center text-red-500 py-4">{error}</p>
              ) : getFilteredPlayers().length === 0 ? (
                <p className="text-center py-4">Aucun joueur en ligne</p>
              ) : (
                <Table>
                  <TableHeader className="sticky top-0 bg-background z-10">
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nom</TableHead>
                      <TableHead>Licence FiveM</TableHead>
                      <TableHead>Discord ID</TableHead>
                      <TableHead className="text-right">Ping</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredPlayers().map((player) => (
                      <TableRow key={player.id}>
                        <TableCell>{player.id}</TableCell>
                        <TableCell>{player.name}</TableCell>
                        <TableCell>
                          {player.identifiers.find(id => id.startsWith('license:')) || 'N/A'}
                        </TableCell>
                        <TableCell>
                          {player.discordId || 'N/A'}
                        </TableCell>
                        <TableCell className="text-right">
                          <span className={`${
                            player.ping > 100 
                              ? 'text-red-500' 
                              : player.ping > 50 
                                ? 'text-yellow-500' 
                                : 'text-green-500'
                          } font-mono`}>
                            {player.ping.toFixed(0)} ms
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </div>
        </CardContent>
        <div className="flex items-center justify-between p-4 border-t">
          <div className="flex items-center gap-2">
            <Button
              onClick={previousPage}
              disabled={!serverData || currentPage === 1}
              variant="outline"
              size="sm"
            >
              Précédent
            </Button>
            <Button
              onClick={nextPage}
              disabled={!serverData || currentPage === totalPages}
              variant="outline"
              size="sm"
            >
              Suivant
            </Button>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>
              Affichage {serverData && totalPlayers > 0 ? (currentPage - 1) * playersPerPage + 1 : 0} - {
                serverData 
                  ? Math.min(currentPage * playersPerPage, totalPlayers) 
                  : 0
              } sur {totalPlayers} joueurs
            </span>
            <span>|</span>
            <span>
              Page {currentPage} sur {totalPages || 1}
            </span>
          </div>
        </div>
      </Card>
      
    </div>
  );
}; 