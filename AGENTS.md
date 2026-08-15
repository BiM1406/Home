# RoomRent - AI Agent Context & Project Instructions

> **Project Goal**: RoomRent is a direct rental platform connecting Landlords and Renters with 3 distinct roles: `Admin`, `Landlord`, and `Renter`.

---

## 1. Technology Stack & Rules

- **Frontend**:
  - **HTML5**: Semantic markup, accessible attributes (`aria-*`, proper `h1-h6` hierarchy).
  - **CSS3**: Vanilla CSS with custom Design System (`public/css/base.css`, `layout.css`, `components.css`, `slideshow.css`, `responsive.css`).
    - *Strict Rule*: **DO NOT USE TAILWIND CSS**.
    - Use HSL CSS custom properties (`--primary`, `--surface`, `--text-main`, etc.).
    - Mobile-first responsive layout (Touch/Swipe gestures, fluid containers).
  - **JavaScript**: Pure Vanilla JS (ES6 Modules, no heavy frontend frameworks).
- **Backend**:
  - Node.js + Express.js (`server/server.js`, `server/controllers/`, `server/routes/apiRoutes.js`).
  - Realtime: Socket.io for 1-1 Chat between Renter and Landlord.
  - Auth: JWT (JSON Web Tokens) with role-based access control (`Admin`, `Landlord`, `Renter`).
  - Database: In-memory store (`server/data/db.js`) seeded from `server/data/seedData.js`.

---

## 2. Project Directory Map

```
ChoThueNha/
├── server/
│   ├── server.js              # Express + Socket.io Server entry point
│   ├── config/constants.js     # Property types, statuses, roles, exchange rates
│   ├── data/seedData.js       # Seed mock data (Villas, Luxury Apartments, Rooms)
│   ├── data/db.js             # In-memory database CRUD store
│   ├── middleware/authMiddleware.js # JWT & Role authorization
│   ├── controllers/           # REST API business logic
│   ├── routes/apiRoutes.js    # API Router endpoints
│   └── tests/api.test.js      # Automated unit tests
├── public/
│   ├── css/                   # Design system & modular CSS
│   ├── js/                    # Client logic (slideshow.js, filter.js, wizard.js, chat.js, i18n.js)
│   └── *.html                 # Semantic HTML pages (index, search, detail, post-property, chat, dashboard, admin, login)
├── docs/                      # Technical docs & architecture specifications
└── AGENTS.md                  # This instructions file for AI Agents
```

---

## 3. Core Functional Requirements (FR)

1. **FR-01 (User & Auth)**: 3 roles (`Admin`, `Landlord`, `Renter`), JWT auth, role switcher, Verified landlord badges.
2. **FR-02 (Post Property - Landlord)**: 8-step wizard form, custom fields for **Villa & Luxury Apartment** (pool, garden, 24/7 security, parking), property lifecycle (*Draft, Pending, Active, Inactive, Expired*).
3. **FR-03 (Search, Filter & Slideshow - Renter)**:
   - Hero Carousel with auto-play & mobile touch swipe.
   - Luxury Apartment section (gold badges) & Villa section (amenity tags).
   - Advanced search filters (toggle Luxury, multi-select Villa amenities, price range, area).
   - Room detail gallery with Lightbox popup.
4. **FR-04 (Viewing Appointments)**: Booking schedule with 4 states (*Pending, Confirmed, Cancelled, Completed*).
5. **FR-05 (Realtime 1-1 Chat)**: Socket.io chat tied to property cards; PII protection (auto-mask phone numbers).
6. **FR-06 (Digital Contract)**: Auto-filled lease contract template, e-signature confirmation, printable PDF format.
7. **FR-07 (Packages & Promote)**: Free, Standard (49k/mo), VIP (149k/mo) listings, simulated payment flow.
8. **FR-08 (Admin Panel)**: Review/approve pending listings, manage users, revenue & platform metrics.
9. **FR-09 (i18n & Currency)**: Bilingual (Vietnamese default ↔ English) and Dual Currency (VND default ↔ USD).

---

## 4. Development & Testing Commands

- **Run Dev Server**: `npm start` (Runs at `http://localhost:3000`)
- **Run Unit Tests**: `npm test` (Runs automated API tests in `server/tests/api.test.js`)

---

## 5. UI/UX & Coding Standards

- When designing or coding frontend components, adhere to modern clean design principles.
- Use skill `/ui-ux-pro-max` for guidance on color harmony, micro-animations, typography, and responsive UX.
- Maintain high code quality, proper error handling, clean comments, and zero unused dependencies.
