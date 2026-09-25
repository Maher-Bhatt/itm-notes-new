import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { REAL_STUDY_MATERIALS, StudyMaterial } from "@/data/materialsData";
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  BookOpen, 
  CheckCircle, 
  FolderDown, 
  FileCheck, 
  ExternalLink,
  Layers,
  Sparkles,
  Eye,
  X
} from "lucide-react";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";

export default function MaterialsPage() {
  const [searchParams] = useSearchParams();
  const subjectParam = searchParams.get("subject");

  // Determine initial selected subject based on query param
  const initialSubject = useMemo(() => {
    if (!subjectParam) return "All";
    const found = REAL_STUDY_MATERIALS.find(
      (m) => m.subjectId === subjectParam || m.subject.toLowerCase() === subjectParam.toLowerCase()
    );
    return found ? found.subject : "All";
  }, [subjectParam]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(initialSubject);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSemester, setSelectedSemester] = useState("All");
  const [activePreview, setActivePreview] = useState<StudyMaterial | null>(null);

  // Extract unique subjects
  const subjectList = useMemo(() => {
    const list = ["All"];
    REAL_STUDY_MATERIALS.forEach((m) => {
      if (!list.includes(m.subject)) list.push(m.subject);
    });
    return list;
  }, []);

  const categories = ["All", "Notes", "Syllabus", "Question Paper", "Presentation", "Lab Manual", "Assignment"];

  // Filtered list
  const filteredMaterials = useMemo(() => {
    return REAL_STUDY_MATERIALS.filter((m) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        m.title.toLowerCase().includes(query) ||
        m.subject.toLowerCase().includes(query) ||
        m.description.toLowerCase().includes(query) ||
        m.topicsCovered.some((t) => t.toLowerCase().includes(query));

      const matchesSubject = selectedSubject === "All" || m.subject === selectedSubject;
      const matchesCategory = selectedCategory === "All" || m.category === selectedCategory;
      const matchesSemester =
        selectedSemester === "All" ||
        (selectedSemester === "Semester 1" && m.semester === 1) ||
        (selectedSemester === "Semester 2" && m.semester === 2) ||
        (selectedSemester === "Semester 3" && m.semester === 3);

      return matchesSearch && matchesSubject && matchesCategory && matchesSemester;
    });
  }, [searchQuery, selectedSubject, selectedCategory, selectedSemester]);

  const handleDownload = (material: StudyMaterial) => {
    if (material.downloadUrl) {
      const link = document.createElement("a");
      link.href = material.downloadUrl;
      link.setAttribute("download", material.downloadUrl.split("/").pop() || `${material.title.replace(/[^a-zA-Z0-9_-]/g, "_")}.${material.fileType.toLowerCase()}`);
      link.setAttribute("target", "_blank");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(`Downloading: "${material.title}"`, {
        description: `Format: ${material.fileType} (${material.fileSize})`,
      });
    } else {
      const content = `# ITM SLS BARODA UNIVERSITY - ACADEMIC STUDY REPOSITORY
## ${material.title}
- **Subject:** ${material.subject} (${material.subjectCode})
- **Semester:** ${material.semester}
- **Category:** ${material.category}
- **File Type:** ${material.fileType} (${material.fileSize})

---
### Document Description:
${material.description}

### Syllabus & Topics Covered:
${material.topicsCovered.map((t, idx) => `${idx + 1}. ${t}`).join("\n")}

---
© ITM SLS Baroda University - Computer Science & Engineering
`;
      const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${material.title.replace(/[^a-zA-Z0-9_-]/g, "_")}_Study_Guide.md`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success(`Downloaded "${material.title}" Study Guide!`);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 animate-fade-in">
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-primary/10 via-secondary/40 to-background border border-border/80 rounded-3xl p-6 sm:p-10 mb-8 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
              ITM SLS Baroda University
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Verified Academic Repository
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground mb-3 tracking-tight">
            Academic Materials Library
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl mb-8">
            Complete curriculum repository distributed subject-wise: official syllabi, faculty lecture presentations, comprehensive handwritten e-notes, university external examination papers, and lab manuals.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border/60">
            <div>
              <p className="text-2xl font-black text-foreground">{REAL_STUDY_MATERIALS.length}</p>
              <p className="text-xs font-medium text-muted-foreground">Total Documents</p>
            </div>
            <div>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                {REAL_STUDY_MATERIALS.filter((m) => m.semester === 3).length}
              </p>
              <p className="text-xs font-medium text-muted-foreground">Semester 3 Materials</p>
            </div>
            <div>
              <p className="text-2xl font-black text-blue-600 dark:text-blue-400">
                {REAL_STUDY_MATERIALS.filter((m) => m.category === "Question Paper").length}
              </p>
              <p className="text-xs font-medium text-muted-foreground">PYQ & Question Banks</p>
            </div>
            <div>
              <p className="text-2xl font-black text-amber-600 dark:text-amber-400">
                {REAL_STUDY_MATERIALS.filter((m) => m.category === "Syllabus").length}
              </p>
              <p className="text-xs font-medium text-muted-foreground">Official Syllabi</p>
            </div>
          </div>
        </div>

        {/* ── Filters & Search ── */}
        <div className="bg-card border border-border/80 rounded-2xl p-5 mb-8 shadow-sm space-y-4">
          {/* Search bar & Semester filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by topic (e.g. Normalization, Booth Algorithm, Trees, JVM)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
              />
            </div>

            <div className="flex items-center gap-1.5 shrink-0 bg-secondary/50 p-1 rounded-xl overflow-x-auto">
              {[
                { label: "All Semesters", value: "All" },
                { label: "Sem 1", value: "Semester 1" },
                { label: "Sem 2", value: "Semester 2" },
                { label: "⚡ Sem 3 (Core)", value: "Semester 3" },
              ].map((sem) => (
                <button
                  key={sem.value}
                  onClick={() => setSelectedSemester(sem.value)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                    selectedSemester === sem.value
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {sem.label}
                </button>
              ))}
            </div>
          </div>

          {/* Subject Filter Pills */}
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Subject Distribution:</p>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {subjectList.map((subject) => (
                <button
                  key={subject}
                  onClick={() => setSelectedSubject(subject)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-all border ${
                    selectedSubject === subject
                      ? "bg-foreground text-background border-foreground font-bold shadow-sm"
                      : "bg-background text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="pt-2 border-t border-border/60 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-semibold text-muted-foreground shrink-0 mr-1">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? "bg-secondary text-foreground font-bold border border-border"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Materials Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMaterials.map((material) => (
            <div
              key={material.id}
              onClick={() => setActivePreview(material)}
              className="bg-card border border-border/80 hover:border-primary/40 rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 shadow-sm hover:shadow-md group cursor-pointer"
            >
              <div>
                {/* Header tags */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-secondary text-secondary-foreground">
                      {material.subjectCode}
                    </span>
                    <span className="text-[11px] font-medium text-muted-foreground">
                      Sem {material.semester}
                    </span>
                    {material.badge && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${material.badgeColor}`}>
                        {material.badge}
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    material.fileType === "PDF"
                      ? "bg-red-500/10 text-red-600 dark:text-red-400"
                      : material.fileType === "PPTX"
                      ? "bg-orange-500/10 text-orange-600 dark:text-orange-400"
                      : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                  }`}>
                    {material.fileType}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                  {material.title}
                </h3>

                {/* Subject name */}
                <p className="text-xs font-semibold text-primary mb-2">
                  {material.subject}
                </p>

                {/* Description */}
                <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed mb-4">
                  {material.description}
                </p>

                {/* Topics Covered Tag Cloud */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {material.topicsCovered.slice(0, 3).map((topic, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-secondary/70 text-muted-foreground"
                    >
                      {topic}
                    </span>
                  ))}
                  {material.topicsCovered.length > 3 && (
                    <span className="text-[10px] font-medium px-1.5 py-0.5 text-muted-foreground/60">
                      +{material.topicsCovered.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-medium">{material.fileSize}</span>
                  {material.pages && (
                    <>
                      <span>•</span>
                      <span>{material.pages}</span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); setActivePreview(material); }}
                    className="p-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                    title="View Details & Syllabus Coverage"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDownload(material); }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-sm"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredMaterials.length === 0 && (
            <div className="col-span-full py-20 text-center bg-card border border-border rounded-2xl p-8">
              <FolderDown className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
              <h3 className="text-lg font-bold text-foreground mb-1">No Materials Found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                No academic documents match your current filter settings or search terms.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSubject("All");
                  setSelectedCategory("All");
                  setSelectedSemester("All");
                }}
                className="px-4 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:opacity-90"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* ── Document Details Modal ── */}
      {activePreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-card border border-border rounded-2xl max-w-xl w-full p-6 shadow-2xl relative animate-scale-in">
            <button
              onClick={() => setActivePreview(null)}
              className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-primary/10 text-primary">
                {activePreview.subjectCode} · Semester {activePreview.semester}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-secondary text-muted-foreground">
                {activePreview.category}
              </span>
            </div>

            <h2 className="text-xl font-bold text-foreground mb-2 leading-snug">
              {activePreview.title}
            </h2>

            <p className="text-xs font-semibold text-primary mb-4">
              Subject: {activePreview.subject}
            </p>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {activePreview.description}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                Topics Covered in this Document:
              </h4>
              <div className="flex flex-wrap gap-2">
                {activePreview.topicsCovered.map((topic, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-md bg-secondary text-foreground flex items-center gap-1.5"
                  >
                    <CheckCircle className="h-3 w-3 text-emerald-500" />
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border text-xs text-muted-foreground">
              <div>
                <span>Size: {activePreview.fileSize}</span>
                {activePreview.pages && <span className="ml-2">({activePreview.pages})</span>}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setActivePreview(null)}
                  className="px-4 py-2 rounded-lg bg-secondary text-foreground font-semibold hover:bg-secondary/80"
                >
                  Close
                </button>
                {activePreview.downloadUrl && (
                  <a
                    href={activePreview.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-secondary hover:bg-secondary/80 text-foreground font-semibold"
                  >
                    <ExternalLink className="h-4 w-4" /> Open
                  </a>
                )}
                <button
                  onClick={() => {
                    handleDownload(activePreview);
                    setActivePreview(null);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-bold hover:opacity-90 shadow-sm"
                >
                  <Download className="h-4 w-4" /> Download Material
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
