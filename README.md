# Alya & Amir — Engagement Invitation

A mobile-first, interactive digital engagement invitation for Alya &
Amir. Built with Next.js (App Router), TypeScript, Tailwind CSS, and
Framer Motion. RSVPs are stored in a Google Sheet via a Google Apps
Script "Web App" endpoint — no paid backend required.

```
Frontend (Next.js, on Vercel)
    ↓  RSVP form submit
Google Apps Script Web App
    ↓  appends a row
Google Sheet
```

---

## 1. Install & run locally

Requires Node.js 20.9+ (this project was built on Node 22).

```bash
npm install
npm run dev
```

Open http://localhost:3000. Edit files under `app/` and `components/`
— the page hot-reloads.

To type-check or produce a production build locally:

```bash
npx tsc --noEmit
npm run build
npm run start
```

---

## 2. Project structure

```
app/
  page.tsx                 the main invitation (/)
  invite/[guest]/page.tsx  personalized invitation (/invite/<slug>)
  admin/page.tsx           RSVP dashboard (/admin)
  layout.tsx               root layout, fonts, metadata
  globals.css              design tokens (colors) + base styles

components/                one component per section (see file names)
lib/
  config.ts                ← EDIT HERE: names, date, venue, schedule, wording, theme
  guests.ts                ← EDIT HERE: personalized guest links
  rsvp.ts                  talks to the Google Apps Script endpoint
  calendar.ts              "Add to Calendar" (.ics + Google Calendar link)

scripts/
  google-apps-script.js    the entire backend — paste this into Apps Script

public/audio/              drop background-music.mp3 here (optional)
```

**Everything you're likely to want to change lives in `lib/config.ts`.**
Names, the date, the venue, the schedule, the invitation wording, and
the color palette are all defined there, once.

---

## 3. Customize the content

Open `lib/config.ts` and edit:

- `EVENT.date`, `EVENT.startTime`, `EVENT.endTime`, `EVENT.timeZone` —
  drives the countdown and the "Add to Calendar" event. **A placeholder
  time (6:00 PM–10:00 PM) is set for now** since the exact ceremony
  time hasn't been confirmed — update it the moment it is.
- `EVENT.venueName`, `EVENT.venueAddress` — currently placeholders
  ("Venue details coming soon" / "Address to be announced") since only
  a Google Maps link was provided. `EVENT.mapsUrl` is already wired to
  the link you gave me.
- `SCHEDULE` — the four timeline entries. Replace `time: "Time to be
  announced"` with real times as they're confirmed. Add/remove items
  freely; the timeline renders whatever's in this array.
- `OUR_STORY` — replace `paragraphs` with real text, and set `photo`
  to `{ src: "/images/your-photo.jpg", alt: "..." }` after adding the
  image to `public/images/`. Leave `photo: null` to keep the
  intentional placeholder frame.
