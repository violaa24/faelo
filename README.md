# Faelo AI Full-stack Website

The approved Faelo AI company website, connected to a Node.js/Express API and PostgreSQL storage for Book a Demo submissions.

For the complete Windows setup instructions, open `PANDUAN_MENJALANKAN.md`.

## Technical overview

- Frontend: HTML, CSS, JavaScript, Tailwind CDN, Font Awesome
- Backend: Node.js, Express
- Database: PostgreSQL with parameterized queries
- Security: Helmet headers, request-size limit, API rate limiting, server-side validation, and a honeypot field

## Commands

```bash
npm install
npm run db:setup
npm test
npm start
```

The website is served at `http://127.0.0.1:3000` by default.

## API

- `POST /api/demo-requests`: validates and stores a Book a Demo request.
- `GET /api/health`: checks the application and PostgreSQL connection.
