# Sanderson Community Center App

## About me
- I am Adam. My first language is ASL. English is my second language, so please use simple, clear English.
- I know Angular, TypeScript, HTML, CSS, JavaScript, Git. I am currently learning Flutter and Dart.
- Please explain things step by step.

## Project goal
An Ionic + Angular mobile app for the Sanderson Community Center of the Deaf and Hard of Hearing.
I am building it for my externship hours, so it must be clean, finished, and on GitHub.

## Features (MVP)
1. Events calendar: bazaars, workshops, basketball, holidays. Filter by category. Show date, time, place, details. Add to phone calendar.
2. Interpreter agencies page: one card per agency with buttons to call, text, email, and open the website.
3. ASL video snippets with captions.
4. Home screen: "This week" events, latest video, big buttons for main sections.

## Later features
- Push notifications for new events and changes
- "Remind me" and favorites
- Simple staff admin screen to add and edit events
- Light and dark mode, larger text option

## Tech plan
- Angular + Ionic + Capacitor (TypeScript). Not Flutter.
- Firebase Firestore (events, agencies), Firebase Storage or YouTube/Vimeo links (videos), Firebase Cloud Messaging (notifications)
- Packages to look at:
  - `@angular/fire` for Firebase
  - `ion-datetime` (built into Ionic) or FullCalendar for the calendar
  - `tel:`, `sms:`, `mailto:` links and `@capacitor/browser` for call, text, email, website
  - HTML `<video>` with a captions `<track>`, or YouTube/Vimeo embed, for videos
  - A Capacitor calendar plugin for "Add to phone calendar"
  - `@capacitor/push-notifications` for notifications

## Design rules (Deaf-friendly)
- Visual first: icons, color, photos, short text
- No audio-only information. Captions on every video.
- Big buttons. Simple navigation with 3 to 4 main tabs.
- Contact options include text, email, and video relay, not just phone numbers.
- Simple, clear English.

## Steps
1. Meet with the center to confirm needs and get the agency list and event info
2. Sketch screens
3. Build base app: navigation and home screen
4. Events screen
5. Interpreter agencies screen
6. Videos screen
7. Connect Firebase
8. Test with real users and fix problems
9. README with screenshots, push to GitHub

## Externship notes
- Keep a log of hours and tasks (date, hours, what I did).
- Ask the school if a staff member at the center can sign off on my hours.
