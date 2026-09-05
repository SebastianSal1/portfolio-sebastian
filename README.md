# Sebastian Salutare — Portfolio Website

A corporate-modern, publication-grade personal portfolio website for **Sebastian Salutare** (Industrial Engineering student at Institut Teknologi Bandung — Strategy, Operations Research, Finance, and Technology).

---

## Quickstart

### Prerequisites
- Node.js 18.18+ or 20+
- pnpm 9+ or 10+

### Development
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build production bundle
pnpm build

# Start production server
pnpm start
```
The site runs at `http://localhost:3000`.

---

## Technical Stack

- **Framework**: Next.js 16.3.4 (App Router, Turbopack, React 19)
- **Language**: TypeScript 5.9 (Strict mode)
- **Styling**: Tailwind CSS v4 (CSS-first `@theme` configuration in `src/app/globals.css`)
- **Fluid Dynamics**: WebGL 1.0 (Raw GLSL fragment shader, simplex noise domain-warping)
- **Typography**: Instrument Serif (Display headline) + Inter (Analytical UI & body)
- **Icons**: Lucide React

---

## Architecture & Structure

- **Homepage (`/`)**: Vertical narrative flow featuring WebGL fluid dynamics, Credential Matrix, Interactive Projects, Competitions, Academics, Interests, and Closing CTA.
- **Domain Subpages**: Four dedicated Level-1 routes (`/experience`, `/projects`, `/competitions`, `/education`).
- **Interactive CV Preview**: Centered modal with embedded PDF viewer and direct download action.
- **Global Design System**: Bespoke corporate-modern editorial aesthetic built with Tailwind CSS v4 and Next.js 16.
