# 🚀 React / Next.js / TypeScript Journey

---

## 🇬🇧 English Version

This repository documents my frontend learning journey focused on **React**, **Next.js**, and **TypeScript**.  
I will gradually go through and practice topics from the React ecosystem, moving towards more advanced areas like DevOps and team collaboration.  

### 📚 Learning Plan

#### ⚛️ React and ecosystem
- JSX, functional and class components, lifecycle, Virtual DOM
- Hooks: useState, useEffect, useRef, useMemo, useCallback, useReducer, custom hooks
- Context API and state management (Redux, Zustand, Recoil, Jotai)
- Rendering optimization (React.memo, memoization, lazy loading)
- Forms and validation (React Hook Form, Formik, Yup/Zod)
- React Router: dynamic routing, nested routes, guards
- React Query / SWR – fetching, caching, API synchronization
- Error boundaries and exception handling
- Internationalization (i18n)

#### ⚡ Next.js
- SSR, SSG, ISR, CSR – differences and use cases
- API Routes and backend integration
- App Router (13+): server components, streaming, actions
- Dynamic routing and parameters
- Image optimization, fonts, metadata
- Middleware and edge functions
- Revalidation (on-demand ISR)
- Authentication (NextAuth, JWT)

#### 🟦 TypeScript
- Typing props, state, and hooks
- Generics and utility types
- Handling `any` vs strict typing
- `tsconfig.json` configuration

#### 🎨 Styling and UI
- CSS fundamentals: Flexbox, Grid, responsiveness
- Tailwind, Styled Components, Emotion, CSS Modules
- Design Systems: MUI, Chakra, shadcn/ui
- Accessibility (ARIA, keyboard navigation)
- Animations: Framer Motion, React Spring

#### 📡 API Integration
- REST (fetch, axios, retry)
- GraphQL (Apollo, urql)
- WebSockets and real-time
- Caching and data synchronization

#### 🧪 Testing
- Unit and component tests (Jest, React Testing Library)
- E2E (Cypress, Playwright)
- API mocking (MSW)
- Coverage and best practices

#### 🛠️ Developer Tools
- Git (GitFlow, trunk-based, rebase vs merge)
- CI/CD: GitHub Actions, GitLab CI
- Docker basics
- ESLint, Prettier, Husky
- Build tools: Vite, Webpack, Turbopack

#### 🔒 Security
- XSS, CSRF, data sanitization
- Tokens (cookies vs localStorage)
- Rate limiting and API protection

#### 🌐 Performance
- Lighthouse and Core Web Vitals
- React profiling
- Lazy loading images
- Debounce/throttle

#### ☁️ DevOps / Cloud
- Deployment (Vercel, Netlify, AWS, Azure)
- Monitoring (Sentry, Datadog, LogRocket)

#### 👥 Teamwork
- Code review and clean code
- Storybook
- Jira/YouTrack, Agile/Scrum basics

#### 🏗 Architecture (Frontend Application)

##### Project structure & modularization
- Feature-Sliced Design (FSD) and Domain-Driven Design (DDD) to align code with business domains.
- Separation of concerns: UI (components), logic (services/state), API (clients/types).
- Internal feature APIs: expose stable contracts between features (types, selectors, actions).

##### Monorepo vs polyrepo
- Monorepo for shared tooling, atomic changes, and shared libraries; polyrepo for independent lifecycle and isolation.
- Turborepo / Nx: task graph, caching, affected builds/tests, generators, and dependency constraints.
- Choose based on team size, release cadence, and shared code volume.

##### Design patterns in React
- Container/Presentational split for testability and reuse.
- Compound components for flexible APIs (e.g., `<Tabs><Tabs.List/><Tabs.Panel/></Tabs>`).
- Render props vs hooks: prefer hooks in modern code; render props for cross-framework reuse.
- Provider pattern to inject cross-cutting concerns (theme, i18n, auth) via context.

##### Scalability principles
- Code splitting and lazy loading per feature and per route (dynamic imports).
- Low coupling, high cohesion: group by domain; avoid deep cross-feature imports.
- Strict public API per feature to control dependencies and enable refactors.

