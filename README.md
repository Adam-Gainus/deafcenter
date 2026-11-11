# Sanderson Center

A mobile app for the Sanderson Community Center of the Deaf and Hard of Hearing.

The app helps the Deaf and Hard of Hearing community find events, interpreter agencies, and ASL videos in one place.

**Status:** In development. The base project is set up. Features are not built yet.

## Planned features

- **Events calendar** — bazaars, workshops, basketball, holidays. Filter by category. Add an event to your phone calendar.
- **Interpreter agencies** — one card per agency, with buttons to call, text, email, and open the website.
- **ASL videos** — short videos, always with captions.
- **Home screen** — events this week, the latest video, and big buttons for the main sections.

## Design rules (Deaf-friendly)

- Visual first: icons, color, photos, short text
- No audio-only information. Captions on every video.
- Big buttons and simple navigation
- Contact options include text, email, and video relay, not only phone numbers
- Simple, clear English

## Built with

- [Angular](https://angular.dev/) and TypeScript
- [Ionic](https://ionicframework.com/) for the mobile UI
- [Capacitor](https://capacitorjs.com/) to run on iOS and Android

## Get started

You need [Node.js](https://nodejs.org/) (version 22 or 24 is best) and npm.

```bash
# 1. Install the packages
npm install

# 2. Run the app in the browser
npm start
```

Then open http://localhost:4200 in your browser.

## Other commands

| Command | What it does |
| --- | --- |
| `npm run build` | Build the app into the `www` folder |
| `npm run lint` | Check the code for problems |
| `npm run test:unit` | Run the unit tests |
| `npm run test:e2e` | Run the end-to-end tests |

## Run on a phone

The iOS and Android projects are not added yet. When you are ready:

```bash
npm install @capacitor/ios @capacitor/android
npm run build
npx cap add ios
npx cap add android
npx cap sync
```

Then open the native project with `npx cap open ios` or `npx cap open android`.

## Project folders

| Folder | What is inside |
| --- | --- |
| `src/app` | The app pages and components |
| `src/assets` | Images and icons |
| `src/theme` | Colors and styles |
| `e2e` | End-to-end tests |

## Author

Adam — built as an externship project for the Sanderson Community Center of the Deaf and Hard of Hearing.
