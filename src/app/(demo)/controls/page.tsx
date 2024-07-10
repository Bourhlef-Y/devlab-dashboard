// pages/controls.tsx
"use client";

import ControlsTable from "@/components/controls/ControlsTable";
import { ContentLayout } from "@/components/admin-panel/content-layout";

const Controls = () => {
  return (
    <ContentLayout title="Controls">
      <div >
        <ControlsTable />
      </div>
    </ContentLayout>
  );
};


export default Controls;