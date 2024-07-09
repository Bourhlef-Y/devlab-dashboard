"use client";

import { useState, useEffect } from 'react';
import VehicleCard from '@/components/vehicle/VehicleCard';
import { supabase } from '@/lib/supabaseClient';
import styles from './Vehicles.module.css';
import { ContentLayout } from "@/components/admin-panel/content-layout";

interface Vehicle {
  id: string;
  name: string;
  image: string;
}

const Vehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const { data, error } = await supabase
        .from('vehicles')
        .select('id, name, image') // Include 'image' in select
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching vehicles:', error);
      } else {
        console.log('Fetched vehicles:', data); // Log the fetched data
        setVehicles(data);
        setFilteredVehicles(data);
      }
    };

    fetchVehicles();

    const intervalId = setInterval(fetchVehicles, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSearch = (term: string) => {
    filterVehicles(term);
  };

  const filterVehicles = (searchTerm: string) => {
    const filtered = vehicles.filter(v => v.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredVehicles(filtered);
  };

  return (
    <ContentLayout title="Vehicles">
        <div className={styles.vehicles}>
          <div className={styles.mainContent}>
            <div className={styles.content}>
              <h1 className={styles.title}>Vehicles Page</h1>
              <div className={styles.grid}>
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </ContentLayout>
  );
};

export default Vehicles;
