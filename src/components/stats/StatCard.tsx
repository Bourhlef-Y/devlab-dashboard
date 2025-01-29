// components/stats/StatCard.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => (
  <div className="flex items-center gap-4 rounded-lg border p-3">
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  </div>
);

export default StatCard;
