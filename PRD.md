# PRD: PlantLight Guide

## Executive Summary & Product Vision

PlantLight Guide is a single-page utility widget that empowers indoor plant owners to assess whether a specific room location receives adequate light for their chosen plant species. The widget accepts three user inputs (plant type, window direction, distance from window), applies a simplified light-level lookup model, and delivers an immediate verdict with actionable guidance.

**Core Value Proposition:** Eliminate guesswork in plant placement by providing instant, data-driven light compatibility assessment in under 30 seconds.

**Product Type:** Embeddable single-page widget (React SPA) deployable via iframe or direct integration.

**Success Criteria:** Users receive a clear pass/fail/marginal verdict with estimated foot-candles, plant requirements, and a contextual care tip within a single interaction.

---

## Problem Statement & Target Users

## Problem
Indoor plant owners frequently misplace plants in inadequate light, resulting in poor growth, leaf drop, and plant death. Existing solutions require manual research across multiple sources or expensive light meters. No lightweight, instant assessment tool exists for casual plant enthusiasts.

## Target Users

| User Segment | Characteristics | Primary Need |
|:---|:---|:---|
| Casual Plant Owners | 1–5 plants; minimal horticultural knowledge | Quick, guilt-free placement validation |
| Apartment Dwellers | Limited window access; variable room geometry | Maximize light from constrained spaces |
| Beginners | First-time plant buyers; high anxiety about care | Confidence before purchase |
| Interior Designers | Client plant recommendations; space planning | Fast, repeatable light assessment |

---

## System Scope & User Roles

## Scope Boundaries
- **In Scope:** Plant selection, window direction input, distance-from-window categorization, light-level calculation, verdict display, care tip delivery, widget reset.
- **Out of Scope:** User accounts, data persistence, seasonal light variation, artificial light spectrum analysis, multi-room comparisons, historical tracking.

## User Roles & Permissions

| Role | Capability | Constraints |
|:---|:---|:---|
| End User (Plant Owner) | Select plant, input room parameters, view verdict & care tip | Read-only; no data modification |
| Admin (Future) | Manage plant database, update light ranges, edit care tips | Not included in v1 |

---

## Functional Requirements

## User-Facing Requirements

**FR-1: Plant Selection Interface**
- Display a dropdown or button-grid selector with exactly 5 preset plant types: Succulent, Fern, Pothos, Snake Plant, Orchid.
- Each plant option must be labeled with common name and scientific name (e.g., "Pothos (Epipremnum aureum)").
- Selection must be visually distinct (highlight/border on active choice).
- Selecting a new plant must reset all downstream inputs and results.

**FR-2: Window Direction Input**
- Provide four mutually exclusive options: North, South, East, West.
- Display as button group or radio buttons with cardinal direction icons/labels.
- Default to no selection; require explicit user choice before calculation.

**FR-3: Distance-from-Window Categorization**
- Offer three distance tiers as radio buttons or segmented control:
  - Near Window (≤1 m)
  - Mid-Room (1–3 m)
  - Far from Window (>3 m)
- Include brief descriptive text (e.g., "Near Window: Can touch the glass when arm extended").
- Default to no selection; require explicit user choice before calculation.

**FR-4: Light-Level Calculation Engine**
- Implement a hardcoded lookup table mapping (Plant Type, Window Direction, Distance Tier) → Estimated Daily Light Level (foot-candles).
- Use simplified model: assume clear glass, no obstructions, average seasonal conditions (spring/fall baseline).
- Return a single numeric value (integer foot-candles) and a confidence label ("Estimated").
- Calculation must execute synchronously on input change; no API calls.

**FR-5: Verdict Generation**
- Compare calculated light level against plant's required range (min–max foot-candles).
- Return one of three verdicts:
  - ✅ **Great Match** (calculated ≥ plant max requirement)
  - ⚠️ **Marginal — Consider a Grow Light** (calculated within plant range but <20% above minimum)
  - ❌ **Too Dark — Choose a Different Spot** (calculated < plant minimum)
- Display verdict with emoji icon, bold text, and contrasting background color (green/yellow/red).

**FR-6: Result Panel Display**
- Show in a single, scrollable card:
  - Plant name (selected)
  - Window direction (selected)
  - Distance tier (selected)
  - Estimated light level (foot-candles, e.g., "245 fc")
  - Plant's ideal light range (e.g., "100–300 fc")
  - Verdict (icon + text)
  - One-sentence care tip (static, plant-specific; e.g., "Pothos thrives in indirect light and tolerates low-light corners.")
- All text must be readable on mobile (min 14px font).

**FR-7: Care Tip Delivery**
- Hardcode exactly one care tip per plant type.
- Tip must be actionable and light-related (not generic watering advice).
- Display only after verdict is generated.
- Tip must remain visible until user selects a new plant.

**FR-8: Widget Reset Behavior**
- Selecting a new plant must clear:
  - Window direction selection
  - Distance-from-window selection
  - Previous verdict and result panel
  - Previous care tip
- Input fields must return to default (empty/unselected) state.
- No confirmation dialog required.

**FR-9: Responsive Layout**
- Widget must render correctly on mobile (320px), tablet (768px), and desktop (1024px+).
- Touch targets must be ≥44px × 44px on mobile.
- Result panel must stack vertically on mobile; side-by-side layout optional on desktop.

**FR-10: Accessibility Compliance**
- All interactive elements must have descriptive aria-labels.
- Color verdicts must not rely on color alone; include text and icons.
- Keyboard navigation must be fully functional (Tab, Enter, Arrow keys).
- WCAG 2.1 AA minimum.

---

## Non-Functional Requirements

