# VECTRA Shopify LMS — Overview

**Product:** VECTRA Academy Learning Management System (Shopify edition)  
**Audience:** VECTRA International product, engineering, and operations teams  
**Purpose:** Design overview for rebuilding LMS capabilities from this project on Shopify  
**Auth:** Out of scope — Shopify Customer Accounts own invite, login, and password recovery  

Related docs:

| Document | Purpose |
|----------|---------|
| [Shopify-LMS-Features.md](./Shopify-LMS-Features.md) | Full feature inventory |
| [Shopify-LMS-Architecture.md](./Shopify-LMS-Architecture.md) | System design, repo structure, flows |
| [Shopify-LMS-Data-Model.md](./Shopify-LMS-Data-Model.md) | Shopify objects + app DB mapping |
| [Features-and-Capabilities.md](./Features-and-Capabilities.md) | Current Otto LMS feature reference |

---

## 1. Vision

Ship a VECTRA-branded LMS that keeps every operational learning feature from the current Otto LMS (roster, users, SCORM courses, assignments, progress, reports, roles, reminders) while moving identity and storefront chrome onto Shopify.

Shopify is the customer and presentation layer. A custom Shopify app is the LMS engine. Authentication is not rebuilt in-app.

### Locked product decisions

| Decision | Choice |
|----------|--------|
| Brand | VECTRA Academy (not Otto Group skin by default) |
| Enrollment | Free admin assignment (same model as current LMS) |
| Learner UI | Online Store theme + App Proxy |
| Staff UI | Shopify Admin embedded app |
| Course runtime | Custom SCORM 1.2 player in the app |
| LMS data | MongoDB (app DB) |
| SCORM packages | Cloudflare R2 (or equivalent object storage) |
| Auth | Shopify Customer Accounts only |

---

## 2. What Shopify owns vs what the app owns

| Concern | Owner | Notes |
|---------|-------|-------|
| Customer invite / login / logout / password recovery | Shopify | Customer Accounts |
| Theme, VECTRA branding, storefront navigation | Shopify | Online Store theme |
| Staff shell and app install | Shopify | Admin + app permissions |
| Optional future paid enrollment | Shopify | Products / Checkout (not required for v1) |
| Participant roster | Custom app | Approved org gate |
| Learner business profile fields | Custom app | Linked to Customer GID |
| Custom field definitions | Custom app | Text / dropdown, import, filters |
| Staff LMS roles & page matrix | Custom app | Admin / Coordinator / custom |
| Course metadata + SCORM upload | Custom app | ZIP → R2 |
| Assignments & entitlements | Custom app | Free assign / unassign / bulk |
| Progress, score, SCORM suspend data | Custom app | Too large for metafields |
| Learner dashboard & course list | App via App Proxy | Theme embeds proxied pages |
| SCORM player | Custom app | Same-origin content + runtime |
| Reports + CSV | Custom app | Embedded admin |
| Assignment reminders | Custom app | Cron / scheduled job + ESP |
| Facility / Company ID lookup | Custom app | Roster validation helper |

---

## 3. High-level architecture

```mermaid
flowchart TB
  subgraph shopify [Shopify]
    Theme[Online_Store_Theme]
    Customers[Customer_Accounts]
    Admin[Shopify_Admin]
    Proxy[App_Proxy]
  end
  subgraph app [Custom_LMS_App]
    Embedded[Embedded_Admin_UI]
    API[LMS_API]
    Player[SCORM_Player]
    Cron[Reminder_Jobs]
  end
  subgraph data [Data_Services]
    Mongo[(MongoDB)]
    R2[(Cloudflare_R2)]
    Mail[Email_ESP]
  end
  Theme --> Proxy
  Proxy --> API
  Customers --> Theme
  Admin --> Embedded
  Embedded --> API
  API --> Mongo
  API --> R2
  Player --> API
  Cron --> Mail
  Cron --> Mongo
```

### Runtime story

1. Staff open the embedded LMS app inside Shopify Admin to manage roster, learners, courses, assignments, reports, and settings.
2. Learners sign in with Shopify Customer Accounts on the Online Store.
3. Theme pages call App Proxy routes for dashboard, courses, profile, and the SCORM player.
4. The LMS API reads/writes MongoDB for domain data and serves SCORM assets from R2.
5. Reminder jobs email learners who have not started assigned courses after N days.

---

## 4. Feature modules (summary)

