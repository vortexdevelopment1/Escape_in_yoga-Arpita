# Escape in Yoga

Customer-facing website for Escape in Yoga (trainer: Avani Jain).

**Tech stack:** Next.js (App Router) · TypeScript · React · Tailwind CSS

- **Frontend-only implementation.** All data is mock data in `data/`. Bookings and the demo login are stored in the browser's `localStorage`.
- **Backend:** Not included.
- **Admin dashboard:** Not included.
- **Dependencies:** Not installed.

## Install and run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Demo login

- Email: `demo@escapeinyoga.com`
- Password: `yoga1234` (demo journey is always on Day 7 of 30)
- Or log in with the email from a booking made on the same browser, using any password of 6+ characters.

## Routes

`/` · `/about` · `/classes` · `/classes/[slug]` · `/postures` · `/schedule` · `/booking` · `/booking/confirmation` · `/login` · `/member` · `/member/sessions` · `/contact` · `/privacy` · `/terms`

## Structure

- `app/` routes · `components/` UI by area · `data/` mock content · `types/` shared types · `lib/` dates, validation, storage, mock session access
- `public/images/` are generated placeholder illustrations. Replace them with real photography (same file names, or update `data/`).
- Placeholder content to replace: trainer bio and quote, class and posture copy, timetable, contact details, legal pages.

## Connecting a backend later

- `lib/storage.ts`: replace with API calls for bookings and sessions.
- `lib/sessionAccess.ts`: replace with a call that returns a restricted meeting link for the registered email.
- Login in `components/member/LoginForm.tsx` and forms in `BookingFlow.tsx` / `ContactForm.tsx` simulate latency and are ready to swap for real requests.
- WhatsApp notifications are shown as UI previews only.
