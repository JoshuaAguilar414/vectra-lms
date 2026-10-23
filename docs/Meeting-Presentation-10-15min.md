# VECTRA Academy LMS — 10–15 minute meeting

**Use this in the room.** Eight slides, a spoken script, and a short live demo.  
**Product:** VECTRA Academy (this repo). The same app can run as Otto Group Academy by setting `LMS_TENANT=otto`.  
**Audience:** stakeholders who need to see what the system does, who uses it, and what is ready.

Supporting detail if someone asks for more: `docs/Features-and-Capabilities.md`, `docs/Otto-LMS-Presentation.md` (longer deck), `REQUIREMENTS_MAPPING.md`.

---

## How to spend the time

Pick one track before you start. Do not try to cover both.

| Track | Length | What you do |
|-------|--------|-------------|
| **Talk + demo** (recommended) | 15 min | Slides 1–5 in about 7 minutes, then a 5-minute demo, then close |
| **Talk only** | 10 min | Slides 1–8. Skip the live player. Mention the demo path in one sentence |

If the meeting starts late, drop Slide 6 (architecture). It is the first thing to cut.

| Clock | Talk + demo | Talk only |
|-------|-------------|-----------|
| 0:00 | Slide 1 — open | Slide 1 |
| 0:45 | Slide 2 — why | Slide 2 |
| 2:15 | Slide 3 — who | Slide 3 |
| 4:00 | Slide 4 — what staff do | Slide 4 |
| 5:45 | Slide 5 — how progress is saved | Slide 5 |
| 7:15 | **Demo** (stop talking at slides) | Slide 6 — architecture, 60 seconds |
| 12:15 | Slide 7 — ready / not ready | Slide 7 |
| 13:30 | Slide 8 — close, then questions | Slide 8, then questions |

---

## Before you walk in

Have these open in browser tabs, in this order:

1. Admin overview — `/admin`
2. Participants — `/admin/participants`
3. Courses — `/admin/courses`
4. Learner dashboard — `/dashboard` (second browser or incognito, signed in as a learner)
5. One assigned course already **In Progress**, so resume is visible without waiting for a full course
6. Reports — `/admin/reports`

Say this once if login fails: accounts are email and password; invited users activate from an email link. Do not troubleshoot SMTP in the meeting.

---

## Slide 1 — Title (45 seconds)

**On screen**

# VECTRA Academy LMS

Training delivery, progress tracking, and completion reporting for facility and business partner learners.

**Say**

> This is the learning system we built for VECTRA. Administrators load the approved organization list, put a course in front of the right people, and see who has not started, who is in progress, and who has finished. Learners take the course in the browser and can leave and come back. I will show the path, then open the product.

---

## Slide 2 — Why we built it (90 seconds)

**On screen**

We needed one place to:

- Let only **approved organizations** join
- Deliver a real course, not a link that we cannot measure
- Save **progress, score, and completion**
- Give staff a **report they can export**

Authoring can stay in Mindsmith. Measurement has to live here.

**Say**

> The gap was not “a place to host a video.” The gap was control and proof. We have to know which facilities and business partners are in scope, get learners into the course, and report completion. Mindsmith is fine for writing the lesson. A published Mindsmith link does not give us score, resume, or a completion date. So the course is exported as a SCORM 1.2 package and run inside this LMS.

---

## Slide 3 — Who uses it (1 minute 45 seconds)

**On screen**

| Role | Job |
|------|-----|
| **Admin** | Roster, staff, learners, courses, reports, settings |
| **Coordinator** | Learners, courses, assignments, reports. No roster ownership, no staff creation, no user removal |
| **Learner** | Activate, take assigned courses, resume, see status |

Learners are **Facility** or **Business Partner**.  
They can register only if Company ID, stakeholder group, and organization name match the roster.

**Say**

> Three roles. Admins own the roster and the full console. Coordinators run day-to-day training without changing who is allowed to exist on the roster. Learners only see their own courses. A learner cannot invent a company. Registration and invitations both check the participant list. If the Company ID is not on that list, they do not get in.

**If asked about extra roles:** Settings can define additional staff groups and which admin pages they see. Do not demo that unless someone asks.

---

## Slide 4 — What the system actually does (1 minute 45 seconds)

