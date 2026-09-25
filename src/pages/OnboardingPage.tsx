import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAcademic } from "@/contexts/AcademicContext";
import { useUniversities, usePrograms, useBranches, useSemesters } from "@/hooks/useAcademicData";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { setAcademicContext } = useAcademic();

  const [selectedUni, setSelectedUni] = useState<string>("");
  const [selectedProg, setSelectedProg] = useState<string>("");
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [selectedSem, setSelectedSem] = useState<string>("3");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: universities, isLoading: uniLoading } = useUniversities();
  const { data: programs, isLoading: progLoading } = usePrograms(selectedUni);
  const { data: branches, isLoading: branchLoading } = useBranches(selectedProg);
  const { data: semesters, isLoading: semLoading } = useSemesters(selectedBranch);

  // Auto-select if only 1 option available (e.g. ITM SLS Baroda University -> B.Tech -> Computer Science)
  useEffect(() => {
    if (universities && universities.length === 1 && !selectedUni) {
      setSelectedUni(universities[0].id);
    }
  }, [universities, selectedUni]);

  useEffect(() => {
    if (programs && programs.length === 1 && !selectedProg) {
      setSelectedProg(programs[0].id);
    }
  }, [programs, selectedProg]);

  useEffect(() => {
    if (branches && branches.length === 1 && !selectedBranch) {
      setSelectedBranch(branches[0].id);
    }
  }, [branches, selectedBranch]);

  const handleComplete = async () => {
    setIsSubmitting(true);
    let finalSemId = selectedSem;

    // Check if the selected semester exists in the database
    const semNum = Number(selectedSem.replace("sem-", ""));
    const matchingDbSem = semesters?.find((s) => s.id === selectedSem || s.number === semNum);

    if (matchingDbSem) {
      finalSemId = matchingDbSem.id;
    } else if (selectedBranch && !isNaN(semNum)) {
      // Auto-create semester in database if missing
      try {
        const { data: createdSem } = await supabase
          .from("semesters")
          .insert({ branch_id: selectedBranch, number: semNum })
          .select()
          .single();

        if (createdSem) {
          finalSemId = createdSem.id;
        }
      } catch (err) {
        console.error("Could not auto-create semester in DB:", err);
      }
    }

    setAcademicContext({
      universityId: selectedUni || undefined,
      programId: selectedProg || undefined,
      branchId: selectedBranch || undefined,
      semesterId: finalSemId,
    });

    setIsSubmitting(false);
    navigate("/dashboard");
  };

  const handleSkip = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto w-full p-6 flex flex-col justify-center animate-fade-in">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3">Set up your profile</h1>
          <p className="text-muted-foreground">Select your current academic details to personalize your experience.</p>
        </div>

        <div className="surface-elevated rounded-xl p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">University</label>
            {uniLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            ) : (
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={selectedUni}
                onChange={(e) => {
                  setSelectedUni(e.target.value);
                  setSelectedProg("");
                  setSelectedBranch("");
                }}
              >
                <option value="">Select University</option>
                {universities?.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Program</label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
              value={selectedProg}
              onChange={(e) => {
                setSelectedProg(e.target.value);
                setSelectedBranch("");
              }}
              disabled={!selectedUni || progLoading}
            >
              <option value="">Select Program</option>
              {programs?.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Branch</label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              disabled={!selectedProg || branchLoading}
            >
              <option value="">Select Branch</option>
              {branches?.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Semester</label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={selectedSem}
              onChange={(e) => setSelectedSem(e.target.value)}
            >
              <option value="">Select Semester</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((semNum) => {
                const dbSem = semesters?.find((s) => s.number === semNum);
                const val = dbSem ? dbSem.id : `sem-${semNum}`;
                return (
                  <option key={semNum} value={val}>
                    Semester {semNum} {semNum === 3 ? "⭐ (Your Current Semester)" : ""}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="pt-6 flex items-center justify-between">
            <button
              onClick={handleSkip}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
            >
              Skip for now
            </button>
            <Button onClick={handleComplete} disabled={!selectedSem || isSubmitting} className="apple-press">
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Continue
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
