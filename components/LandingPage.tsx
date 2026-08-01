"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DropZone } from "./DropZone";
import { TemplateSelector, Template } from "./TemplateSelector";
import { LoadingOverlay } from "./LoadingOverlay";

export function LandingPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [template, setTemplate] = useState<Template>("universitaria");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<1 | 2>(1);

  const canGenerate = !!file && description.trim().length > 0;

  const handleGenerate = async () => {
    if (!canGenerate) return;
    setLoading(true);
    setLoadingStep(1);

    // Simulated multi-agent loading sequence
    await new Promise((res) => setTimeout(res, 2800));
    setLoadingStep(2);
    await new Promise((res) => setTimeout(res, 2200));

    router.push("/editor");
  };

  return (
    <>
      {loading && <LoadingOverlay step={loadingStep} />}

      <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <span className="font-semibold text-foreground tracking-tight">
              Copiloto de Exámenes
            </span>
          </div>
          <span className="text-xs text-muted border border-border rounded-full px-3 py-1 hidden sm:inline">
            Beta
          </span>
        </header>

        {/* Main */}
        <main className="flex-1 flex flex-col items-center px-4 py-10 sm:py-14">
          <div className="w-full max-w-2xl flex flex-col gap-10">

            {/* Hero */}
            <div className="text-center flex flex-col items-center gap-3">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-accent bg-accent-muted border border-accent/25 rounded-full px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
                Dos agentes de IA trabajando por vos
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance text-foreground">
                Generá tu examen en{" "}
                <span className="text-accent">segundos</span>
              </h1>
              <p className="text-muted text-base max-w-md text-balance leading-relaxed">
                Subí tu bibliografía, describí lo que necesitás y dejá que la IA
                construya un borrador profesional listo para editar.
              </p>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-6">

              {/* Step 1: PDF */}
              <section aria-labelledby="step-pdf">
                <div className="flex items-center gap-2.5 mb-3">
                  <StepBadge n={1} done={!!file} />
                  <h2 id="step-pdf" className="font-semibold text-sm text-foreground">
                    Subí tu bibliografía en PDF
                  </h2>
                </div>
                <DropZone file={file} onFileChange={setFile} />
              </section>

              {/* Step 2: Description */}
              <section aria-labelledby="step-desc">
                <div className="flex items-center gap-2.5 mb-3">
                  <StepBadge n={2} done={description.trim().length > 0} />
                  <h2 id="step-desc" className="font-semibold text-sm text-foreground">
                    Describí el examen que necesitás
                  </h2>
                </div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder='Ej: "10 preguntas de opción múltiple sobre el capítulo 3, dificultad media, nivel universitario"'
                  rows={4}
                  aria-label="Descripción del examen"
                  className="w-full rounded-[var(--radius)] border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted resize-none outline-none transition-colors focus:border-accent focus:bg-surface-hover leading-relaxed"
                />
              </section>

              {/* Step 3: Template */}
              <section aria-labelledby="step-template">
                <div className="flex items-center gap-2.5 mb-3">
                  <StepBadge n={3} done={true} />
                  <h2 id="step-template" className="font-semibold text-sm text-foreground">
                    Elegí la plantilla de diseño
                  </h2>
                </div>
                <TemplateSelector selected={template} onSelect={setTemplate} />
              </section>

              {/* CTA */}
              <button
                onClick={handleGenerate}
                disabled={!canGenerate}
                aria-disabled={!canGenerate}
                className={[
                  "w-full flex items-center justify-center gap-2.5 rounded-[var(--radius)] py-4 font-semibold text-base transition-all duration-200",
                  canGenerate
                    ? "bg-accent hover:bg-accent-hover text-white cursor-pointer shadow-[0_0_20px_rgba(108,99,255,0.3)] hover:shadow-[0_0_28px_rgba(108,99,255,0.45)]"
                    : "bg-surface border border-border text-muted cursor-not-allowed",
                ].join(" ")}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                Generar examen
              </button>

              {!canGenerate && (
                <p className="text-center text-xs text-muted -mt-3" aria-live="polite">
                  {!file && !description.trim()
                    ? "Subí un PDF y describí el examen para continuar"
                    : !file
                    ? "Falta subir el PDF"
                    : "Falta la descripción del examen"}
                </p>
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-4 text-center text-xs text-muted border-t border-border">
          Copiloto de Exámenes &mdash; Hackathon 2026
        </footer>
      </div>
    </>
  );
}

function StepBadge({ n, done }: { n: number; done: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={[
        "flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold shrink-0 transition-colors",
        done ? "bg-accent text-white" : "bg-border text-muted",
      ].join(" ")}
    >
      {done ? (
        <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      ) : (
        n
      )}
    </div>
  );
}
