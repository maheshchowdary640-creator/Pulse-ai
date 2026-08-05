# 🚀 PulseDesk AI — Production Deployment Guide

This document provides step-by-step instructions to deploy **PulseDesk AI** to modern cloud platforms including **Render.com**, GitHub Pages, Vercel, Netlify, Cloudflare Pages, Nginx, and Docker.

---

## 🛠️ Render Backend Deployment Guide (Render.com)

Render allows you to host the PulseDesk AI Web Service / Backend API for free with automatic SSL certificate generation and GitHub auto-deployments.

### Method 1: Deploying via Render Dashboard (Recommended)

1. **Log in to Render**:
   Go to [https://dashboard.render.com](https://dashboard.render.com) and log in with your GitHub account.

2. **Create a New Web Service**:
   - Click the **New +** button in the top right.
   - Select **Web Service**.

3. **Connect GitHub Repository**:
   - Select **Connect a repository**.
   - Search for and select: `maheshchowdary640-creator/Pulse-ai`.

4. **Configure Web Service Settings**:
   - **Name**: `pulsedesk-ai-backend` (or your preferred name)
   - **Region**: Choose the closest region (e.g. Oregon, Frankfurt, Singapore)
   - **Branch**: `main`
   - **Root Directory**: Leave blank (default)
   - **Runtime**: `Python 3`
   - **Build Command**: *(Leave empty or enter `pip install --upgrade pip`)*
   - **Start Command**: `python start_server.py`
   - **Instance Type**: `Free`

5. **Deploy Service**:
   - Click **Create Web Service**.
   - Render will deploy your repository automatically and assign a production HTTPS URL (e.g., `https://pulsedesk-ai-backend.onrender.com`).

---

### Method 2: Deploying via Render Blueprint (1-Click YAML)

PulseDesk AI includes a pre-configured `render.yaml` blueprint file.

1. Go to [https://dashboard.render.com/blueprints](https://dashboard.render.com/blueprints).
2. Click **New Blueprint Instance**.
3. Connect your repository `maheshchowdary640-creator/Pulse-ai`.
4. Render will read `render.yaml` automatically and configure the Python web service.
5. Click **Apply**.

---

## 📋 Other Deployment Options

### Option 2: Deploy to GitHub Pages (Free Static Hosting)

1. Go to repository: [https://github.com/maheshchowdary640-creator/Pulse-ai](https://github.com/maheshchowdary640-creator/Pulse-ai)
2. Go to **Settings** > **Pages**.
3. Under **Build and deployment**, select **Source**: `Deploy from a branch`.
4. Select **Branch**: `main`, Folder: `/ (root)`.
5. Click **Save**.
   Published URL: `https://maheshchowdary640-creator.github.io/Pulse-ai/`

---

### Option 3: Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

---

### Option 4: Deploy with Docker & Nginx

```bash
docker build -t pulsedesk-ai .
docker run -d -p 80:80 --name pulsedesk pulsedesk-ai
```

---

### Option 5: Local Hosting

```bash
python start_server.py
```
Access at: `http://localhost:8000`

---

© 2026 PulseDesk AI. All rights reserved.
