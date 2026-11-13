
import React from "react";
import { REAL_STUDY_MATERIALS } from "@/data/materialsData";
import { FileText, Download, Sparkles } from "lucide-react";

export const HighYieldHub = () => {
  // Find the exact question banks we just added
  const questionBanks = REAL_STUDY_MATERIALS.filter(m => 
    m.category === "Question Paper" && m.title.includes("MST") || m.title.includes("Question Bank")
  ).slice(0, 3); // top 3

  const handleDownload = (url: string, title: string, fileType: string) => {
    if (!url) return;
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", url.split("/").pop() || `${title.replace(/[^a-zA-Z0-9_-]/g, "_")}.${fileType.toLowerCase()}`);
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (questionBanks.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-primary/10 to-destructive/5 border border-primary/20 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-bold text-foreground">High-Yield Materials</h2>
        <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ml-2">New</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {questionBanks.map((qb) => (
          <div key={qb.id} className="bg-background border border-border/60 hover:border-primary/50 rounded-xl p-4 flex flex-col justify-between transition-all group">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg text-destructive shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm line-clamp-2 leading-tight group-hover:text-primary transition-colors">{qb.title}</h3>
                <p className="text-[11px] text-muted-foreground mt-1">{qb.subject}</p>
              </div>
            </div>
            
            <button 
              onClick={(e) => { e.stopPropagation(); handleDownload(qb.downloadUrl || "", qb.title, qb.fileType); }}
              className="mt-4 w-full py-1.5 px-3 bg-secondary hover:bg-primary hover:text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <Download className="h-3.5 w-3.5" />
              Download PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

