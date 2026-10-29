# 🎓 CampusLoop

> **India's Premier Multi-University Student Learning & Campus Community Platform**  
> *Syllabus Notes · 1,180+ Coding Practicals · 3,027+ Question Bank · Multi-Campus Community · Real Gamification*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)](https://supabase.com/)
[![Android](https://img.shields.io/badge/Capacitor-Android_Ready-3DDC84?logo=android)](https://capacitorjs.com/)

---

## 🌟 Overview

**CampusLoop** is a modern, unified academic operating system and campus community designed for university engineering and computer science students across India. 

Rather than isolating students into fragmented university portals, CampusLoop closes the entire collegiate loop: combining multi-university academic feeds, 43 AICTE/UGC-aligned degree curricula, a high-yield question bank with 3,027+ MCQs, an interactive sandboxed laboratory with 1,180+ practicals, real-time gamified study streaks, and campus community discussions.

---

## ✨ Core Platform Pillars

### 1. 🏛️ Multi-University Campus Network
* **Universal "For You" Feed**: Aggregates verified student discussions, technical projects, and academic queries across premier engineering universities (IIT Bombay, ITM SLS Baroda, BITS Pilani, GTU, Parul University, Delhi University, etc.).
* **Campus-Specific Spaces**: 1-click toggle to filter posts, announcements, and timetables for your specific university campus.
* **Campus Pulse & Daily Tiles**: Trending technical discussions, upcoming hackathons, tech talks, and cultural festivals.

### 2. 📚 Universal 43-Course Degree Curriculum
* **Multi-Department Scope**: Comprehensive 5-unit syllabus notes across **CSE**, **AI & Data Science**, **Information Technology**, **Electronics & Communication (ECE)**, **BCA Master Curriculum (30 Subjects)**, **MCA**, **Mechanical**, **Civil**, and **MBA**.
* **High-Yield In-Reader Experience**:
  * Rich Markdown with KaTeX mathematical formulas ($\KaTeX$) and algorithm proofs.
  * Interactive Mermaid.js architectural diagrams, state flowcharts, and sequence diagrams.
  * In-reader text highlighting, personal margin annotations, and bilingual explanations (English & Hinglish).
  * Audio AI Voice synthesis for hands-free lecture listening.

### 3. 💻 Interactive Coding Laboratory (1,180+ Practicals)
* **1,180+ Laboratory Experiments**: Complete coding syllabus across 8 semesters and all engineering departments (C, C++, Java, Python, SQL, Web Stack, Bash, Verilog).
* **In-Browser Execution & Validation**: Instant AST and token validator providing expected output comparisons, execution traces, and model solutions.
* **Examiner Viva Voce Q&A**: Over 1,000 oral viva exam questions with verified examiner answers to guarantee high internal lab marks.
* **Printable Lab Manual Export**: 1-click generation of formatted university laboratory record files.

### 4. 🎯 Universal Master Question Bank (3,027+ MCQs)
* **Exhaustive Practice Pool**: 3,027+ AICTE & UGC syllabus-aligned multiple choice questions organized by subject, unit (1 to 5), and difficulty (Easy, Medium, Hard).
* **100% Verified Explanations**: Deep conceptual explanations for every question, eliminating exam ambiguity.
* **Custom Quiz Generator**: Build targeted mock tests filtered by semester, subject, or weak topics with real-time timers and performance telemetry.

### 5. 👤 Full-Control Student Profile & Credentials
* **Complete Credentials Customizability**:
  * Degree Program (`B.Tech`, `BCA`, `MCA`, `M.Tech`, `MBA`, `Diploma`, `B.Sc`).
  * Branch / Specialization (`CSE`, `AI&DS`, `IT`, `ECE`, `ME`, `Civil`, etc.).
  * Semester (1 to 8) & Division Batch (`Div A`, `Div B`, etc.).
  * University Enrollment Number & Institute Selection (24+ partner universities).
  * Personal Bio, Academic Vision, and Target Semester SGPA.
* **Authentic Follower Metrics**: Real database follower and following counts (zero hardcoded numbers).
* **Custom Avatar Support**: Upload live photos directly from device camera/gallery or select from 6 signature gradient presets.

### 6. 🏆 Real Gamification & Badge Showcase Manager
* **Earned Achievements**: Real gamified achievements unlocked through focus timers, topic completions, coding lab submissions, and daily study streaks.
* **Showcase Visibility Controls**: Students choose which earned badges appear publicly on their profile card (`👁️ Showcased` vs `Hide`).
* **Level Progression**: Dynamic student levels (`Level 1 Fresher` to `Level 10 Grandmaster`) powered by authentic platform XP.

### 7. 🤝 User-Chosen Clubs & Campus Passions
* **Dynamic Clubs Selector**: Students choose their clubs and interests from a catalog of 15 campus passions (Robotics & IoT, AI & ML, Web Dev, Competitive Coding, Cyber Security, Cloud, Photography, Debate, Music, Sports, Startups).
* **Custom Club Tags**: Add custom tags for specialized research labs or student chapters with 1-click removal.

### 8. 🧮 75% Attendance & SGPA Calculator
* **Safe Bunk Calculator**: Calculates safe bunks remaining or lectures needed to maintain the mandatory 75% university attendance threshold.
* **SGPA / CGPA Simulator**: Weighted grade point calculator mapped to official university grading scales (10-point scale).

### 9. 🛡️ Administrative Command Center
* **Curriculum Director**: Inspect and manage 43 university courses, units, and subject catalogs with JSON backup export.
* **Master Question Bank Manager**: Audit, filter, search, and add custom MCQs across all courses.
* **Practicals Lab Director**: Validate starter code and test execution harnesses in-browser.
* **Database & Health Sync**: Live Supabase PostgreSQL connection latency probes, 1-click master schema sync, and local cache management.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React 18.3, TypeScript, Vite 5.4 (SPA architecture) |
| **Styling & Design System** | Tailwind CSS 3.4, shadcn/ui, Radix UI primitives, Lucide Icons |
| **Typography & Fonts** | Plus Jakarta Sans, DM Sans, Manrope, JetBrains Mono |
| **Mathematical Rendering** | KaTeX (Fast LaTeX math typesetting) |
| **Diagrams & Flowcharts** | Mermaid.js (Sequence, Flowchart, ER, Class diagrams) |
| **Data Visualizations** | Recharts (Academic performance, focus time distributions) |
| **Database & Auth** | Supabase (PostgreSQL with Row Level Security, Realtime websockets) |
| **State & Query Cache** | TanStack React Query v5 |
| **Mobile Runtime** | Capacitor 8 (Cross-platform Android native container) |
| **Notifications** | Web Push API, Service Workers, VAPID |

---

## 🚀 Local Development Setup

Follow these steps to run CampusLoop on your local machine.

### 1. Clone the repository
```bash
git clone https://github.com/Maher-Bhatt/itm-notes-new.git
cd itm-notes-new
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_PROJECT_ID="your_supabase_project_id"
VITE_SUPABASE_URL="https://your_supabase_project_id.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="your_supabase_anon_public_key"
```

### 4. Push Database Schema & Migrations
```bash
npx supabase db push
```

### 5. Start the Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173` (or `http://localhost:8080`).

### 6. Production Build & Validation
```bash
# Type check TypeScript codebase
npx tsc --noEmit

# Compile production bundle
npm run build

# Synchronize Capacitor Android assets
npx cap sync android
```

---

## 📱 Mobile App (Android Native Container)

CampusLoop runs as a native Android application using Capacitor:

```bash
# Sync web build to native Android assets
npx cap sync android

# Open Android Studio project
npx cap open android
```

---

## 📂 Project Structure

```
├── android/                 # Capacitor Android native project & gradle wrapper
├── public/                  # Static assets, PWA manifest, robots.txt, sitemap
├── src/
│   ├── assets/              # Branding logos, vector icons, imagery
│   ├── components/          # Reusable UI components & modals
│   │   ├── campusloop/      # Core CampusLoop design system (Avatars, Tags, Cards)
│   │   └── ui/              # Radix UI primitives (Dialogs, Dropdowns, Sheets)
│   ├── contexts/            # React Contexts (AuthContext, AcademicContext, UniversityContext)
│   ├── data/                # Curricula, 3,027+ MCQs, 1,180+ Practicals, Universities
│   │   ├── massiveQuestionBank.ts     # Master Question Bank
│   │   ├── universalPracticalsData.ts # Universal Laboratory Practicals
│   │   ├── codingLabData.ts           # Coding Sandbox Problems & Validators
│   │   ├── subjects.ts                # Master Engineering Subjects Registry
│   │   └── universitiesData.ts        # Multi-University Catalogs & Schemes
│   ├── hooks/               # Custom React hooks (useGamification, useProgress)
│   ├── pages/               # Application view routes
│   │   ├── DashboardPage.tsx          # Student Home Dashboard
│   │   ├── CommunityPage.tsx          # Multi-Campus Feed & University Spaces
│   │   ├── CodingLabPage.tsx          # 1,180+ Laboratory Practical Sandbox
│   │   ├── QuizPage.tsx               # Master MCQ Exam Simulator
│   │   ├── ProfilePage.tsx            # Student Credentials & Badge Manager
│   │   ├── OnboardingPage.tsx         # Multi-University Onboarding Flow
│   │   └── admin/                     # Administrative Control Center
│   ├── services/            # Supabase API services, push notifications, telemetry
│   └── utils/               # Math, voice engine, offline packs, SRS engines
├── supabase/                # PostgreSQL schema migrations and database types
└── vercel.json              # Production routing and cache headers
```

---

## 👨‍💻 Founder & Lead Architect

* **Maher Bhatt** — Founder, Lead Architect & Full-Stack Developer  
  *Email*: [maherbhatt01@gmail.com](mailto:maherbhatt01@gmail.com)  
  *GitHub*: [@Maher-Bhatt](https://github.com/Maher-Bhatt)

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

*© 2026 CampusLoop. All rights reserved. Connecting campuses, empowering learners.*
