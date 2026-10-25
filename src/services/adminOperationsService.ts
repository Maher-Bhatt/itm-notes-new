import { supabase } from "@/integrations/supabase/client";

// ==============================================================================
// 1. AUDIT LOGGING (Feature 9)
// ==============================================================================
export interface AuditLogItem {
  id: string;
  admin_id: string | null;
  admin_email: string;
  action_type: string;
  target_type: string;
  target_id: string | null;
  details?: Record<string, unknown> | null;
  created_at: string;
}

const AUDIT_STORAGE_KEY = "itm_audit_logs_cache";

export async function logAdminAction(
  actionType: string,
  targetType: string,
  targetId?: string,
  details?: Record<string, unknown>
): Promise<void> {
  let adminEmail = "admin@itm-notes.edu";
  let adminId: string | null = null;

  try {
    const rawUser = localStorage.getItem("sb-pfehsqvtyxswgxfirwlc-auth-token");
    if (rawUser) {
      const parsed = JSON.parse(rawUser);
      adminEmail = parsed?.user?.email || adminEmail;
      adminId = parsed?.user?.id || null;
    }
  } catch {}

  const logEntry: AuditLogItem = {
    id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    admin_id: adminId,
    admin_email: adminEmail,
    action_type: actionType,
    target_type: targetType,
    target_id: targetId || null,
    details: details || {},
    created_at: new Date().toISOString(),
  };

  // Local storage cache
  try {
    const raw = localStorage.getItem(AUDIT_STORAGE_KEY);
    const list: AuditLogItem[] = raw ? JSON.parse(raw) : [];
    list.unshift(logEntry);
    localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(list.slice(0, 100)));
  } catch {}

  // Supabase insert
  try {
    await supabase.from("audit_logs").insert({
      admin_id: adminId,
      admin_email: adminEmail,
      action_type: actionType,
      target_type: targetType,
      target_id: targetId || null,
      details: details ? (details as any) : null,
    });
  } catch (err) {
    console.warn("Could not write audit log to Supabase:", err);
  }
}

