import { supabase } from "@/integrations/supabase/client";
import { StudyMaterial } from "../materialsData";

export async function fetchLiveMaterials(): Promise<StudyMaterial[]> {
  const { data, error } = await supabase
    .from('materials')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error("Error fetching materials from Supabase:", error);
    return [];
  }

  return data.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    fileType: item.file_type as any,
    fileSize: item.file_size,
    category: item.category as any,
    downloadUrl: item.download_url,
    semester: item.semester,
    subject: item.subject,
    uploadedDate: new Date(item.created_at).toLocaleDateString(),
    pages: item.pages ? `${item.pages} Pages` : undefined,
    badge: item.badge,
    badgeColor: item.badge_color,
  }));
}
