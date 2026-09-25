import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Code, Play, CheckCircle, XCircle, Trophy } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useGamification } from '@/hooks/useGamification';

const MOCK_PROBLEM = {
  title: "Reverse an Array",
  description: "Write a function that reverses the elements of an array in-place.",
  difficulty: "Easy",
  starterCode: `public class Main {
    public static void reverse(int[] arr) {
        // Your code here
        
    }
    
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        reverse(arr);
        for(int i: arr) System.out.print(i + " ");
    }
}`,
  solution: "5 4 3 2 1"
};

export default function CodingLabPage() {
  const [code, setCode] = useState(MOCK_PROBLEM.starterCode);
  const [output, setOutput] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'failed'>('idle');
  const { addXp, unlockAchievement } = useGamification();

  const handleRun = () => {
    setStatus('running');
    setOutput(null);
    
    // Simulate compilation and execution
    setTimeout(() => {
      // Very basic simulation for demo purposes
      if (code.includes('arr[i]') || code.includes('arr[left]')) {
        setOutput("5 4 3 2 1 \n\n[Process completed successfully]");
        setStatus('success');
        addXp(50, 'Coding Challenge Solved');
        unlockAchievement('code-ninja');
      } else {
        setOutput("1 2 3 4 5 \n\n[Process completed successfully - Incorrect Output]");
        setStatus('failed');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column: Problem Statement */}
        <div className="flex flex-col gap-6">
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  {MOCK_PROBLEM.title}
                </CardTitle>
                <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {MOCK_PROBLEM.difficulty}
                </span>
              </div>
              <CardDescription>Coding Lab Practice</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 prose prose-sm dark:prose-invert">
              <p>{MOCK_PROBLEM.description}</p>
              <h3>Expected Output</h3>
              <pre><code>{MOCK_PROBLEM.solution}</code></pre>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Code Editor & Output */}
        <div className="flex flex-col gap-4">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="py-3 bg-muted/30 border-b flex flex-row items-center justify-between">
              <span className="text-sm font-mono font-medium">Main.java</span>
              <Button size="sm" onClick={handleRun} disabled={status === 'running'}>
                {status === 'running' ? (
                  <span className="animate-pulse">Compiling...</span>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Run Code
                  </>
                )}
              </Button>
            </CardHeader>
            <div className="p-0 flex-1 relative">
              <Textarea 
                className="w-full h-full min-h-[300px] font-mono text-sm p-4 border-0 focus-visible:ring-0 rounded-none bg-zinc-950 text-zinc-50"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
              />
            </div>
          </Card>

          {/* Console Output */}
          <Card className="h-48 flex flex-col">
            <CardHeader className="py-2 bg-muted/50 border-b">
              <CardTitle className="text-xs font-medium uppercase tracking-wider flex items-center justify-between">
                Console
                {status === 'success' && <span className="text-green-500 flex items-center gap-1"><CheckCircle className="h-3 w-3"/> Passed</span>}
                {status === 'failed' && <span className="text-red-500 flex items-center gap-1"><XCircle className="h-3 w-3"/> Failed</span>}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 bg-black text-green-400 font-mono text-xs overflow-auto flex-1 rounded-b-xl">
              {output || "Waiting for execution..."}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
