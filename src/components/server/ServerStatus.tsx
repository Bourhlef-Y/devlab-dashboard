"use client";

import { useState } from 'react';
import { useServerData } from '@/hooks/useServerData';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

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
    refresh
  } = useServerData(activeCfxLink || '');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedInput = cfxInput.includes('cfx.re/join/') 
      ? cfxInput 
      : `cfx.re/join/${cfxInput}`;
    setActiveCfxLink(formattedInput);
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
            <Button type="submit" disabled={!cfxInput || isLoading}>
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
                  onClick={refresh}
                  disabled={isLoading}
                >
                  Actualiser
                </Button>
                <StatusBadge online={serverData?.online ?? false} />
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
        <div className="flex justify-between items-center p-4 border-t">
              <Button
                onClick={previousPage}
                disabled={!serverData || currentPage === 1}
                variant="outline"
              >
                Précédent
              </Button>
              <span>
                Page {currentPage} sur {totalPages}
              </span>
              <Button
                onClick={nextPage}
                disabled={!serverData || currentPage === totalPages}
                variant="outline"
              >
                Suivant
              </Button>
            </div>
      </Card>
      
    </div>
  );
}; 