import { Card } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { useEffect, useState } from "react";
import { getJson } from "@/lib/api";

export const MonitoringVisual = () => {
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [dataPoints, setDataPoints] = useState<number[]>([]);

  useEffect(() => {
    let isMounted = true;
    const interval = setInterval(async () => {
      try {
        const data = await getJson("/api/activity");
        if (!isMounted) return;
        setDataPoints((prev) => {
          const normalized = Math.max(0, Math.min(100, Number(data.cpuLoad) || 0));
          const updated = [...prev, normalized];
          return updated.slice(-20);
        });
      } catch (_e) {
        // keep last values on error
      }
    }, 1000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <Card className="p-6 bg-card shadow-card border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Real-Time Protection</h3>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isMonitoring ? 'bg-success animate-pulse-slow' : 'bg-muted'}`} />
          <span className="text-sm text-muted-foreground">
            {isMonitoring ? "Active" : "Inactive"}
          </span>
        </div>
      </div>
      
      <div className="relative h-40 bg-secondary/50 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-end justify-around px-2 pb-2">
          {dataPoints.map((point, index) => (
            <div
              key={index}
              className="w-3 bg-gradient-primary rounded-t transition-all duration-300"
              style={{ height: `${point}%` }}
            />
          ))}
        </div>
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary animate-pulse-slow" />
          <span className="text-sm text-foreground font-medium">System Activity</span>
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground mt-4">
        Constantly monitoring your system for suspicious activity and potential threats
      </p>
    </Card>
  );
};
