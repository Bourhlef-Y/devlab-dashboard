export interface Vehicle {
  name: string;
  class: string;
  image?: string;
}

export interface Weapon {
  name: string;
  category: string;
  image?: string;
}

export interface Ped {
  name: string;
  type: string;
  image?: string;
}

export const vehicles: Vehicle[] = [
  {
    name: "Adder",
    class: "Super",
    image: "/vehicles/adder.png"
  },
  // Ajoutez d'autres véhicules ici
];

export const weapons: Weapon[] = [
  {
    name: "Combat Pistol",
    category: "Handguns",
    image: "/weapons/combat-pistol.png"
  },
  // Ajoutez d'autres armes ici
];

export const peds: Ped[] = [
  {
    name: "Michael",
    type: "Story",
    image: "/peds/michael.png"
  },
  // Ajoutez d'autres peds ici
]; 