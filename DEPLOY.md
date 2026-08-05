# 🚀 PulseDesk AI — Full-Stack Deployment Guide
## 🎨 Frontend on Vercel + ⚙️ Backend on Render

This guide walks you through deploying **PulseDesk AI** using industry best-practice decoupled cloud architecture:
- **Frontend**: Hosted on **Vercel** (Global Edge CDN, automatic HTTPS, fast static asset delivery).
- **Backend Service**: Hosted on **Render.com** (Python Web Service running on dynamic `$PORT` with CORS enabled).

---

## 🏗️ Architecture Blueprint

```
 ┌─────────────────────────────────────────┐          ┌─────────────────────────────────────────┐
 │            FRONTEND (Vercel)            │          │           BACKEND (Render.com)          │
 │  https://pulse-ai.vercel.app            │ ───────► │  https://pulsedesk-backend.onrender.com │
 │  HTML5 + Glassmorphic CSS + ES Modules  │ REST API │  Python Web Server + Vector RAG Engine  │
 └─────────────────────────────────────────┘          └─────────────────────────────────────────┘
```

---

## ⚙️ STEP 1: Deploy Backend to Render.com

First, deploy the Python web service to Render so you have your live backend API URL.

### Option A: Via Render Dashboard (Recommended)
1. Go to [https://dashboard.render.com](https://dashboard.render.com) and log in with your GitHub account.
2. Click **New +** > **Web Service**.
3. Connect your GitHub repository: `maheshchowdary640-creator/Pulse-ai`.
4. Configure service settings:
   - **Name**: `pulsedesk-backend`
   - **Region**: Choose your preferred region (e.g., Oregon, Frankfurt, Singapore)
   - **Branch**: `main`
   - **Runtime**: `Python 3`
   - **Build Command**: *(Leave empty)*
   - **Start Command**: `python start_server.py`
   - **Instance Type**: `Free`
5. Click **Create Web Service**.
6. Once deployed, copy your backend URL (e.g. `https://pulsedesk-backend.onrender.com`).

### Option B: Via Render Blueprint (1-Click YAML)
1. Go to [https://dashboard.render.com/blueprints](https://dashboard.render.com/blueprints).
2. Connect `maheshchowdary640-creator/Pulse-ai`.
3. Render reads `render.yaml` automatically. Click **Apply**.

---

## 🎨 STEP 2: Deploy Frontend to Vercel

Next, deploy the static frontend application to Vercel's global CDN.

### Option A: Via Vercel Web Dashboard (Recommended)
1. Go to [https://vercel.com/dashboard](https://vercel.com/dashboard) and log in with GitHub.
2. Click **Add New...** > **Project**.
3. Select **Import** next to `maheshchowdary640-creator/Pulse-ai`.
4. Project Configuration:
   - **Framework Preset**: `Other`
   - **Root Directory**: `./`
   - **Build Command**: *(Leave empty)*
   - **Output Directory**: `./`
5. Under **Environment Variables**, add:
   - **Key**: `API_BASE_URL`
   - **Value**: `https://pulsedesk-backend.onrender.com` (Your Render URL from Step 1)
6. Click **Deploy**.
7. Vercel will build and assign your production frontend URL (e.g. `https://pulse-ai.vercel.app`).

### Option B: Via Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Login & Deploy
vercel login
vercel --prod
```

---

## 🔌 STEP 3: Verify Frontend ↔ Backend Connection

1. Open your live Vercel Frontend URL (`https://pulse-ai.vercel.app`).
2. Navigate to **Admin & Test Suite**.
3. Click **⚙️ Run System Diagnostics**.
4. Confirm **8/8 Diagnostic Tests Pass** with live latency metrics returned from Render backend!

---

## 📋 Alternative Deployment Options

### GitHub Pages (Static Single-Host)
1. Go to GitHub repo **Settings** > **Pages**.
2. Select **Source**: `Deploy from a branch` -> `main` branch -> `/ (root)` folder.
3. Live URL: `https://maheshchowdary640-creator.github.io/Pulse-ai/`

### Docker Production Container
```bash
docker build -t pulsedesk-ai .
docker run -d -p 80:80 --name pulsedesk pulsedesk-ai
```

### Local Host Development
```bash
# PowerShell Server
powershell -ExecutionPolicy Bypass -File server.ps1

# Python Server
python start_server.py
```
Access locally at: `http://localhost:8000`

---

© 2026 PulseDesk AI. All rights reserved.
