# Shakil Ahmad Portfolio

Premium legal portfolio and admin dashboard built with Next.js App Router, Tailwind CSS, Framer Motion, Prisma, and NextAuth.

## Stack

- Next.js 15
- Tailwind CSS
- Framer Motion
- Prisma
- NextAuth credentials auth
- SQLite for local development
- Local media upload storage under `public/uploads`

## Features

- Luxury, fully responsive legal portfolio website
- Homepage, About, Practice Areas, Case Studies, Blog, and Contact pages
- Protected admin dashboard
- Blog create/edit/publish workflow with rich text editor
- CRUD management for practice areas, case studies, and testimonials
- Contact message inbox
- Media library with upload support

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Confirm environment values in `.env`.

3. Generate Prisma client:

```bash
npx prisma generate
```

4. Seed local data:

```bash
npm run seed
```

5. Start development server:

```bash
npm run dev
```

## Default Admin Login

- Email: `admin@shakilahmad.com`
- Password: `ChangeMe123!`

Change these values in `.env` before using the project beyond local development.

## Build Verification

```bash
npm run build
```
