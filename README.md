# 🎓 ITM Notes 2.0

A free, modern, and open-source learning platform built exclusively for **ITM (SLS) Baroda University** engineering students. ITM Notes provides clear, deep-research academic notes, rich diagram rendering, practice quizzes, and a comprehensive bookmarks system to help students master their semesters.

![ITM Notes Dashboard Preview](https://itm-notes-new.vercel.app/og-image.png) *(Preview placeholder)*

## ✨ Features

- **🏛️ University-Centric**: Structured strictly by University, Semester, and Subject.
- **📚 Deep Academic Content**: Full support for rich markdown, Mermaid.js diagrams, and KaTeX mathematical formulas.
- **🎯 Practice Quizzes**: Built-in MCQ testing at the end of each unit to validate understanding.
- **📌 Smart Bookmarks**: Save difficult topics for quick access before exams.
- **⚙️ Admin CMS**: A built-in database seeder and dashboard for authorized admins to inject new semester content effortlessly.
- **⚡ Blazing Fast**: Built as a Single Page Application (SPA) on Vite, ensuring zero-latency page transitions.

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui, Lucide Icons
- **Database & Auth**: Supabase (PostgreSQL, Row Level Security)
- **Routing**: React Router v6
- **State & Data Fetching**: TanStack React Query

---

## 🚀 Local Development Setup

Follow these steps to run ITM Notes on your local machine.

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
Create a `.env` file in the root of the project and add your Supabase credentials:
```env
VITE_SUPABASE_PROJECT_ID="your_project_id"
VITE_SUPABASE_URL="https://your_project_id.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="your_anon_public_jwt_key"
```

### 4. Push Database Schema
Ensure your Supabase project is linked, then push the database schema:
```bash
npx supabase db push
```
*(If you encounter migration history conflicts, you can forcefully reset the remote database with `npx supabase db reset --linked`)*.

### 5. Start the Development Server
```bash
npm run dev
```
The app will be running at `http://localhost:8080` (or `http://localhost:5173`).

### 6. Seed the Database
1. Open the app in your browser and Sign Up. 
2. Go to `http://localhost:8080/admin` (or `5173/admin`).
3. Click the **Seed Database** button to populate the platform with ITM Baroda University subjects (Computer Architecture, Python, C, etc.).

---

## ☁️ Deployment (Vercel)

ITM Notes is optimized for Vercel deployment. 

1. Push your code to a GitHub repository.
2. Import the repository into Vercel.
3. **CRITICAL:** Go to the Project Settings in Vercel → **Environment Variables**, and add your 3 Supabase keys (`VITE_SUPABASE_PROJECT_ID`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`).
4. Vercel's routing is handled automatically by the included `vercel.json` file.
5. Deploy!

---

## 👨‍💻 Team

- **Maher Bhatt** - Founder & Lead Developer

---

*© 2026 ITM Notes by Velocity Web. All rights reserved.*
