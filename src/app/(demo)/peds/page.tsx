"use client";

import { useState, useEffect } from 'react';
import PedCard from '@/components/ped/pedCard';
import { supabase } from '@/lib/supabaseClient';
import styles from './Peds.module.css';
import { ContentLayout } from "@/components/admin-panel/content-layout";

interface Ped {
  id: string;
  props: string;
  image: string;
}

const Peds = () => {
  const [peds, setPeds] = useState<Ped[]>([]);
  const [filteredPeds, setFilteredPeds] = useState<Ped[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchPeds = async () => {
      const { data, error } = await supabase
        .from('peds')
        .select('id, props, image')
        .order('props', { ascending: true });

      if (error) {
        console.error('Error fetching peds:', error);
      } else {
        console.log('Fetched peds:', data); // Log the fetched data
        setPeds(data);
        setFilteredPeds(data);
      }
    };

    fetchPeds();

    const intervalId = setInterval(fetchPeds, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterPeds(term);
  };

  const filterPeds = (searchTerm: string) => {
    const filtered = peds.filter(p => p.props.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredPeds(filtered);
  };

  return (
    <ContentLayout title="Peds">
      <div className={styles.peds}>
        <div className={styles.mainContent}>
          <div className={styles.content}>
            <h1 className={styles.title}>Peds Page</h1>
            <div className={styles.grid}>
              {filteredPeds.map((ped) => (
                <PedCard key={ped.id} ped={ped} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ContentLayout> 
  );
};

export default Peds;