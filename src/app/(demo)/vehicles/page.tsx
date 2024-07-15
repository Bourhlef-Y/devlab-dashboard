/* eslint-disable react-hooks/exhaustive-deps */
// pages/vehicles.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import VehicleCard from '@/components/vehicles/VehiclesCard';
import { supabase } from '@/lib/supabaseClient';
import { Input } from "@/components/ui/input";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue, SelectLabel } from "@/components/ui/select";

interface Vehicle {
  id: string;
  name: string;
  category: string;
  hash: string;
  image: string;
}

const Vehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<string>('all');
  const router = useRouter();

  useEffect(() => {
    const fetchVehicles = async () => {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching vehicles:', error);
      } else {
        setVehicles(data);
        setFilteredVehicles(data);
      }
    };

    fetchVehicles();

    const intervalId = setInterval(fetchVehicles, 50000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    filterVehicles(category, searchTerm);
  }, [category, searchTerm, vehicles]);

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filterVehicles = (category: string, searchTerm: string) => {
    let filtered = vehicles;
    if (category !== 'all') {
      filtered = filtered.filter(w => w.category === category);
    }
    if (searchTerm) {
      filtered = filtered.filter(w => w.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilteredVehicles(filtered);
  };

  return (
    <ContentLayout title="Vehicles">
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
              <SelectItem value="Boats">Boats</SelectItem>
              <SelectItem value="Commercials">Commercials</SelectItem>
              <SelectItem value="Compacts">Compacts</SelectItem>
              <SelectItem value="Coupes">Coupes</SelectItem>
              <SelectItem value="Cycles">Cycles</SelectItem>
              <SelectItem value="Emergency">Emergency</SelectItem>
              <SelectItem value="Helicopters">Helicopters</SelectItem>
              <SelectItem value="Industrial">Industrial</SelectItem>
              <SelectItem value="Military">Military</SelectItem>
              <SelectItem value="Motorcycles">Motorcycles</SelectItem>
              <SelectItem value="Muscle">Muscle</SelectItem>
              <SelectItem value="Off-Road">Off-Road</SelectItem>
              <SelectItem value="Open Wheel">Open Wheel</SelectItem>
              <SelectItem value="Planes">Planes</SelectItem>
              <SelectItem value="SUVs">SUVs</SelectItem>
              <SelectItem value="Sedans">Sedans</SelectItem>
              <SelectItem value="Service">Service</SelectItem>
              <SelectItem value="Sports">Sports</SelectItem>
              <SelectItem value="Sports Classic">Sports Classic</SelectItem>
              <SelectItem value="Super">Super</SelectItem>
              <SelectItem value="Trailer">Trailer</SelectItem>
              <SelectItem value="Trains">Trains</SelectItem>
              <SelectItem value="Utility">Utility</SelectItem>
              <SelectItem value="Vans">Vans</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-6 gap-6">
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