##### Config & environment management
- Multiple environments (dev/staging/prod) with typed env accessors.
- Secrets in `.env` (never commit), use platform secrets manager; validate with schema (e.g., Zod).

#### 🧩 Frontend System Design

##### State management design
- Model global vs local state deliberately; avoid over-globalization.
- Normalize server data (Redux Toolkit, Zustand patterns) to prevent duplication.

##### Data fetching & caching strategy
- React Query / SWR for request dedupe, caching, background refresh.
- Cache invalidation via keys/scopes; optimistic updates with rollback on error.

##### Routing strategy
- Nested routes and guards; route-level dynamic imports for code splitting.
- Centralized route config with per-route loaders and error boundaries.

##### Performance-oriented design
- Choose SSR vs CSR vs SSG vs ISR by data freshness, personalization, and SEO needs.
- CDN and edge caching for static assets and HTML where applicable.
- Bundle analyzer, split vendor/app chunks, image/font optimization.

##### Error handling system
- Global error boundaries with fallback UIs; typed error domains.
- Logging/monitoring (Sentry, Datadog), user/session correlation, retries with backoff.

##### Internationalization strategy
- Lazy-load translations per locale/namespace; co-locate language files by feature.
- Consistent message IDs, extraction and QA process.

##### Design systems
- Custom component library with tokens (colors, spacing, typography) and primitives (Button, Modal, FormField).
- Theming with CSS variables or theming provider; dark mode strategy.

##### Authentication & authorization
- Token refresh flow (silent refresh/rotation), secure storage (httpOnly cookies preferred).
- Role-based access control (RBAC) with route and component-level guards.

---

## 🇵🇱 Wersja polska

To repozytorium dokumentuje moją naukę frontendu z naciskiem na **React**, **Next.js** i **TypeScript**.  
Będę tutaj krok po kroku uczyć się i praktykować kolejne zagadnienia z ekosystemu Reacta, aż po bardziej zaawansowane tematy związane z DevOps i pracą zespołową.  

### 📚 Plan nauki

#### ⚛️ React i ekosystem
- JSX, komponenty funkcyjne i klasowe, lifecycle, Virtual DOM
- Hooks: useState, useEffect, useRef, useMemo, useCallback, useReducer, custom hooks
- Context API i zarządzanie stanem (Redux, Zustand, Recoil, Jotai)
- Optymalizacja renderowania (React.memo, memoization, lazy loading)
- Formularze i walidacja (React Hook Form, Formik, Yup/Zod)
- React Router: dynamiczny routing, nested routes, guardy
- React Query / SWR – fetching, cache, synchronizacja z API
- Error boundaries i obsługa wyjątków
- Internationalization (i18n)

#### ⚡ Next.js
- SSR, SSG, ISR, CSR – różnice i zastosowania
- API Routes i integracja backendu
- App Router (13+): serwerowe komponenty, streaming, actions
- Dynamiczny routing i parametry
- Image optimization, fonty, metadata
- Middleware i edge functions
- Revalidation (on-demand ISR)
- Autoryzacja (NextAuth, JWT)

#### 🟦 TypeScript
- Typowanie propsów, state, hooków
- Typy generyczne i utility types
- Obsługa `any` vs ścisłe typowanie
- Konfiguracja `tsconfig.json`

#### 🎨 Styling i UI
- CSS fundamentals: Flexbox, Grid, responsywność
- Tailwind, Styled Components, Emotion, CSS Modules
- Design Systems: MUI, Chakra, shadcn/ui
- Dostępność (ARIA, keyboard navigation)
- Animacje: Framer Motion, React Spring

#### 📡 Integracja z API
- REST (fetch, axios, retry)
- GraphQL (Apollo, urql)
- WebSockets i real-time
- Cache i synchronizacja danych

#### 🧪 Testowanie
- Unit i component tests (Jest, React Testing Library)
- E2E (Cypress, Playwright)
- Mockowanie API (MSW)
- Coverage i best practices

#### 🛠️ Narzędzia developerskie
- Git (GitFlow, trunk-based, rebase vs merge)
- CI/CD: GitHub Actions, GitLab CI
- Docker basics
- ESLint, Prettier, Husky
- Build tools: Vite, Webpack, Turbopack

