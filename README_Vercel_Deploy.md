# Energy Nexus - Vercel Deployment Guide

This guide explains how to deploy the Energy Nexus frontend React application on Vercel.

## Prerequisites

- Node.js and npm installed locally
- Vercel account (https://vercel.com/signup)
- Vercel CLI installed (optional but recommended)

## Steps to Deploy

### 1. Prepare the Project

Ensure your project is ready for production:

```bash
cd energy-nexus/frontend
npm install
npm run build
```

This will create a production build in the `dist` folder (default for Vite).

### 2. Create a Vercel Project

- Login to your Vercel account.
- Click on "New Project".
- Import your GitHub repository containing the Energy Nexus project.
- Select the `energy-nexus/frontend` directory as the root for the project.

### 3. Configure Build Settings

- Framework Preset: Select "Vite".
- Build Command: `npm run build`
- Output Directory: `dist`

### 4. Environment Variables

If your app requires environment variables, add them in the Vercel dashboard under Project Settings > Environment Variables.

### 5. Deploy

- Click "Deploy".
- Vercel will build and deploy your app.
- Once deployed, you will get a live URL to access your Energy Nexus frontend.

### 6. Continuous Deployment

- Every push to your GitHub repository will trigger a new deployment automatically.

## Local Development

To run the app locally:

```bash
cd energy-nexus/frontend
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Notes

- Backend API should be deployed separately and accessible by the frontend.
- Update API endpoints in frontend config if needed before deployment.
- Use Vercel environment variables to manage API URLs securely.

## Troubleshooting

- Check Vercel build logs for errors.
- Ensure all dependencies are installed.
- Verify correct build and output directory settings.

---

**Energy Nexus** - Smart Energy Trading Platform for Sustainable Communities
