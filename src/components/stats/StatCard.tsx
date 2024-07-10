// components/stats/StatCard.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StatCardProps {
  title: string;
  count: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, count }) => {
  return (
    <Card className="relative w-full">
      <Badge variant="outline" className="absolute top-2 right-2 dark:bg-zinc-50 dark:text-zinc-800 bg-zinc-900 text-zinc-50 " >Up to Date!</Badge>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{count}</p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
