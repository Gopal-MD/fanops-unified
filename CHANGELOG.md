# Changelog

All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-07-18

### Added
- **Stricter Compiler Constraints**: Enabled `"noImplicitReturns": true`, `"strictNullChecks": true`, and Zod-based schema validations in tsconfig and runtime checks.
- **Vercel Security Headers**: Implemented a comprehensive `vercel.json` policy with strict Content Security Policy (CSP), permissions restrictions (Permissions-Policy), and cross-origin controls.
- **Accessibility Lint Checks**: Integrated `eslint-plugin-jsx-a11y` package to enforce WCAG 2.1 AA accessibility rules during static analysis.
- **GitHub Workflow Workflows**: Created Node version matrices (20.x, 22.x) in continuous integration (`ci.yml`) and integrated weekly security scans (`security-scan.yml` using Trivy).
- **Unified Repository Templates**: Created PR templates (`PULL_REQUEST_TEMPLATE.md`) and issue forms for bugs and features in `.github/`.
- **Domain Configuration & Constants**: Added centralized variables in `src/config/constants.ts` and `src/types/index.ts` to manage stadium limits and models.

### Fixed
- **React Refresh Load Conflicts**: Registered `viteReact()` in `vite.config.ts` to restore Fast Refresh dev runtime checks.
- **ESLint JSX Accessibility Errors**: Associated labels with form fields in `BroadcastView.tsx` and destructured children in `AlertTitle` and `PaginationLink`.
- **Rolldown Dependency Conflict**: Applied package overrides in `package.json` to pin `rolldown` and `@rolldown/binding-*` to `1.0.3`, resolving native ESM crashes under Vite 8.
- **Vitest Setup**: Switched test environment execution to `happy-dom` to bypass `@csstools/css-calc` ESM require failures.

---

## [1.0.0] - 2026-07-17

### Added
- **RESTful API Architecture**: Implemented modular routing under `/api/` (`system.ts`, `healthz.ts`, `stadium.ts`, `assistant.ts`).
- **Unified JSON Contract Middleware**: Standardized API responses to use the `{ success, data, error }` layout.
- **Mock-Enabled Vitest API Suite**: Added comprehensive unit test coverage for validation rules and error scenarios without calling external APIs.
- **FIFA 2026 Problem Matrix**: Integrated high-fidelity matrices into the repository README.
- **Vite 8 ESM Bundler Support**: Rewrote `vite.config.ts` to use standard ESM plugins directly, resolving ESM/CJS runtime conflicts.

### Fixed
- **Dependency Paths**: Configured `.gitignore` to prevent committing build logs, reports, and coverage files.
- **Rolldown Native Resolution**: Fixed Rolldown native dependency resolution on Windows systems.
