import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  status: "safe" | "warning" | "danger";
  description?: string;
}

export const StatusCard = ({ title, value, icon: Icon, status, description }: StatusCardProps) => {
  const statusColors = {
    safe: "text-success",
    warning: "text-warning",
    danger: "text-destructive",
  };

  const statusBg = {
    safe: "bg-success/10",
    warning: "bg-warning/10",
    danger: "bg-destructive/10",
  };

  return (
    <Card className="p-6 bg-card shadow-card border-border transition-all hover:shadow-glow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className={cn("text-2xl font-bold mb-2", statusColors[status])}>{value}</p>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
        <div className={cn("p-3 rounded-lg", statusBg[status])}>
          <Icon className={cn("w-6 h-6", statusColors[status])} />
        </div>
      </div>
    </Card>
  );
};
