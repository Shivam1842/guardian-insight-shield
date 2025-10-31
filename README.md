

## SecureGuard Pro – Antivirus-Style System Monitor (Windows)

This app provides a real-time dashboard for Windows system metrics with an antivirus-style UX.

### Monorepo layout

- `server/`: Express API using `systeminformation`
- `src/`: React + Vite + TypeScript client
- `docs/LA2_Report.md`: LA2 assignment report

### Run locally

```bash
npm install
npm run dev:all
```

Set `VITE_API_BASE` to point the client at a different API base if needed.

### Technologies used

- Vite, TypeScript, React, Tailwind CSS, shadcn-ui
- Express, systeminformation, @tanstack/react-query

### Publish to GitHub

```bash
git init
git add .
git commit -m "LA2: Real Antivirus system monitoring (Windows)"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

### Report

See the full report here: `docs/LA2_Report.md`


