import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useUniversities() {
  return useQuery({
    queryKey: ["universities"],
    queryFn: async () => {
      const { data, error } = await supabase.from("universities").select("*").order("name");
      if (error) throw error;
      return data;
    },
  });
}

export function usePrograms(universityId?: string) {
  return useQuery({
    queryKey: ["programs", universityId],
    queryFn: async () => {
      let query = supabase.from("programs").select("*").order("name");
      if (universityId) {
        query = query.eq("university_id", universityId);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!universityId,
  });
}

export function useBranches(programId?: string) {
  return useQuery({
    queryKey: ["branches", programId],
    queryFn: async () => {
      let query = supabase.from("branches").select("*").order("name");
      if (programId) {
        query = query.eq("program_id", programId);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!programId,
  });
}

export function useSemesters(branchId?: string) {
  return useQuery({
    queryKey: ["semesters", branchId],
    queryFn: async () => {
      let query = supabase.from("semesters").select("*").order("number");
      if (branchId) {
        query = query.eq("branch_id", branchId);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!branchId,
  });
}

export function useSubjects(semesterId?: string) {
  return useQuery({
    queryKey: ["subjects", semesterId],
    queryFn: async () => {
      let query = supabase.from("subjects").select("*").order("order_index");
      if (semesterId) {
        query = query.eq("semester_id", semesterId);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
}

export function useSubject(subjectId?: string) {
  return useQuery({
    queryKey: ["subject", subjectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subjects")
        .select(`
          *,
          units (
            *,
            topics (
              id,
              title,
              order_index
            )
          )
        `)
        .eq("id", subjectId)
        .single();
      if (error) throw error;
      
      // Sort units and topics
      if (data.units) {
        data.units.sort((a: any, b: any) => a.order_index - b.order_index);
        data.units.forEach((unit: any) => {
          if (unit.topics) {
            unit.topics.sort((a: any, b: any) => a.order_index - b.order_index);
          }
        });
      }
      
      return data;
    },
    enabled: !!subjectId,
  });
}

export function useTopic(topicId?: string) {
  return useQuery({
    queryKey: ["topic", topicId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("topics")
        .select(`
          *,
          examples (*),
          key_points (*),
          mcqs (*)
        `)
        .eq("id", topicId)
        .single();
      if (error) throw error;

      if (data.examples) data.examples.sort((a: any, b: any) => a.order_index - b.order_index);
      if (data.key_points) data.key_points.sort((a: any, b: any) => a.order_index - b.order_index);
      if (data.mcqs) data.mcqs.sort((a: any, b: any) => a.order_index - b.order_index);

      return data;
    },
    enabled: !!topicId,
  });
}

export function useSearchTopics(searchQuery: string) {
  return useQuery({
    queryKey: ["search", searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) return [];
      
      // Basic ilike search for now. For better search, Postgres full-text search is needed.
      const { data, error } = await supabase
        .from("topics")
        .select(`
          id,
          title,
          simple_explanation,
          units (
            subject_id
          )
        `)
        .ilike('title', `%${searchQuery}%`)
        .limit(20);
        
      if (error) throw error;
      return data;
    },
    enabled: searchQuery.trim().length > 2,
  });
}
