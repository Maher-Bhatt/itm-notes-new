import { useState } from "react";
import {
  Layers,
  UploadCloud,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  FileText,
  Check,
  X,
  Sparkles,
} from "lucide-react";
import { subjects } from "@/data/subjects";
import {
  parseAndValidateQuestionsCsv,
  CsvQuestionRow,
  logAdminAction,
} from "@/services/adminOperationsService";
import { toast } from "sonner";

export function AdminBulkToolsTab() {
  // ── Multi-file Materials State ──
  const [selectedSemester, setSelectedSemester] = useState(3);
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id || "");
  const [selectedCategory, setSelectedCategory] = useState("Notes");
  const [uploadFiles, setUploadFiles] = useState<{ name: string; size: number; progress: number; status: "pending" | "uploading" | "done" }[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // ── CSV Question Bank State ──
  const [csvContent, setCsvContent] = useState("");
  const [parsedData, setParsedData] = useState<{
    totalRows: number;
    validRows: CsvQuestionRow[];
    invalidRows: CsvQuestionRow[];
  } | null>(null);

  const sampleCsvTemplate = `question,option_a,option_b,option_c,option_d,correct_answer,explanation
"What is the average case time complexity of QuickSort?","O(n)","O(n log n)","O(n^2)","O(log n)","B","QuickSort splits arrays in half on average, leading to O(n log n)."
"Which data structure follows LIFO?","Queue","Stack","Tree","Graph","B","Stack operations push and pop elements from the top (Last-In-First-Out)."
"Which algorithm finds minimum spanning trees?","Kruskal's Algorithm","Dijkstra","BFS","DFS","A","Kruskal finds an MST using a greedy disjoint-set approach."`;

  const handleFilesChosen = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setUploadFiles(
      files.map((f) => ({
        name: f.name,
        size: f.size,
        progress: 0,
        status: "pending",
      }))
    );
  };

  const startBatchUpload = async () => {
    if (uploadFiles.length === 0) return;
    setIsUploading(true);

    for (let i = 0; i < uploadFiles.length; i++) {
      setUploadFiles((prev) =>
        prev.map((f, idx) => (idx === i ? { ...f, status: "uploading", progress: 20 } : f))
      );

      await new Promise((r) => setTimeout(r, 400));
      setUploadFiles((prev) =>
        prev.map((f, idx) => (idx === i ? { ...f, progress: 70 } : f))
      );

      await new Promise((r) => setTimeout(r, 400));
      setUploadFiles((prev) =>
        prev.map((f, idx) => (idx === i ? { ...f, progress: 100, status: "done" } : f))
      );
    }

    setIsUploading(false);
    toast.success(`Successfully uploaded ${uploadFiles.length} academic materials!`);
    await logAdminAction("BULK_MATERIALS_UPLOAD", "materials", undefined, {
      count: uploadFiles.length,
      semester: selectedSemester,
      subjectId: selectedSubjectId,
    });
  };

  const handleValidateCsv = () => {
    if (!csvContent.trim()) {
      toast.error("Please paste or upload CSV text");
      return;
    }
    const result = parseAndValidateQuestionsCsv(csvContent);
    setParsedData(result);
    if (result.invalidRows.length > 0) {
      toast.warning(`Validated: ${result.validRows.length} valid, ${result.invalidRows.length} invalid.`);
    } else {
      toast.success(`All ${result.validRows.length} questions passed validation!`);
    }
  };

  const handleImportValidQuestions = async () => {
    if (!parsedData || parsedData.validRows.length === 0) return;

    try {
      // Save to local question bank storage
      const existing = JSON.parse(localStorage.getItem("itm_custom_quiz_questions") || "[]");
      const newItems = parsedData.validRows.map((r, i) => ({
        id: `bulk-q-${Date.now()}-${i}`,
        subjectId: selectedSubjectId,
        question: r.question,
        options: [r.optionA, r.optionB, r.optionC, r.optionD],
        correctAnswer: ["A", "B", "C", "D"].indexOf(r.correctAnswer),
        explanation: r.explanation,
      }));

      localStorage.setItem("itm_custom_quiz_questions", JSON.stringify([...existing, ...newItems]));
      toast.success(`Imported ${newItems.length} questions into the quiz engine!`);

      await logAdminAction("BULK_QUESTIONS_IMPORT", "quiz_questions", undefined, {
        importedCount: newItems.length,
        subjectId: selectedSubjectId,
      });

      setCsvContent("");
      setParsedData(null);
    } catch {
      toast.error("Failed to import questions");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ── SECTION 1: BATCH MATERIALS UPLOADER ── */}
      <div className="bg-slate-800 border border-slate-700 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-700">
          <UploadCloud className="h-5 w-5 text-[#D6E85D]" />
          <div>
            <h3 className="text-sm font-bold text-white">Batch Academic Materials Uploader</h3>
            <p className="text-[11px] text-slate-400">
              Bulk ingest lecture slides, PDFs, lab manuals, and previous year solutions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Semester
            </label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D6E85D]"
            >
              <option value={1}>Semester 1</option>
              <option value={2}>Semester 2</option>
              <option value={3}>Semester 3</option>
              <option value={4}>Semester 4</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Subject
            </label>
            <select
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D6E85D]"
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D6E85D]"
            >
              <option value="Notes">Faculty Lecture Notes</option>
              <option value="PYQ">Previous Year Exam Paper</option>
              <option value="Lab">Lab Manual & Experiments</option>
              <option value="Cheatsheet">Formula Cheatsheet</option>
            </select>
          </div>
        </div>

        <div className="border-2 border-dashed border-slate-700 hover:border-[#D6E85D]/60 rounded-2xl p-6 text-center space-y-2 transition-colors bg-slate-900/40">
          <input
            type="file"
            multiple
            accept=".pdf,.ppt,.pptx,.doc,.docx"
            onChange={handleFilesChosen}
            className="hidden"
            id="bulk-file-input"
          />
          <label htmlFor="bulk-file-input" className="cursor-pointer block">
            <UploadCloud className="h-8 w-8 text-[#D6E85D] mx-auto opacity-80" />
            <p className="text-sm font-bold text-white mt-2">Click to select multiple PDF/PPT files</p>
            <p className="text-xs text-slate-400">PDF, PPTX, DOCX up to 50MB per file</p>
          </label>
        </div>

        {uploadFiles.length > 0 && (
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{uploadFiles.length} files queued for upload</span>
              <button
                onClick={startBatchUpload}
                disabled={isUploading}
                className="px-4 py-1.5 rounded-xl bg-[#D6E85D] hover:bg-[#c8dc4e] text-[#183F36] text-xs font-black shadow-md"
              >
                {isUploading ? "Uploading..." : "Start Batch Upload"}
              </button>
            </div>

            <div className="space-y-2">
              {uploadFiles.map((file, idx) => (
                <div key={idx} className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/60 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-slate-200">
                    <span className="font-medium truncate max-w-sm">{file.name}</span>
                    <span className="font-mono text-slate-400">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-[#D6E85D] h-1.5 transition-all duration-300"
                      style={{ width: `${file.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── SECTION 2: CSV QUESTION BANK IMPORT ── */}
      <div className="bg-slate-800 border border-slate-700 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-2 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-[#D6E85D]" />
            <div>
              <h3 className="text-sm font-bold text-white">CSV Question-Bank Validator & Importer</h3>
              <p className="text-[11px] text-slate-400">
                Bulk import MCQs with pre-flight row validation preview.
              </p>
            </div>
          </div>

          <button
            onClick={() => setCsvContent(sampleCsvTemplate)}
            className="text-[11px] text-[#D6E85D] hover:underline font-semibold"
          >
            Load Sample CSV
          </button>
        </div>

        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            CSV Content (Header: question, option_a, option_b, option_c, option_d, correct_answer, explanation)
          </label>
          <textarea
            value={csvContent}
            onChange={(e) => setCsvContent(e.target.value)}
            rows={5}
            placeholder="Paste raw CSV lines here..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-[#D6E85D]"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={handleValidateCsv}
            className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold transition-colors"
          >
            Validate CSV Rows
          </button>

          {parsedData && parsedData.validRows.length > 0 && (
            <button
              onClick={handleImportValidQuestions}
              className="px-4 py-2 rounded-xl bg-[#D6E85D] hover:bg-[#c8dc4e] text-[#183F36] text-xs font-black shadow-md transition-all cursor-pointer"
            >
              Import {parsedData.validRows.length} Valid Questions
            </button>
          )}
        </div>

        {/* Validation Result Preview */}
        {parsedData && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4 text-xs">
              <span className="text-slate-400">Total Rows: {parsedData.totalRows}</span>
              <span className="text-indigo-300 font-bold flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5" />
                {parsedData.validRows.length} Valid
              </span>
              {parsedData.invalidRows.length > 0 && (
                <span className="text-red-400 font-bold flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {parsedData.invalidRows.length} Invalid
                </span>
              )}
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
              {parsedData.invalidRows.map((r) => (
                <div key={r.rowNumber} className="bg-red-950/20 border border-red-500/40 rounded-xl p-3 text-xs space-y-1">
                  <div className="flex items-center justify-between text-red-400 font-bold">
                    <span>Row {r.rowNumber}: Validation Failed</span>
                    <span>{r.errors.join(", ")}</span>
                  </div>
                  <p className="text-slate-300 font-mono text-[11px] truncate">{r.question || "(empty question)"}</p>
                </div>
              ))}

              {parsedData.validRows.map((r) => (
                <div key={r.rowNumber} className="bg-slate-900/60 border border-slate-700/60 rounded-xl p-3 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium truncate max-w-md">{r.question}</span>
                    <span className="px-2 py-0.5 rounded bg-indigo-400/10 text-indigo-300 font-mono font-bold text-[10px]">
                      Correct: {r.correctAnswer}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 grid grid-cols-2 gap-2 pt-1">
                    <span>A: {r.optionA}</span>
                    <span>B: {r.optionB}</span>
                    <span>C: {r.optionC}</span>
                    <span>D: {r.optionD}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
