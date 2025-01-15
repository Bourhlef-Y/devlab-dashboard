/* eslint-disable react-hooks/exhaustive-deps */
// pages/weapons.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WeaponCard from '@/components/weapon/WeaponCard';
import { supabase } from '@/lib/supabaseClient';
import { Input } from "@/components/ui/input";
import { ContentLayout } from "@/components/layout/content-layout";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

// Define the Weapon interface
interface Weapon {
  id: string;
  name: string;
  category: string;
  hash: string;
  image: string;
}

// Define the Weapons component
const Weapons = () => {
  const [weapons, setWeapons] = useState<Weapon[]>([]); // State for weapons
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [category, setCategory] = useState<string>('all'); // State for category
  const router = useRouter();

  // Fetch weapons data when component mounts
  useEffect(() => {
    const fetchWeapons = async () => {
      const { data, error } = await supabase
        .from('weapons')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching weapons:', error); // Log error if fetching fails
      } else {
        setWeapons(data); // Set weapons state
      }
    };

    fetchWeapons(); // Call fetchWeapons function

    const intervalId = setInterval(fetchWeapons, 50000); // Refresh data every 50 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  const filteredWeapons = weapons.filter(weapon => {
    const matchesSearch = weapon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || weapon.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <ContentLayout title="Weapons">
      <div className="space-y-4">
        <div className="flex gap-4">
          <Input
            placeholder="Search weapons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredWeapons.map((weapon) => (
              <motion.div
                key={weapon.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <WeaponCard weapon={weapon} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </ContentLayout>
  );
};

export default Weapons; // Export Weapons component as default
