# RoomRent Architecture & System Design

## 1. High-Level Architecture Overview

RoomRent is built using a Clean Modular Architecture separating Presentation (Vanilla HTML5/CSS3/ES6 JavaScript) and Backend Services (Node.js/Express, REST API, Socket.io Realtime Server).

```
┌─────────────────────────────────────────────────────────────┐
│                       Client Layer                          │
│  - Vanilla HTML5 / Semantic Templates                       │
│  - Vanilla CSS3 (Custom Design System, HSL Tokens, No TW)   │
│  - Vanilla JS ES6 Modules (Touch/Swipe Slideshow, i18n)     │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / WebSocket
┌──────────────────────────────▼──────────────────────────────┐
│                    API & Gateway Layer                      │
│  - Express.js Router & Middleware (JWT Auth, Role Guard)    │
│  - Static Asset Pre-rendering & SEO Sitemap Generator        │
│  - Socket.io Real-time Chat Engine                          │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                   Domain Controller Layer                   │
│  - AuthController       - PropertyController (Filter/Wizard)│
│  - BookingController    - ChatController (Sanitize PII)     │
│  - ContractController   - AdminController (Stats/Approval)  │
│  - PaymentController (Momo/VNPay Package Checkout)          │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                  Data Store & Models Layer                  │
│  - DatabaseStore (In-Memory / SQLite / PostgreSQL Ready)    │
│  - Seed Data (Villas, Luxury Apartments, Rooms, Users)     │
└─────────────────────────────────────────────────────────────┘
```

## 2. Directory Structure & Conventions

- `public/`: Static frontend assets (HTML, CSS, JS, Images, Icons)
- `server/`: Backend server, API routes, Controllers, Middleware, Data store, Unit tests
- `docs/`: System documentation and architecture diagrams

## 3. Key Feature Modules

1. **Hero & Gallery Slideshow Engine**: Native touch-swipe gestures for mobile and desktop carousel with thumbnail strip.
2. **Advanced Multi-Dimensional Filtering**: Toggle for Luxury apartments and multi-select for Villa conditions (Pool, Garden, 24/7 Security, Garage, Security Camera).
3. **8-Step Landlord Wizard**: Streamlined property posting workflow with real-time preview and condition picker.
4. **Digital Rental Contract**: Standard template generation, digital consent sign-off, and PDF print preview.
5. **Real-time Chat & Viewing Scheduler**: 1-on-1 direct communication with property card attachment and automated phone number redaction for security.
