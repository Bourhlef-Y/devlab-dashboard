import { Navbar } from "@/components/layout/navbar";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar title={title} />
      <div className="flex-1 container pt-8 pb-8 px-4 sm:px-8 max-w-screen-2xl">
        {children}
      </div>
    </div>
  );
}
