import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { subjects } from "@/data/subjects";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Header } from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function SeedPage() {
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const { role } = useAuth();

  if (role !== 'admin') {
    return <Navigate to="/" />;
  }

  const addLog = (message: string) => {
    setLog(prev => [...prev, message]);
    console.log(message);
  };

  const handleSeed = async () => {
    setLoading(true);
    setLog([]);
    try {
      addLog("Starting seeding process...");

      // 0. Wipe existing data to prevent duplicates (Cascade delete handles everything)
      addLog("Cleaning old curriculum data...");
      await supabase.from('universities').delete().eq('name', 'ITM (SLS) Baroda University');

      // 1. Create base university structure
      const { data: uni, error: uniError } = await supabase
        .from('universities')
        .insert({ name: 'ITM (SLS) Baroda University' })
        .select().single();
      if (uniError) throw uniError;
      addLog(`Created University: ${uni.id}`);

      const { data: prog, error: progError } = await supabase
        .from('programs')
        .insert({ university_id: uni.id, name: 'B.Tech' })
        .select().single();
      if (progError) throw progError;
      addLog(`Created Program: ${prog.id}`);

      const { data: branch, error: branchError } = await supabase
        .from('branches')
        .insert({ program_id: prog.id, name: 'Computer Science' })
        .select().single();
      if (branchError) throw branchError;
      addLog(`Created Branch: ${branch.id}`);

      // 2. Pre-create all 8 semesters for the branch
      const semesterMap = new Map<number, string>();
      for (let semNum = 1; semNum <= 8; semNum++) {
        const { data: newSem, error: semError } = await supabase
          .from('semesters')
          .insert({ branch_id: branch.id, number: semNum })
          .select()
          .single();

        if (semError) {
          const { data: existingSem } = await supabase
            .from('semesters')
            .select('id')
            .eq('branch_id', branch.id)
            .eq('number', semNum)
            .maybeSingle();
          if (existingSem) semesterMap.set(semNum, existingSem.id);
        } else if (newSem) {
          semesterMap.set(semNum, newSem.id);
          addLog(`Created Semester ${semNum}`);
        }
      }

      // 3. Iterate subjects to seed content
      for (const [sIndex, subject] of subjects.entries()) {
        addLog(`Processing subject: ${subject.name}`);
        const semId = semesterMap.get(subject.semester || 3) || Array.from(semesterMap.values())[0];

        // Insert subject
        const { data: dbSubject, error: subError } = await supabase
          .from('subjects')
          .insert({
            semester_id: semId,
            name: subject.name,
            code: subject.code,
            color: subject.color,
            icon: subject.icon,
            description: subject.description,
            order_index: sIndex
          })
          .select().single();
        if (subError) throw subError;
        addLog(`Created Subject: ${dbSubject.id}`);

        // Insert units
        for (const [uIndex, unit] of subject.units.entries()) {
          const { data: dbUnit, error: unitError } = await supabase
            .from('units')
            .insert({
              subject_id: dbSubject.id,
              title: unit.title,
              description: unit.description,
              order_index: uIndex
            })
            .select().single();
          if (unitError) throw unitError;

          // Insert topics
          for (const [tIndex, topic] of unit.topics.entries()) {
            const { data: dbTopic, error: topicError } = await supabase
              .from('topics')
              .insert({
                unit_id: dbUnit.id,
                title: topic.title,
                simple_explanation: topic.simpleExplanation,
                detailed_explanation: topic.detailedExplanation,
                rich_content: topic.richContent || null,
                order_index: tIndex
              })
              .select().single();
            if (topicError) throw topicError;

            // Insert examples
            if (topic.examples && topic.examples.length > 0) {
              const examplesData = topic.examples.map((ex, eIndex) => ({
                topic_id: dbTopic.id,
                title: ex.title,
                problem: ex.problem,
                explanation: ex.explanation,
                code: ex.code || null,
                output: ex.output || null,
                order_index: eIndex
              }));
              const { error: exError } = await supabase.from('examples').insert(examplesData);
              if (exError) throw exError;
            }

            // Insert key points
            if (topic.keyPoints && topic.keyPoints.length > 0) {
              const kpData = topic.keyPoints.map((kp, kIndex) => ({
                topic_id: dbTopic.id,
                point: kp,
                order_index: kIndex
              }));
              const { error: kpError } = await supabase.from('key_points').insert(kpData);
              if (kpError) throw kpError;
            }

            // Insert MCQs
            if (topic.mcqs && topic.mcqs.length > 0) {
              const mcqData = topic.mcqs.map((mcq, mIndex) => ({
                topic_id: dbTopic.id,
                question: mcq.question,
                options: mcq.options, // jsonb
                correct_index: typeof mcq.correctIndex === 'number' && !isNaN(mcq.correctIndex) ? mcq.correctIndex : 0,
                explanation: mcq.explanation,
                order_index: mIndex
              }));
              const { error: mcqError } = await supabase.from('mcqs').insert(mcqData);
              if (mcqError) throw mcqError;
            }
          }
        }
      }

      addLog("Seeding completed successfully!");
      toast.success("Database seeded successfully!");
    } catch (error: any) {
      console.error(error);
      addLog(`ERROR: ${error.message}`);
      toast.error("Failed to seed database. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full p-6">
        <h1 className="text-2xl font-bold mb-4">Database Seeder</h1>
        <p className="text-muted-foreground mb-6">
          This will migrate all hardcoded subjects, units, topics, examples, and MCQs into Supabase.
          Do not run this multiple times unless you clear the database first.
        </p>
        <button
          onClick={handleSeed}
          disabled={loading}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? "Seeding..." : "Start Seeding"}
        </button>

        <div className="mt-8 bg-secondary p-4 rounded-md h-96 overflow-y-auto font-mono text-sm">
          {log.length === 0 && <span className="text-muted-foreground">Log output will appear here...</span>}
          {log.map((entry, i) => (
            <div key={i} className="mb-1">{entry}</div>
          ))}
        </div>
      </main>
    </div>
  );
}

