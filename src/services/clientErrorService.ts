import { supabase } from "@/integrations/supabase/client";

export interface ClientErrorItem {
  id: string;
  user_id?: string | null;
  route: string;
  message: string;
  stack?: string | null;
  app_version: string;
  device_info: {
    userAgent: string;
    width: number;
    height: number;
    platform: string;
    reducedMotion?: boolean;
  };
  status: 'unresolved' | 'investigating' | 'resolved';
  created_at: string;
  resolved_at?: string | null;
  resolved_by?: string | null;
}

const STORAGE_KEY = "itm_client_errors_cache";

export async function reportClientError(
  err: unknown,
  customRoute?: string,
  componentStack?: string
): Promise<string> {
  const route = customRoute || window.location.pathname || "/";
  let message = "Unknown client error";
  let stack = componentStack || "";

  if (err instanceof Error) {
    message = err.message || err.name;
    stack = (err.stack ? `${err.stack}\n${componentStack || ""}` : componentStack || "").slice(0, 1500);
  } else if (typeof err === "string") {
    message = err;
  }

  // Deduplicate identical errors reported within 10 seconds
  const lastReportKey = `itm_last_err_${route}_${message.slice(0, 40)}`;
  const lastReportTime = sessionStorage.getItem(lastReportKey);
  if (lastReportTime && Date.now() - Number(lastReportTime) < 10000) {
    return "deduped";
  }
  sessionStorage.setItem(lastReportKey, String(Date.now()));

  let userId: string | null = null;
  try {
    const rawUser = localStorage.getItem("sb-pfehsqvtyxswgxfirwlc-auth-token");
    if (rawUser) {
      const parsed = JSON.parse(rawUser);
      userId = parsed?.user?.id || null;
    }
  } catch {}

  const deviceInfo = {
    userAgent: navigator.userAgent.slice(0, 180),
    width: window.innerWidth,
    height: window.innerHeight,
    platform: navigator.platform || "unknown",
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  };

  const errorPayload = {
    user_id: userId,
    route,
    message: message.slice(0, 500),
    stack: stack ? stack.slice(0, 1500) : null,
    app_version: "1.0.0",
    device_info: deviceInfo,
    status: "unresolved" as const,
  };

  // 1. Always record in local storage cache for instant admin access
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list: ClientErrorItem[] = raw ? JSON.parse(raw) : [];
    const localItem: ClientErrorItem = {
      ...errorPayload,
      id: `err-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      created_at: new Date().toISOString(),
    };
    list.unshift(localItem);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 100)));
  } catch (e) {
    console.warn("Failed to cache client error locally:", e);
  }

  // 2. Transmit to Supabase client_errors table
  try {
    const { data } = await supabase
      .from("client_errors")
      .insert(errorPayload)
      .select("id")
      .maybeSingle();

    return data?.id || "cached";
  } catch (err) {
    console.warn("Could not insert client error to Supabase:", err);
    return "cached";
  }
}

export async function fetchClientErrors(): Promise<ClientErrorItem[]> {
  try {
    const { data, error } = await supabase
      .from("client_errors")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);

    if (!error && data && data.length > 0) {
      return data as ClientErrorItem[];
    }
  } catch {}

  // Fallback to local cache
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function resolveClientError(errorId: string, resolvedBy?: string): Promise<boolean> {
  try {
    await supabase
      .from("client_errors")
      .update({
        status: "resolved",
        resolved_at: new Date().toISOString(),
        resolved_by: resolvedBy || null,
      })
      .eq("id", errorId);
  } catch {}

  // Update local cache
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const list: ClientErrorItem[] = JSON.parse(raw);
      const updated = list.map(item =>
        item.id === errorId ? { ...item, status: "resolved" as const, resolved_at: new Date().toISOString() } : item
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  } catch {}

  return true;
}

/**
 * Initializes global error listeners to catch unexpected unhandled exceptions
 */
export function initGlobalErrorCapture() {
  if (typeof window === "undefined") return;

  window.addEventListener("error", (event) => {
    // Ignore benign resize observer loop limit errors
    if (event.message?.includes("ResizeObserver loop")) return;
    reportClientError(event.error || event.message, window.location.pathname);
  });

  window.addEventListener("unhandledrejection", (event) => {
    reportClientError(event.reason, window.location.pathname);
  });
}
