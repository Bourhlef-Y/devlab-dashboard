import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ActivityItemProps {
  activity: {
    id: string;
    type: 'weapon' | 'vehicle' | 'ped' | 'script' | 'feature' | 'update' | 'improvement';
    name: string;
    date: string;
    description?: string;
  };
}

const typeColors = {
  feature: "bg-green-500",
  update: "bg-blue-500",
  improvement: "bg-purple-500",
  weapon: "bg-red-500",
  vehicle: "bg-orange-500",
  ped: "bg-yellow-500",
  script: "bg-cyan-500"
};

export function ActivityItem({ activity }: ActivityItemProps) {
  return (
    <div className="flex items-start space-x-4 p-4 rounded-lg bg-card">
      <Badge 
        className={cn(
          "uppercase",
          typeColors[activity.type]
        )}
      >
        {activity.type}
      </Badge>
      <div className="flex-1 space-y-1">
        <p className="font-medium">{activity.name}</p>
        {activity.description && (
          <p className="text-sm text-muted-foreground">{activity.description}</p>
        )}
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(activity.date), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
} 