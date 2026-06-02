# BookPlace

Projekt zaliczeniowy z przedmiotu **Techniki Projektowania Frontendowego** (TPF). Aplikacja webowa wzorowana na serwisach typu Airbnb / Booking, pozwalaj�ca przegl�da� oferty noclegowe, rezerwowa� pobyty, prowadzi� panel hosta i czat mi�dzy go��ciem a gospodarzem.

Aplikacja jest w pe�ni frontendowa � autentykacja realizowana jest przez **Firebase Authentication** (BaaS, dzia�a bez w�asnego backendu), pozosta�e dane (oferty, rezerwacje, czat, recenzje) pochodz� z mock�w w [frontend/src/mocks/](frontend/src/mocks/).

## Live demo

> **URL produkcyjny:** _do uzupe�nienia po deploy�u Vercela_ � np. `https://book-place-tpf.vercel.app`

Deploy: **Vercel** (auto-deploy z ga��zi `main`).

## Stack technologiczny

- **React 19** + **TypeScript** + **Vite**
- **Material UI v7** (`@mui/material`, `@mui/icons-material`, `@mui/x-date-pickers`)
- **React Router v7** (routing klienta, chronione trasy)
- **Firebase Authentication** (email + has�o)
- **react-ga4** � Google Analytics 4
- **@hotjar/browser** � Hotjar (integracja w toku)
- **Leaflet + react-leaflet** � mapa oferty
- **FullCalendar** � kalendarz hosta
- **Swiper** � galerie zdj��

## Struktura projektu

```
BookPlace-TPF/
+- frontend/                # ca�a aplikacja React
�  +- src/
�  �  +- pages/             # widoki przypisane do tras (React Router)
�  �  +- components/
�  �  �  +- common/         # reu�ywalne komponenty (Header, OfferCard, BookingCard, PaginationControls, UserMenu, ...)
�  �  �  +- features/       # komponenty domenowe (auth, booking, chat, checkout, host, offer, search)
�  �  �  +- layout/         # MainLayout
�  �  +- contexts/auth/     # AuthContext + AuthProvider (Firebase Auth)
�  �  +- database/client.ts # initializeApp + getAuth
�  �  +- hooks/             # useAuth, useBooking, useChat, useOffers, useReviews
�  �  +- mocks/             # mockowane dane offer�w, rezerwacji, czatu, recenzji
�  �  +- models/            # typy TS (OfferModels, HostModels, ChatModels, ReviewModels)
�  �  +- utils/ga.ts        # wrapper na react-ga4
�  �  +- App.tsx            # definicja wszystkich tras + AnalyticsListener
�  �  +- main.tsx           # BrowserRouter + ThemeProvider + AuthProvider
�  +- .env.example
�  +- vite.config.ts
+- docs/screenshots/        # screeny do README
+- README.md
```

## Spe�nienie checklisty TPF

| Wymaganie | Status | Gdzie w kodzie |
|---|---|---|
| Odwzorowanie prototypu | OK | wszystkie `pages/` + `components/` |
| Routing wszystkich ekran�w (React Router) | OK | [frontend/src/App.tsx](frontend/src/App.tsx) � `<Routes>` |
| Fallback 404 | _do uzupe�nienia_ | brak `<Route path="*" />` w `App.tsx` |
| Podzia� na `pages/` | OK | [frontend/src/pages/](frontend/src/pages/) |
| Reu�ywalne komponenty | OK | [frontend/src/components/common/](frontend/src/components/common/), [components/features/](frontend/src/components/features/) |
| CSS / stylowanie | OK | MUI + theme [frontend/src/theme.ts](frontend/src/theme.ts) + `App.css`/`index.css` |
| Firebase Authentication | OK | [frontend/src/database/client.ts](frontend/src/database/client.ts), [contexts/auth/AuthContext.tsx](frontend/src/contexts/auth/AuthContext.tsx), [components/features/auth/](frontend/src/components/features/auth/) |
| Chronione trasy | OK | [components/features/auth/ProtectedRoute.tsx](frontend/src/components/features/auth/ProtectedRoute.tsx) |
| Google Analytics (GA4) | OK | [frontend/src/utils/ga.ts](frontend/src/utils/ga.ts), [components/AnalyticsListener.tsx](frontend/src/components/AnalyticsListener.tsx), inicjalizacja w [App.tsx](frontend/src/App.tsx) |
| Hotjar | w toku | placeholder � integracja realizowana niezale�nie |
| Deploy aplikacji | OK | Vercel (link wy�ej) |
| README ze screenami | OK | ten plik |

## Lista tras (React Router)

Publiczne:
- `/` � landing
- `/search` � wyniki wyszukiwania
- `/offer/:offerId` � szczeg�y oferty
- `/booking/checkout` � checkout
- `/booking/confirmation` � potwierdzenie rezerwacji
- `/my-bookings`, `/my-bookings/:bookingId` � moje rezerwacje

