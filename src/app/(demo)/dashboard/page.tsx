// pages/dashboard.tsx
"use client";

import { useState, useEffect } from "react"; // Import useState and useEffect hooks from React
import Link from "next/link"; // Import Link component from Next.js
import { supabase } from "@/lib/supabaseClient"; // Import Supabase client
import StatCard from "@/components/stats/StatCard"; // Import StatCard component
import DiscordCard from "@/components/stats/DiscordCard"; // Import DiscordCard component
import { ContentLayout } from "@/components/admin-panel/content-layout"; // Import ContentLayout component

// Define the DashboardPage component
export default function DashboardPage() {
  const [weaponCount, setWeaponCount] = useState(0); // State for weapon count
  const [vehicleCount, setVehicleCount] = useState(0); // State for vehicle count
  const [pedCount, setPedCount] = useState(0); // State for ped count

  // Fetch counts of weapons, vehicles, and peds from the database
  useEffect(() => {
    const fetchCounts = async () => {
      const { count: weaponCount } = await supabase
        .from('weapons')
        .select('*', { count: 'exact', head: true }); // Fetch weapon count
      const { count: vehicleCount } = await supabase
        .from('vehicles')
        .select('*', { count: 'exact', head: true }); // Fetch vehicle count
      const { count: pedCount } = await supabase
        .from('peds')
        .select('*', { count: 'exact', head: true }); // Fetch ped count

      setWeaponCount(weaponCount || 0); // Set weapon count state
      setVehicleCount(vehicleCount || 0); // Set vehicle count state
      setPedCount(pedCount || 0); // Set ped count state
    };

    fetchCounts(); // Call the fetchCounts function
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <ContentLayout title="Dashboard"> {/* Use ContentLayout with title "Dashboard" */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Weapons" count={weaponCount} badge="Up to Date!" /> {/* StatCard for total weapons */}
        <StatCard title="Total Vehicles" count={vehicleCount} badge="Up to Date!" /> {/* StatCard for total vehicles */}
        <StatCard title="Total Peds" count={pedCount} badge="Up to Date!" /> {/* StatCard for total peds */}
      </div>
      <div className="mt-6">
        <DiscordCard /> {/* Render DiscordCard component */}
      </div>
    </ContentLayout>
  );
}