- `THEME.colors` — the ivory/olive/gold palette. Change the hex values
  here (also mirrored in `app/globals.css`'s `:root` block).

Personalized guest links live in `lib/guests.ts`. Add an entry like:

```ts
{ slug: "ahmed", guestName: "Ahmed Mohamed", token: "ahmed-001" }
```

and share `yourdomain.com/invite/ahmed`. That guest sees "Dear Ahmed"
in the hero, and their RSVP is tagged with `guestToken: "ahmed-001"`
in the sheet. This file is only ever read on the server — the full
guest list is never sent to the browser.

---

## 4. Google Sheets + Apps Script setup (RSVP backend)

You do **not** need to know Apps Script already — follow these steps
in order.

### Step 1 — Create the Google Sheet
1. Go to [sheets.google.com](https://sheets.google.com) and create a
   new, blank spreadsheet.
2. Name it something like "Alya & Amir — RSVPs".
3. You don't need to add columns by hand — the script creates a
   `RSVPs` tab with headers (`Timestamp`, `Guest Name`, `Attendance`,
   `Guest Token`, `Source`) automatically the first time it runs.

### Step 2 — Open the Apps Script editor
1. In the sheet, click **Extensions → Apps Script**.
2. Delete any starter code in the editor (`Code.gs`).

### Step 3 — Paste the backend code
1. Open [`scripts/google-apps-script.js`](scripts/google-apps-script.js)
   in this project.
2. Copy its entire contents and paste them into `Code.gs` in the Apps
   Script editor.
3. Click the save icon (or Ctrl/Cmd+S).

### Step 4 — Deploy as a Web App
1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in:
   - Description: "RSVP API"
   - Execute as: **Me**
   - Who has access: **Anyone** (this is what allows your public
     website to call it — see the security note below)
4. Click **Deploy**.
5. Google will ask you to authorize the script — click through the
   consent screen (you'll see an "unverified app" warning since this
   is your own private script; click **Advanced → Go to (project
   name)** to proceed).
6. Copy the **Web app URL** shown after deployment. It looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`

### Step 5 — Wire the URL into the frontend
1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
2. Paste the Web App URL into `.env.local`:
   ```
   NEXT_PUBLIC_RSVP_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycb.../exec
   ```
3. Restart `npm run dev` so the new env var is picked up.

### Step 6 — Test it
1. Open the site, scroll to RSVP, submit a test response.
2. Check the Google Sheet — a new row should appear within a couple
   of seconds.
3. Open `/admin`, unlock with the admin passcode (see below), and
   confirm the stats update.

**Re-deploying after edits:** if you ever edit
`scripts/google-apps-script.js` again, paste the new version into the
Apps Script editor, then **Deploy → Manage deployments → edit (pencil
icon) → New version → Deploy** — editing the code alone does not
update the live Web App URL.

### Security note on Apps Script "Anyone" access
Setting access to "Anyone" is what lets your public website submit
RSVPs without visitors needing a Google account. It does **not**
expose your spreadsheet or its data — the script only accepts the
narrow `doPost`/`doGet` actions defined in
`scripts/google-apps-script.js` (submit an RSVP, or read aggregate
stats). Your Google account credentials and the spreadsheet itself
stay private; nothing about them is ever sent to the browser.

---

## 5. Admin dashboard security

`/admin` is gated by a **shared passcode** stored in
`NEXT_PUBLIC_ADMIN_PASSCODE` (default `alya-amir-2026` — change this
in `.env.local`). This is a convenience deterrent, **not real
authentication**:

- Because the app is a static/client-rendered site with no server-side
  session store, the check happens in the browser. Anyone who reads
  the deployed JavaScript can find the passcode.
- It stops casual guests from stumbling onto the dashboard; it will
  not stop someone deliberately trying to bypass it.
- The dashboard itself only ever displays names and attendance — no
  contact information is collected in the first place, which limits
  the damage of unwanted access.
- If you need real protection, the standard upgrade path is Vercel's
  built-in **Password Protection** (Pro plans) or a proper login system
  — out of scope for this free-tier build, but straightforward to add
  later if needed.

---

## 6. Add to Calendar

The venue field and `EVENT.startTime`/`EVENT.endTime` feed both the
Google Calendar link and the downloadable `.ics` file (Apple Calendar,
Outlook). Update the times in `lib/config.ts` once confirmed — no
other changes needed.

---

## 7. Background music

Drop an MP3 at `public/audio/background-music.mp3` (see
`public/audio/README.txt`). Mobile browsers block autoplay before any
user gesture, so playback only starts the moment a guest taps "Tap to
Open" (or the music button itself). If the file is missing, the music
button is simply inert — nothing breaks.

---

## 8. Deploy to Vercel

1. Push this project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Next.js — no build configuration needed.
4. Add the same environment variables from `.env.local` in the Vercel
   project's **Settings → Environment Variables**:
   - `NEXT_PUBLIC_RSVP_APPS_SCRIPT_URL`
   - `NEXT_PUBLIC_ADMIN_PASSCODE`
5. Click **Deploy**. You'll get a free `*.vercel.app` URL immediately.
6. (Optional) **Settings → Domains** to connect a custom domain later.

Every push to your main branch redeploys automatically.

---

## 9. What's a placeholder right now

Nothing was invented that you didn't provide. These are intentionally
left as clearly-marked placeholders — see `lib/config.ts` for all of
them:

- **Venue name & address** — only a Google Maps link was given; the
  maps button already works, but the name/address text reads "Venue
  details coming soon" / "Address to be announced" until you fill
  them in.
- **Event start/end time** — only the date was given; a 6:00 PM–10:00
  PM placeholder drives the countdown and calendar today.
- **Schedule times** — four generic run-of-show items with "Time to be
  announced" instead of invented times.
- **Our Story** — an intentionally designed empty state (photo frame +
  one line of text), ready for real photos/copy.
- **Background music file** — not included; add your own MP3.
- **Personalized guest list** — empty by default; add entries as you
  collect them.
- **RSVP Apps Script URL** — empty until you complete section 4 above.

## 10. Known limitations

- The admin dashboard's passcode gate is client-side only (see
  section 5) — adequate for a low-stakes personal event, not a
  substitute for real auth.
- Google Apps Script Web Apps have Google's standard quotas (well
  above what a single event's RSVP traffic will ever need).
- The Apps Script stats endpoint re-reads the whole sheet on each
  request; fine at the scale of a personal guest list, not built to
  scale to thousands of rows.
