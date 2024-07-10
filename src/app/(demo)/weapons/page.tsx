// pages/weapons.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WeaponCard from '@/components/weapon/WeaponCard';
import { supabase } from '@/lib/supabaseClient';
import { Input } from "@/components/ui/input";
import { ContentLayout } from "@/components/admin-panel/content-layout";

interface Weapon {
  id: string;
  name: string;
  category: string;
  hash: string;
  image: string;
}

const Weapons = () => {
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [filteredWeapons, setFilteredWeapons] = useState<Weapon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchWeapons = async () => {
      const { data, error } = await supabase
        .from('weapons')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching weapons:', error);
      } else {
        setWeapons(data);
        setFilteredWeapons(data);
      }
    };

    fetchWeapons();

    const intervalId = setInterval(fetchWeapons, 50000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    filterWeapons(category, searchTerm);
  }, [category, searchTerm, weapons]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filterWeapons = (category: string, searchTerm: string) => {
    let filtered = weapons;
    if (category) {
      filtered = filtered.filter(w => w.category === category);
    }
    if (searchTerm) {
      filtered = filtered.filter(w => w.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilteredWeapons(filtered);
  };

  return (
    <ContentLayout title="Weapons">
      <div className="flex flex-col min-h-screen">
        <div className="flex justify-between mb-4">
          <select className="max-w-xs" onChange={handleCategoryChange} value={category}>
            <option value="">All Categories</option>
            <option value="Assault Rifles">Assault Rifles</option>
            <option value="Handguns">Handguns</option>
            <option value="Heavy Weapons">Heavy Weapons</option>
            <option value="Light Machine Guns">Light Machine Guns</option>
            <option value="Melee">Melee</option>
            <option value="Miscellaneous">Miscellaneous</option>
            <option value="Shotguns">Shotguns</option>
            <option value="Sniper Rifles">Sniper Rifles</option>
            <option value="Submachine Guns">Submachine Guns</option>
            <option value="Throwables">Throwables</option>
          </select>
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-6  gap-6">
            {filteredWeapons.map((weapon) => (
              <WeaponCard key={weapon.id} weapon={weapon} />
            ))}
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default Weapons;
