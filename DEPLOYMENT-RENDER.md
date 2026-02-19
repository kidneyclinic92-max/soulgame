# Deploy Soul Gaming on Render

This guide covers deploying the Next.js app to [Render](https://render.com).

## Prerequisites

- [Render](https://render.com) account (free tier works)
- Your repo pushed to **GitHub** or **GitLab** (Render connects to these)

## 1. Push your code to GitHub/GitLab

If you haven’t already, push the `soulgame` project to a Git host Render can use:

```bash
# From your soulgame folder
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## 2. Create a Web Service on Render

1. Go to [dashboard.render.com](https://dashboard.render.com) → **New** → **Web Service**.
2. Connect your **GitHub** or **GitLab** account and select the **soulgame** repo.
3. Use these settings:

   | Field | Value |
   |-------|--------|
   | **Name** | `soulgame` (or any name) |
   | **Region** | Choose one (e.g. Oregon, Frankfurt) |
   | **Runtime** | Node |
   | **Branch** | `main` (or the branch you use) |
   | **Build Command** | `npm install && npm run build` |
   | **Start Command** | `npm start` |
   | **Instance Type** | Free (or paid if you need more resources) |

4. Click **Advanced** and add environment variables (same as your `.env`):

   | Key | Value |
   |-----|--------|
   | `NODE_VERSION` | `18` |
   | `AZURE_SQL_SERVER` | your Azure SQL server |
   | `AZURE_SQL_DATABASE` | your database name |
   | `AZURE_SQL_USER` | your SQL user |
   | `AZURE_SQL_PASSWORD` | your SQL password |
   | `AZURE_SQL_TRUST_CERTIFICATE` | `true` |
   | `AZURE_SQL_PORT` | `1433` (optional) |
   | `JWT_SECRET` | long random string for auth |
   | `NEXT_PUBLIC_REOWN_PROJECT_ID` | your Reown/WalletConnect project id |

5. Click **Create Web Service**. Render will clone the repo, run the build, then start the app.

## 3. Build and start behavior

- **Build:** `npm install && npm run build`  
  - Installs dependencies and runs `next build` + `postbuild` (copies static/public into standalone).
- **Start:** `npm start`  
  - Runs `node .next/standalone/server.js` (standalone Next.js server).
- Render sets `PORT`; the app uses it automatically.

## 4. If the app fails to start

If you see errors about missing files or wrong paths, set **Start Command** to:

```bash
cd .next/standalone && node server.js
```

Then save and redeploy.

## 5. Custom domain (optional)

- In the Render service → **Settings** → **Custom Domains**.
- Add your domain and follow the DNS instructions.

## 6. Using the Blueprint (`render.yaml`)

You can use the repo’s `render.yaml` to create the service from the Blueprint:

1. **Dashboard** → **Blueprints** → **New Blueprint Instance**.
2. Connect the repo and select it; Render will read `render.yaml`.
3. Add the environment variables in the service’s **Environment** tab (they are not stored in `render.yaml` for security).
4. Deploy.

## Summary

| Item | Value |
|------|--------|
| Build Command | `npm install && npm run build` |
| Start Command | `npm start` |
| Port | Set by Render via `PORT` |
| Env vars | Set in Render Dashboard → Environment |

After deploy, your app will be at `https://soulgame.onrender.com` (or the custom URL Render shows).
