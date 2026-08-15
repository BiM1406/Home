# RoomRent - AI Agent Context & Project Instructions

> **Project Goal**: RoomRent is a direct rental platform connecting Landlords and Renters with 3 distinct roles: `Admin`, `Landlord`, and `Renter`.

---

## 1. Technology Stack & Rules

- **Frontend Architecture**: Pure Vanilla SPA (Single Page Application, Hash Router, ES6 Modules).
- **Core Technologies**:
  - **HTML5**: Semantic markup, accessible attributes (`aria-*`, proper `h1-h6` hierarchy).
  - **CSS3**: Vanilla CSS with custom Design System (`css/base.css`, `layout.css`, `components.css`, `responsive.css`).
    - *Strict Rule*: **DO NOT USE TAILWIND CSS**.
    - Use HSL CSS custom properties (`--primary`, `--surface`, `--text-main`, etc.).
    - Mobile-first responsive layout (Touch/Swipe gestures, fluid containers).
  - **JavaScript**: Pure Vanilla JS (ES6 Modules, no heavy frontend frameworks, no node_modules required).
- **Data & State**:
  - LocalStorage & In-memory Client Store (`js/services/store.js`, `js/services/auth.js`).
  - BroadcastChannel / EventTarget for multi-tab simulation.

---

## 2. Project Directory Map

```text
ChoThueNha/
├── index.html                  # Khung SPA Shell duy nhất
│
├── css/                        # Hệ thống CSS Design System
│   ├── base.css                # Biến HSL, Reset, Typography
│   ├── layout.css              # Header, Navbar, Footer, Transition
│   ├── components.css          # Buttons, Cards, Badges, Modals, Forms
│   └── responsive.css          # Tối ưu Mobile & Tablet
│
├── js/                         # JavaScript ES6 Modules
│   ├── app.js                  # Entry point chính
│   ├── router.js               # SPA Hash Router điều hướng không reload
│   ├── services/               # Store & Auth service
│   ├── components/             # Navbar, Footer, Toast...
│   └── views/                  # Các trang chức năng độc lập (Home, Search, Detail, Post, Chat, Contract, Dashboard, Admin)
│
├── assets/                     # Hình ảnh và biểu tượng
│   ├── images/
│   └── icons/
│
├── docs/                       # Tài liệu kỹ thuật
├── .gitignore
├── README.md
└── AGENTS.md                   # Chỉ dẫn cho AI Agents
```

---

## 3. Core Functional Requirements (FR)

1. **FR-01 (User & Auth)**: 3 roles (`Admin`, `Landlord`, `Renter`), LocalStorage auth, role switcher, Verified landlord badges.
2. **FR-02 (Post Property - Landlord)**: 8-step wizard form, custom fields for **Villa & Luxury Apartment** (pool, garden, 24/7 security, parking), property lifecycle (*Draft, Pending, Active, Inactive, Expired*).
3. **FR-03 (Search, Filter & Slideshow - Renter)**:
   - Hero Carousel with auto-play & mobile touch swipe.
   - Luxury Apartment section (gold badges) & Villa section (amenity tags).
   - Advanced search filters (toggle Luxury, multi-select Villa amenities, price range, area).
   - Room detail gallery with Lightbox popup.
4. **FR-04 (Viewing Appointments)**: Booking schedule with 4 states (*Pending, Confirmed, Cancelled, Completed*).
5. **FR-05 (Client 1-1 Chat)**: Realtime-feel chat with auto-masking phone numbers (PII protection).
6. **FR-06 (Digital Contract)**: Auto-filled lease contract template, e-signature confirmation, printable PDF format.
7. **FR-07 (Packages & Promote)**: Free, Standard (49k/mo), VIP (149k/mo) listings, simulated payment flow.
8. **FR-08 (Admin Panel)**: Review/approve pending listings, manage users, revenue & platform metrics.
9. **FR-09 (i18n & Currency)**: Bilingual (Vietnamese default ↔ English) and Dual Currency (VND default ↔ USD).

---

## 4. Development & Running

- **Run Locally**: Open `index.html` with **Live Server** (VS Code extension) or any static HTTP server.

---

## 5. UI/UX & Coding Standards

- When designing or coding frontend components, adhere to modern clean design principles.
- Use skill `/ui-ux-pro-max` for guidance on color harmony, micro-animations, typography, and responsive UX.
- Maintain high code quality, clean comments, zero unnecessary dependencies.
