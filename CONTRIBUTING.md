# Contributing to FanOps Unified

Thank you for choosing to contribute to FanOps Unified! We appreciate your support in building and improving the stadium operations and fan experience platform for the FIFA World Cup 2026.

---

## 🗺️ Developer Onboarding

### 1. Prerequisite Environments
- **Node.js**: version `>=20.0.0` (Recommended: LTS v22)
- **Package Manager**: npm `>=10.0.0`
- **Editor**: VS Code (with ESLint, Prettier, and Tailwind CSS IntelliSense extensions)

### 2. Fork, Clone, and Setup
1. Fork the repository on GitHub: `https://github.com/Gopal-MD/fanops-unified`.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/<your-username>/fanops-unified.git
   cd fanops-unified
   ```
3. Initialize dependency packages using `npm install` with legacy-peer-deps:
   ```bash
   npm install --legacy-peer-deps
   ```
4. Copy the environment variables template and configure your keys:
   ```bash
   cp .env.example .env
   ```

### 3. Local Development Run
Start the Vite local dev server:
```bash
npm run dev
```
The application will boot at `http://localhost:3000` (or `3001` if port 3000 is occupied).

---

## 🛠️ Git Branching & Workflow

### 🚀 Branching Strategy
Always create your branch from the `develop` or `main` branches. Use clean prefixes to define the purpose of your branch:
- `feature/stadium-navigation` (new user features)
- `bugfix/websocket-reconnect` (resolving issues)
- `docs/api-guide` (documentation updates)
- `perf/recharts-memoization` (performance enhancements)

### 💬 Commit Message Formats
We strictly enforce **Conventional Commits** standards to maintain a clean changelog:
- **`feat:`** A new user-facing feature (e.g., `feat: integrate maps real-time gate congestion overlays`)
- **`fix:`** A code bug fix (e.g., `fix: resolve hydration mismatches on client theme loads`)
- **`docs:`** Documentation modifications (e.g., `docs: upgrade contributing guide for accessibility rules`)
- **`test:`** Adding or refactoring test suites (e.g., `test: verify websocket client store fallback connections`)
- **`refactor:`** Code refactoring without changing functionality (e.g., `refactor: split incident management layouts`)

Example commit:
```bash
git commit -m "feat: add screen reader announcements to live maps zone density updates"
```

---

## 📐 Coding Standards & Guidelines

### 1. TypeScript Strict Constraints
- Enforce strict typing. Do not bypass the compiler with the `any` type.
- Declare precise interfaces or types for all components, props, hooks, and helper functions.
- Explicitly define the return type of all public functions, hooks, and API handlers.

### 2. File and Folder Structure
- Maintain a modular and flat component layout:
  - Centralized types: [src/types/index.ts](file:///d:/Challange%204/src/types/index.ts)
  - Configuration/Env schemas: [src/config/environment.ts](file:///d:/Challange%204/src/config/environment.ts)
  - State stores: [src/store/](file:///d:/Challange%204/src/store)
  - Features/Views: [src/components/Ops/](file:///d:/Challange%204/src/components/Ops)
- Unused middleware or backend configurations must be removed immediately to preserve clean compilation.

### 3. API Response JSON Contracts
Every endpoint under `src/routes/api/` and server-side helper must conform strictly to our unified JSON response contract:
```json
{
  "success": true,
  "data": { ... },
  "error": null
}
```
If an error occurs, return:
```json
{
  "success": false,
  "data": null,
  "error": "Error message explanation here"
}
```

---

## 👁️ Accessibility (a11y) Requirements

Accessibility is a critical pillar of FanOps Unified. All contributions must adhere to WCAG 2.1 AA rules:

- **Contrast Ratios**: All text elements must maintain a contrast ratio of `4.5:1` or higher. Check color values in dark/light mode classes.
- **Keyboard Navigation**: Interactive buttons, anchors, and inputs must have visible focus rings (`focus-visible:ring-2`) and be fully navigable using the `Tab` key.
- **Form Controls**: Every `input`, `textarea`, and `select` element must have a corresponding `<label>` associated via `htmlFor` and `id` properties.
- **Screen Reader Announcements**: Live-changing notifications (like real-time incident reports or density level spikes) must use ARIA Live regions (`aria-live="polite"` or `aria-live="assertive"`).
- **Semantics**: Do not use generic `div` elements for buttons or actions. Always use `<button>` (with `type="button"`) or proper HTML5 semantic layouts (`<main>`, `<nav>`, `<header>`, `<footer>`).

---

## 🧪 Testing Guidelines

No pull request will be merged without passing all test checkpoints.

### 1. Vitest Unit & Integration Testing
Run the complete unit test suite:
```bash
npm run test
```
Verify code coverage targets:
```bash
npm run test:coverage
```
- Code coverage targets: Core store state and API logic files must maintain at least **80% statement coverage**.

### 2. Playwright E2E Testing
Run the browser automation and end-to-end integration tests:
```bash
npx playwright install
npm run test:e2e
```

### 3. Quality Verification Workflow
Before submitting your PR, execute the clean-run verification script:
```bash
npm run lint && npm run typecheck && npm run test && npm run build
```
Ensure all steps complete successfully.
