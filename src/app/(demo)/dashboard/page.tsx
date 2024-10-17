"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import StatCard from "@/components/stats/StatCard";
import DiscordCard from "@/components/stats/DiscordCard";

export default function DashboardPage() {
  const [weaponCount, setWeaponCount] = useState(0);
  const [vehicleCount, setVehicleCount] = useState(0);
  const [pedCount, setPedCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const { count: weaponCount } = await supabase
        .from('weapons')
        .select('*', { count: 'exact', head: true });
      const { count: vehicleCount } = await supabase
        .from('vehicles')
        .select('*', { count: 'exact', head: true });
      const { count: pedCount } = await supabase
        .from('peds')
        .select('*', { count: 'exact', head: true });

      setWeaponCount(weaponCount || 0);
      setVehicleCount(vehicleCount || 0);
      setPedCount(pedCount || 0);
    };

    fetchCounts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Weapons" count={weaponCount} badge="Up to Date!" />
        <StatCard title="Total Vehicles" count={vehicleCount} badge="Up to Date!" />
        <StatCard title="Total Peds" count={pedCount} badge="Up to Date!" />
      </div>
      <div className="mt-6">
        <DiscordCard />
      </div>
    </div>
  );
}
