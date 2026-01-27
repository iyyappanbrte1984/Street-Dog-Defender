
# Street Dog Defender - Full Stack Website

## Overview
Production-ready commercial website for Street Dog Defender, an autonomous wearable safety device. Developed by **THE RUBIES TEAM** (Model School Kadayampatti) and supported by **EDII-TN's SIDP**.

## Tech Stack
- **Frontend:** React 18, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB
- **Hosting:** Vercel (Frontend), Render (Backend)

## Local Setup
1. **Frontend:**
   ```bash
   npm install
   npm start
   ```
2. **Backend:**
   ```bash
   cd backend
   npm install
   # Set up .env with MONGODB_URI and PORT
   npm run dev
   ```

## Deployment Notes
- **Frontend (Vercel):** Connect GitHub repo, set build command `npm run build`, and output directory `dist`.
- **Backend (Render):** Create a Web Service, set build command `npm run build`, and start command `npm start`. Ensure `MONGODB_URI` and `CORS_ORIGIN` environment variables are set.

## Environment Variables (.env)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

## Security Measures
- `helmet` for HTTP headers security.
- `express-rate-limit` for DDoS/Spam protection on forms.
- `CORS` restricted to frontend domain.
- TypeScript for type-safe payloads.
