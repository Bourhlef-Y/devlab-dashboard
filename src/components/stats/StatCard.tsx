// components/stats/StatCard.tsx
import { Badge } from "@/components/ui/badge";

interface StatCardProps {
  title: string;
  count: number;
  badge?: string; // Ensure the badge prop is optional
}

const StatCard: React.FC<StatCardProps> = ({ title, count, badge }) => {
  return (
    <div className="p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-md relative">
      <div className="absolute top-2 right-2">
        {badge && <Badge variant="outline">{badge}</Badge>}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  );
};

export default StatCard;
