import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FileText, Download, Filter, Search } from "lucide-react";
import { subjects } from "@/data/subjects";

// Mock materials data based on subjects
const MOCK_MATERIALS = subjects.flatMap(s => [
  { id: `${s.id}-syl`, title: `${s.name} Syllabus`, type: "pdf", size: "1.2 MB", subject: s.name, category: "Syllabus" },
  { id: `${s.id}-notes`, title: `${s.name} Unit 1-2 Notes`, type: "pdf", size: "4.5 MB", subject: s.name, category: "Notes" },
  { id: `${s.id}-pyq`, title: `${s.name} Previous Year Paper (2025)`, type: "pdf", size: "2.1 MB", subject: s.name, category: "Question Paper" }
]);

export default function MaterialsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const categories = ["All", "Syllabus", "Notes", "Question Paper"];

  const filteredMaterials = MOCK_MATERIALS.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) || m.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "All" || m.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10 animate-fade-in">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Materials Library</h1>
            <p className="text-muted-foreground">Download syllabi, handwritten notes, and previous year question papers.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <Filter className="h-4 w-4 text-muted-foreground shrink-0 mr-1" />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap transition-colors ${
                  filterCategory === cat 
                    ? "bg-primary text-primary-foreground font-medium" 
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMaterials.map(material => (
            <div key={material.id} className="surface-elevated rounded-xl p-5 border flex flex-col">
              <div className="flex items-start gap-3 mb-4">
                <div className="h-10 w-10 rounded bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm line-clamp-2" title={material.title}>{material.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{material.subject}</p>
                </div>
              </div>
              <div className="mt-auto flex items-center justify-between pt-4 border-t">
                <span className="text-xs font-medium bg-secondary px-2 py-1 rounded">{material.category}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{material.size}</span>
                  <button className="apple-press text-primary hover:text-primary/80 transition-colors" title="Download">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredMaterials.length === 0 && (
            <div className="col-span-full py-20 text-center text-muted-foreground">
              No materials found matching your search.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
