# Deploy Soul Gaming to Azure App Service

This guide covers deploying the Next.js app to **Azure App Service** (Linux or Windows).

## Prerequisites

- Azure subscription
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) (optional) or use Azure Portal
- Your app builds successfully: `npm install && npm run build`

## 1. Create the App Service

### Option A: Azure Portal

1. Go to [Azure Portal](https://portal.azure.com) → **Create a resource** → **Web App**.
2. **Basics**
   - **Subscription / Resource group:** Create or select one.
   - **Name:** e.g. `soul-gaming`.
   - **Publish:** Code.
   - **Runtime stack:** Node 18 LTS or Node 20 LTS.
   - **Operating system:** Linux (recommended) or Windows.
   - **Region:** Choose one close to your users.
3. **App Service Plan:** Create new or use existing (e.g. B1 for low cost).
4. Create the web app, then go to its **Overview** and note the URL.

### Option B: Azure CLI

```bash
az login
RESOURCE_GROUP="soul-gaming-rg"
APP_NAME="soul-gaming"
LOCATION="eastus"

az group create --name $RESOURCE_GROUP --location $LOCATION
az appservice plan create --name soul-gaming-plan --resource-group $RESOURCE_GROUP --is-linux --sku B1
az webapp create --name $APP_NAME --resource-group $RESOURCE_GROUP --plan soul-gaming-plan --runtime "NODE:18-lts"
```

## 2. Configure environment variables

In Azure Portal: **App Service** → **Configuration** → **Application settings** → **New application setting**.

Add the same variables you use locally (from `.env`), for example:

| Name | Value (example) | Notes |
|------|------------------|--------|
| `AZURE_SQL_SERVER` | `yourserver.database.windows.net` | Azure SQL server |
| `AZURE_SQL_DATABASE` | `yourdb` | Database name |
| `AZURE_SQL_USER` | `youruser` | SQL login |
| `AZURE_SQL_PASSWORD` | `***` | SQL password |
| `AZURE_SQL_TRUST_CERTIFICATE` | `true` | Often needed for Azure SQL |
| `JWT_SECRET` | long random string | For auth tokens |
| `NEXT_PUBLIC_REOWN_PROJECT_ID` | your Reown id | For WalletConnect |

Do **not** commit real values to git. Set them only in Azure (and in local `.env`).

- **WEBSITE_NODE_DEFAULT_VERSION:** Optional. Set to `18-lts` or `20-lts` if you want to pin the Node version.

## 3. Build and startup commands

The app uses Next.js **standalone** output: after `npm run build`, a minimal server is in `.next/standalone`. Azure should run that server.

In Azure Portal: **App Service** → **Configuration** → **General settings** (or **Settings** → **Configuration**):

- **Stack settings**
  - **Startup Command** (Linux):  
    `node .next/standalone/server.js`  
  - Or leave empty and rely on `npm start` (see below).

Your `package.json` already has:

- `build`: `next build` (then `postbuild` copies static/public into standalone).
- `start`: `node .next/standalone/server.js`

So if Azure runs **Build**: `npm run build` and **Start**: `npm start`, it will use the standalone server. Azure App Service usually runs `npm start` by default after a build.

### If you use “Run from package” or zip deploy

Ensure the deployment runs:

1. `npm install --production=false` (or `npm ci`) so devDependencies are available for `next build`.
2. `npm run build` (this runs `postbuild` and fills `.next/standalone`).
3. Start with: `node .next/standalone/server.js` (or `npm start`).

Port: Azure sets `PORT`; the Next.js standalone server uses it automatically.

## 4. Deploy the code

### Option A: GitHub Actions (recommended)

1. In Azure Portal: **App Service** → **Deployment Center**.
2. Source: **GitHub** → authorize and select repo and branch.
3. Build provider: **GitHub Actions** (or App Service build service).
4. Save. Azure will add a workflow file. Commit and push; the workflow will build and deploy.

Ensure the workflow runs:

- `npm ci`
- `npm run build`
- Deploys the built app (e.g. the whole repo including `.next/standalone`, or the artifact Azure expects).

If Azure’s default workflow does not run `npm run build`, edit the generated workflow so the build step runs on the runner and the deployment step uploads the folder that contains `.next/standalone` (and `node_modules` if you don’t run install on the server).

### Option B: Zip deploy (Azure CLI)

From your project root (where `package.json` is):

```bash
# Install deps and build
npm ci
npm run build

# Create zip (include .next/standalone, node_modules, package.json; exclude .git, node_modules/.cache)
# Azure expects the app to run from the zip root, so the zip should contain .next/standalone/server.js, etc.
zip -r deploy.zip .next/standalone .next/static public package.json package-lock.json node_modules -x "node_modules/.cache/*"

# Deploy (replace <app-name> and <resource-group>)
az webapp deploy --resource-group <resource-group> --name <app-name> --src-path deploy.zip --type zip
```

Note: For zip deploy, Azure may run `npm install` and `npm run build` again if configured. If you prefer to deploy the pre-built standalone only, you can zip only `.next/standalone`, `package.json`, and a minimal `node_modules` (or use a custom startup command that runs `node server.js` from inside `.next/standalone`). Adjust the zip contents to match how you want the app to start.

### Option C: Local Git / Azure DevOps

In **Deployment Center**, choose **Local Git** or **Azure Repos**. Push to the given URL; Azure will run the build based on the selected runtime and your startup command.

## 5. Health check (optional)

- In **App Service** → **Health check**, set path to `/api/health` if you have that route.
- This helps Azure detect and recycle unhealthy instances.

## 6. Post-deploy checks

1. Open the App Service URL (e.g. `https://soul-gaming.azurewebsites.net`).
2. Confirm the site loads and that API routes that use Azure SQL work (e.g. login, register).
3. In **Log stream** or **Logs**, check for startup errors (e.g. missing env vars, wrong startup command).

## Troubleshooting

- **Blank page / 500:** Check **Log stream** and **Application logs**. Often caused by missing env vars (e.g. `JWT_SECRET`, `AZURE_SQL_*`) or wrong **Startup Command**.
- **Port:** The app uses `process.env.PORT`; Azure sets this automatically.
- **Static files 404:** Ensure `postbuild` ran (copy of `.next/static` and `public` into `.next/standalone`). Re-run `npm run build` locally and confirm `.next/standalone/.next/static` and `.next/standalone/public` exist.
- **Database errors:** Verify Azure SQL firewall allows the App Service outbound IPs (or use “Allow Azure services”) and that connection strings and env vars match your `.env` setup.

## Summary

| Item | Value |
|------|--------|
| Runtime | Node 18 or 20 LTS |
| Build | `npm run build` (creates standalone + postbuild copy) |
| Start | `node .next/standalone/server.js` or `npm start` |
| Port | Set by Azure via `PORT` |
| Env vars | Set in App Service **Configuration** (same as `.env`) |
