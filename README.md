# My E-commerce

PNPM/Turborepo monorepo for the storefront, API, and shared packages.

## Structure

```
apps/
  api/       Express API (port 4000)
  web/       Next.js storefront (port 3000)
  docs/      Documentation site
packages/
  db/        Prisma schema, migrations, and database client
  shared/    Shared application code
  ui/        Shared UI components
  eslint-config/ and typescript-config/  Shared tooling configuration
```

There is one repository-wide `.gitignore`. Generated output, dependencies, local uploads, and all real environment files are ignored from the root, so individual packages do not need their own `.gitignore` files.

## First-time setup (including a new PC)

1. Install Node.js 18+ and pnpm 9+.
2. Run `pnpm install` from the repository root.
3. Create the local environment files from their templates:

   ```powershell
   Copy-Item .env.example .env
   Copy-Item apps/api/.env.example apps/api/.env
   Copy-Item apps/web/.env.local.example apps/web/.env.local
   Copy-Item packages/db/.env.example packages/db/.env
   ```

4. Replace the placeholder secrets and database connection strings in those files.
5. Start development with `pnpm dev`.

## Environment files

| File | Used by |
| --- | --- |
| `.env` | Shared API secrets. Loaded by `apps/api`. |
| `apps/api/.env` | API port, CORS settings, and API database connection. Overrides root values. |
| `apps/web/.env.local` | Browser-safe Next.js variables such as `NEXT_PUBLIC_API_BASE`. |
| `packages/db/.env` | Prisma commands and database seeding. Keep its `DATABASE_URL` aligned with the API one. |

Commit only the `*.example` templates—never the real `.env` files.

## Useful commands

```bash
pnpm dev
pnpm build
pnpm lint
pnpm check-types
pnpm --filter @ecomerse/db migrate:dev
pnpm --filter @ecomerse/db db:seed
```
