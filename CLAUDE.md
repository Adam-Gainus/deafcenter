# Sanderson Community Center App

## About me
- I am Adam. My first language is ASL. English is my second language, so please use simple, clear English.
- I know Angular, TypeScript, HTML, CSS, JavaScript, Git. I am currently learning Flutter and Dart.
- Please explain things step by step.

## Project goal
An Ionic + Angular mobile app for the Sanderson Community Center of the Deaf and Hard of Hearing.
I am building it for my externship hours, so it must be clean, finished, and on GitHub.

## Features (MVP)
1. Events calendar with 3 categories: Event, Workshop, Class (the center chose these). Filter by category. Show date, time, place, details. Add to phone calendar.
2. Interpreter agencies page: one card per agency with buttons to call, text, email, and open the website.
3. ASL video snippets with captions.
4. Home screen: "This week" events, latest video, big buttons for main sections.
5. Staff admin: staff log in and add, edit, and cancel events, with a flyer picture.

## Events rules
- No real events in the code. Events come only from staff, through the app.
- Test events go only in `.spec.ts` test files.
- When there are no events, show a friendly empty message, like "No events this week".
- Cancelled events stay in the list with a clear "CANCELLED" label. Delete only events added by mistake.
- Roles: staff, manager, director. Managers and the director are "approvers".
- Approval: when regular staff add, cancel, or delete an event, 1 approver (any manager or the director) must approve it. A new event stays hidden from the public until approved. Approvers can add, cancel, and delete right away.
- Adding staff: managers and the director invite new hires by email and role (invite system, works on the free plan). The new hire creates their own password and verifies their email. Managers can invite staff and managers; only the director can invite a director. Approvers remove staff by deleting their staff document.
- The app uses the device date and time: hide past events, and "This week" always starts from today.
- Show event times in the center's time zone.

## Later features
- Push notifications for new events and changes
- "Remind me" reminders before an event (local notifications) and favorites
- Light and dark mode, larger text option

## Tech plan
- Angular + Ionic + Capacitor (TypeScript). Not Flutter.
- Firebase Firestore (events, agencies), Firebase Storage (event flyers; videos or YouTube/Vimeo links), Firebase Authentication (staff login), Firebase Cloud Messaging (notifications)
- Packages to look at:
  - `@angular/fire` for Firebase
  - `ion-datetime` (built into Ionic) or FullCalendar for the calendar
  - `tel:`, `sms:`, `mailto:` links and `@capacitor/browser` for call, text, email, website
  - HTML `<video>` with a captions `<track>`, or YouTube/Vimeo embed, for videos
  - A Capacitor calendar plugin for "Add to phone calendar"
  - `@capacitor/push-notifications` for notifications
  - `@capacitor/local-notifications` for "Remind me" reminders

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
4. Event model and events service (hide past events, find "this week")
5. "This week" on the Home screen, with an empty state
6. Connect Firebase (events and flyers)
7. Staff login and admin screen: add, edit, and cancel events with a flyer
8. Events screen with the category filter
9. Interpreter agencies screen
10. Videos screen
11. Test with real users and fix problems
12. README with screenshots, push to GitHub

## Externship notes
- Keep a log of hours and tasks (date, hours, what I did).
- Ask the school if a staff member at the center can sign off on my hours.
