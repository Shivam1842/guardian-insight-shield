import { Card } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThreatLogEntry {
  id: string;
  type: "safe" | "info" | "threat";
  message: string;
  time: string;
}

const mockLogs: ThreatLogEntry[] = [
  {
    id: "1",
    type: "safe",
    message: "System scan completed - No threats found",
    time: "2 minutes ago",
  },
  {
    id: "2",
    type: "info",
    message: "Virus definitions updated successfully",
    time: "1 hour ago",
  },
  {
    id: "3",
    type: "safe",
    message: "Real-time protection is active",
    time: "3 hours ago",
  },
  {
    id: "4",
    type: "info",
    message: "Quick scan scheduled for tonight",
    time: "5 hours ago",
  },
];

export const ThreatLog = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case "safe":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "threat":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default:
        return <Info className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <Card className="p-6 bg-card shadow-card border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
      
      <div className="space-y-3">
        {mockLogs.map((log) => (
          <div
            key={log.id}
            className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors"
          >
            <div className="mt-0.5">{getIcon(log.type)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">{log.message}</p>
              <p className="text-xs text-muted-foreground mt-1">{log.time}</p>
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-xs text-muted-foreground mt-4 text-center">
        All activity is logged and monitored for your protection
      </p>
    </Card>
  );
};
