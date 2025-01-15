"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface ConfigSnippet {
  title: string;
  description: string;
  code: string;
  language: string;
}

const serverConfigs: ConfigSnippet[] = [
  {
    title: "server.cfg",
    description: "Basic server configuration with essential settings",
    language: "cfg",
    code: `# Basic server configuration
endpoint_add_tcp "0.0.0.0:30120"
endpoint_add_udp "0.0.0.0:30120"

# Server settings
sv_maxclients 48
sv_hostname "My FiveM Server"
sets sv_projectName "My Project"
sets sv_projectDesc "A FiveM server"
sets tags "default"
sv_scriptHookAllowed 0
set sv_enforceGameBuild 2944

# Steam Web API key
set steam_webApiKey ""

# License key
sv_licenseKey ""

# OneSync
set onesync on

# Default resources
ensure mapmanager
ensure chat
ensure spawnmanager
ensure sessionmanager
ensure basic-gamemode
ensure hardcap

# Add your resources below
`,
  },
  {
    title: "resources.cfg",
    description: "Resource management and load order configuration",
    language: "cfg",
    code: `# System resources
ensure chat
ensure sessionmanager
ensure hardcap

# Framework resources
ensure mysql-async
ensure oxmysql

# Core resources
ensure core
ensure utils

# Jobs
ensure police
ensure ambulance
ensure mechanic

# Player management
ensure inventory
ensure weapons
ensure vehicles

# World & Environment
ensure weather
ensure time
ensure locations

# UI & HUD
ensure hud
ensure notifications
ensure menu

# Add custom resources below
`,
  },
  {
    title: "permissions.cfg",
    description: "Server permissions and ACE configuration",
    language: "cfg",
    code: `# Admin level permissions
add_ace group.admin command allow # Allow all commands
add_ace group.admin command.quit deny # Deny quit command

# Moderator permissions
add_principal group.mod group.user # Inherit user permissions
add_ace group.mod command.kick allow
add_ace group.mod command.ban allow
add_ace group.mod command.unban allow

# User permissions
add_ace group.user command.help allow
add_ace group.user command.players allow

# Resource permissions
add_ace resource.core command.restart allow

# Add your custom permissions below

# Example: add admin to group
#add_principal identifier.steam:110000112345678 group.admin
`,
  },
];

export default function ServerPage() {
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast("Code copied to clipboard!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Server Configuration Templates</h1>
      
      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode="popLayout">
          {serverConfigs.map((config) => (
            <motion.div
              key={config.title}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{config.title}</CardTitle>
                  <CardDescription>{config.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <pre className="bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto">
                      <code>{config.code}</code>
                    </pre>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(config.code)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
} 