# Security Policy

We take the security of FanOps Unified seriously. If you suspect or find a security vulnerability, please review this policy to report it safely.

---

## 🛡️ Supported Versions

We actively provide security patches and updates for the following versions:

| Version | Supported | Notes                                   |
| ------- | --------- | --------------------------------------- |
| 1.x     | ✅ Yes    | Latest stable releases on `main` branch |
| < 1.0   | ❌ No     | Pre-production versions and prototypes  |

---

## 🔒 Reporting a Vulnerability

Please **do not** open public GitHub issues or pull requests for security vulnerabilities. Publicly disclosing a vulnerability makes it easier for bad actors to exploit it before a patch is available.

### Disclosure Process

If you discover a vulnerability, please follow these steps:

1. Document the vulnerability details, including the reproduction steps, affected endpoints (under `/api/`), and the potential impact.
2. Send the report securely via email to **security@fanops.dev**.
3. We will acknowledge receipt of your report within **24 to 48 hours**.
4. We will coordinate with you to analyze, reproduce, and resolve the issue. We aim to patch critical vulnerabilities within **7 to 10 days**.
5. Once a security patch is deployed, we will publish a security advisory and credit you for the discovery.

### What to Include in a Report

- **Impact Description**: A summary of the vulnerability (e.g., SQL injection, XSS, CSRF, privilege escalation).
- **Reproduction Steps**: Detailed instructions, mock inputs, or curl commands to trigger the issue.
- **Affected Components**: Specific files, routes, or store hooks.
- **Remediation Suggestion**: If you have a fix in mind, please describe it!

---

## 🚦 Vulnerability Severity Definitions

We categorize vulnerabilities based on the CVSS v3.1 framework:

- **Critical (9.0 - 10.0)**: Remote code execution, database compromise, or mass account hijack.
- **High (7.0 - 8.9)**: Authentication bypass, unauthorized access to user PII, or data manipulation.
- **Medium (4.0 - 6.9)**: Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), or server denial of service (DoS).
- **Low (0.1 - 3.9)**: Directory listing, minor information disclosure, or low-impact console alerts.

---

## 🛡️ Automated Security Scanning

We maintain repository hygiene through continuous, automated scanners:

- **Trivy File Scan**: Runs on every push and weekly schedule (`security-scan.yml`) to check static assets and dependencies.
- **GitHub CodeQL Analysis**: Integrated to catch SQL injections, memory leaks, and scripting vulnerabilities.
- **Dependency Pinning**: All package versions are strictly pinned in `package.json` to prevent dependency hijack attacks.
- **Security Headers**: Standard headers (HSTS, CSP, X-Frame-Options) are enforced via `vercel.json` to mitigate client-side attacks.