**On screen**

1. Import the participant roster (CSV or Excel)
2. Upload the course as a SCORM 1.2 ZIP
3. Learners self-register, or staff import / invite them
4. Course is assigned (including auto-assign when the course title matches the roster topic)
5. Learner starts, continues, or reviews
6. Staff filter the progress table and export CSV
7. Learners who never start can get a reminder email

**Say**

> Operations is a straight line. Roster first, then the course, then people, then assignment, then the report. Import accepts CSV and Excel. Staff can invite one learner or import a sheet. If the course title matches the topic on the roster, registration can assign that course automatically. The learner dashboard shows Not Started, In Progress, and Completed. Reports use the same statuses, plus progress percent, score, last activity, and completion time. We can also email a reminder when an assignment has sat unopened.

---

## Slide 5 — The part that matters for reporting (90 seconds)

**On screen**

| | SCORM 1.2 package in this LMS | Mindsmith web link |
|--|-------------------------------|--------------------|
| Opens the lesson | Yes | Yes |
| Resume | Yes | No |
| Score | Yes | No |
| Completion date | Yes | No |
| Usable for compliance reporting | Yes | No |

This is a practical SCORM 1.2 player. It is not a certified SCORM engine, and it does not run SCORM 2004 sequencing.

**Say**

> Please treat this as the rule for content. Export SCORM 1.2 from Mindsmith and upload the ZIP. The player talks to the course, saves bookmark and suspend data, and writes status, score, and completion back to the assignment. A public Mindsmith link can be opened, but we will not get a report from it. We also do not claim SCORM certification, and we do not support SCORM 2004 sequencing. For this program, SCORM 1.2 is the delivery format.

---

## Slide 6 — How it is built (talk-only track, or if asked)

**Skip this slide in the 15-minute demo track.**

**On screen**

```
Browser
  → Next.js app (Node 22)
       → MongoDB          users, roster, courses, assignments, progress
       → Course storage   local disk, or Cloudflare R2
       → Email            invite, password reset, assignment reminder
```

Stack: Next.js, React, TypeScript, MongoDB.  
Auth: email/password, HTTP-only session cookie.  
Hosting already documented for an Azure VM (Node, PM2, Nginx, HTTPS) and for Render with R2 so course files survive redeploys.

**Say**

> The app is a Next.js system with MongoDB behind it. Accounts, the roster, courses, and each learner’s progress live in the database. The course files themselves sit on disk or in Cloudflare R2. Email is only for invites, password reset, and reminders. Login is our own email and password with a session cookie. Deployment notes exist for an Azure VM and for Render.

**Do not** open architecture diagrams, environment files, or Azure steps unless someone asks.

---

## Demo (5 minutes) — demo track only

Narrate what the screen is for. Do not narrate every click.

| Time | Screen | Say |
|------|--------|-----|
| 0:30 | `/admin` | “This is the staff home. Counts for organizations, learners, and completion. The checklist is the go-live order: roster, course, people, assign, export.” |
| 0:45 | `/admin/participants` | “This roster is the gate. Facility or business partner, Company ID, name, country, topic. Import is CSV or Excel. If they are not on this list, they cannot register.” |
| 0:40 | `/admin/courses` | “Course upload is a SCORM 1.2 ZIP. From here we assign it to one learner or to a group: by company, country, or stakeholder group.” |
| 1:20 | Learner `/dashboard` then open the course | “The learner sees assigned, in progress, and completed. Start, continue, or review. I am opening a course that was already started so you can see it resumes instead of beginning at slide one.” Let the player load. Point at the lesson, then leave. |
| 0:45 | `/admin/reports` | “Same learner, now on the report: status, progress, score, last activity. Filters are status, course, and country. This export is the file operations would send on.” Download CSV only if the room wants the file. |
| 0:20 | Stop | “That is the full loop: approved org, course, learner, saved progress, export.” |

If the player is slow, do not wait in silence. Say: “The package is unpacking in the browser; progress is written when the course commits, not when we refresh the page.” Then switch to Reports if it still has not loaded after about 20 seconds.

---

## Slide 7 — What is ready, and what is not (75 seconds)

**On screen**

**Ready for a pilot**

