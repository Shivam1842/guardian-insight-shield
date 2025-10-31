import { Shield, ShieldCheck, Clock, HardDrive } from "lucide-react";
import { StatusCard } from "@/components/StatusCard";
import { MonitoringVisual } from "@/components/MonitoringVisual";
import { ScanControls } from "@/components/ScanControls";
import { ThreatLog } from "@/components/ThreatLog";
import { useQuery } from "@tanstack/react-query";
import { getJson } from "@/lib/api";

const Index = () => {
  const { data: status } = useQuery({
    queryKey: ["status"],
    queryFn: () => getJson("/api/status"),
    refetchInterval: 5000,
  });

  const lastScanText = status?.lastScanAt
    ? new Date(status.lastScanAt).toLocaleTimeString()
    : "No scans yet";

  const threatsValue = 0; // no backend threats count yet
  const healthLabel = status?.health || "Unknown";

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gradient-primary rounded-xl shadow-glow">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">SecureGuard Pro</h1>
            <p className="text-muted-foreground">Your system is protected and running smoothly</p>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatusCard
            title="Protection Status"
            value={status ? "Protected" : "Initializing"}
            icon={ShieldCheck}
            status={status ? "safe" : "warning"}
            description={status ? `OS: ${status.os}` : "Fetching system info"}
          />
          <StatusCard
            title="Last Scan"
            value={lastScanText}
            icon={Clock}
            status={status?.lastScanAt ? "safe" : "warning"}
            description={status?.lastScanType ? `${status.lastScanType} completed` : "Run your first scan"}
          />
          <StatusCard
            title="Threats Found"
            value={`${threatsValue}`}
            icon={Shield}
            status={threatsValue === 0 ? "safe" : "danger"}
            description={threatsValue === 0 ? "No action needed" : "Review required"}
          />
          <StatusCard
            title="System Health"
            value={healthLabel}
            icon={HardDrive}
            status={healthLabel === "Excellent" ? "safe" : "warning"}
            description={status ? `CPU ${status.cpuLoad.toFixed(0)}% • MEM ${status.memory.memUsagePct.toFixed(0)}%` : "Loading"}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Monitoring */}
          <div className="lg:col-span-2 space-y-6">
            <MonitoringVisual />
            <ThreatLog />
          </div>

          {/* Right Column - Scan Controls */}
          <div className="space-y-6">
            <ScanControls />
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            SecureGuard Pro is actively monitoring your system 24/7 to keep you safe from threats
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
