# Skill: Start Development Environment

## Usage
/dev-server

## Steps
1. Check if ports 3001 and 5173 are free
2. Start backend: `cd server && npm run dev` — wait for "IQ Test server running on http://localhost:3001"
3. Start frontend: `cd client && npm run dev` — wait for "Local: http://localhost:5173"
4. Verify connectivity: `curl http://localhost:3001/api/questions`
5. Report URLs:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - Health check: http://localhost:3001/health

## First Run
If `node_modules` directories are missing, install first:
```bash
npm install              # root (installs concurrently)
cd server && npm install
cd client && npm install
```

Or from root: `npm install && npm run dev`

## Troubleshooting
- **Port in use**: identify with `netstat -ano | findstr :3001` (Windows), kill the PID
- **Module not found**: run `npm install` in the affected directory
- **CORS error**: verify `server/index.js` cors origin includes `http://localhost:5173`
- **Questions not loading**: validate JSON with `node -e "require('./server/data/questions.json')" && echo OK`
- **Vite proxy not working**: check `client/vite.config.js` has `/api` → `http://localhost:3001`