- Roster gate, invites, self-registration, CSV/Excel import
- SCORM 1.2 upload, resume, score, completion
- Assignments, learner dashboard, reports, CSV export
- Admin and Coordinator permissions
- Desktop and mobile layout

**Not in this version**

- Certified SCORM, or SCORM 2004
- Reporting from a Mindsmith URL
- Formal audit-log screen
- Malware scan on uploaded ZIPs
- MongoDB on the same server is fine for a pilot; production should use a backed-up database (Atlas or equivalent)

**Say**

> For a pilot, the learning loop is in place: who may join, the course, the assignment, resume, and a CSV report. I would not describe it as a certified SCORM product, and I would not run compliance numbers off a Mindsmith link. Before a wide rollout we still want backups, monitoring, an audit trail, and a scan on uploaded packages. Email delivery also needs the sender domain authorized, otherwise invites land in spam.

---

## Slide 8 — Close (45 seconds, then stop talking)

**On screen**

VECTRA Academy LMS

Approved organizations → SCORM 1.2 course → tracked completion → exportable report

Questions?

**Say**

> That is the system: a roster-gated academy, courses delivered as SCORM 1.2, and a report staff can export. I can go deeper on roles, the player, import formats, or hosting. What do you want to look at?

Then be quiet.

---

## Answers you will probably need

Keep each answer under 30 seconds. Offer to show the screen instead of explaining further.

**Can we use the Mindsmith link we already published?**  
Only as a preview. Completion reporting needs the SCORM 1.2 ZIP uploaded here.

**How do learners get an account?**  
Two ways. They self-register with a Company ID that is already on the roster, or staff invite them / import a spreadsheet. Invited people set a password from the email link. The link is not shown in the admin screen.

**What if someone is not on the roster?**  
Registration and learner import both reject them. Admins add or import the organization first.

**Can a coordinator change the roster or delete users?**  
No. Coordinators manage learners, courses, assignments, and reports. Roster changes, staff accounts, and user removal stay with Admin.

**How many learners?**  
There is no fixed cap in the app. The original requirement was 90-plus. Scale after that is database size and hosting, not a license seat count in this codebase.

**Does progress survive if they close the laptop?**  
Yes, for SCORM 1.2. The course writes bookmark and suspend data; the next visit continues.

**Where does it run?**  
Node.js application plus MongoDB. Documented path is an Azure VM with PM2 and Nginx. Render works if course files are stored in Cloudflare R2, because Render’s local disk does not keep uploads.

**Is login Shopify?**  
Not in this application. This app has its own email and password. A separate design note describes a future Shopify storefront version; that is not what is running in this project.

**What email does it send?**  
Invitation, password reset, and a reminder if an assignment is still Not Started after a set number of days (default 3).

**What is the course for this program?**  
The onboarding checklist in the admin home is written around the Freely Chosen Employment SCORM package and the VECTRA facility / business partner roster.

---

## One-page leave-behind

Copy this block into the meeting invite or a printed handout.

**VECTRA Academy LMS** is the training system for facility and business partner learners.

Staff import the approved organization roster, upload a **SCORM 1.2** course, and assign it. Learners register only with a matching Company ID, or they are invited. The learner dashboard shows Not Started, In Progress, and Completed. Closing the course saves progress. Staff export a CSV with status, progress, score, and completion time.

**Roles:** Admin (full control), Coordinator (training operations), Learner (own courses only).

**Content rule:** author in Mindsmith if you want, then export SCORM 1.2. A published Mindsmith link is not a reporting source.

**Pilot is ready for:** roster, users, courses, assignments, player, reports.  
**Still follow-up for a broad rollout:** database backups, monitoring, audit log, upload scanning, and email-domain authentication.

---

## 60-second version (if you only get the opening)

> VECTRA Academy is a learning system for facility and business partner training. Admins load the approved company roster, upload a SCORM 1.2 course, and assign it. Learners sign in, take the course in the browser, and can resume if they stop. Staff see who has not started, who is in progress, and who finished, and they can export that as CSV. We do not track completion from a Mindsmith web link — the course has to be the SCORM package. The pilot covers roster, users, courses, the player, and reports. Backups, audit history, and upload scanning are the production follow-ups.
