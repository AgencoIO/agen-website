# Agenco — Data Infrastructure for E-Commerce

The marketing and landing page for [agenco.io](https://agenco.io), built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

Agenco helps Shopify founders and D2C brands turn fragmented e-commerce data into competitive advantage through custom data pipelines, inventory analytics, and competitor intelligence.

---

## Tech Stack

| Layer          | Technology                                         |
| -------------- | -------------------------------------------------- |
| Framework      | [Next.js 16](https://nextjs.org/) (App Router)     |
| Language       | [TypeScript 5.7](https://www.typescriptlang.org/)  |
| UI Library     | [React 19](https://react.dev/)                     |
| Styling        | [Tailwind CSS v4](https://tailwindcss.com/) + PostCSS |
| Components     | [shadcn/ui](https://ui.shadcn.com/) (New York style) |
| Charts         | [Recharts](https://recharts.org/)                  |
| Icons          | [Lucide React](https://lucide.dev/)                |
| Typography     | [Geist](https://vercel.com/font) (Sans + Mono)     |
| Analytics      | [Vercel Analytics](https://vercel.com/analytics)   |
| Forms          | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |

---

## Prerequisites

- **Node.js** — v18.17 or later ([download](https://nodejs.org/))
- **npm** — comes bundled with Node.js (v9+ recommended)

Verify your installation:

```bash
node -v   # should print v18.17.0 or higher
npm -v    # should print 9.x or higher
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/AgencoIO/agen-website.git
cd agen-website
```

### 2. Install dependencies

```bash
npm install
```

This reads `package.json` and installs all required dependencies into the `node_modules/` directory.

### 3. Run the development server

```bash
npm run dev
```

The app will start at **[http://localhost:3000](http://localhost:3000)** with hot-reload enabled — any code change will reflect instantly in the browser.

### 4. Build for production (optional)

```bash
npm run build
```

Creates an optimized production build in the `.next/` directory.

### 5. Start the production server (optional)

```bash
npm run start
```

Serves the production build locally on port 3000.

### 6. Lint the codebase (optional)

```bash
npm run lint
```

Runs ESLint across the project to catch code quality issues.

---

## Available Scripts

| Command         | Description                                    |
| --------------- | ---------------------------------------------- |
| `npm run dev`   | Start Next.js development server with hot-reload |
| `npm run build` | Create an optimized production build           |
| `npm run start` | Serve the production build                     |
| `npm run lint`  | Run ESLint on the entire project               |

---

## Project Structure

```
agenco/
├── app/                        # Next.js App Router
│   ├── globals.css             # Global styles & Tailwind CSS theme tokens
│   ├── layout.tsx              # Root layout (metadata, fonts, analytics)
│   └── page.tsx                # Landing page (hero, problem, how-it-works, CTA)
├── components/
│   ├── dashboard-preview.tsx   # Interactive dashboard with live charts
│   ├── theme-provider.tsx      # Dark/light theme context provider
│   └── ui/                     # shadcn/ui component library (57 components)
├── hooks/
│   ├── use-mobile.ts           # Responsive breakpoint hook
│   └── use-toast.ts            # Toast notification hook
├── lib/
│   └── utils.ts                # Utility functions (cn class merger)
├── styles/
│   └── globals.css             # Additional global styles
├── components.json             # shadcn/ui configuration
├── next.config.mjs             # Next.js configuration
├── postcss.config.mjs          # PostCSS configuration (Tailwind plugin)
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and scripts
└── package-lock.json           # Dependency lock file
```

---

## Page Sections

The landing page (`app/page.tsx`) includes the following sections:

1. **Navigation** — Sticky top bar with links and a CTA button
2. **Hero** — Value proposition with key metrics (23% inventory turnover, 94% pricing errors eliminated) and an interactive dashboard preview
3. **Problem** — Highlights the e-commerce data fragmentation challenge
4. **How It Works** — Three-step process: Data Audit → Pipeline Build → Intelligence & ROI
5. **Benefits** — Revenue impact, hands-on expertise, custom pipelines, scalable infrastructure
6. **Social Proof** — Testimonials and case study metrics from D2C brands
7. **CTA** — Call-to-action with Calendly integration for scheduling
8. **Footer** — Product links, company info, and contact details

---

## Deployment

This project is configured for deployment on [Vercel](https://vercel.com/). Vercel Analytics is enabled in production builds automatically.

```bash
# Deploy via Vercel CLI
npx vercel
```

Or connect the GitHub repository to Vercel for automatic deployments on push.

---

## License

© 2026 Agenco. All rights reserved.
