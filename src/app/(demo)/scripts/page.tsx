"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useScriptLikes } from "@/hooks/useScriptLikes";

interface Script {
  title: string;
  description: string;
  code: string;
  language: string;
  category: string;
}

const scriptsList: Script[] = [
  {
    title: "Basic Vehicle Spawn",
    description: "Spawn a vehicle at player's position",
    code: `RegisterCommand('car', function(source, args)
    local vehicleName = args[1] or 'adder'
    local playerPed = GetPlayerPed(-1)
    local coords = GetEntityCoords(playerPed)
    
    local vehicle = CreateVehicle(GetHashKey(vehicleName), coords.x, coords.y, coords.z, GetEntityHeading(playerPed), true, false)
    SetPedIntoVehicle(playerPed, vehicle, -1)
    SetEntityAsNoLongerNeeded(vehicle)
    SetVehicleNumberPlateText(vehicle, "SPAWN")
end, false)`,
    language: "lua",
    category: "Vehicle"
  },
  {
    title: "Vehicle Repair",
    description: "Répare et nettoie le véhicule actuel du joueur",
    code: `RegisterCommand('repair', function(source, args)
    local playerPed = GetPlayerPed(-1)
    local vehicle = GetVehiclePedIsIn(playerPed, false)
    
    if vehicle ~= 0 then
        SetVehicleFixed(vehicle)
        SetVehicleDirtLevel(vehicle, 0.0)
        SetVehicleEngineHealth(vehicle, 1000.0)
        SetVehiclePetrolTankHealth(vehicle, 1000.0)
        Citizen.InvokeNative(0x115722B1B9C14C1C, vehicle)
        Citizen.InvokeNative(0x79D3B596FE44EE8B, vehicle, 0.0)
        SetVehicleUndriveable(vehicle, false)
        Citizen.Wait(100)
        SetVehicleEngineOn(vehicle, true, true)
        Notify("~g~Vehicle repaired!")
    else
        Notify("~r~You must be in a vehicle!")
    end
end, false)`,
    language: "lua",
    category: "Vehicle"
  },
  {
    title: "Weapon Giver",
    description: "Donne une arme spécifique au joueur avec des munitions",
    code: `RegisterCommand('weapon', function(source, args)
    local weaponName = args[1] or 'WEAPON_PISTOL'
    local ammo = tonumber(args[2]) or 100
    local playerPed = GetPlayerPed(-1)
    
    GiveWeaponToPed(playerPed, GetHashKey(weaponName), ammo, false, true)
    Notify("~g~Weapon " .. weaponName .. " given with " .. ammo .. " ammo!")
end, false)`,
    language: "lua",
    category: "Weapon"
  },
  {
    title: "Teleport to Waypoint",
    description: "Téléporte le joueur au marqueur sur la carte",
    code: `RegisterCommand('tp', function(source, args)
    local playerPed = GetPlayerPed(-1)
    local waypoint = GetFirstBlipInfoId(8) -- 8 is the waypoint ID
    
    if DoesBlipExist(waypoint) then
        local coords = GetBlipInfoIdCoord(waypoint)
        local found, z = GetGroundZFor_3dCoord(coords.x, coords.y, 999.0)
        
        if found then
            SetEntityCoords(playerPed, coords.x, coords.y, z)
            Notify("~g~Teleported to waypoint!")
        else
            Notify("~r~Could not find ground at waypoint!")
        end
    else
        Notify("~r~No waypoint set!")
    end
end, false)`,
    language: "lua",
    category: "Utility"
  },
  {
    title: "Weather Controller",
    description: "Change la météo du jeu",
    code: `RegisterCommand('weather', function(source, args)
    local weather = args[1] or 'CLEAR'
    local validWeathers = {
        CLEAR = true, EXTRASUNNY = true, CLOUDS = true,
        OVERCAST = true, RAIN = true, THUNDER = true,
        SNOW = true, BLIZZARD = true, FOGGY = true
    }
    
    if validWeathers[string.upper(weather)] then
        SetWeatherTypeNowPersist(string.upper(weather))
        Notify("~g~Weather changed to " .. weather)
    else
        Notify("~r~Invalid weather type!")
    end
end, false)`,
    language: "lua",
    category: "World"
  },
  {
    title: "Ped Spawner",
    description: "Fait apparaître un PED avec une tâche spécifique",
    code: `RegisterCommand('ped', function(source, args)
    local pedModel = args[1] or 'a_m_y_skater_01'
    local playerPed = GetPlayerPed(-1)
    local coords = GetEntityCoords(playerPed)
    local heading = GetEntityHeading(playerPed)
    
    RequestModel(GetHashKey(pedModel))
    while not HasModelLoaded(GetHashKey(pedModel)) do
        Wait(1)
    end
    
    local ped = CreatePed(4, GetHashKey(pedModel), coords.x + 2.0, coords.y, coords.z, heading, true, true)
    SetEntityAsMissionEntity(ped, true, true)
    
    -- Exemple: faire suivre le joueur
    if args[2] == 'follow' then
        TaskFollowToOffsetOfEntity(ped, playerPed, 0.0, 0.0, 0.0, 5.0, -1, 1.0, true)
    end
end, false)`,
    language: "lua",
    category: "Ped"
  }
];

export default function ScriptsPage() {
  const { toast } = useToast();
  const [filter, setFilter] = useState("all");
  const { likes, userLikes, toggleLike } = useScriptLikes();

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copied!",
      description: "The code has been copied to your clipboard.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Scripts Library</h1>
      
      <div className="flex gap-2 mb-6">
        <Button 
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button 
          variant={filter === "favorites" ? "default" : "outline"}
          onClick={() => setFilter("favorites")}
        >
          Favorites
          {userLikes.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {userLikes.length}
            </Badge>
          )}
        </Button>
        <Button 
          variant={filter === "Vehicle" ? "default" : "outline"}
          onClick={() => setFilter("Vehicle")}
        >
          Vehicle
        </Button>
        <Button 
          variant={filter === "Weapon" ? "default" : "outline"}
          onClick={() => setFilter("Weapon")}
        >
          Weapon
        </Button>
        <Button 
          variant={filter === "Utility" ? "default" : "outline"}
          onClick={() => setFilter("Utility")}
        >
          Utility
        </Button>
        <Button 
          variant={filter === "World" ? "default" : "outline"}
          onClick={() => setFilter("World")}
        >
          World
        </Button>
        <Button 
          variant={filter === "Ped" ? "default" : "outline"}
          onClick={() => setFilter("Ped")}
        >
          Ped
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {scriptsList
            .filter(script => {
              if (filter === "favorites") return userLikes.includes(script.title);
              if (filter === "all") return true;
              return script.category === filter;
            })
            .map((script, index) => (
              <motion.div
                key={script.title}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="flex flex-col h-full">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{script.title}</span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleLike(script.title)}
                          className={cn(
                            "hover:text-red-500",
                            userLikes.includes(script.title) && "text-red-500"
                          )}
                        >
                          <div className="flex items-center gap-1">
                            {userLikes.includes(script.title) ? (
                              <Heart className="w-4 h-4 fill-current" />
                            ) : (
                              <Heart className="w-4 h-4" />
                            )}
                            <span className="text-sm">{likes[script.title] || 0}</span>
                          </div>
                        </Button>
                        <Badge>{script.language}</Badge>
                      </div>
                    </CardTitle>
                    <CardDescription>{script.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <pre className="bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto max-h-[200px] overflow-y-auto">
                      <code>{script.code}</code>
                    </pre>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => copyToClipboard(script.code)}
                      className="w-full"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Code
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
} 