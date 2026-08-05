# 🚀 PulseDesk AI — Production Deployment Guide

This document provides step-by-step instructions to deploy **PulseDesk AI** to modern cloud platforms (GitHub Pages, Vercel, Netlify, Cloudflare Pages, Nginx, Docker) and local hosting environments.

---

## 📋 Table of Contents
1. [Prerequisites](#-prerequisites)
2. [Option 1: Deploy to GitHub Pages (Recommended Free Hosting)](#option-1-deploy-to-github-pages-recommended)
3. [Option 2: Deploy to Vercel (Instant CDN)](#option-2-deploy-to-vercel)
4. [Option 3: Deploy to Netlify](#option-3-deploy-to-netlify)
5. [Option 4: Deploy with Docker & Nginx (Enterprise Cloud)](#option-4-deploy-with-docker--nginx)
6. [Option 5: Local Hosting (PowerShell / Python)](#option-5-local-hosting)

---

## 🛠️ Prerequisites

- **Source Repository**: `https://github.com/maheshchowdary640-creator/Pulse-ai`
- **Tech Stack Requirements**: PulseDesk AI is built with zero external build dependencies (Vanilla HTML5, Modern ES JavaScript, Glassmorphic CSS3). No `npm build` step is required.

---

## Option 1: Deploy to GitHub Pages (Recommended)

GitHub Pages allows you to host PulseDesk AI directly from your GitHub repository for free.

### Step 1: Open GitHub Repository Settings
1. Go to your repository: [https://github.com/maheshchowdary640-creator/Pulse-ai](https://github.com/maheshchowdary640-creator/Pulse-ai)
2. Click on the **Settings** tab.

### Step 2: Enable GitHub Pages
1. On the left sidebar, click **Pages** under the *Code and automation* section.
2. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` branch and `/ (root)` folder.
3. Click **Save**.

### Step 3: Access Live Site
Within 1-2 minutes, GitHub will build and publish your site at:
`https://maheshchowdary640-creator.github.io/Pulse-ai/`

---

## Option 2: Deploy to Vercel

Vercel provides automated deployments with global edge CDN distribution.

### Option A: Import via Vercel Dashboard
1. Log in to [Vercel](https://vercel.com).
2. Click **Add New** > **Project**.
3. Import the GitHub repository `maheshchowdary640-creator/Pulse-ai`.
4. Keep framework preset as **Other** (Static HTML).
5. Click **Deploy**.

### Option B: Deploy via Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

---

## Option 3: Deploy to Netlify

### Option A: Netlify Git Import
1. Log in to [Netlify](https://netlify.com).
2. Click **Add new site** > **Import an existing project**.
3. Select **GitHub** and authorize `maheshchowdary640-creator/Pulse-ai`.
4. Leave **Build command** empty and **Publish directory** as `.` (root).
5. Click **Deploy Pulse-ai**.

---

## Option 4: Deploy with Docker & Nginx

For production deployments on AWS EC2, Google Cloud, Azure, or DigitalOcean:

### 1. Create `Dockerfile` in root directory:
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 2. Build & Run Docker Container:
```bash
docker build -t pulsedesk-ai .
docker run -d -p 80:80 --name pulsedesk pulsedesk-ai
```
Access the application on `http://<your-server-ip>`.

---

## Option 5: Local Hosting

### PowerShell (Windows Native)
```powershell
powershell -ExecutionPolicy Bypass -File server.ps1
```
Access at: `http://localhost:8000`

### Python Server
```bash
python start_server.py
```
Access at: `http://localhost:8000`

---

## ⚡ Environment & Health Check Verification

After deploying, verify system operations:
1. Open the deployed application URL.
2. Navigate to **Admin & Test Suite**.
3. Click **⚙️ Run System Diagnostics**.
4. Confirm **8/8 Diagnostic Tests Pass** (REST API, State Store, AI Sentiment Scoring, Vector RAG Search).

© 2026 PulseDesk AI. All rights reserved.
