# IQ Test Application

## Overview
Adaptive web-based IQ test using Computer Adaptive Testing (CAT) across four cognitive domains.
Produces a normed IQ score (mean 100, SD 15), subscores, percentile, and written narrative analysis.
Stateless — no database. All scoring computed server-side on demand.

## Quick Start

```bash
# From project root — starts both client and server
npm install
npm run dev

# Or individually:
cd server && npm install && npm run dev    # Express on port 3001
cd client && npm install && npm run dev    # Vite on port 5173
```

Open http://localhost:5173

## Architecture

```
client/   React 18 + Vite + Tailwind CSS + Recharts + React Router v6
server/   Node.js + Express (stateless)
```

**Communication flow:**
1. `GET /api/questions` — client fetches full question bank (no correct answers)
2. CAT runs entirely on the client (`useTestEngine.js`) — no per-question API calls
3. `POST /api/score` — client sends all answers at end; server validates, scores, returns results

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/questions` | Returns question bank (correctAnswer stripped) |
| POST | `/api/score` | Body: `{answers:[{questionId,selectedOption}]}` → full score object |

### Score Response Shape
```json
{
  "composite": { "iq": 118, "percentile": 88, "band": "High Average" },
  "domains": {
    "pattern":   { "iq": 122, "rawAccuracy": 0.74, "questionsAnswered": 10 },
    "verbal":    { "iq": 115, "rawAccuracy": 0.68, "questionsAnswered": 10 },
    "numerical": { "iq": 120, "rawAccuracy": 0.71, "questionsAnswered": 10 },
    "spatial":   { "iq": 112, "rawAccuracy": 0.63, "questionsAnswered": 10 }
  },
  "narrative": {
    "overall": "...", "strengths": "...", "areas": "...", "profile": "..."
  },
  "meta": { "totalQuestions": 40, "totalCorrect": 28, "testDate": "..." }
}
```

## Scoring Algorithm (summary)
1. Per domain: `weight(q) = difficulty^1.4`, `raw = Σ(correct*weight) / Σ(weight) * 100`
2. Difficulty correction: `adjusted = raw * (1 + (avg_difficulty - 3) * 0.08)`
3. IQ: `domain_iq = clamp(100 + (adjusted-50)/15*15, 40, 160)`
4. Composite: weighted mean — pattern×1.2, numerical×1.1, verbal×1.0, spatial×0.9
5. Percentile: normal CDF via erf approximation

See `server/services/scoringEngine.js` for implementation.

## Adaptive Algorithm (CAT)
- Start at difficulty 3 per domain
- 2 consecutive correct → difficulty +1 (max 5)
- 1 wrong → difficulty -1 (min 1)
- 10 questions per domain, interleaved round-robin
- Question selection: random from matching (domain, difficulty) not yet seen

## Question Schema
```json
{
  "id": "pat_001",
  "type": "multiple-choice",
  "domain": "pattern",
  "difficulty": 2,
  "prompt": "...",
  "options": { "A": "...", "B": "...", "C": "...", "D": "..." },
  "correctAnswer": "C",
  "svgData": "<svg>...</svg>"
}
```
- `svgData`: inline SVG string, used for pattern and spatial questions. `null` otherwise.
- `correctAnswer` is never sent to the client

## Domains
| ID | Label | ID Prefix | Weight |
|----|-------|-----------|--------|
| `pattern` | Pattern Recognition | `pat_` | 1.2 |
| `verbal` | Verbal Reasoning | `verb_` | 1.0 |
| `numerical` | Numerical Reasoning | `num_` | 1.1 |
| `spatial` | Spatial Reasoning | `spat_` | 0.9 |

## IQ Bands
| Range | Label |
|-------|-------|
| 40–69 | Extremely Below Average |
| 70–79 | Borderline |
| 80–89 | Low Average |
| 90–109 | Average |
| 110–119 | High Average |
| 120–129 | Superior |
| 130–144 | Very Superior |
| 145–160 | Exceptionally Superior |

## Conventions
- No correct answers sent to client (stripped in `server/routes/questions.js`)
- All scoring is pure functions, no side effects (`scoringEngine.js`, `iqMath.js`)
- Tailwind utility classes only — no separate CSS files except `index.css` for base styles
- Question IDs: `{prefix}_{3-digit-number}` e.g. `pat_001`, `verb_042`

## Adding Questions
Use `/add-questions` skill or manually edit `server/data/questions.json`.
Minimum 2 questions per difficulty level per domain (10 per domain total for CAT to work well).
