export interface Script {
  title: string;
  description: string;
  code: string;
  language: string;
  category: string;
}

export const scripts: Script[] = [
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
  // ... autres scripts ...
]; 