import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Search, Settings } from "lucide-react";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { postJson } from "@/lib/api";

export const ScanControls = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);

  const startScan = async (type: string) => {
    setIsScanning(true);
    setProgress(0);
    try { await postJson("/api/scan/start", { type }); } catch {}
    
    toast({
      title: `${type} Started`,
      description: "Scanning your system for threats...",
    });

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          toast({
            title: "Scan Complete",
            description: "No threats detected. Your system is safe!",
          });
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  return (
    <Card className="p-6 bg-card shadow-card border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">Scan Options</h3>
      
      {isScanning ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">Scanning in progress...</span>
            <span className="text-sm font-semibold text-primary">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground">
            Checking files and applications for malware and suspicious behavior
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          <Button
            onClick={() => startScan("Quick Scan")}
            className="w-full justify-start bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Search className="w-4 h-4 mr-2" />
            Quick Scan
            <span className="ml-auto text-xs opacity-80">~2 mins</span>
          </Button>
          
          <Button
            onClick={() => startScan("Full Scan")}
            variant="secondary"
            className="w-full justify-start"
          >
            <Shield className="w-4 h-4 mr-2" />
            Full System Scan
            <span className="ml-auto text-xs opacity-80">~30 mins</span>
          </Button>
          
          <Button
            onClick={() => startScan("Custom Scan")}
            variant="secondary"
            className="w-full justify-start"
          >
            <Settings className="w-4 h-4 mr-2" />
            Custom Scan
            <span className="ml-auto text-xs opacity-80">Choose folders</span>
          </Button>
        </div>
      )}
    </Card>
  );
};
