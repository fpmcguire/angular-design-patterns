# AngularDesignPatterns

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help`
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the dist/ directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the Karma test runner, use:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

---

## 🚀 Deployment to InMotion Hosting (Static Site)

InMotion Hosting shared servers run **Node.js 10**, which is not compatible with Angular 21’s SSR mode.  
To deploy successfully, the application must be built as a **fully static SPA** instead of SSR.

### ✔ 1. Update angular.json to disable SSR

```
"outputMode": "static"
```

### ✔ 2. Build for production

```bash
ng build --configuration=production
```

-- OR -- for subdirectory deployment (/angular-design-patterns)

```bash
npx ng build --configuration=production --base-href /angular-design-patterns/
```

### ✔ 3. Upload static files to public_html/

Upload:

```
dist/angular-design-patterns/browser/
```

### ✔ 4. Add .htaccess for routing

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

---

## 🔄 Automated Deployment Using GitHub Actions (Tag-based Deploy)

This project supports automated deployment to inMotion Hosting when a **tagged release** is pushed.

Add this file at:

```
.github/workflows/deploy.yml
```

### Trigger: When pushing a tag like v1.0.0

See deployment script below in separate download file.

---

## Additional Resources

See the Angular CLI documentation at: https://angular.dev/tools/cli
