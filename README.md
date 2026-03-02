# Angular Design Patterns

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.0.

This is an experimental project to explore the features of Angular v.21 and the use of AI for generating code.

The content is intended to be both instructive and documentative.

## Author

Frank McGuire (26.11.2025)

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

## Build Scripts

The `package.json` file includes several build-related scripts to streamline development and deployment workflows:

- **`build`**: Compiles the project and outputs the build artifacts to the `dist/` directory. This is the default build command.
- **`build:prod`**: Builds the project using the production configuration, optimizing for performance and speed.
- **`watch`**: Continuously watches for changes and rebuilds the project in development mode.

To execute these scripts, use the following commands:

```bash
npm run build       # Default build
npm run build:prod  # Production build
npm run watch       # Watch mode
```

## Testing

This project uses **Vitest** for unit and component tests, and **Playwright** for end-to-end (E2E) tests. See [TESTING-STANDARDS-GUIDE.md](docs/TESTING-STANDARDS-GUIDE.md) for detailed testing standards, patterns, and best practices using `data-testid` selectors.

### Running unit & component tests

To execute unit and component tests with Vitest:

```bash
npm test
```

Run tests in watch mode:

```bash
npm test -- --watch
```

Run tests with coverage:

```bash
npm test -- --coverage
```

### Running end-to-end tests

To execute E2E tests with Playwright:

```bash
npm run e2e
```

Run a specific test file:

```bash
npm run e2e -- homepage.spec.ts
```

View the test report:

```bash
npm run e2e:report
```

---

## 🚀 Deployment to InMotion Hosting (Static Site)

See: [docs/DEPLOY_INMOTION.md](docs/DEPLOY_INMOTION.md)

InMotion Hosting shared servers run **Node.js 10**, which is not compatible with Angular 21’s SSR mode.  
To deploy successfully, the application must be built as a **fully static SPA** instead of SSR.

### ✔ 1. Update angular.json to disable SSR

```
"outputMode": "static"
```

### ✔ 2. Build for production

```bash
npm run build:prod:root
```

-- OR -- for subdirectory deployment (/angular-design-patterns)

```bash
npm run build:prod:inmotion
```

### ✔ 3. Upload static files to public_html/

Upload:

```
dist/angular-design-patterns/browser/
```

If the page shows only the spinner and browser DevTools shows `main.*.js` / `styles.*.css` 404 errors, rebuild with:

```bash
npm run build:prod:inmotion
```

Use `npm run build:prod:root` only when deploying at domain root (`/`).

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