| Module | Staff | Learner | Parity with current LMS |
|--------|-------|---------|-------------------------|
| Participants roster | CRUD, import, bulk delete | — | Yes |
| Users / learners | Invite link to Customer, import, status, assign | — | Yes (auth via Shopify) |
| Courses / SCORM | Upload, edit, replace, delete | Play assigned content | Yes |
| Assignments | Single / bulk / unassign / topic auto-assign | See on dashboard | Yes |
| Dashboard & courses | Overview stats | Counts, list, Start/Continue/Review | Yes |
| Profile | — | Edit display name; roster fields read-only | Yes |
| Reports | Filters + CSV | — | Yes |
| Settings | Field definitions + roles | — | Yes |
| Reminders | Configure days / secret | Receive email | Yes |
| Branding | Theme + app brand config | VECTRA storefront | Yes (VECTRA default) |
| Auth screens | Shopify | Shopify | Explicitly out of scope |

Full checklists: [Shopify-LMS-Features.md](./Shopify-LMS-Features.md).

---

## 5. Screens

### Staff (embedded app)

| Screen | Purpose |
|--------|---------|
| Overview | Org / learner / course / completion stats + onboarding checklist |
| Participants | Approved organization roster |
| Users | Learners and staff LMS roles |
| Courses | SCORM upload, metadata, assign / unassign |
| Reports | Progress table + CSV export |
| Settings | Custom fields + user groups / permissions |

### Learner (theme + App Proxy)

| Screen | Purpose |
|--------|---------|
| Dashboard | Assigned / in progress / completed counts |
| My Courses | Status badges; Start / Continue / Review |
| Player | SCORM 1.2 runtime for an assignment |
| Profile | Display name edit; read-only org fields |

### Auth (Shopify — not built by LMS app)

Login, account activation/invite, and password recovery are Shopify Customer Account flows. The LMS app only consumes an authenticated customer session at the App Proxy boundary.

---

## 6. Mapping from the current project

This repo (`otto-lms-node-azure`) is the functional source of truth:

| Current area | Primary paths | Shopify LMS target |
|--------------|---------------|--------------------|
| Domain types | `lib/types.ts` | App DB collections |
| Roles | `lib/roles.ts`, `lib/role-catalog.ts` | App roles + Shopify staff access |
| Branding | `lib/branding.ts` | Theme + VECTRA brand config |
| Participants | `lib/participants.ts`, admin APIs | Embedded app module |
| Learners / auto-assign | `lib/learners.ts` | App assignment service |
| SCORM | `lib/scorm.ts`, `lib/scorm-progress.ts`, `components/ScormPlayer.tsx` | `packages/scorm-runtime` |
| Storage | `lib/course-storage.ts` | R2 |
| Reports | `lib/dashboard-stats.ts`, reports CSV API | Embedded reports |
| Reminders | `lib/reminders.ts`, `/api/cron/reminders` | Scheduled app job |
| Mail | `lib/mail.ts` | ESP for training reminders (not auth mail) |

---

## 7. Why Shopify alone is not enough

Shopify does not provide:

- A SCORM 1.2 runtime with resume, score, and completion
- Durable same-origin hosting for unpacked course packages
- Flexible roster field definitions that drive CSV import and report columns
- Assignment progress aggregation with reminder engine
- Coordinator vs admin page matrix beyond native staff permissions

Those capabilities stay in the custom app. Shopify provides identity, theme, and admin hosting.

---

## 8. Non-goals for v1

- Rebuilding login / register / activate / reset inside the LMS app
- Paid checkout enrollment as the primary path
- Headless Hydrogen storefront (theme + App Proxy is the v1 learner UI)
- Otto Group partner chrome as the default brand
- SCORM 2004 sequencing
- Certified SCORM engine claim

---

## 9. Recommended build order

1. Scaffold Shopify app (embedded admin + App Proxy + MongoDB + R2).
2. Port participants, fields, and roles.
3. Link Shopify Customers to `learnerProfiles`; staff invite creates Customer + profile.
4. Port courses, SCORM storage, and player.
5. Port assignments, learner dashboard, and progress API.
6. Port reports / CSV and reminder jobs.
7. Apply VECTRA theme branding and staff onboarding checklist.

---

## 10. Known limitations (carry forward)

1. SCORM 1.2 only; not a certified engine; no 2004 sequencing.
2. Mindsmith published URLs are not used for compliance tracking — export SCORM ZIP.
3. Production needs MongoDB Atlas (or equivalent) with backups.
4. SCORM ZIP malware scanning is recommended before broad admin upload access.
5. Formal audit logging is recommended for compliance rollouts.
6. Auth email deliverability is Shopify’s concern; reminder email still needs SPF/DKIM/DMARC on the ESP domain.

---

**VECTRA Shopify LMS** — Design overview for rebuilding Academy capabilities on Shopify.

*Document version: October 2026*
