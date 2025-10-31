import { Card } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getJson } from "@/lib/api";

interface ThreatLogEntry {
  id: string;
  type: "safe" | "info" | "threat";
  message: string;
  time: string;
}

export const ThreatLog = () => {
  const [logs, setLogs] = useState<ThreatLogEntry[]>([]);

  useEffect(() => {
    let isMounted = true;
    const fetchLogs = async () => {
      try {
        const data: ThreatLogEntry[] = await getJson("/api/logs");
        if (isMounted) setLogs(data);
      } catch (_e) {
        // ignore transient errors
      }
    };
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);
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
        {logs.map((log) => (
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
