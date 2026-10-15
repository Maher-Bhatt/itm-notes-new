import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { resolveAvatarUrl } from "@/components/UserAvatar";

// Defensive global attachment to prevent any ReferenceError across PWA cached chunks
if (typeof window !== "undefined") {
  (window as any).resolveAvatarUrl = resolveAvatarUrl;
}

// Auto-reload on Vite chunk preload errors when a new version is deployed on Vercel
window.addEventListener("vite:preloadError", (event) => {
  console.warn("[Vite] Preload chunk error detected. Reloading for newest deployment...", event);
  event.preventDefault();
  window.location.reload();
});

createRoot(document.getElementById("root")!).render(<App />);
