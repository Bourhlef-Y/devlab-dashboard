export interface DashboardCard {
  id: string;
  type: 'weapons' | 'vehicles' | 'peds' | 'scripts';
  title: string;
  visible: boolean;
  position: number;
}

export interface DashboardConfig {
  cards: DashboardCard[];
  activityFeed: {
    visible: boolean;
    limit: number;
    types: ('weapon' | 'vehicle' | 'ped' | 'script')[];
  };
}

export const defaultConfig: DashboardConfig = {
  cards: [
    { id: 'weapons', type: 'weapons', title: 'Total Weapons', visible: true, position: 0 },
    { id: 'vehicles', type: 'vehicles', title: 'Total Vehicles', visible: true, position: 1 },
    { id: 'peds', type: 'peds', title: 'Total Peds', visible: true, position: 2 },
    { id: 'scripts', type: 'scripts', title: 'Scripts Partagés', visible: true, position: 3 }
  ],
  activityFeed: {
    visible: true,
    limit: 10,
    types: ['weapon', 'vehicle', 'ped', 'script']
  }
}; 