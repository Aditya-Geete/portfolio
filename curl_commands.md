# API Test Commands (curl)

Assumes the backend is running at `http://localhost:5000`. Adjust the port
if you changed `PORT` in `.env`.

## B1 — Health check

```bash
curl -i http://localhost:5001/
```
Expected: `200`, `{ "status": "ok" }`

## B2 — Get all projects

```bash
curl -i http://localhost:5000/api/projects
```
Expected: `200`, JSON array of 3 project objects.

## B3 — Get a single project

```bash
# Success case
curl -i http://localhost:5000/api/projects/xct-analyser

# Failure case: non-existent id
curl -i http://localhost:5000/api/projects/does-not-exist
```
Expected: `200` with the project / `404` with `{ "error": "Project not found" }`.

## B4 — Submit a contact form entry

```bash
# Success case
curl -i -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","message":"Hi there!"}'

# Failure case: missing field
curl -i -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"","email":"jane@example.com","message":"Hi there!"}'

# Failure case: invalid email
curl -i -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"not-an-email","message":"Hi there!"}'
```
Expected: `201` with confirmation payload / `400` with a field-specific error.

## B5 — List all contact submissions

```bash
curl -i http://localhost:5000/api/contact
```
Expected: `200`, JSON array including any submissions made above.

## B6 — 404 and error handling

```bash
# Undefined route
curl -i http://localhost:5000/api/doesnotexist

# Malformed JSON body (triggers the global error handler)
curl -i -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane" ,,, broken json'
```
Expected: `404` with `{ "error": "Route /api/doesnotexist not found" }` /
`4xx`/`5xx` JSON error body (server keeps running — check with the health
check again afterward).

## B7 — CORS check

Run the frontend (`npm run dev` at repo root) with `VITE_API_BASE_URL`
pointing at this backend, open the Projects page in a browser, and confirm
no CORS errors appear in the devtools console. This isn't curl-testable
directly since curl doesn't enforce CORS, but you can confirm the header
is present:

```bash
curl -i -H "Origin: http://localhost:5173" http://localhost:5000/api/projects
```
Expected: response includes `Access-Control-Allow-Origin: http://localhost:5173`.
