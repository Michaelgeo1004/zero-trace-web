# Zero Trace Web

Marketing and inquiry website for **Zero Trace**, a reusable sustainable event kits service.

This project is built with Next.js and presents the venture story end-to-end: problem, solution, impact, team, and a contact funnel that sends inquiries by email.

## What This Project Includes

- Landing page with structured sections for hero, problem, solution, impact, team, and contact
- Motion-enhanced UI using Framer Motion
- Centralized content configuration in `src/content/site.ts`
- Contact form with:
  - Honeypot spam trap
  - Basic IP rate limiting (`5` requests per minute per IP)
  - Server-side input validation
  - SMTP email delivery through Nodemailer
  - Handlebars email template rendering (`src/templates/contact-enquiry.hbs`)

## Tech Stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS
- Framer Motion
- Nodemailer + Handlebars
- Vercel Analytics

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a local env file:

```bash
cp .env.example .env.local
```

Minimum required variables:

```env
SMTP_USER=you@gmail.com
SMTP_PASS=your_app_password
```

Optional variables:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
CONTACT_TO_EMAIL=inbox@example.com
CONTACT_FROM_EMAIL=no-reply@example.com
CONTACT_EMAIL_ASYNC=false
```

Notes:
- `SMTP_PASS` should be an app password (for Gmail) and can include spaces; the API strips spaces safely.
- If `CONTACT_TO_EMAIL` or `CONTACT_FROM_EMAIL` are omitted, `SMTP_USER` is used.
- In Vercel runtime, email sending is awaited for reliability.

### 3) Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` - Start local development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks

## Project Structure

```text
src/
  app/
    api/contact/route.ts       # Contact API (validation, rate limit, email send)
    page.tsx                   # Main landing page composition
  components/
    sections/                  # Landing page sections
    forms/ContactForm.tsx      # Client-side contact form
  content/
    site.ts                    # Site copy and content model
  templates/
    contact-enquiry.hbs        # Email template used by API route
```

## Deployment

This app is deployment-ready for Vercel:

1. Import repository into Vercel
2. Set environment variables in project settings
3. Deploy

Make sure SMTP credentials are configured in the deployment environment, otherwise `/api/contact` will return `503`.

## Brand Context

Zero Trace offers reusable event kits as a service to reduce single-use waste for social, corporate, and campus events.

For live preview and pitch assets, see links defined in `src/content/site.ts`.
