# Energy Nexus Restart Guide

## Problem
- Backend server resets in-memory users on restart
- Frontend can't connect if backend is not running
- Need to follow specific steps to restart properly

## Quick Restart Steps (Hinglish)

### 1. Backend Start Karo (Port 5000 pe)
Open PowerShell in `energy-nexus/backend` folder and run:
```
$env:PORT=5000; $env:CORS_ORIGIN='http://localhost:3000,http://localhost:3001,http://localhost:5173'; npm run dev
```

### 2. Backend Check Karo
Browser mein jaake `http://localhost:5000/health` open karo.
Agar `{"status":"ok"}` dikhe to backend sahi chal raha hai.

### 3. Frontend Environment Set Karo
`energy-nexus/frontend/.env.local` file mein yeh line add karo:
```
VITE_API_BASE_URL=http://localhost:5000
```

### 4. Frontend Restart Karo
Frontend folder mein `npm run dev` run karo.

### 5. Login Credentials
Ab aap yeh dono accounts se login kar sakte ho:

**PowerPool Account:**
- Email: `PowerPool@energynexus.com`
- Password: `powerpool@login`
- Phone: `8840776158`

**Vivek Account:**
- Email: `vivek@example.com`
- Password: `hello@123`
- Phone: `8840776158`

**Phone se bhi login kar sakte ho:** Phone number + password use karo.

## Troubleshooting

### Agar Port 5000 Busy Hai
- Dusra port use karo: `$env:PORT=5001; npm run dev`
- Frontend mein bhi port change karo: `VITE_API_BASE_URL=http://localhost:5001`

### Agar CORS Error Aaye
- CORS_ORIGIN mein apna frontend URL add karo

### Agar Invalid Credentials Aaye
- Backend restart karo (users in-memory hain)

## Permanent Solution
Agar baar baar restart karna nahi chahte, to database setup karo taaki users persist ho jaye.
