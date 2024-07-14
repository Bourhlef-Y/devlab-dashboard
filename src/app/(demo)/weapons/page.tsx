/* eslint-disable react-hooks/exhaustive-deps */
// pages/weapons.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WeaponCard from '@/components/weapon/WeaponCard';
import { supabase } from '@/lib/supabaseClient';
import { Input } from "@/components/ui/input";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue, SelectLabel } from "@/components/ui/select";

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
  const [category, setCategory] = useState<string>('all');
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

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filterWeapons = (category: string, searchTerm: string) => {
    let filtered = weapons;
    if (category !== 'all') {
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
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select onValueChange={handleCategoryChange} value={category}>
            <SelectTrigger className="max-w-xs">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Assault Rifles">Assault Rifles</SelectItem>
              <SelectItem value="Handguns">Handguns</SelectItem>
              <SelectItem value="Heavy Weapons">Heavy Weapons</SelectItem>
              <SelectItem value="Light Machine Guns">Light Machine Guns</SelectItem>
              <SelectItem value="Melee">Melee</SelectItem>
              <SelectItem value="Miscellaneous">Miscellaneous</SelectItem>
              <SelectItem value="Shotguns">Shotguns</SelectItem>
              <SelectItem value="Sniper Rifles">Sniper Rifles</SelectItem>
              <SelectItem value="Submachine Guns">Submachine Guns</SelectItem>
              <SelectItem value="Throwables">Throwables</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-6 gap-6">
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
