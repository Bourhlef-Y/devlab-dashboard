"use client";

import { useState, useEffect } from 'react';
import PedCard from '@/components/ped/pedCard';
import { supabase } from '@/lib/supabaseClient';
import styles from './Peds.module.css';
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Input } from "@/components/ui/input";

interface Ped {
  id: string;
  name: string; // Add name to the interface
  props: string;
  image: string;
  category: string; // Required
  hash: string;     // Required
}

// Define the Peds component
const Peds = () => {
  const [peds, setPeds] = useState<Ped[]>([]); // State for peds
  const [filteredPeds, setFilteredPeds] = useState<Ped[]>([]); // State for filtered peds
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  // Fetch peds data when component mounts
  useEffect(() => {
    const fetchPeds = async () => {
      const { data, error } = await supabase
        .from('peds')
        .select('id, props, image') // Include 'name' in select
        .order('props', { ascending: true });

      if (error) {
        console.error('Error fetching peds:', error); // Log error if fetching fails
      } else {
        console.log('Fetched peds:', data); // Log fetched data
        const pedsWithDefaultFields = data.map((ped: Partial<Ped>) => ({
          ...ped,
          category: ped.category || 'Unknown', // Provide default value for category
          hash: ped.hash || 'N/A', // Provide default value for hash
        })) as Ped[];
        setPeds(pedsWithDefaultFields); // Set peds state
        setFilteredPeds(pedsWithDefaultFields); // Set filtered peds state
      }
    };

    fetchPeds(); // Call fetchPeds function

    const intervalId = setInterval(fetchPeds, 5000); // Refresh data every 5 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  // Filter peds based on search term
  useEffect(() => {
    const filtered = peds.filter(v =>
      v.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.props.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPeds(filtered); // Set filtered peds state
  }, [searchTerm, peds]); // Run effect when searchTerm or peds change

  return (
    <ContentLayout title="Peds">
      <div className={styles.peds}>
        <div className={styles.mainContent}>
          <div className={styles.content}>
            <h1 className={styles.title}>Peds Page</h1>
            <div className="flex justify-start mb-4">
              <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
              />
            </div>
            <div className={styles.grid}>
              {filteredPeds.length > 0 ? (
                filteredPeds.map((ped) => (
                  <PedCard key={ped.id} ped={ped} /> // Render PedCard for each filtered ped
                ))
              ) : (
                <p>No peds found</p> // Show message if no peds found
              )}
            </div>
          </div>
        </div>
      </div>
    </ContentLayout> 
  );
};

export default Peds; // Export Peds component as default
