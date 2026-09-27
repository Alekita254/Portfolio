# Alex OS Portfolio

Alex OS is a Linux-inspired personal portfolio built with Next.js and Tailwind CSS.

## Development

Run locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm run start
```

## Identity Configuration

Portfolio identity and SEO values are centralized in:

- `config/identity.js`

Replace placeholder values there before deployment.

## Content Model

Portfolio content is centralized in:

- `content/portfolio.js`

Update placeholder entries for profile, experience, projects, skills, education, and writing.

## Contact Form

Email sending uses EmailJS. Configure environment variables in `.env.local`:

```bash
NEXT_PUBLIC_USER_ID=YOUR_USER_ID
NEXT_PUBLIC_TEMPLATE_ID=YOUR_TEMPLATE_ID
NEXT_PUBLIC_SERVICE_ID=YOUR_SERVICE_ID
```
