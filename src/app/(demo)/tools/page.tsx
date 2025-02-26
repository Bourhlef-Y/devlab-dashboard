// pages/useful-tools.tsx
"use client";

import ToolCard from '@/components/tool/ToolCard'; // Import the ToolCard component
import { ContentLayout } from '@/components/layout/content-layout'; // Import the ContentLayout component
import { AnimatePresence } from 'framer-motion';

const tools = [
  {
    name: "Dolu Tool",
    description: "Resource that help you developping your scripts and mods.",
    download: "https://github.com/dolutattoo/dolu_tool/releases/download/v4.3.2/dolu_tool.zip",
    image: "/dolu.jpg",
    author: "dolutattoo",
  },
  {
    name: "Get Coords",
    description: "Simple resource to get ingame Coordinates with shitty UI",
    download: "https://github.com/Esegovic/esegovic_coords/releases/download/lua/esegovic_coords.zip",
    image: "/esegovic.png",
    author: "Esegovic",
  },
  {
    name: "Server Viewer [Development not finished]",
    description: "A simple tool to view your server's resources and players.",
    download: "https://server-viewer.netlify.app/",
    author: "Jak Shyrak",
  },
  
  // Add more tools here
];

// Define the UsefulTools component
const UsefulTools = () => {
  return (
    <ContentLayout title="Useful Tools"> {/* Use ContentLayout with title "Useful Tools" */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {tools.map((tool, index) => (
            <ToolCard key={tool.name || index} tool={tool} /> // Render ToolCard for each tool
          ))}
        </AnimatePresence>
      </div>
    </ContentLayout>
  );
};

export default UsefulTools; // Export UsefulTools component as default
