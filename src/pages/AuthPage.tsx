import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LogIn, UserPlus, ArrowLeft, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

export default function AuthPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const justConfirmed = searchParams.get("confirmed") === "1";
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // When the email-confirm link redirects here, force the Login tab and show a banner
  useEffect(() => {
    if (justConfirmed) setIsLogin(true);
  }, [justConfirmed]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) throw error;
        toast({ title: "Welcome back! 🎉" });
        navigate("/");
      } else {
        const { error } = await signUp(email, password, displayName);
        if (error) throw error;
        toast({ title: "Account created!", description: "Check your email to verify." });
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-scale-in">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <div className="surface-elevated rounded p-8">
          <div className="text-center mb-8">
            <img src={logo} alt="Velocity Web" className="w-12 h-12 mx-auto mb-4 object-contain dark:invert" />
            <h1 className="text-2xl font-bold">{isLogin ? "Welcome Back" : "Create Account"}</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {isLogin ? "Sign in to track your progress" : "Join ITM Notes today"}
            </p>
          </div>

          {justConfirmed && (
            <div className="mb-6 flex items-start gap-3 rounded border border-primary/30 bg-primary/5 p-4 text-sm">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Email confirmed 🎉</p>
                <p className="text-muted-foreground">Your account is ready. Sign in below to get started.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="name">Display Name</Label>
                <Input id="name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your name" className="mt-1.5 bg-secondary/50 border-border" />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="mt-1.5 bg-secondary/50 border-border" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1.5">
                <Input id="password" type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} className="bg-secondary/50 border-border pr-10" />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowPw(!showPw)}>
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full gap-2" disabled={loading}>
              {loading ? "Please wait..." : isLogin ? (<><LogIn className="h-4 w-4" /> Sign In</>) : (<><UserPlus className="h-4 w-4" /> Sign Up</>)}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline font-medium">
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
