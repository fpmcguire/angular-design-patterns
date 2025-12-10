# Deploying `angular-design-patterns` to inMotionHosting (shared)

This file explains the exact steps to build and deploy the static (non-SSR) Angular production bundle to an inMotionHosting shared account (cPanel / public_html) using FTP/File Manager.

## Important notes

- This repository includes SSR files (`server.ts`, `main.server.ts`) and an SSR npm script; SSR is disabled for deployment here. The instructions below deploy the static browser build only.
- If you previously had peer dependency errors (Angular vs @angular/fire), use the `--legacy-peer-deps` install option or resolve versions first. See the repo `package.json`.

## Prerequisites (local)

- Node.js (>=16) and npm installed
- Access to your inMotionHosting FTP/cPanel credentials
- An FTP client (FileZilla) or use the cPanel File Manager

## Commands (PowerShell)

1. Install dependencies (strict):

```powershell
npm ci
```

If you encounter peer dependency resolution errors (common with mismatched Angular versions), run:

```powershell
npm install --legacy-peer-deps
```

2. Build the static production bundle

```powershell
npm run build:prod
```

This writes files to `dist/angular-design-patterns/`.

## What to upload

- Upload the _contents_ of `dist/angular-design-patterns/` (not the folder itself) into your inMotionHosting site root (commonly `public_html/` for the primary domain or the appropriate domain/subdomain folder).
- Files you should see in the `dist` folder: `index.html`, `assets/`, `styles.*.css`, `main.*.js`, `runtime.*.js`, and other hashed files.

## Using FileZilla (example)

- Host: yourdomain.com or FTP host provided by inMotion
- Username: (your FTP username)
- Password: (your FTP password)
- Port: 21 (or as provided)
- Connect, navigate to `public_html/`, then upload all files & folders from `dist/angular-design-patterns/` into `public_html/`.

## Using cPanel File Manager

- Login to cPanel > File Manager > public_html
- Use Upload to add the files, or compress `dist` to a ZIP locally and use Upload + Extract in File Manager.

## SPA rewrite (enable client-side routing)

If your app uses Angular client-side routes (non-hash URLs), add a `.htaccess` file in `public_html/` with this content to rewrite missing files to `index.html`:

```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

-- OR -- for subdirectory deployment (/angular-design-patterns)

```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /angular-design-patterns/
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /angular-design-patterns/index.html [L]
</IfModule>
```

## Optional: compress before upload

- You can zip the `dist` contents and upload + extract via cPanel File Manager to speed uploads for many small files.

## Post-deploy checks

- Visit your site (https://yourdomain.com). The app should load and client-side navigation should work.
- If you see server errors or a blank page, open browser DevTools Console and Network tab to check for missing files or 404s.

## Security & cleanup notes

- Keep SSR files in the repo if you may enable SSR later. If you want to permanently remove SSR, delete `server.ts`, `main.server.ts`, and remove the SSR npm script from `package.json`.
- Run `npm audit` and `npm audit fix` locally to address vulnerabilities before building.

If you want, I can also produce a short step-by-step FTP script for FileZilla, or create a one-click zip-and-upload helper.

---

Created for: `angular-design-patterns` (root)
