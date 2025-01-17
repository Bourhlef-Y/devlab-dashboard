export interface Player {
  id: number;
  name: string;
  identifiers: string[];
  ping: number;
  discordId?: string;
}

export interface ServerData {
  hostname: string;
  clients: number;
  sv_maxclients: number;
  players: Player[];
  online: boolean;
  serverVersion: string;
  oneSyncEnabled: boolean;
  endPoint: string;
  gameVersion: string;
  locale: string;
}

interface FiveMServerData {
  Data: {
    // Informations basiques du serveur
    hostname: string;          // Nom du serveur
    clients: number;          // Nombre de joueurs connectés
    sv_maxclients: number;    // Capacité maximale
    
    // Informations détaillées du serveur
    gametype: string;         // Type de jeu
    mapname: string;          // Nom de la map actuelle
    iv: string;              // Version du serveur
    enhancedHostSupport: boolean;
    resources: string[];      // Liste des ressources installées
    server: string;          // Version du serveur FiveM
    vars: {
      // Variables du serveur
      gametype: string;
      locale: string;
      onesync_enabled: string;
      sv_enforceGameBuild: string;
      sv_projectDesc: string;
      sv_projectName: string;
      // ... autres variables personnalisées
    };

    // Informations des joueurs plus détaillées
    players: Array<{
      name: string;
      id: number;
      identifiers: string[];  // license:, discord:, steam:, etc.
      ping: number;          // Latence du joueur
      endpoint: string;      // Adresse IP (si disponible)
    }>;

    // Informations de performance
    upvotePower: number;     // Puissance de vote
    svMaxclients: number;
    lastSeen: string;        // Dernière fois vu en ligne
    iconVersion: number;
  };
  EndPoint: string;          // Adresse du serveur
  IconVersion: number;       // Version de l'icône
} 