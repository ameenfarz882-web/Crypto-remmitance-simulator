# Crypto → AED Remittance Simulator

A full-stack TypeScript application that simulates converting USDT/USDC to AED using the Binance Public API.

- Frontend: React + Vite + Tailwind CSS (TypeScript)
- Backend: Node.js + Express (TypeScript)

## Folder Structure

```
frontend/   # React app (Vite + Tailwind)
backend/    # Express API (TypeScript)
```

## Prerequisites

- Node.js 18+
- npm 9+

## Setup

Open two terminals, one for the backend and one for the frontend.

### Backend

```
cd backend
npm install
npm run dev
```

- Starts on http://localhost:4000
- Endpoint: `POST /convert`
- Request body:

```json
{
  "amount": 100,
  "currency": "USDT",
  "country": "United Arab Emirates",
  "purpose": "Govt Payment"
}
```

- Response body:

```json
{
  "amountAED": 367.45,
  "rate": 3.6745,
  "timestamp": "2025-01-01T00:00:00.000Z",
  "country": "United Arab Emirates",
  "purpose": "Govt Payment"
}
```

If Binance is unreachable, the API responds with:

```json
{ "error": "Unable to fetch live rate at the moment" }
```

### Frontend

```
cd frontend
npm install
npm run dev
```

- Starts on http://localhost:5173
- The app calls the backend at `http://localhost:4000` by default. To change it, create `.env` with:

```
VITE_API_BASE_URL=http://localhost:4000
```

## Notes

- Strict TypeScript is enabled everywhere (`"strict": true`). No `any` types are used.
- Axios is used with typed responses.
- Project is modular with services, routes, controllers, and utils.
- ESLint is configured for both frontend and backend.
- Tailwind CSS powers responsive UI with dark/light theme toggle.

## Production Builds

- Backend: `npm run build` inside `backend/` creates `dist/`.
- Frontend: `npm run build` inside `frontend/` creates `dist/`. Serve with any static file server.