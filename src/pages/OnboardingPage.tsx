import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAcademic } from "@/contexts/AcademicContext";
import { useUniversities, usePrograms, useBranches, useSemesters } from "@/hooks/useAcademicData";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { setAcademicContext } = useAcademic();
  
  const [selectedUni, setSelectedUni] = useState<string>("");
  const [selectedProg, setSelectedProg] = useState<string>("");
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [selectedSem, setSelectedSem] = useState<string>("");

  const { data: universities, isLoading: uniLoading } = useUniversities();
  const { data: programs, isLoading: progLoading } = usePrograms(selectedUni);
  const { data: branches, isLoading: branchLoading } = useBranches(selectedProg);
  const { data: semesters, isLoading: semLoading } = useSemesters(selectedBranch);

  const handleComplete = () => {
    setAcademicContext({
      universityId: selectedUni,
      programId: selectedProg,
      branchId: selectedBranch,
      semesterId: selectedSem,
    });
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
                onChange={(e) => { setSelectedUni(e.target.value); setSelectedProg(""); setSelectedBranch(""); setSelectedSem(""); }}
              >
                <option value="">Select University</option>
                {universities?.map(u => (
                  <option key={u.id} value={u.id}>{u.name}</option>
                ))}
              </select>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Program</label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
              value={selectedProg}
              onChange={(e) => { setSelectedProg(e.target.value); setSelectedBranch(""); setSelectedSem(""); }}
              disabled={!selectedUni || progLoading}
            >
              <option value="">Select Program</option>
              {programs?.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Branch</label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
              value={selectedBranch}
              onChange={(e) => { setSelectedBranch(e.target.value); setSelectedSem(""); }}
              disabled={!selectedProg || branchLoading}
            >
              <option value="">Select Branch</option>
              {branches?.map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Semester</label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
              value={selectedSem}
              onChange={(e) => setSelectedSem(e.target.value)}
              disabled={!selectedBranch || semLoading}
            >
              <option value="">Select Semester</option>
              {semesters?.map(s => (
                <option key={s.id} value={s.id}>Semester {s.number}</option>
              ))}
            </select>
          </div>

          <div className="pt-6 flex items-center justify-between">
            <button onClick={handleSkip} className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none">
              Skip for now
            </button>
            <Button onClick={handleComplete} disabled={!selectedSem} className="apple-press">
              Continue
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