Chronione (`ProtectedRoute`):
- `/inbox` � skrzynka u�ytkownika

Chronione + rola `HOST`:
- `/host/dashboard`
- `/host/bookings`
- `/host/calendar`
- `/host/offers`, `/host/offers/add`
- `/host/inbox`

## Lokalne uruchomienie

Wymagania: Node.js 20+ (lub 22).

```powershell
cd frontend
Copy-Item .env.example .env       # uzupe�nij warto�ci z konsoli Firebase + GA4
npm install
npm run dev
```

Aplikacja dost�pna pod http://localhost:5173.

### Wymagane zmienne �rodowiskowe (`frontend/.env`)

Pe�na lista (skopiuj z [frontend/.env.example](frontend/.env.example)):

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

Warto�ci pobierasz z **Firebase Console -> Project settings -> Your apps -> SDK setup and configuration** oraz **Google Analytics -> Admin -> Data Streams -> Measurement ID**.

## Konta testowe / jak si� zalogowa�

Autentykacja oparta o **Firebase Authentication (email + has�o)**. Mo�esz albo:

1. **Zarejestrowa� w�asne konto** w aplikacji (przycisk �Sign in� w prawym g�rnym rogu -> zak�adka �Sign up�).
2. **U�y� gotowych kont** (je�li zosta�y dodane do README poni�ej).

> Aby otrzyma� rol� `HOST` i widzie� trasy `/host/*`, email konta musi by� w domenie `@host.com` (fallback w [AuthContext.tsx](frontend/src/contexts/auth/AuthContext.tsx) gdy brak custom claims w Firebase).

| Rola | Email | Has�o |
|---|---|---|
| USER | _do uzupe�nienia_ | _do uzupe�nienia_ |
| HOST | _do uzupe�nienia (np. demo@host.com)_ | _do uzupe�nienia_ |

## Deploy

Aplikacja zhostowana na **Vercel** (darmowy plan Hobby). Konfiguracja:

- **Root Directory:** `frontend`
- **Framework Preset:** Vite (auto-detected)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Zmienne �rodowiskowe:** wszystkie `VITE_*` z `.env` ustawione w Project Settings -> Environment Variables.
- **Firebase Authorized domains:** domena Vercela dodana w Firebase Console -> Authentication -> Settings -> Authorized domains.

Ka�dy push na `main` -> automatyczny deploy produkcyjny. Ka�dy PR -> Preview deployment z w�asnym URL-em.

## Zrzuty ekranu � aplikacja

> Pliki w [docs/screenshots/app/](docs/screenshots/app/).

### Landing page
![Landing](docs/screenshots/app/landing.png)

### Wyszukiwanie ofert
![Search](docs/screenshots/app/search.png)

### Szczeg�y oferty
![Offer](docs/screenshots/app/offer.png)

### Checkout
![Checkout](docs/screenshots/app/checkout.png)

### Potwierdzenie rezerwacji
![Booking confirmation](docs/screenshots/app/booking-confirmation.png)

### Moje rezerwacje
![My bookings](docs/screenshots/app/my-bookings.png)

### Skrzynka / czat
![Inbox](docs/screenshots/app/inbox.png)

### Logowanie / rejestracja (modal)
![Login modal](docs/screenshots/app/login-modal.png)

### Panel hosta � dashboard
![Host dashboard](docs/screenshots/app/host-dashboard.png)

### Panel hosta � rezerwacje
![Host bookings](docs/screenshots/app/host-bookings.png)

### Panel hosta � kalendarz
![Host calendar](docs/screenshots/app/host-calendar.png)

### Panel hosta � dodawanie oferty
![Host add offer](docs/screenshots/app/host-add-offer.png)

## Zrzuty ekranu � Google Analytics

> Pliki w [docs/screenshots/ga/](docs/screenshots/ga/).

### Realtime
![GA Realtime](docs/screenshots/ga/ga-realtime.png)

### Pages and screens
![GA Pages and screens](docs/screenshots/ga/ga-pages-and-screens.png)

### Events
![GA Events](docs/screenshots/ga/ga-events.png)

## Zrzuty ekranu � Hotjar

> Integracja Hotjar realizowana niezale�nie. Poni�ej placeholdery � zostan� zast�pione realnymi screenami po wdro�eniu.
>
> Pliki w [docs/screenshots/hotjar/](docs/screenshots/hotjar/).

### Dashboard
![Hotjar dashboard](docs/screenshots/hotjar/hotjar-dashboard.png)

### Heatmapa
![Hotjar heatmap](docs/screenshots/hotjar/hotjar-heatmap.png)

### Recording
![Hotjar recording](docs/screenshots/hotjar/hotjar-recording.png)
