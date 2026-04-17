import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { subjects, getSubject } from "@/data/subjects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { FileText, Pencil, Search, Trash2, Loader2, RefreshCw } from "lucide-react";
import { formatFileSize, validateMaterialFile, type Material } from "@/lib/materials";

type AdminMaterial = Material;

interface Props {
  refreshKey?: number;
}

export function MaterialsManager({ refreshKey = 0 }: Props) {
  const [materials, setMaterials] = useState<AdminMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");

  const [editing, setEditing] = useState<AdminMaterial | null>(null);
  const [deleting, setDeleting] = useState<AdminMaterial | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    const sb = supabase as any;
    // Try the admin RPC first (joined w/ counts, server-validated)
    const rpc = await sb.rpc("admin_list_materials");
    if (!rpc.error && rpc.data) {
      setMaterials(rpc.data as AdminMaterial[]);
      setLoading(false);
      return;
    }
    // Fallback: direct table read (RLS allows authenticated read)
    const { data, error: qErr } = await sb
      .from("materials")
      .select("*")
      .order("uploaded_at", { ascending: false });
    if (qErr) {
      setError(qErr.message);
      setMaterials([]);
    } else {
      setMaterials((data as AdminMaterial[]) ?? []);
    }
    setLoading(false);
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [refreshKey]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return materials.filter((m) => {
      if (subjectFilter !== "all" && m.subject_id !== subjectFilter) return false;
      if (q && !m.file_name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [materials, search, subjectFilter]);

  const handleDelete = async (m: AdminMaterial) => {
    setBusyId(m.id);
    const toastId = toast.loading("Deleting…");
    try {
      // Delete storage object first (best-effort) so we don't orphan the file
      if (m.storage_path) {
        await supabase.storage.from("materials").remove([m.storage_path]);
      }
      const { error: delErr } = await (supabase as any).from("materials").delete().eq("id", m.id);
      if (delErr) throw delErr;
      toast.success("Material deleted", { id: toastId });
      setDeleting(null);
      setMaterials((prev) => prev.filter((p) => p.id !== m.id));
    } catch (err) {
      toast.error("Delete failed", { id: toastId, description: (err as Error).message });
    } finally {
      setBusyId(null);
    }
  };

  const handleSaveEdit = async (
    id: string,
    patch: { file_name: string; subject_id: string; description: string | null; replacementFile?: File | null },
  ) => {
    setBusyId(id);
    const toastId = toast.loading("Saving…");
    try {
      const updates: Record<string, unknown> = {
        file_name: patch.file_name,
        subject_id: patch.subject_id,
        description: patch.description,
      };

      if (patch.replacementFile) {
        const v = validateMaterialFile(patch.replacementFile);
        if (!v.ok || !v.normalizedType) throw new Error(v.error ?? "Invalid file");

        // Remove old storage object if present
        const prev = materials.find((p) => p.id === id);
        if (prev?.storage_path) {
          await supabase.storage.from("materials").remove([prev.storage_path]);
        }
        const newPath = `${patch.subject_id}/${Date.now()}-${patch.replacementFile.name.replace(/\s+/g, "_")}`;
        const { error: upErr } = await supabase.storage
          .from("materials")
          .upload(newPath, patch.replacementFile, { cacheControl: "3600", upsert: false });
        if (upErr) throw upErr;

        updates.storage_path = newPath;
        updates.external_url = null;
        updates.file_type = v.normalizedType;
        updates.file_size = patch.replacementFile.size;
      }

      const { error: updErr } = await (supabase as any).from("materials").update(updates).eq("id", id);
      if (updErr) throw updErr;

      toast.success("Material updated", { id: toastId });
      setEditing(null);
      await load();
    } catch (err) {
      toast.error("Update failed", { id: toastId, description: (err as Error).message });
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="surface-elevated rounded p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-sm">Materials ({filtered.length})</h3>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search file name…"
              className="pl-9 h-9 w-full sm:w-56"
            />
          </div>
          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger className="h-9 sm:w-44"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All subjects</SelectItem>
              {subjects.map((s) => (
                <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button size="sm" variant="outline" onClick={load} className="rounded-full apple-press" aria-label="Refresh">
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead className="text-right">Downloads</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={6}><div className="h-6 bg-secondary animate-pulse rounded" /></TableCell>
                </TableRow>
              ))
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-destructive text-sm">{error}</TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground text-sm">
                  No materials found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="font-medium max-w-[280px]">
                    <div className="truncate" title={m.file_name}>{m.file_name}</div>
                    <div className="text-[10px] text-muted-foreground uppercase">{m.file_type}</div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {getSubject(m.subject_id)?.name ?? m.subject_id}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">{formatFileSize(m.file_size)}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {new Date(m.uploaded_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="tabular-nums text-right">{m.download_count ?? 0}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button
                        size="sm" variant="ghost"
                        onClick={() => setEditing(m)}
                        disabled={busyId === m.id}
                        className="h-7 w-7 p-0"
                        aria-label="Edit material"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="sm" variant="ghost"
                        onClick={() => setDeleting(m)}
                        disabled={busyId === m.id}
                        className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                        aria-label="Delete material"
                      >
                        {busyId === m.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit dialog */}
      <EditMaterialDialog
        material={editing}
        onClose={() => setEditing(null)}
        onSave={handleSaveEdit}
        busy={busyId !== null && editing?.id === busyId}
      />

      {/* Delete confirm */}
      <AlertDialog open={!!deleting} onOpenChange={(v) => !v && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete material?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete <span className="font-medium">{deleting?.file_name}</span> and remove
              the file from storage. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleting && handleDelete(deleting)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function EditMaterialDialog({
  material, onClose, onSave, busy,
}: {
  material: AdminMaterial | null;
  onClose: () => void;
  onSave: (id: string, patch: { file_name: string; subject_id: string; description: string | null; replacementFile?: File | null }) => Promise<void>;
  busy: boolean;
}) {
  const [name, setName] = useState("");
  const [subj, setSubj] = useState("");
  const [desc, setDesc] = useState("");
  const [replacement, setReplacement] = useState<File | null>(null);

  useEffect(() => {
    if (material) {
      setName(material.file_name);
      setSubj(material.subject_id);
      setDesc(material.description ?? "");
      setReplacement(null);
    }
  }, [material]);

  if (!material) return null;

  return (
    <Dialog open={!!material} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit material</DialogTitle>
          <DialogDescription>Update metadata or replace the file.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-xs">File name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} maxLength={200} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Subject</Label>
            <Select value={subj} onValueChange={setSubj}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {subjects.map((s) => (
                  <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Description</Label>
            <Input value={desc} onChange={(e) => setDesc(e.target.value)} maxLength={500} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Replace file (optional)</Label>
            <Input
              type="file"
              accept=".pdf,.pptx,.ppt,.docx,.doc"
              onChange={(e) => {
                const f = e.target.files?.[0] ?? null;
                if (f) {
                  const v = validateMaterialFile(f);
                  if (!v.ok) {
                    toast.error(v.error ?? "Invalid file");
                    e.target.value = "";
                    setReplacement(null);
                    return;
                  }
                }
                setReplacement(f);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={busy} className="rounded-full">Cancel</Button>
          <Button
            onClick={() => onSave(material.id, {
              file_name: name.trim() || material.file_name,
              subject_id: subj,
              description: desc.trim() || null,
              replacementFile: replacement,
            })}
            disabled={busy || !name.trim() || !subj}
            className="rounded-full"
          >
            {busy && <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />}
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