| Requirement | Target | Rationale |
|:---|:---|:---|
| **Page Load Time** | <1.5 s (Vercel CDN) | Mobile-first UX; widget must feel instant |
| **Calculation Latency** | <50 ms | Synchronous lookup; no perceptible delay on input change |
| **Bundle Size** | <150 KB (gzipped) | Embeddable widget; minimize iframe overhead |
| **Browser Support** | Chrome, Firefox, Safari, Edge (latest 2 versions) | Standard modern web coverage |
| **Uptime SLA** | 99.5% (Vercel managed) | Non-critical utility; acceptable for free tier |
| **Security** | No authentication; CSP headers enforced | Widget is read-only; no sensitive data |
| **Offline Capability** | Not required | Lookup table is hardcoded; widget works offline by design |

---

## Technology Stack & Rationale

| Component | Technology | Why |
|:---|:---|:---|
| **Frontend Framework** | React 18+ | User chose React; component-based state management ideal for multi-step form logic |
| **Styling** | Tailwind CSS | User chose Tailwind; utility-first approach enables rapid earthy/natural theme iteration |
| **Build Tool** | Vite | Fast HMR; smaller bundle than Create React App; aligns with Vercel optimization |
| **Hosting** | Vercel | User chose Vercel; serverless deployment, automatic HTTPS, built-in CDN, free tier sufficient |
| **Data Storage** | Hardcoded JS Objects | No backend needed; lookup table embedded in bundle as constant |
| **Testing** | Vitest + React Testing Library | Fast unit/component tests; no E2E required for single-page widget |
| **Embeddability** | iframe + postMessage (optional) | Widget can be embedded in third-party sites; iframe sandbox isolation |

---

## Success Metrics & KPIs

| Metric | Target | Measurement Method |
|:---|:---|:---|
| **Time to Verdict** | <30 seconds (median user session) | Google Analytics event timing |
| **Verdict Accuracy** | 90%+ user satisfaction (post-interaction survey) | Optional in-widget feedback button |
| **Mobile Usability** | 95%+ successful completion on mobile | Vercel Analytics; session funnel |
| **Widget Load Success Rate** | 99%+ (no JS errors) | Sentry error tracking |
| **Repeat Usage** | 40%+ users return within 30 days | Vercel Analytics; repeat visitor tracking |
| **Embeddability Adoption** | 5+ third-party sites embed widget within 6 months | Manual tracking; iframe referrer logs |

---

## Risk Analysis & Mitigation

| Risk | Impact | Likelihood | Mitigation Strategy |
|:---|:---|:---|:---|
| **Inaccurate Light Lookup Table** | User places plant in wrong spot; plant dies; negative review | Medium | Validate lookup values against horticultural sources (USDA, university extension); include "Estimated" disclaimer; add feedback form for user corrections |
| **Mobile Touch Target Too Small** | Frustration on mobile; high bounce rate | Medium | Enforce 44px minimum touch targets; test on iOS/Android; use Tailwind spacing utilities consistently |
| **Iframe CSP Violations** | Widget fails to load in third-party sites with strict CSP | Low | Use nonce-based inline styles; avoid eval(); test on common CMS platforms (WordPress, Webflow) |
| **Seasonal Light Variation Not Addressed** | User perceives verdict as inaccurate in winter | Low | Add disclaimer: "Estimates assume spring/fall conditions"; suggest grow light as year-round solution; document seasonal variance in help text |
| **Browser Compatibility Issues** | Widget breaks on older Safari/IE; user abandonment | Low | Test on BrowserStack; use Tailwind's browser support matrix; polyfill if needed (unlikely for modern React) |

---

## Constraints & Assumptions

## Constraints
- **Hardcoded Data Only:** No backend, database, or API. All plant data and lookup tables embedded in frontend bundle.
- **5 Plant Types Maximum:** Scope limited to Succulent, Fern, Pothos, Snake Plant, Orchid (user decision).
- **4 Window Directions:** North, South, East, West only; no diagonal or skylight options.
- **3 Distance Tiers:** Simplified categorization; no continuous distance input.
- **No User Accounts:** Stateless widget; no login, no data persistence, no user history.
- **Embeddable via iframe:** Widget must be deployable as standalone iframe or direct React component.
- **Earthy/Natural Visual Style:** Design must reflect plant/nature aesthetic (greens, earth tones, organic typography).

## Assumptions
- Users have basic knowledge of their room's window orientation (cardinal direction).
- Users can estimate distance from window within ±0.5 m accuracy.
- Lookup table values represent average conditions (no extreme climates, no seasonal adjustments in v1).
- Users access widget via modern browser (ES6+ support assumed).
- Vercel free tier provides sufficient bandwidth and uptime for expected traffic.
- Care tips are sufficient guidance; users do not expect detailed horticultural advice.

---

## Out of Scope

- **User Accounts & Authentication:** No login, registration, or user profiles.
- **Data Persistence:** No localStorage, cookies, or backend storage of user preferences or history.
- **Seasonal Adjustments:** Light calculations do not vary by month or latitude.
- **Artificial Light Spectrum Analysis:** Grow light recommendations are generic; no PAR/lumens calculations.
- **Multi-Room Comparisons:** Widget assesses one location at a time; no side-by-side room analysis.
- **Plant Purchase Integration:** No e-commerce links or plant retailer partnerships.
- **Admin Dashboard:** No content management interface for updating plant data or care tips in v1.
- **Advanced Accessibility Features:** Captions, screen reader optimization beyond WCAG 2.1 AA.
- **Offline PWA:** No service worker or offline-first caching strategy.
- **Analytics Dashboard:** Basic Vercel Analytics only; no custom reporting UI.
- **Localization:** English language only in v1.