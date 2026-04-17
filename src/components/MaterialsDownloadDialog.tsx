import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, FileText, FileType, Loader2, Inbox, AlertCircle, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { downloadMaterial, formatFileSize, type Material } from "@/lib/materials";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  subjectId: string;
  subjectName: string;
}

const ICONS: Record<Material["file_type"], typeof FileText> = {
  pdf: FileText,
  pptx: FileType,
  docx: FileText,
};

export function MaterialsDownloadDialog({ open, onOpenChange, subjectId, subjectName }: Props) {
  const { user } = useAuth();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setLoadError(null);
    const { data, error } = await (supabase as any)
      .from("materials")
      .select("*")
      .eq("subject_id", subjectId)
      .order("uploaded_at", { ascending: false });
    if (error) {
      setLoadError(error.message ?? "Couldn't load materials");
      setMaterials([]);
    } else {
      setMaterials((data as Material[]) ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (open) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, subjectId]);

  const handleDownload = async (m: Material) => {
    if (!user) {
      toast.info("Please sign in to download materials");
      return;
    }
    setDownloadingId(m.id);
    const toastId = toast.loading(`Downloading ${m.file_name}…`);
    try {
      await downloadMaterial(m, user.id);
      toast.success("Download started", { id: toastId });
      // Optimistically bump local count
      setMaterials((prev) =>
        prev.map((p) => (p.id === m.id ? { ...p, download_count: (p.download_count ?? 0) + 1 } : p)),
      );
    } catch (err) {
      toast.error("Download failed", {
        id: toastId,
        description: (err as Error).message,
        action: { label: "Retry", onClick: () => handleDownload(m) },
      });
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl surface-elevated border max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-semibold">Materials — {subjectName}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            PDFs, slides, and notes uploaded by your instructors.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto -mx-1 px-1">
          {loading ? (
            <div className="space-y-2 mt-2" aria-busy="true">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-16 rounded bg-secondary animate-pulse" />
              ))}
            </div>
          ) : loadError ? (
            <div className="text-center py-12 text-muted-foreground">
              <AlertCircle className="h-8 w-8 mx-auto mb-3 text-destructive opacity-70" />
              <p className="text-sm mb-3">Couldn't load materials.</p>
              <Button size="sm" variant="outline" onClick={load} className="rounded-full">
                <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Try again
              </Button>
            </div>
          ) : materials.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Inbox className="h-8 w-8 mx-auto mb-3 opacity-40" />
              <p className="text-sm">No materials uploaded yet for this subject.</p>
              <p className="text-xs mt-1 opacity-70">Check back soon — your instructor hasn't uploaded any files.</p>
            </div>
          ) : (
            <div className="space-y-2 mt-2">
              {materials.map((m) => {
                const Icon = ICONS[m.file_type] ?? FileText;
                const isDownloading = downloadingId === m.id;
                return (
                  <div
                    key={m.id}
                    className="surface-elevated rounded p-3 flex items-center gap-3 hover:bg-secondary transition-colors"
                  >
                    <div className="w-9 h-9 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{m.file_name}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {m.file_type.toUpperCase()} · {formatFileSize(m.file_size)} ·{" "}
                        {new Date(m.uploaded_at).toLocaleDateString()}
                        {typeof m.download_count === "number" && m.download_count > 0 && (
                          <> · {m.download_count} download{m.download_count === 1 ? "" : "s"}</>
                        )}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isDownloading}
                      onClick={() => handleDownload(m)}
                      className="rounded-full apple-press shrink-0"
                      aria-label={`Download ${m.file_name}`}
                    >
                      {isDownloading ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Download className="h-3.5 w-3.5" />
                      )}
                      <span className="ml-1.5 hidden sm:inline">{isDownloading ? "…" : "Download"}</span>
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
