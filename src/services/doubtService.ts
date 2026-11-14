/**
 * Doubt threads on Library documents (table `doc_doubts`, see
 * supabase/migrations/20261114000009_doc_doubts.sql).
 *
 * If the migration has not been applied yet, `fetchDoubts` reports `available: false`
 * and the UI hides itself instead of showing errors.
 */
import { supabase } from "@/integrations/supabase/client";

export interface Doubt {
  id: string;
  doc_key: string;
  section_id: string | null;
  section_title: string | null;
  parent_id: string | null;
  user_id: string;
  author_name: string;
  body: string;
  status: "visible" | "hidden";
  created_at: string;
}

interface QueryResult<T> {
  data: T | null;
  error: { code?: string; message: string } | null;
}

// The generated Supabase types predate this table, so access it through a narrow, typed shim.
interface DoubtTable {
  select(cols: string): {
    eq(col: string, v: string): {
      order(col: string, o: { ascending: boolean }): { limit(n: number): Promise<QueryResult<Doubt[]>> };
    };
  };
  insert(row: Partial<Doubt>): { select(cols: string): { single(): Promise<QueryResult<Doubt>> } };
  delete(): { eq(col: string, v: string): Promise<QueryResult<null>> };
}
const table = () => (supabase as unknown as { from(name: string): DoubtTable }).from("doc_doubts");

const MISSING_TABLE = new Set(["42P01", "PGRST205", "PGRST204"]);

export async function fetchDoubts(docKey: string): Promise<{ available: boolean; items: Doubt[] }> {
  try {
    const { data, error } = await table().select("*").eq("doc_key", docKey).order("created_at", { ascending: true }).limit(500);
    if (error) {
      if (MISSING_TABLE.has(error.code ?? "") || /does not exist|schema cache/i.test(error.message)) {
        return { available: false, items: [] };
      }
      throw new Error(error.message);
    }
    return { available: true, items: data ?? [] };
  } catch (e) {
    if (e instanceof Error && /fetch/i.test(e.message)) return { available: false, items: [] };
    throw e;
  }
}

export async function postDoubt(input: {
  docKey: string;
  userId: string;
  authorName: string;
  body: string;
  sectionId?: string | null;
  sectionTitle?: string | null;
  parentId?: string | null;
}): Promise<Doubt> {
  const { data, error } = await table()
    .insert({
      doc_key: input.docKey,
      user_id: input.userId,
      author_name: input.authorName.slice(0, 80),
      body: input.body.trim(),
      section_id: input.sectionId ?? null,
      section_title: input.sectionTitle ? input.sectionTitle.slice(0, 300) : null,
      parent_id: input.parentId ?? null,
    })
    .select("*")
    .single();
  if (error || !data) throw new Error(error?.message || "Could not post your doubt.");
  return data;
}

export async function deleteDoubt(id: string): Promise<void> {
  const { error } = await table().delete().eq("id", id);
  if (error) throw new Error(error.message);
}

/** Sends the doubt to the admin moderation queue. */
export async function reportDoubt(doubt: Doubt, reporter: { id?: string; name?: string; email?: string }, reason: string) {
  const { error } = await supabase.from("moderation_reports").insert({
    type: "community_post",
    target_id: doubt.id,
    target_title: `Doubt on ${doubt.doc_key}${doubt.section_title ? ` › ${doubt.section_title}` : ""}`,
    reporter_id: reporter.id ?? null,
    reporter_name: reporter.name ?? null,
    reporter_email: reporter.email ?? null,
    content: `${reason}\n\nReported text: ${doubt.body}`,
    status: "pending",
  } as never);
  if (error) throw new Error(error.message);
}
