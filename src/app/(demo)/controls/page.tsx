// pages/controls.tsx
"use client";

import ControlsTable from "@/components/controls/ControlsTable"; // Import the ControlsTable component
import { ContentLayout } from "@/components/admin-panel/content-layout"; // Import the ContentLayout component

// Define the Controls component
const Controls = () => {
  return (
    <ContentLayout title="Controls"> {/* Use ContentLayout with title "Controls" */}
      <div>
        <ControlsTable /> {/* Render the ControlsTable component */}
      </div>
    </ContentLayout>
  );
};

export default Controls; // Export the Controls component as default
