# Skill: Add Questions to Question Bank

## Usage
/add-questions [domain] [count] [difficulty]

Examples:
  /add-questions pattern 5 4
  /add-questions verbal 10
  /add-questions numerical 3 5
  /add-questions spatial

## Process
1. Read existing questions from `server/data/questions.json`
2. Find the highest existing ID for the target domain (e.g., `pat_023`)
3. Generate `count` new questions at the specified difficulty (or spread across 1–5 if not specified)
4. Follow the question schema exactly:
   ```json
   {
     "id": "pat_024",
     "type": "multiple-choice",
     "domain": "pattern",
     "difficulty": 4,
     "prompt": "...",
     "options": { "A": "...", "B": "...", "C": "...", "D": "..." },
     "correctAnswer": "B",
     "svgData": null
   }
   ```
5. For pattern and spatial questions: include `svgData` as an inline SVG string when a visual is essential
6. Verify each question has exactly one unambiguously correct answer
7. Append new questions to the JSON array and write back to the file
8. Report: how many added, new total count per domain

## Quality Rules
- Each wrong option must be plausible (no obvious distractors)
- Difficulty 1: straightforward, anyone with basic reasoning solves in < 30s
- Difficulty 3: requires active thought, ~50% of adults solve correctly
- Difficulty 5: requires strong reasoning, ~10–15% solve correctly
- No trick questions — the correct answer must be definitively and unambiguously correct
- Options must be exhaustive enough that one is clearly best
- For numerical: include multi-step problems at difficulty 4–5

## Domain Guidelines
- **pattern**: Series completion, matrix rules, rotation/transformation rules
- **verbal**: Analogies, syllogisms, odd-one-out, vocabulary-based reasoning
- **numerical**: Sequences, word problems, combinatorics, arithmetic/algebra
- **spatial**: 3D folding, rotation, cross-sections, cube painting problems

## SVG Guidelines for Visual Questions
```
viewBox="0 0 300 300"
Cell positions in a 3×3 grid (90×90px each, 5px gap):
  Col 1: x=5,  Col 2: x=105, Col 3: x=205
  Row 1: y=5,  Row 2: y=105, Row 3: y=205
Shapes: <rect>, <circle>, <polygon points="..."> for triangles
Question mark cell: <text x="250" y="260" font-size="60" fill="#9ca3af">?</text>
```
