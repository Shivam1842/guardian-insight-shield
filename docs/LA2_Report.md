## LA2 Assignment Report – Advanced Operating Systems

### 1. Cover Page

- **Title**: Code a Real Antivirus (Windows OS)
- **Course**: Advanced Operating Systems – LA2
- **Student**: shivam kumar singh
- **San**:102834
- **Project Repository**: [`GitHub Link`](https://github.com/<your-username>/<your-repo>)

---

### 2. Evaluation Form (Rubrics)

| Criteria | Excellent (A) | Good (B) | Satisfactory (C) | Needs Improvement (D) | Weight |
|---|---|---|---|---|---|
| Problem Definition & Objectives | Clear, precise objectives; strong justification | Clear objectives; good justification | Objectives present; limited justification | Unclear objectives | 10% |
| Architecture & Design | Robust, modular, well-documented diagrams | Sound design with minor gaps | Adequate design; some coupling | Weak or missing architecture | 20% |
| Implementation Depth | Real data integration, modular code, platform features | Mostly real data; minor mocks | Partially functional; several mocks | Largely static; minimal functionality | 25% |
| Experimentation & Results | Meaningful metrics and validations | Some metrics and validations | Limited measurements | No measurements | 15% |
| Documentation & Clarity | Comprehensive, well-structured, clear screenshots | Adequate documentation; clear sections | Basic documentation | Poor documegntation | 15% |
| Presentation & Viva | Confident; handles questions; demo resilient | Good; answers most questions | Adequate; minor gaps | Struggles with demo and questions | 15% |

> Instructor may adapt rubric weights to match local policy.

---

### 3. Project Details

#### 3.1 Title

Code a Real Antivirus for Windows OS

#### 3.2 Abstract

This project implements a Windows-focused antivirus-style system monitoring dashboard that uses real system telemetry to simulate antivirus functionality. A Node.js Express backend collects CPU, memory, disk, process, and network metrics using the `systeminformation` library. A React + Vite + TypeScript frontend visualizes real-time activity, recent “threat-like” events based on process resource usage, and scan controls that record last-scan metadata. While it does not include a full malware signature engine, the system demonstrates core OS integration, telemetry collection, and operational UI patterns of modern antivirus software. The design is modular, enabling future integration with Windows Defender APIs or a signature-based scanning engine.

#### 3.3 Architecture of the Program

- **Frontend (React + Vite + TS)**
  - `src/pages/Index.tsx`: orchestrates dashboard and queries live status
  - `src/components/MonitoringVisual.tsx`: real-time CPU activity graph (polls backend)
  - `src/components/ThreatLog.tsx`: shows recent process-based events
  - `src/components/ScanControls.tsx`: triggers scans; updates last scan time
  - `@tanstack/react-query`: polling, caching, and request lifecycle

- **Backend (Node.js + Express)**
  - `server/index.js`
    - `GET /api/status`: OS, CPU, memory, disk, last-scan, health
    - `GET /api/activity`: CPU load + network I/O snapshot
    - `GET /api/logs`: synthesized events from top CPU processes
    - `POST /api/scan/start`: records last scan metadata
  - `systeminformation`: cross-platform system metrics (Windows supported)
  - `cors`: enable local dev from Vite client

- **Data Flow**
  - Frontend polls backend every 1–5s depending on view
  - Backend queries OS metrics and returns normalized JSON
  - UI renders live health, activity bars, and event feed

- **Extensibility**
  - Replace synthesized events with Defender API events or signature engine
  - Add file system watchers and quarantine workflows
  - Persist logs to a database for historical reporting

High-level Diagram:

```
React UI (Vite, TS, Query)  <—— HTTP JSON ——>  Express API (Node)  —— OS Metrics (systeminformation)
```

#### 3.4 Designs (Screenshots)

Add the following screenshots to `docs/images/` and reference them here:

1. Dashboard Overview – `docs/images/dashboard.png`
2. Real-time Monitoring – `docs/images/monitoring.png`
3. Recent Activity (Logs) – `docs/images/logs.png`
4. Scan Controls – `docs/images/scan.png`

Example embeds (replace with actual images in your repo):

![Dashboard](../docs/images/dashboard.png)

![Monitoring](../docs/images/monitoring.png)

![Logs](../docs/images/logs.png)

![Scan](../docs/images/scan.png)

#### 3.5 Proof of GitHub Project Uploaded

- Repository: [`https://github.com/<your-username>/<your-repo>`](https://github.com/<your-username>/<your-repo>)
- Commit Screenshot: add `docs/images/github-proof.png` capturing the repo page with commits

![GitHub Proof](../docs/images/github-proof.png)

Suggested steps to publish (run from project root):

```bash
git init
git add .
git commit -m "LA2: Real Antivirus system monitoring (Windows)"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

#### 3.6 Conclusion and References

**Conclusion**

We built a Windows-targeted antivirus-style monitoring system that uses real OS telemetry to drive a responsive dashboard. The system’s separation of concerns (UI, API, OS metrics) makes it a strong foundation for integrating true malware scanning, quarantine, and remediation pipelines. The architecture and code are production-leaning and easily extensible for further research and coursework demos.

**References**

1. `systeminformation` (Node OS metrics): `https://systeminformation.io/`
2. React + Vite + TypeScript: `https://vitejs.dev/`
3. Express: `https://expressjs.com/`
4. @tanstack/react-query: `https://tanstack.com/query/latest`
5. Windows Defender docs (future extension): `https://learn.microsoft.com/windows/security/threat-protection/microsoft-defender-antivirus/`

#### 3.7 Algorithms Used (Current Prototype)

- **Heuristic Threat Classification (Processes)**
  - Input: per-process CPU (`pcpu`) and memory (`pmem`) from `systeminformation`.
  - Rule-based thresholds: `pcpu > 50% → threat`, `5% < pcpu ≤ 50% → info`, otherwise `safe`.
  - Purpose: synthesize “recent activity” entries without a signature engine.

- **System Health Evaluation**
  - Criteria: `CPU load < 80%` AND `Memory usage < 85%` AND `Disk usage < 95%` ⇒ "Excellent"; else "Degraded".
  - Computed from `currentLoad`, `mem` (used/total), and `fsSize` (used/total).

- **Real-Time Activity Visualization**
  - Sampling: poll `/api/activity` every 1s; take `currentload` as a normalized 0–100 value.
  - Sliding window: keep the last 20 points to render the bar chart.

- **Scan State Recording**
  - `POST /api/scan/start` stores `lastScanAt` and `lastScanType`; used to update dashboard state.
  - No malware signature scanning algorithm is included in this prototype.

Notes on Future Algorithms: The architecture allows plugging in signature-based scanning (e.g., YARA rules), ML-based anomaly detection on process/file behavior, and integration with Windows Defender event streams for verified detections.


