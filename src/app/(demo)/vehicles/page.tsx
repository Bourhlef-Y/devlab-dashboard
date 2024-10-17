/* eslint-disable react-hooks/exhaustive-deps */
// pages/vehicles.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import VehicleCard from '@/components/vehicles/VehiclesCard';
import { supabase } from '@/lib/supabaseClient';
import { Input } from "@/components/ui/input";
import { ContentLayout } from "@/components/layout/content-layout";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue, SelectLabel } from "@/components/ui/select";

// Define the Vehicle interface
interface Vehicle {
  id: string;
  name: string;
  category: string;
  hash: string;
  image: string;
}

// Define the Vehicles component
const Vehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]); // State for vehicles
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]); // State for filtered vehicles
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [category, setCategory] = useState<string>('all'); // State for category
  const router = useRouter();

  // Fetch vehicles data when component mounts
  useEffect(() => {
    const fetchVehicles = async () => {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching vehicles:', error); // Log error if fetching fails
      } else {
        setVehicles(data); // Set vehicles state
        setFilteredVehicles(data); // Set filtered vehicles state
      }
    };

    fetchVehicles(); // Call fetchVehicles function

    const intervalId = setInterval(fetchVehicles, 50000); // Refresh data every 50 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  // Filter vehicles based on category and search term
  useEffect(() => {
    filterVehicles(category, searchTerm);
  }, [category, searchTerm, vehicles]);

  const handleCategoryChange = (value: string) => {
    setCategory(value); // Update category state
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term); // Update search term state
  };

  const filterVehicles = (category: string, searchTerm: string) => {
    let filtered = vehicles;
    if (category !== 'all') {
      filtered = filtered.filter(w => w.category === category); // Filter by category
    }
    if (searchTerm) {
      filtered = filtered.filter(w => w.name.toLowerCase().includes(searchTerm.toLowerCase())); // Filter by search term
    }
    setFilteredVehicles(filtered); // Set filtered vehicles state
  };

  return (
    <ContentLayout title="Vehicles"> {/* Use ContentLayout with title "Vehicles" */}
      <div className="flex flex-col min-h-screen">
        <div className="flex justify-between mb-4">
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
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
              <VehicleCard key={vehicle.id} vehicle={vehicle} /> // Render VehicleCard for each filtered vehicle
            ))}
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default Vehicles; // Export Vehicles component as default
