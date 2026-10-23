<p align="center">
  <img src="public/images/og.jpg" alt="Glade: private banking for people and the agents they run" width="100%">
</p>

<p align="center">
  <a href="https://useglade.org">useglade.org</a> &nbsp;·&nbsp;
  <a href="https://docs.useglade.org">Docs</a> &nbsp;·&nbsp;
  <a href="https://x.com/usegladeorg">@usegladeorg</a>
</p>

# Glade web app

Glade is a private bank on Robinhood Chain for people and the AI agents they run. Amounts stay encrypted unless you decide to share them, payments settle in about 100ms, and every agent gets an account of its own that can't spend past the limits you set.

This repository holds the website and the signed-in app behind it. Product documentation lives at [docs.useglade.org](https://docs.useglade.org/); this file covers how the app is put together and how to run it.

## Stack

- Next.js 16 (App Router) with React 19
- TypeScript throughout
- Tailwind CSS v4, the Glade design system described below, and a few shadcn primitives
- Fraunces and Plus Jakarta Sans through `next/font`
- Supabase for auth, Postgres and row level security

## Getting started

You'll need Node 20 or newer and a Supabase project.

```bash
npm install
npm run dev
```

Then visit http://localhost:3000.

Create a `.env.local` with these three values:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | The project's anon key, which is safe to expose to the browser |
| `NEXT_PUBLIC_DEPOSIT_ADDRESS` | The address shown on the wallet's top up screen |

Apply the migrations in `supabase/migrations` (at the repository root, outside `src`) before signing in. Without them you can still log in, but every query comes back empty. The [Supabase README](supabase/README.md) walks through it.

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serves the production build |
| `npm run lint` | ESLint |

## Where things live

```
src/
  app/
    page.tsx            the homepage
    roadmap/            public roadmap
    login/, signup/     sign in and create an account
    auth/               email confirmation: callback, confirm, confirmed, link-expired
    app/                the signed-in product
  components/
    HeroSection.tsx     centred headline over the valley photo, with the glass "canopy window"
    FeatureTabs.tsx     the tabbed product explorer (accounts, privacy, agents, protocol, transparency)
    LogosBar.tsx        partner marks, drawn through CSS masks from public/images/partners/
    AuthShell.tsx       the frame shared by every auth screen
    VirtualCardVisual   the emerald glass card used in the app and on the homepage
    sx.tsx              design system pieces: Brand, SectionHeader, Telemetry, Arrow
    app/                signed-in app components, reused by the homepage's product preview
    mockups/            the product mockups in the explorer, built on MockKit.tsx
  lib/supabase/         browser and server clients, plus the hand-written database types
  types/                shared TypeScript types
  middleware.ts         refreshes the session and protects /app
```

Everything under `src/app/app` needs a signed-in user. The sidebar groups it into money (accounts, send money, cards, wallet), agents (agent accounts, activity, analytics) and build (API keys, alerts), with settings at the bottom.

## Design system

The look is a sunlit clearing in a forest: a light, misty canvas, frosted glass, soft serif headlines and one emerald accent taken from the logo. Every screen is held to the same brief: *a sunlit forest clearing meets Apple's frosted glass, with a private bank's restraint.*

The system lives in two files. `src/app/globals.css` defines the tokens (`--sx-*`) and the `sx-*` classes under the GLADE DESIGN SYSTEM banner. `src/components/sx.tsx` holds the handful of structural components: `Brand`, `SectionHeader`, `Telemetry` and `Arrow`. Sections fade in through `Reveal.tsx`.

Before writing a colour or a size by hand, check whether a token or class already covers it.

### Type

| Used for | Typeface | How |
| --- | --- | --- |
| Headlines, large numbers, the wordmark | Fraunces | Sentence case, weight 450 to 550, tight tracking, `SOFT` at 100 for rounded terminals. The single highlighted phrase in a view is italic, with `WONK` on |
| Body text, labels, buttons, interface copy | Plus Jakarta Sans | Sentence case, 13 to 18px, line height near 1.6 |
| Code, hashes, addresses, keys | System mono | Only where characters need to line up |

Both load in `src/app/layout.tsx`. The only uppercase text is the small, letter-spaced labels (`sx-overline`, `sx-label`, `sx-tag`). Headlines and body copy stay in sentence case.

### Colour

Colours were sampled from the logo artwork in `public/images/new-logo.png`.

| Token | Value | Role |
| --- | --- | --- |
| `--sx-bg` | `#EEF5F1`, morning mist | Page background, beneath the fixed canopy-light wash on `body::before` |
| `--sx-surface` / `--sx-panel` | white at 55% / 82%, blurred | Frosted cards and denser panels |
| `--sx-line` / `--sx-line-strong` | forest ink at 9% / 16% | Hairlines and dividers |
| `--sx-text` to `--sx-text-5` | `#0E2A20` forest ink at 100, 74, 56, 40 and 18% | Text, from primary to faint |
| `--sx-accent` | `#087C52`, emerald | Primary actions, the current state, the one highlight per view |
| `--sx-heat` | `#54E7A4`, mint, as an rgb triplet | The accent's glow |

The accent has five strengths (`--sx-accent`, `-muted`, `-bg`, `-surface`, `-line`), a gradient for filled buttons (`--sx-accent-grad`) and a green shadow (`--sx-accent-glow`). Mint, leaf, moss, sky and sun (`--sx-mint`, `--sx-leaf`, `--sx-moss`, `--sx-sky`, `--sx-sun`) are for imagery only. Green, amber and red (`--sx-ok`, `--sx-warn`, `--sx-danger`) mean state, never decoration. There is one accent, and no dark theme.

### Shape, depth and motion

- Corners get rounder as elements get more important: pill buttons and tags, 10px chips, 14px inputs, 18px rows, 24px cards, 34px hero frames and sheets.
- Depth comes from frosted glass (blur and saturation over the canopy wash), a bright white edge and soft green-tinted shadows (`--sx-shadow-sm`, `--sx-shadow`, `--sx-shadow-lg`).
- The atmosphere comes from the valley photograph (`public/images/hero.png`) behind the hero and the auth screens, drifting pollen (`sx-stars`), a pooled sun glow (`sx-horizon-glow`), light paper grain (`sx-noise`) and a sunlight sheen on glass (`sx-hud`).
- Things the brand avoids: uppercase headlines, decorative grids, "live" pills and status badges in marketing copy, and anything space-themed.
- Motion is slow and gentle (`sx-rise`, `sx-reveal`, `sx-float`) and turns off under `prefers-reduced-motion`.

### Product pages

Pages under `src/app/app` share one layout: an `sx-app-page` wrapper; a `sx-page-head` header with an overline, title, short description and the main action on the right; a row of `sx-kpis` tiles; then lists in `sx-card-solid` panels made of `sx-row` or `sx-table`. Forms use `sx-field`, `sx-label` and `sx-input`. Toggles are `sx-switch`, filters are `sx-segmented`, and empty, loading and error states use `sx-empty`, `sx-skeleton` and `sx-alert-danger`. Every view works at 390px wide.

### Brand assets

| File | Use |
| --- | --- |
| `public/images/new-logo.png` | Master artwork, 2048px on its light background |
| `public/images/logo.png` | The mark at 512px. Use it as the brand mark only (next to the wordmark, on the card, as an icon), never as decoration |
| `public/images/logo-bg.png` | The mark at 512px for email and other places that need a solid background |
| `public/images/hero.png` | The valley photograph |
| `public/images/og.jpg` | The social preview card |
| `public/images/partners/` | Partner marks for the logo bar |
| `src/app/icon.png`, `src/app/apple-icon.png` | Browser and home screen icons |

## Worth knowing before you change things

**Money only moves in the database.** Transfers, top ups and policy changes all go through Postgres functions defined in the migrations. The app calls them and shows the result; nothing in `src` writes a balance itself. Since the database enforces the same rules the interface shows, a buggy form can't produce a wrong balance.

**The database types are written by hand.** `src/lib/supabase/database.types.ts` mirrors the schema manually rather than being generated, so a migration change needs a matching edit there. One trap has caught us more than once: every `Row`, `Insert`, `Update` and `Args` shape must be declared with `type`, not `interface`. The Supabase client checks them against `Record<string, unknown>`, which TypeScript only accepts for object literal type aliases. Use an `interface` and every `.from()` call quietly turns into `never`, with no error to explain it.

**An agent is an account with a policy attached.** Each agent has its own account, handle and balance, plus a spend policy capping what it can send per transaction and per day. Revoking an agent leaves its history intact and simply stops it from sending.

## Privacy tiers

Each account has exactly one of three tiers, and the tier decides what a transfer reveals on-chain.

| Tier | Amounts | Counterparties |
| --- | --- | --- |
| **Public** | Visible | Visible |
| **Confidential** (the default for new accounts) | Encrypted | Visible |
| **Shielded** | Hidden | Hidden |

The tier belongs to the account, not to individual transfers, so an agent can't lower its own privacy in the middle of a session.
