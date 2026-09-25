# Made Website Static & Removed Backend

## Changes Made
- **Removed Supabase & React Query dependencies**: Uninstalled `@supabase/supabase-js` and `@tanstack/react-query`.
- **Refactored Auth Context**: Removed `AuthProvider` and all related hooks (`useAuth`). The application is now fully accessible without requiring any user sign-in.
- **Removed Admin & Auth Pages**: 
  - Deleted `AdminDashboard.tsx`, `AuthPage.tsx`, `MyDownloadsPage.tsx`, and the `components/admin` folder.
  - Removed related routes from `App.tsx`.
- **Progress Tracking is Local**: Updated `useProgress.ts` to strictly rely on the browser's `localStorage` for tracking completed topics, bookmarks, and MCQ scores.
- **Removed Dynamic Features**:
  - Removed `MaterialsBrowser` and `MaterialsDownloadDialog` since file storage was managed through Supabase.
  - Removed `ReviewSystem` which relied on backend storage for user reviews.
  - Removed `useTrackImpView` hook that logged page views to the database.
- **Fixed `index.css`**: Rearranged `@import` directives to comply with CSS standards and Vite build checks.
- **Build Checked**: Ran `npm install` and `npm run build`, and confirmed that the project compiles cleanly as a static frontend SPA.
