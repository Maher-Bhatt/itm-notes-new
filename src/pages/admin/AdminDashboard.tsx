import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Database, Users, BookOpen, Settings } from "lucide-react";

export default function AdminDashboard() {
  const { role } = useAuth();
  const navigate = useNavigate();

  if (role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-6">
        <div>
          <h2 className="text-xl font-bold text-destructive mb-2">Access Denied</h2>
          <p className="text-muted-foreground mb-4">You do not have permission to view this page.</p>
          <button onClick={() => navigate("/")} className="text-primary hover:underline">Return Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground mb-10">Manage platform content, users, and settings.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <button 
            onClick={() => navigate('/admin/seed')}
            className="surface-elevated rounded-xl p-6 flex flex-col items-start gap-4 hover:bg-secondary transition-colors apple-press text-left border"
          >
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Database className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Database Seeder</h3>
              <p className="text-xs text-muted-foreground">Migrate hardcoded JSON to Supabase</p>
            </div>
          </button>

          <button 
            className="surface-elevated rounded-xl p-6 flex flex-col items-start gap-4 hover:bg-secondary transition-colors apple-press text-left border opacity-50 cursor-not-allowed"
          >
            <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center text-success">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Content Manager</h3>
              <p className="text-xs text-muted-foreground">Add/edit subjects and topics (Coming Soon)</p>
            </div>
          </button>

          <button 
            className="surface-elevated rounded-xl p-6 flex flex-col items-start gap-4 hover:bg-secondary transition-colors apple-press text-left border opacity-50 cursor-not-allowed"
          >
            <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center text-warning">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">User Manager</h3>
              <p className="text-xs text-muted-foreground">Manage student roles (Coming Soon)</p>
            </div>
          </button>

          <button 
            className="surface-elevated rounded-xl p-6 flex flex-col items-start gap-4 hover:bg-secondary transition-colors apple-press text-left border opacity-50 cursor-not-allowed"
          >
            <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              <Settings className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Settings</h3>
              <p className="text-xs text-muted-foreground">Platform configuration (Coming Soon)</p>
            </div>
          </button>

        </div>
      </main>
      <Footer />
    </div>
  );
}
