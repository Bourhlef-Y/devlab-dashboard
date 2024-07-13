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
  category: string; // Required
  hash: string;     // Required
}

const Peds = () => {
  const [peds, setPeds] = useState<Ped[]>([]);
  const [filteredPeds, setFilteredPeds] = useState<Ped[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPeds = async () => {
      const { data, error } = await supabase
        .from('peds')
        .select('id, props, image')
        .order('props', { ascending: true });

        if (error) {
          console.error('Error fetching peds:', error);
        } else {
          console.log('Fetched peds:', data);
          // Assuming the fetched data may not have category and hash
          const pedsWithDefaultFields = data.map((ped: Partial<Ped>) => ({
            ...ped,
            category: ped.category || 'Unknown',
            hash: ped.hash || 'N/A',
          })) as Ped[];
          setPeds(pedsWithDefaultFields);
          setFilteredPeds(pedsWithDefaultFields);
        }
    };

    fetchPeds();

    const intervalId = setInterval(fetchPeds, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const filtered = peds.filter(v =>
      v.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.props.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPeds(filtered);
  }, [searchTerm, Peds]);

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