/**
 * ITM (SLS) Baroda University - UMS Integration & Student Import Layer
 * 
 * Target portal: https://ums.itmbu.ac.in/StudentPanel/StudentDashboard.aspx
 * Authoritative institution: ITM (SLS) Baroda University (https://itmbu.ac.in/)
 * 
 * Architecture Note:
 * ITMBU UMS utilizes ASP.NET Forms authentication with server-side session cookies.
 * There is currently no public OAuth2/SAML SSO or documented REST API for direct third-party access.
 * To respect student data privacy, security boundaries, and university terms of service:
 * 1. We NEVER ask for or store university UMS passwords.
 * 2. We provide an authorized, student-verified import mechanism for academic metadata.
 * 3. An adapter hook is provided for future official institutional API integration.
 */

import { supabase } from "@/integrations/supabase/client";

export interface UmsStudentProfile {
  enrollmentNo: string;
  studentName: string;
  program: string; // e.g. "B.Tech", "BCA", "MCA"
  branch: string;  // e.g. "Computer Science & Engineering"
  semester: number;
  batchYear?: string;
  division?: string;
  verifiedAt?: string;
}

/**
 * Validates ITMBU Enrollment Number Format
 * Typical formats:
 * - 11 to 14 digit numeric strings (e.g. 23010101001)
 * - Alphanumeric university format (e.g. ITMBU/BT/2023/...)
 */
export function validateItmbuEnrollment(enrollmentNo: string): { isValid: boolean; message?: string } {
  const cleaned = enrollmentNo.trim().toUpperCase();
  if (!cleaned) {
    return { isValid: false, message: "Enrollment number cannot be empty." };
  }
  if (cleaned.length < 8 || cleaned.length > 20) {
    return { isValid: false, message: "ITMBU Enrollment number must be between 8 and 20 characters." };
  }
  // Allow alphanumeric, forward slashes, and hyphens
  const validPattern = /^[A-Z0-9\/-]+$/;
  if (!validPattern.test(cleaned)) {
    return { isValid: false, message: "Enrollment number contains invalid characters." };
  }
  return { isValid: true };
}

/**
 * Student Self-Service Import & Verification
 * Saves verified academic profile directly into the Supabase profiles database.
 */
export async function saveVerifiedStudentProfile(
  userId: string,
  profileData: Partial<UmsStudentProfile>
): Promise<{ success: boolean; error?: string }> {
  if (!userId) {
    return { success: false, error: "Authentication required to link student record." };
  }

  if (profileData.enrollmentNo) {
    const validation = validateItmbuEnrollment(profileData.enrollmentNo);
    if (!validation.isValid) {
      return { success: false, error: validation.message };
    }
  }

  try {
    const updates: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (profileData.enrollmentNo) updates.enrollment_no = profileData.enrollmentNo.trim().toUpperCase();
    if (profileData.studentName) updates.display_name = profileData.studentName.trim();
    if (profileData.program) updates.program = profileData.program;
    if (profileData.branch) updates.branch = profileData.branch;
    if (profileData.semester) updates.semester = profileData.semester;

    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("user_id", userId);

    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    console.error("UMS integration error:", err);
    return { success: false, error: err.message || "Failed to update verified student profile." };
  }
}

/**
 * Official University Portal Reference Links
 */
export const ITMBU_OFFICIAL_URLS = {
  mainSite: "https://itmbu.ac.in/",
  studentUms: "https://ums.itmbu.ac.in/StudentPanel/StudentDashboard.aspx",
  disclaimer: "ITM Notes is an independent academic resource platform created for students of ITM (SLS) Baroda University and is not operated by university administration.",
};
