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
  console.warn("[Vite] Preload chunk error detected. Purging cache and reloading...", event);
  event.preventDefault();
  try {
    if ("caches" in window) {
      caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k)))).finally(() => {
        window.location.reload();
      });
      return;
    }
  } catch {}
  window.location.reload();
});

createRoot(document.getElementById("root")!).render(<App />);
