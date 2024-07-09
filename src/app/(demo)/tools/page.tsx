// pages/useful-tools.tsx
"use client";

import ToolCard from '@/components/tool/ToolCard';
import { ContentLayout } from '@/components/admin-panel/content-layout';

const tools = [
  {
    name: "Dolu Tool",
    description: "A tool for managing tattoos in the Dolu app.",
    link: "https://github.com/dolutattoo/dolu_tool/releases/download/v4.3.2/dolu_tool.zip",
    image: "/dolu.jpg",
    author: "dolutattoo",
  },
  {
    name: "Get Coords",
    description: "Simple resource to get ingame Coordinates with shitty UI",
    link: "https://github.com/Esegovic/esegovic_coords/releases/download/lua/esegovic_coords.zip",
    image: "/esegovic.png",
    author: "Esegovic",
  },
  {
    name: "Very simple /car command",
    description: "This is just a simple resource which you can use to spawn any car in front of you.",
    link: "https://forum-cfx-re.akamaized.net/original/3X/3/9/394edb23c58fc64e23411306a40e63788a3a587b.zip",
    author: "Vespura",
  },
  
  // Ajoutez d'autres outils ici
];

const UsefulTools = () => {
  return (
    <ContentLayout title="Useful Tools">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <ToolCard key={index} tool={tool} />
        ))}
      </div>
    </ContentLayout>
  );
};

export default UsefulTools;