export async function fetchAuditLogs(): Promise<AuditLogItem[]> {
  try {
    const { data, error } = await supabase
      .from("audit_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (!error && data && data.length > 0) {
      return data.map(d => ({
        ...d,
        details: d.details as Record<string, unknown> | null
      })) as AuditLogItem[];
    }
  } catch {}

  try {
    const raw = localStorage.getItem(AUDIT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// ==============================================================================
// 2. UNIFIED MODERATION QUEUE (Feature 2)
// ==============================================================================
export interface ModerationItem {
  id: string;
  type: 'errata' | 'student_contribution' | 'community_post';
  target_id: string;
  target_title: string;
  reporter_name: string;
  reporter_email?: string;
  content: string;
  suggested_fix?: string;
  status: 'pending' | 'approved' | 'rejected';
  rejection_reason?: string;
  created_at: string;
  reviewed_at?: string;
}

const MODERATION_STORAGE_KEY = "itm_moderation_queue_cache";

export async function fetchModerationQueue(): Promise<ModerationItem[]> {
  const merged: ModerationItem[] = [];

  // 1. Errata reports from localStorage
  try {
    const rawErrata = localStorage.getItem("itm_errata_reports");
    if (rawErrata) {
      const errata = JSON.parse(rawErrata);
      errata.forEach((e: any) => {
        merged.push({
          id: e.id,
          type: "errata",
          target_id: e.topicId || "general",
          target_title: e.topicTitle || "Curriculum Note",
          reporter_name: e.reportedBy || "Student",
          reporter_email: e.reportedBy,
          content: `${e.issueType}: ${e.description}`,
          suggested_fix: e.suggestedFix,
          status: e.status === "open" ? "pending" : (e.status || "pending"),
          created_at: e.createdAt || new Date().toISOString(),
        });
      });
    }
  } catch {}

  // 2. Student contributions from localStorage
  try {
    const rawContrib = localStorage.getItem("itm_student_contributions");
    if (rawContrib) {
      const contribs = JSON.parse(rawContrib);
      contribs.forEach((c: any) => {
        merged.push({
          id: c.id,
          type: "student_contribution",
          target_id: c.subjectId || "study-note",
          target_title: c.title || "Community Summary",
          reporter_name: c.studentName || "Contributor",
          reporter_email: c.studentEmail,
          content: c.content,
          status: c.status || "pending",
          created_at: c.submittedAt || new Date().toISOString(),
        });
      });
    }
  } catch {}

  // 3. Supabase moderation_reports table
  try {
    const { data } = await supabase
      .from("moderation_reports")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (data && data.length > 0) {
      data.forEach(item => {
        if (!merged.find(m => m.id === item.id)) {
          merged.push({
            id: item.id,
            type: item.type,
            target_id: item.target_id,
            target_title: item.target_title || "Reported Item",
            reporter_name: item.reporter_name || "Student",
            reporter_email: item.reporter_email || undefined,
            content: item.content,
            suggested_fix: item.suggested_fix || undefined,
            status: item.status,
            rejection_reason: item.rejection_reason || undefined,
            created_at: item.created_at,
            reviewed_at: item.reviewed_at || undefined,
          });
        }
      });
    }
  } catch {}

  return merged.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function updateModerationStatus(
  itemId: string,
  status: 'approved' | 'rejected',
  rejectionReason?: string,
  editedContent?: string
): Promise<void> {
  // Update local errata reports
  try {
    const rawErrata = localStorage.getItem("itm_errata_reports");
    if (rawErrata) {
      const list = JSON.parse(rawErrata);
      const updated = list.map((e: any) => e.id === itemId ? { ...e, status, rejectionReason } : e);
      localStorage.setItem("itm_errata_reports", JSON.stringify(updated));
    }
  } catch {}

  // Update local student contributions
  try {
    const rawContrib = localStorage.getItem("itm_student_contributions");
    if (rawContrib) {
      const list = JSON.parse(rawContrib);
      const updated = list.map((c: any) => c.id === itemId ? { ...c, status, content: editedContent || c.content } : c);
      localStorage.setItem("itm_student_contributions", JSON.stringify(updated));
    }
  } catch {}

  // Update Supabase
  try {
    await supabase.from("moderation_reports").update({
      status,
      rejection_reason: rejectionReason || null,
      content: editedContent || undefined,
      reviewed_at: new Date().toISOString(),
    }).eq("id", itemId);
  } catch {}

  await logAdminAction(
    status === "approved" ? "MODERATION_APPROVE" : "MODERATION_REJECT",
    "moderation_item",
    itemId,
    { reason: rejectionReason }
  );
}

// ==============================================================================
// 3. SUPPORT TICKETS INBOX (Feature 11)
// ==============================================================================
export interface SupportTicket {
  id: string;
  user_id: string | null;
  user_email: string | null;
  user_name: string | null;
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  admin_reply: string | null;
  replied_at: string | null;
  replied_by: string | null;
  created_at: string;
  updated_at: string;
}

const TICKETS_STORAGE_KEY = "itm_support_tickets_cache";

export async function createSupportTicket(
  message: string,
  subject = "Campus Desk Inquiry",
  userEmail?: string,
  userName?: string,
  userId?: string
): Promise<SupportTicket> {
  const newTicket: SupportTicket = {
    id: `ticket-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    user_id: userId || null,
    user_email: userEmail || null,
    user_name: userName || "Student",
    subject,
    message,
    status: "open",
    priority: "medium",
    admin_reply: null,
    replied_at: null,
    replied_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  // Local storage cache
  try {
    const raw = localStorage.getItem(TICKETS_STORAGE_KEY);
    const list: SupportTicket[] = raw ? JSON.parse(raw) : [];
    list.unshift(newTicket);
    localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(list));
  } catch {}

  // Supabase insert
  try {
    await supabase.from("support_tickets").insert({
      user_id: userId || null,
      user_email: userEmail || null,
      user_name: userName || "Student",
      subject,
      message,
      status: "open",
      priority: "medium",
    });
  } catch {}

  return newTicket;
}

export async function fetchSupportTickets(): Promise<SupportTicket[]> {
  try {
    const { data, error } = await supabase
      .from("support_tickets")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      return data as SupportTicket[];
    }
  } catch {}

  try {
    const raw = localStorage.getItem(TICKETS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function replyToSupportTicket(
  ticketId: string,
  reply: string,
  status: 'open' | 'in_progress' | 'resolved' = 'resolved'
): Promise<void> {
  try {
    await supabase.from("support_tickets").update({
      admin_reply: reply,
      replied_at: new Date().toISOString(),
      status,
      updated_at: new Date().toISOString(),
    }).eq("id", ticketId);
  } catch {}

  // Update local storage
  try {
    const raw = localStorage.getItem(TICKETS_STORAGE_KEY);
    if (raw) {
      const list: SupportTicket[] = JSON.parse(raw);
      const updated = list.map(t =>
        t.id === ticketId
          ? { ...t, admin_reply: reply, replied_at: new Date().toISOString(), status }
          : t
      );
      localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(updated));
    }
  } catch {}

  await logAdminAction("SUPPORT_REPLY", "support_ticket", ticketId, { status });
}

// ==============================================================================
// 4. FEATURE FLAGS (Feature 12)
// ==============================================================================
export interface FeatureFlag {
  id: string;
  key: string;
  enabled: boolean;
  description: string | null;
  updated_at: string;
}

const FLAGS_STORAGE_KEY = "itm_feature_flags_cache";

export const DEFAULT_FLAGS: Record<string, boolean> = {
  ai_doubt_solver: true,
  community: true,
  gamification: true,
  mock_exams: true,
  coding_lab: true,
  srs_flashcards: true,
  push_notifications: true,
};

export async function fetchFeatureFlags(): Promise<FeatureFlag[]> {
  try {
    const { data, error } = await supabase
      .from("feature_flags")
      .select("*")
      .order("key", { ascending: true });

    if (!error && data && data.length > 0) {
      localStorage.setItem(FLAGS_STORAGE_KEY, JSON.stringify(data));
      return data as FeatureFlag[];
    }
  } catch {}

  // Fallback to cache or defaults
  try {
    const raw = localStorage.getItem(FLAGS_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}

  return Object.entries(DEFAULT_FLAGS).map(([key, enabled]) => ({
    id: `flag-${key}`,
    key,
    enabled,
    description: `Toggle for ${key.replace(/_/g, " ")} feature`,
    updated_at: new Date().toISOString(),
  }));
}

export async function updateFeatureFlag(key: string, enabled: boolean): Promise<void> {
  try {
    await supabase.from("feature_flags").upsert({
      key,
      enabled,
      updated_at: new Date().toISOString(),
    }, { onConflict: "key" });
  } catch {}

  try {
    const flags = await fetchFeatureFlags();
    const updated = flags.map(f => f.key === key ? { ...f, enabled } : f);
    localStorage.setItem(FLAGS_STORAGE_KEY, JSON.stringify(updated));
  } catch {}

  await logAdminAction("FEATURE_FLAG_UPDATE", "feature_flag", key, { enabled });
}

export function isFeatureEnabled(key: string): boolean {
  try {
    const raw = localStorage.getItem(FLAGS_STORAGE_KEY);
    if (raw) {
      const flags: FeatureFlag[] = JSON.parse(raw);
      const match = flags.find(f => f.key === key);
      if (match) return match.enabled;
    }
  } catch {}
  return DEFAULT_FLAGS[key] ?? true;
}

// ==============================================================================
// 5. TOPIC DRAFT & VERSION HISTORY (Feature 7)
// ==============================================================================
export interface TopicVersion {
  id: string;
  topic_id: string;
  version_number: number;
  title: string;
  content: string;
  status: 'draft' | 'published' | 'scheduled';
  published_at?: string | null;
  scheduled_at?: string | null;
  created_at: string;
}

const TOPIC_VERSIONS_KEY = "itm_topic_versions_cache";

export async function fetchTopicVersions(topicId: string): Promise<TopicVersion[]> {
  try {
    const { data, error } = await supabase
      .from("topic_versions")
      .select("*")
      .eq("topic_id", topicId)
      .order("version_number", { ascending: false });

    if (!error && data && data.length > 0) {
      return data as TopicVersion[];
    }
  } catch {}

  try {
    const raw = localStorage.getItem(TOPIC_VERSIONS_KEY);
    if (raw) {
      const all: TopicVersion[] = JSON.parse(raw);
      return all.filter(v => v.topic_id === topicId);
    }
  } catch {}

  return [
    {
      id: `ver-${topicId}-1`,
      topic_id: topicId,
      version_number: 1,
      title: "Current Published Version",
      content: "Verified university curriculum notes.",
      status: "published",
      created_at: new Date().toISOString(),
    }
  ];
}

export async function createTopicVersion(
  topicId: string,
  title: string,
  content: string,
  status: 'draft' | 'published' | 'scheduled' = 'draft',
  scheduledAt?: string
): Promise<TopicVersion> {
  const versions = await fetchTopicVersions(topicId);
  const nextNum = (versions[0]?.version_number || 0) + 1;

  const newVer: TopicVersion = {
    id: `ver-${topicId}-${nextNum}-${Date.now()}`,
    topic_id: topicId,
    version_number: nextNum,
    title,
    content,
    status,
    published_at: status === 'published' ? new Date().toISOString() : null,
    scheduled_at: scheduledAt || null,
    created_at: new Date().toISOString(),
  };

  try {
    await supabase.from("topic_versions").insert({
      topic_id: topicId,
      version_number: nextNum,
      title,
      content,
      status,
      published_at: newVer.published_at,
      scheduled_at: newVer.scheduled_at,
    });
  } catch {}

  try {
    const raw = localStorage.getItem(TOPIC_VERSIONS_KEY);
    const list: TopicVersion[] = raw ? JSON.parse(raw) : [];
    list.unshift(newVer);
    localStorage.setItem(TOPIC_VERSIONS_KEY, JSON.stringify(list));
  } catch {}

  await logAdminAction("TOPIC_VERSION_CREATE", "topic_version", topicId, { version_number: nextNum, status });
  return newVer;
}

// ==============================================================================
// 6. BULK CONTENT CSV PARSER (Feature 8)
// ==============================================================================
export interface CsvQuestionRow {
  rowNumber: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  isValid: boolean;
  errors: string[];
}

export function parseAndValidateQuestionsCsv(csvText: string): {
  totalRows: number;
  validRows: CsvQuestionRow[];
  invalidRows: CsvQuestionRow[];
} {
  const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length <= 1) {
    return { totalRows: 0, validRows: [], invalidRows: [] };
  }

  // Parse header
  const rows: CsvQuestionRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    // Simple CSV parser supporting quotes
    const parts = line.split(",").map(p => p.trim().replace(/^"|"$/g, ''));
    const [question = "", optionA = "", optionB = "", optionC = "", optionD = "", correctAnswer = "", explanation = ""] = parts;

    const errors: string[] = [];
    if (!question) errors.push("Missing question statement");
    if (!optionA || !optionB) errors.push("At least Option A and Option B required");
    const upperAns = correctAnswer.trim().toUpperCase();
    if (!["A", "B", "C", "D"].includes(upperAns)) {
      errors.push("Correct answer must be A, B, C, or D");
    }

    const rowItem: CsvQuestionRow = {
      rowNumber: i,
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer: (upperAns as 'A' | 'B' | 'C' | 'D') || 'A',
      explanation,
      isValid: errors.length === 0,
      errors,
    };

    rows.push(rowItem);
  }

  return {
    totalRows: rows.length,
    validRows: rows.filter(r => r.isValid),
    invalidRows: rows.filter(r => !r.isValid),
  };
}
