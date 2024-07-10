// pages/vehicles.tsx
"use client";

import { useState, useEffect } from 'react';
import VehicleCard from '@/components/vehicle/VehicleCard';
import { supabase } from '@/lib/supabaseClient';
import { Input } from "@/components/ui/input";
import { ContentLayout } from "@/components/admin-panel/content-layout";

interface Vehicle {
  id: string;
  name: string;
  image: string;
}

const Vehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  useEffect(() => {
    const filtered = vehicles.filter(v =>
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (v.category && v.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredVehicles(filtered);
  }, [searchTerm, vehicles]);

  return (
    <ContentLayout title="Vehicles">
      <div className="flex flex-col min-h-screen">
        <div className="flex justify-start mb-4">
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-5 gap-6">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default Vehicles;
