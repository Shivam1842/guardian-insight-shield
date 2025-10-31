/* eslint-disable */
const express = require("express");
const si = require("systeminformation");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5174; // separate from Vite (5173)

app.use(cors());
app.use(express.json());

let lastScanAt = null;
let lastScanType = null;

app.get("/api/status", async (_req, res) => {
  try {
    const [osInfo, mem, disk, load] = await Promise.all([
      si.osInfo(),
      si.mem(),
      si.fsSize(),
      si.currentLoad(),
    ]);

    const totalGb = mem.total / (1024 ** 3);
    const usedGb = (mem.total - mem.available) / (1024 ** 3);
    const memUsagePct = (usedGb / totalGb) * 100;

    const diskTotalGb = disk.reduce((a, d) => a + d.size, 0) / (1024 ** 3);
    const diskUsedGb = disk.reduce((a, d) => a + d.used, 0) / (1024 ** 3);
    const diskUsagePct = (diskUsedGb / diskTotalGb) * 100;

    const health = load.currentload < 80 && memUsagePct < 85 && diskUsagePct < 95 ? "Excellent" : "Degraded";

    res.json({
      os: `${osInfo.distro} ${osInfo.release}`,
      cpuLoad: load.currentload, // percentage
      memory: { totalGb, usedGb, memUsagePct },
      disk: { diskTotalGb, diskUsedGb, diskUsagePct },
      lastScanAt,
      lastScanType,
      health,
    });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.get("/api/activity", async (_req, res) => {
  try {
    const load = await si.currentLoad();
    const net = await si.networkStats();
    const totalRx = net.reduce((a, n) => a + n.rx_sec, 0);
    const totalTx = net.reduce((a, n) => a + n.tx_sec, 0);
    res.json({ cpuLoad: load.currentload, netRxPerSec: totalRx, netTxPerSec: totalTx });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.get("/api/logs", async (_req, res) => {
  try {
    const procs = await si.processes();
    const top = procs.list
      .sort((a, b) => b.pcpu - a.pcpu)
      .slice(0, 6)
      .map((p, idx) => ({
        id: `${p.pid}-${idx}`,
        type: p.pcpu > 50 ? "threat" : p.pcpu > 5 ? "info" : "safe",
        message: `Process ${p.name} (PID ${p.pid}) CPU ${p.pcpu.toFixed(1)}% MEM ${p.pmem.toFixed(1)}%`,
        time: new Date().toLocaleTimeString(),
      }));
    res.json(top);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.post("/api/scan/start", async (req, res) => {
  try {
    const { type = "Quick Scan" } = req.body || {};
    lastScanAt = new Date().toISOString();
    lastScanType = type;
    res.json({ ok: true, startedAt: lastScanAt, type });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`System metrics API listening on port ${PORT}`);
});


