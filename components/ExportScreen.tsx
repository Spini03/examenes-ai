"use client";

import { useState, useRef } from "react";
import { MOCK_TEMAS } from "@/lib/mockExam";
import { ExamPreview, PreviewTemplate } from "./ExamPreview";

const TEMPLATES: { value: PreviewTemplate; label: string }[] = [
  { value: "universitaria", label: "Universitaria" },
  { value: "secundaria", label: "Secundaria" },
  { value: "minimalista", label: "Minimalista" },
];

export function ExportScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const [template, setTemplate] = useState<PreviewTemplate>("universitaria");
  const [downloading, setDownloading] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const currentTema = MOCK_TEMAS[activeTab];
  const subject = "Física Cuántica — Cátedra Martínez";
  const date = "1 de agosto de 2026";

  const handleDownload = async () => {
    setDownloading(true);
    // Use the browser's native print-to-PDF as the export mechanism
    // In production this would call a server-side PDF generation endpoint
    await new Promise((r) => setTimeout(r, 400)); // small UX delay
    window.print();
    setDownloading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      {/* ── App header ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 flex items-center justify-between gap-4 px-5 py-3.5 border-b border-border bg-background/90 backdrop-blur-sm print:hidden">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent shrink-0">
            <svg
              className="w-3.5 h-3.5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
              />
            </svg>
          </div>
          <span className="font-semibold text-sm text-foreground tracking-tight">
            Copiloto de Exámenes
          </span>
        </div>

        {/* Download button */}
        <button
          onClick={handleDownload}
          disabled={downloading}
          aria-label="Descargar PDF del examen"
          className="flex items-center gap-2 rounded-lg bg-accent hover:bg-accent-hover disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2 transition-all duration-200 shadow-[0_0_16px_rgba(108,99,255,0.35)] hover:shadow-[0_0_22px_rgba(108,99,255,0.5)]"
        >
          {downloading ? (
            <>
              <svg
                className="w-4 h-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              Preparando…
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              Descargar PDF
            </>
          )}
        </button>
      </header>

      {/* ── Controls bar: tabs + template selector ──────────────────────── */}
      <div className="sticky top-[57px] z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3 border-b border-border bg-background/95 backdrop-blur-sm print:hidden">
        {/* Tema tabs */}
        <nav
          className="flex items-center gap-1 p-1 rounded-lg bg-surface border border-border"
          role="tablist"
          aria-label="Temas del examen"
        >
          {MOCK_TEMAS.map((tema, i) => (
            <button
              key={tema.label}
              role="tab"
              aria-selected={activeTab === i}
              aria-controls={`panel-${i}`}
              id={`tab-${i}`}
              onClick={() => setActiveTab(i)}
              className={[
                "px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-150",
                activeTab === i
                  ? "bg-accent text-white shadow-sm"
                  : "text-muted hover:text-foreground hover:bg-surface-hover",
              ].join(" ")}
            >
              {tema.label}
            </button>
          ))}
        </nav>

        {/* Template selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted shrink-0">Plantilla:</span>
          <div
            className="flex items-center gap-1 p-0.5 rounded-lg bg-surface border border-border"
            role="group"
            aria-label="Selector de plantilla de examen"
          >
            {TEMPLATES.map((t) => (
              <button
                key={t.value}
                onClick={() => setTemplate(t.value)}
                aria-pressed={template === t.value}
                className={[
                  "px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150",
                  template === t.value
                    ? "bg-surface-hover text-foreground border border-border"
                    : "text-muted hover:text-foreground",
                ].join(" ")}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Preview area ───────────────────────────────────────────────── */}
      <main
        id={`panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        className="flex-1 px-4 py-8 bg-[#2a2a2a] print:bg-white print:p-0"
      >
        {/* Tema badge */}
        <div className="max-w-[21cm] mx-auto mb-4 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted">Previsualizando</span>
            <span className="text-xs font-semibold text-accent bg-accent-muted border border-accent/25 rounded-full px-2.5 py-0.5">
              {currentTema.label}
            </span>
            <span className="text-xs text-muted">
              — {currentTema.questions.length} preguntas
            </span>
          </div>
          <span className="text-xs text-muted capitalize">{template}</span>
        </div>

        {/* The actual white exam sheet */}
        <div ref={printRef}>
          <ExamPreview
            subject={subject}
            date={date}
            questions={currentTema.questions}
            template={template}
          />
        </div>
      </main>
    </div>
  );
}
