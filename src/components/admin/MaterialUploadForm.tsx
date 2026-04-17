import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { subjects } from "@/data/subjects";
import { toast } from "sonner";
import { Loader2, Upload } from "lucide-react";
import { TYPE_MAP, validateMaterialFile, MAX_FILE_SIZE_LABEL } from "@/lib/materials";

interface Props {
  onUploaded?: () => void;
}

export function MaterialUploadForm({ onUploaded }: Props) {
  const { user } = useAuth();
  const [subjectId, setSubjectId] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [externalUrl, setExternalUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const reset = () => {
    setFile(null);
    setExternalUrl("");
    setFileName("");
    setDescription("");
    // Clear native file input
    const el = document.getElementById("material-file-input") as HTMLInputElement | null;
    if (el) el.value = "";
  };

  const handleFileChange = (f: File | null) => {
    if (!f) { setFile(null); return; }
    const v = validateMaterialFile(f);
    if (!v.ok) {
      toast.error(v.error ?? "Invalid file");
      // Clear the input
      const el = document.getElementById("material-file-input") as HTMLInputElement | null;
      if (el) el.value = "";
      setFile(null);
      return;
    }
    setFile(f);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !subjectId) return;
    if (!file && !externalUrl) {
      toast.error("Pick a file or paste an external URL");
      return;
    }

    setSubmitting(true);
    const toastId = toast.loading("Uploading material…");
    try {
      let storagePath: string | null = null;
      let fileType: "pdf" | "pptx" | "docx" | null = null;
      let fileSize: number | null = null;
      let nameToUse = fileName.trim();

      if (file) {
        const v = validateMaterialFile(file);
        if (!v.ok || !v.normalizedType) {
          toast.error(v.error ?? "Invalid file", { id: toastId });
          setSubmitting(false);
          return;
        }
        fileType = v.normalizedType;
        fileSize = file.size;
        nameToUse = nameToUse || file.name;
        storagePath = `${subjectId}/${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
        const { error: upErr } = await supabase.storage.from("materials").upload(storagePath, file, {
          cacheControl: "3600",
          upsert: false,
        });
        if (upErr) throw upErr;
      } else {
        const urlExt = externalUrl.split(/[?#]/)[0].split(".").pop()?.toLowerCase() ?? "";
        fileType = TYPE_MAP[urlExt] ?? "pdf";
        nameToUse = nameToUse || externalUrl.split("/").pop() || "Material";
      }

      const { error: insErr } = await (supabase as any).from("materials").insert({
        subject_id: subjectId,
        file_name: nameToUse,
        storage_path: storagePath,
        external_url: storagePath ? null : externalUrl,
        file_type: fileType,
        file_size: fileSize,
        description: description || null,
        created_by: user.id,
      });
      if (insErr) throw insErr;

      toast.success("Material uploaded", { id: toastId });
      reset();
      onUploaded?.();
    } catch (err) {
      console.error(err);
      toast.error("Upload failed", { id: toastId, description: (err as Error).message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="surface-elevated rounded p-5 space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <Upload className="h-4 w-4 text-primary" />
        <h3 className="font-semibold text-sm">Upload Material</h3>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs">Subject</Label>
          <Select value={subjectId} onValueChange={setSubjectId}>
            <SelectTrigger><SelectValue placeholder="Choose subject" /></SelectTrigger>
            <SelectContent>
              {subjects.map((s) => (
                <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Display name (optional)</Label>
          <Input value={fileName} onChange={(e) => setFileName(e.target.value)} placeholder="Auto-detected from file" maxLength={200} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs">File (PDF / PPTX / DOCX, max {MAX_FILE_SIZE_LABEL})</Label>
        <Input
          id="material-file-input"
          type="file"
          accept=".pdf,.pptx,.ppt,.docx,.doc"
          onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs">…or external URL (Drive, Dropbox, etc.)</Label>
        <Input
          type="url"
          value={externalUrl}
          onChange={(e) => setExternalUrl(e.target.value)}
          placeholder="https://…"
          disabled={!!file}
          maxLength={2048}
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs">Description (optional)</Label>
        <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" maxLength={500} />
      </div>

      <Button type="submit" disabled={submitting || !subjectId} className="rounded-full">
        {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
        Upload
      </Button>
    </form>
  );
}
