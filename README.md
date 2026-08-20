# Alessandra

A personalized new tab dashboard extension for organizing your workflow.

## Features

- **Quick Links** — Pin frequently used sites with custom icons, organized by tabs
- **To-Do List** — Manage personal tasks with priority levels and due dates
- **Canvas Integration** — Automatically pulls assignments from Canvas LMS
- **Spotify Player** — Control Spotify playback without switching tabs (owner only)
- **Calendar** — View tasks and assignments in a monthly calendar view
- **Guest Mode** — Try the dashboard without an account (data stored in localStorage)

## Tech Stack

**Frontend:** React, TypeScript, TailwindCSS, shadcn/ui, React Query  
**Backend:** Node.js, Express, TypeScript, BetterAuth  
**Database:** MongoDB  
**APIs:** Spotify Web API, Canvas LMS API  

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB instance
- Spotify Developer account (for Spotify features)
- Canvas API token (for Canvas features)

### Installation

```bash
# Clone the repo
git clone https://github.com/alessaaandraaa/alessandra.git
cd alessandra

# Install frontend dependencies
cd web && npm install

# Install backend dependencies
cd ../api && npm install
```

### Environment Variables

**Frontend (`web/.env`):**
```
VITE_API_URL=your_backend_url
VITE_BETTER_AUTH_URL=your_backend_url
VITE_USER_ID=your_user_id
```

**Backend (`api/.env`):**
```
DATABASE_URL=your_mongodb_url
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=your_backend_url
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
CANVAS_URL=your_canvas_url
CANVAS_TOKEN=your_canvas_token
```

### Running Locally

```bash
# From root
npm run frontend   # starts frontend on localhost:5173
npm run backend    # starts backend on localhost:3000
```


## Notes

- Spotify features are restricted to the owner account only
- Canvas integration requires a personal Canvas API token
