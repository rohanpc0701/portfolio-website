## Full-stack deployment (Docker)

Run MongoDB and the FastAPI backend with Docker Compose, and serve the frontend with your preferred host (e.g., Vercel/Netlify). The frontend calls the backend via `REACT_APP_BACKEND_URL`.

### Prereqs
- Docker + Docker Compose
- Node 18+ and Yarn/NPM (for local frontend)

### 1) Start backend and MongoDB
```
docker compose up -d --build
```
- Backend: http://localhost:8000
- MongoDB: mongodb://localhost:27017

### 2) Seed sample data (optional)
Send POST to seed endpoint:
```
curl -X POST http://localhost:8000/api/admin/seed
```

### 3) Frontend local dev
```
cd frontend
export REACT_APP_BACKEND_URL=http://localhost:8000
export REACT_APP_GITHUB_USERNAME=RohanChavan0701
yarn install
yarn start
```

### 4) Import your GitHub projects
- In the Projects section, click “Add from GitHub”, select repos, and import.
- Imported projects persist in MongoDB.

### 5) Deploy
- Backend: push `backend/` to a container host (Railway, Fly.io, Render, ECS). Use the same Dockerfile.
- Set env: `MONGO_URL`, `DB_NAME`. For managed Mongo, paste the connection string.
- Frontend: deploy to Vercel/Netlify, set env `REACT_APP_BACKEND_URL` to your backend’s public URL, and `REACT_APP_GITHUB_USERNAME`.

## Using Supabase instead of MongoDB (optional)

You can switch projects storage to Supabase Postgres. The backend will use Supabase automatically if `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set.

1) Create a Supabase project and get:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY` (Server-side only; do not expose to frontend)

2) Create the table and policies:
```
psql < backend/supabase_schema.sql
```

3) Set backend env:
```
SUPABASE_URL=... 
SUPABASE_SERVICE_ROLE_KEY=...
```

4) Run backend. Endpoints:
- GET `/api/portfolio/projects` — reads from Supabase
- POST `/api/portfolio/projects/bulk` — inserts into Supabase

Note: Other collections (personal, education, experience, skills, contact) still use MongoDB unless you migrate them.

## Firebase integration (replace Supabase for Projects)

Use Firebase Firestore to store projects with zero server cost. The frontend will read/write directly to Firestore when Firebase env vars are present.

### 1) Create a Firebase project
- In the Firebase console → Create project
- Enable Firestore (Start in production mode)

### 2) Add a Web App and get config
- Firebase console → Project settings → Your apps → Web app
- Copy these values and set as frontend env vars:
```
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_FIREBASE_APP_ID=...
```

### 3) Firestore collection
- Create a collection named `projects`
- Each document fields (camelCase):
  - title: string (required)
  - description: string (required)
  - long_description: string (required)
  - tech: array<string>
  - category: string
  - featured: boolean
  - github: string
  - demo: string (nullable)
  - image: string
  - status: 'completed' | 'in-progress'
  - highlights: array<string>
  - order: number

### 4) Security rules (public read, restricted writes)
Update Firestore rules (Console → Firestore Database → Rules):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{docId} {
      allow read: if true;
      // Restrict writes to authenticated user with specific UID (replace with your UID)
      allow write: if request.auth != null && request.auth.uid == "YOUR_ADMIN_UID";
    }
  }
}
```

### 5) Frontend usage
- If `REACT_APP_FIREBASE_PROJECT_ID` is set, the app will:
  - Read projects from Firestore for the Projects section
  - Use Firestore writes when you click “Add from GitHub” to import

### 6) Admin auth (optional)
- Add Firebase Authentication → Enable Google Sign-In
- In the import modal, you can keep it as is and run locally while signed in; or we can add an admin sign-in flow later if you want in-app gated writes.

### 7) Local run with Firebase
```
cd frontend
export REACT_APP_FIREBASE_API_KEY=...
export REACT_APP_FIREBASE_AUTH_DOMAIN=...
export REACT_APP_FIREBASE_PROJECT_ID=...
export REACT_APP_FIREBASE_APP_ID=...
export REACT_APP_BACKEND_URL=http://localhost:8000  # still used for other sections
npm start
```

Notes:
- Backend is still used for non-project sections unless you migrate them. We can move them to Firestore as a follow-up.

### API quickref
- GET `/api/portfolio/projects` — list projects
- POST `/api/portfolio/projects/bulk` — bulk add
- GET `/api/portfolio/complete` — entire portfolio
- POST `/api/contact` — submit message

### Notes
- CORS is open by default for dev. Lock it down in production if needed.