#### 🔒 Bezpieczeństwo
- XSS, CSRF, sanitizacja danych
- Tokeny (cookies vs localStorage)
- Rate limiting i ochrona API

#### 🌐 Performance
- Lighthouse i Core Web Vitals
- Profilowanie React
- Lazy loading obrazków
- Debounce/throttle

#### ☁️ DevOps / Cloud
- Deployment (Vercel, Netlify, AWS, Azure)
- Monitorowanie (Sentry, Datadog, LogRocket)

#### 👥 Praca zespołowa
- Code review i czytelny kod
- Storybook
- Jira/YouTrack, Agile/Scrum basics

#### 🏗 Architektura (Aplikacja Frontendowa)

##### Struktura projektu i modularizacja
- Feature-Sliced Design (FSD) oraz Domain-Driven Design (DDD) zgodnie z domenami biznesowymi.
- Separacja odpowiedzialności: UI (komponenty), logika (serwisy/stan), API (klienci/typy).
- Wewnętrzne API funkcji (feature): stabilne kontrakty między modułami (typy, selektory, akcje).

##### Monorepo vs polyrepo
- Monorepo: wspólne narzędzia, atomowe zmiany, współdzielone biblioteki; polyrepo: niezależny cykl życia i izolacja.
- Turborepo / Nx: graf zadań, cache, „affected” build/test, generatory, ograniczenia zależności.
- Wybór zależny od wielkości zespołu, tempa wydań i ilości wspólnego kodu.

##### Wzorce projektowe w React
- Podział Container/Presentational dla testowalności i ponownego użycia.
- Komponenty złożone (compound) dla elastycznych API.
- Render props vs hooki: preferuj hooki; render props dla szerszej kompatybilności.
- Wzorzec Providera do dostarczania kontekstu (theme, i18n, auth).

##### Zasady skalowalności
- Dzielenie kodu i leniwe ładowanie per funkcja i per trasa (dynamic imports).
- Niskie sprzężenie, wysoka spójność: grupuj wg domen; unikaj głębokich importów między modułami.
- Ścisłe publiczne API modułów ułatwia refaktoryzację.

##### Konfiguracja i środowiska
- Wiele środowisk (dev/staging/prod) z typowanym dostępem do zmiennych.
- Sekrety w `.env` (nie commitować), menedżer sekretów; walidacja schematem (np. Zod).

#### 🧩 Projektowanie systemów frontendu

##### Projekt stanu
- Świadome rozróżnienie stanu globalnego i lokalnego; unikaj nadmiernej globalizacji.
- Normalizacja danych z serwera (Redux Toolkit, wzorce w Zustand) by uniknąć duplikacji.

##### Pobieranie i cache danych
- React Query / SWR: deduplikacja, caching, odświeżanie w tle.
- Inwalidacja cache po kluczach/zakresach; optymistyczne aktualizacje z rollbackiem.

##### Routing
- Zagnieżdżone trasy i guardy; dynamic imports na poziomie tras dla code splittingu.
- Scentralizowana konfiguracja tras z loaderami i error boundaries per trasa.

##### Wydajność
- Wybór SSR vs CSR vs SSG vs ISR wg świeżości danych, personalizacji i SEO.
- CDN i cache na brzegu dla assetów i HTML gdzie to możliwe.
- Analiza paczki, rozdział vendor/app, optymalizacja obrazów/czcionek.

##### Obsługa błędów
- Globalne granice błędów z fallbackami; typowanie domen błędów.
- Logowanie/monitoring (Sentry, Datadog), korelacja użytkownik/sesja, retry z backoff.

##### Internationalizacja
- Leniwe ładowanie tłumaczeń per locale/namespace; pliki językowe współlokalizowane przy funkcjach.
- Spójne ID komunikatów, proces ekstrakcji i QA.

##### Systemy designu
- Własna biblioteka komponentów z tokenami (kolory, spacing, typografia) i prymitywami (Button, Modal, FormField).
- Theming poprzez zmienne CSS lub provider; strategia dark mode.

##### Uwierzytelnianie i autoryzacja
- Odnawianie tokenów (silent refresh/rotacja), bezpieczne przechowywanie (preferencja httpOnly cookies).
- RBAC i guardy na poziomie tras oraz komponentów.
