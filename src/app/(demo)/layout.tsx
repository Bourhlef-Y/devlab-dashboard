import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";

// Define the DemoLayout component, which uses the AdminPanelLayout component
export default function DemoLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Return the AdminPanelLayout component with children passed as its content
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
