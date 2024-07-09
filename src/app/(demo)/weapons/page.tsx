"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WeaponCard from '@/components/weapon/WeaponCard';
import { supabase } from '@/lib/supabaseClient';
import styles from './Weapons.module.css';
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

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    filterWeapons(e.target.value, searchTerm);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterWeapons(category, term);
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

  const [searchTerm, setSearchTerm] = useState('');

  return (
    
    <ContentLayout title="Weapons">
      <div className={styles.weapons}>
        <div className={styles.mainContent}>
          <div className={styles.content}>
            <h1 className={styles.title}>Weapons Page</h1>
            <select className={styles.dropdown} onChange={handleCategoryChange} value={category}>
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
              {/* Add more categories as needed */}
            </select>
            <div className={styles.grid}>
              {filteredWeapons.map((weapon) => (
                <WeaponCard key={weapon.id} weapon={weapon} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default Weapons;
