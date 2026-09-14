# Portfolio Website — Assignment 3 (Backend Integration)

This extends the Assignment 2 React portfolio with a Node.js backend.
The frontend's Projects and Contact pages now talk to a real API instead of
using static local data.





## VIDEO LINK
## https://drive.google.com/file/d/13Hi3d_CkA6-TLcbIpq3Qs18HwRcaVk5p/view?usp=share_link










## SETUP AND RUN

### 1. Backend

```bash
cd server
npm install
cp .env.example .env      # adjust PORT / ALLOWED_ORIGIN if needed
npm run dev                # or: npm start
```

The server starts on `http://localhost:5000` (or whatever `PORT` you set)
and prints a confirmation log line.

### 2. Frontend

```bash
cp frontend-updates/.env.example .env   # sets VITE_API_BASE_URL
npm install
npm run dev
```

The frontend starts on `http://localhost:5173` (Vite default) and now
fetches project data and submits the contact form to the backend above.

**Two commands to run everything:** `npm run dev` inside `/server`, and
`npm run dev` at the frontend root, in two terminals.

## Environment Variables

### `server/.env`
| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the Express server listens on | `5000` |
| `ALLOWED_ORIGIN` | Origin allowed by CORS (your frontend dev URL) | `http://localhost:5173` |
| `DATA_FILE` | Path to the JSON file storing contact submissions | `./data/contacts.json` |

### Frontend `.env`
| Variable | Description | Example |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL the frontend calls for the API | `http://localhost:5000` |

No secrets are committed; only `.env.example` files are tracked in git.

## Data Storage Choice

Contact submissions are persisted to a flat JSON file
(`server/data/contacts.json`), read and rewritten on every request. This
satisfies the assignment's "in-memory array or JSON file" allowance without
requiring a database. Project data is a static in-memory JS array
(`server/data/projects.js`) since it doesn't need to be mutated at runtime.











## API Endpoints

### `GET /`
Health check.
```json
// 200 OK
{ "status": "ok" }
```

### `GET /api/projects`
Returns all projects.
```json
// 200 OK
[
  {
    "id": "xct-analyser",
    "title": "XCT Data Analyser",
    "tag": "Machine Learning",
    "description": "...",
    "fullDetails": "...",
    "techStack": ["Python", "TensorFlow", "customTkinter"],
    "image": "/images/xct-analyser.png",
    "link": "https://github.com/Aditya-Geete/PorosityAnalysis"
  }
  // ...
]
```

### `GET /api/projects/:id`
Returns one project by id.
```json
// 200 OK
{ "id": "xct-analyser", "title": "XCT Data Analyser", ... }
```
```json
// 404 Not Found
{ "error": "Project not found" }
```

### `POST /api/contact`
Submits a contact form entry. Body: `{ "name", "email", "message" }`.
```json
// 201 Created
{
  "message": "Thank you! Your message has been received.",
  "submission": {
    "id": "1737000000000",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "message": "Hi there!",
    "submittedAt": "2026-09-14T10:00:00.000Z"
  }
}
```
```json
// 400 Bad Request (any missing/invalid field)
{ "error": "Please provide a valid email address." }
```

### `GET /api/contact`
Lists all stored submissions, for verification during evaluation.

> ⚠️ **This endpoint is intentionally open with no authentication.**
> It exists purely so graders/reviewers can confirm that `POST /api/contact`
> submissions were persisted. In a real deployment this route would need to
> be protected or removed.

```json
// 200 OK
[
  { "id": "...", "name": "...", "email": "...", "message": "...", "submittedAt": "..." }
]
```

### Undefined routes / server errors (B6)
```json
// 404 Not Found (any unmatched route)
{ "error": "Route /api/doesnotexist not found" }
```
```json
// 500 Internal Server Error (unexpected server error)
{ "error": "Internal server error" }
```










## CURL COMMANDS


# B1 — Health Check
curl -i http://localhost:5000/

# B2 — Get All Projects
curl -i http://localhost:5000/api/projects

# B3 — Get Single Project (Success & 404)
curl -i http://localhost:5000/api/projects/xct-analyser
curl -i http://localhost:5000/api/projects/does-not-exist

# B4 — Submit Contact Form (Success, Missing Field, Invalid Email)
curl -i -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","message":"Hi there!"}'

curl -i -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"","email":"jane@example.com","message":"Hi there!"}'

curl -i -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"not-an-email","message":"Hi there!"}'

# B5 — List All Contact Submissions
curl -i http://localhost:5000/api/contact

# B6 — 404 & Global Error Handling
curl -i http://localhost:5000/api/doesnotexist

curl -i -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane" ,,, broken json'}

# B7 — CORS Verification Header Check
curl -i -H "Origin: http://localhost:5173" http://localhost:5000/api/projects
