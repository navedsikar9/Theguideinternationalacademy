# THE GUIDE International Academy

Premium safety/health/industrial/oil & gas certification training institute — full public website + admin management system.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string, `SESSION_SECRET` — session signing

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, ShadCN UI, Framer Motion, Wouter
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — source of truth for all API contracts
- `lib/db/src/schema/` — Drizzle ORM schema (courses, students, certificates, gallery, testimonials, contact_inquiries, admins, verification_logs, settings)
- `lib/api-client-react/src/generated/` — Orval-generated React Query hooks + Zod schemas
- `artifacts/api-server/src/routes/` — all Express route handlers
- `artifacts/guide-academy/src/` — React frontend (pages + components)
- `artifacts/guide-academy/src/index.css` — theme tokens (navy/gold palette, Playfair Display + Inter fonts)

## Architecture decisions

- Contract-first API: OpenAPI spec → Orval codegen → typed hooks on client, Zod validation on server
- Session-based admin auth with bcryptjs password hashing (express-session + SESSION_SECRET)
- All public routes are unauthenticated; `/api/admin/*` routes are session-protected
- Certificate verification logs every lookup in `verification_logs` table for audit trail
- Courses use `slug` as the stable public identifier (URL-friendly)

## Product

- **Public website**: Home, About, Courses (listing + detail), Director profile, Gallery, Testimonials, Contact form, Certificate Verification
- **Admin Panel** (`/admin`): Dashboard stats, Students, Certificates, Courses, Gallery, Testimonials, Inquiries, Settings, Bulk Import
- **Admin login**: username `admin`, password `admin123` (change in production)

## User preferences

- Deep navy + gold + white luxury aesthetic throughout
- Playfair Display for headings, Inter for body text
- Framer Motion animations on all page transitions and key sections

## Gotchas

- Admin seeding: bcryptjs is only available in `artifacts/api-server` node_modules, not at workspace root — run seed scripts from that directory
- API server binds to `$PORT` (8080 in dev) — all routes are prefixed `/api`
- Frontend dev server runs on port 20321; global proxy routes `/` → guide-academy, `/api` → api-server

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
