import { supabase } from "@/integrations/supabase/client";

export interface Material {
  id: string;
  subject_id: string;
  file_name: string;
  storage_path: string | null;
  external_url: string | null;
  file_type: "pdf" | "pptx" | "docx";
  file_size: number | null;
  description: string | null;
  uploaded_at: string;
  created_by: string | null;
  /** Server-tracked download count. Defaults to 0 when missing (older rows / pre-migration). */
  download_count?: number;
}

export const ALLOWED_FILE_TYPES = ["pdf", "pptx", "ppt", "docx", "doc"] as const;
export const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50 MB
export const MAX_FILE_SIZE_LABEL = "50MB";

export const TYPE_MAP: Record<string, "pdf" | "pptx" | "docx"> = {
  pdf: "pdf",
  pptx: "pptx",
  ppt: "pptx",
  docx: "docx",
  doc: "docx",
};

export interface FileValidation {
  ok: boolean;
  error?: string;
  normalizedType?: "pdf" | "pptx" | "docx";
}

export function validateMaterialFile(file: File): FileValidation {
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { ok: false, error: `File exceeds ${MAX_FILE_SIZE_LABEL} limit (${formatFileSize(file.size)})` };
  }
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  const normalizedType = TYPE_MAP[ext];
  if (!normalizedType) {
    return { ok: false, error: "Only PDF, PPTX, or DOCX files are supported" };
  }
  return { ok: true, normalizedType };
}

/**
 * Resolve a downloadable URL for a material. For storage-backed files, returns
 * a short-lived signed URL (bucket is private, so signed URLs are required).
 * For externally-hosted files, returns the external URL as-is.
 */
export async function resolveMaterialUrl(
  m: Pick<Material, "storage_path" | "external_url" | "file_name">
): Promise<string | null> {
  if (m.storage_path) {
    const { data, error } = await supabase.storage
      .from("materials")
      .createSignedUrl(m.storage_path, 60 * 10, { download: m.file_name });
    if (error) {
      console.error("[materials] signed url error:", error);
      return null;
    }
    return data.signedUrl;
  }
  return m.external_url;
}

/**
 * Fetch a URL as a blob with retry + exponential backoff.
 * Throws on the final failure.
 */
async function fetchWithRetry(url: string, attempts = 3): Promise<Blob> {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.blob();
    } catch (err) {
      lastErr = err;
      if (i < attempts - 1) {
        await new Promise((r) => setTimeout(r, 400 * Math.pow(2, i)));
      }
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error("Download failed");
}

/**
 * Trigger a real download in the browser, log to history, and bump download_count
 * — all in a single atomic RPC call (record_material_download).
 *
 * Falls back gracefully to a direct insert if the RPC isn't available yet
 * (e.g., migration not yet applied), so the UI stays functional during rollout.
 */
export async function downloadMaterial(material: Material, userId: string): Promise<void> {
  const url = await resolveMaterialUrl(material);
  if (!url) throw new Error("No file URL available");

  // 1. Fetch with retries → trigger save-as
  let blob: Blob;
  try {
    blob = await fetchWithRetry(url);
  } catch {
    // CORS-restricted external URL: fall back to opening in a new tab
    window.open(url, "_blank", "noopener");
    await logDownload(material.id, userId);
    return;
  }

  const objectUrl = URL.createObjectURL(blob);
  try {
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = material.file_name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }

  await logDownload(material.id, userId);
}

/** Best-effort: record the download server-side. Never throws. */
async function logDownload(materialId: string, userId: string): Promise<void> {
  const sb = supabase as any;
  // Preferred: atomic RPC (increments count + upserts history row in one round trip)
  const { error: rpcErr } = await sb.rpc("record_material_download", { _material_id: materialId });
  if (!rpcErr) return;

  // Fallback (e.g., RPC not deployed yet): plain insert. Unique constraint will
  // ignore re-downloads silently; that's fine.
  await sb.from("download_history").insert({ user_id: userId, material_id: materialId });
}

export function formatFileSize(bytes: number | null | undefined): string {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
