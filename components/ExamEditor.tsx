"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QuestionCard, Question } from "./QuestionCard";

// ─── Mock data ────────────────────────────────────────────────────────────────
const MOCK_QUESTIONS: Question[] = [
  {
    id: "q1",
    type: "multiple_choice",
    text: "¿Cuál de las siguientes afirmaciones describe correctamente el principio de superposición en mecánica cuántica?",
    options: [
      "Un sistema cuántico puede estar en múltiples estados a la vez hasta que es observado.",
      "Las partículas no tienen masa cuando viajan a la velocidad de la luz.",
      "La energía de un sistema cerrado siempre aumenta con el tiempo.",
      "El spin de un electrón solo puede ser positivo.",
    ],
    correctAnswer: "Un sistema cuántico puede estar en múltiples estados a la vez hasta que es observado.",
    sourcePage: 34,
    supervisorNote: "Ajustada: dificultad balanceada respecto a la pregunta 3.",
  },
  {
    id: "q2",
    type: "true_false",
    text: "La ecuación de Schrödinger describe la evolución temporal de la función de onda de un sistema cuántico.",
    options: ["Verdadero", "Falso"],
    correctAnswer: "Verdadero",
    sourcePage: 41,
  },
  {
    id: "q3",
    type: "multiple_choice",
    text: "El experimento de la doble rendija demuestra que los electrones:",
    options: [
      "Se comportan exclusivamente como partículas clásicas.",
      "Exhiben propiedades tanto de onda como de partícula.",
      "Pierden su carga eléctrica al pasar por las rendijas.",
      "Viajan siempre en línea recta independientemente del medio.",
    ],
    correctAnswer: "Exhiben propiedades tanto de onda como de partícula.",
    sourcePage: 58,
    supervisorNote: "Reformulada: opción B era demasiado obvia en la versión anterior.",
  },
  {
    id: "q4",
    type: "development",
    text: "Explicá con tus propias palabras el principio de incertidumbre de Heisenberg y su implicancia sobre la medición simultánea de posición y momento de una partícula. Incluí al menos un ejemplo concreto.",
    sourcePage: 67,
  },
  {
    id: "q5",
    type: "multiple_choice",
    text: "¿Qué fenómeno explica el efecto túnel en mecánica cuántica?",
    options: [
      "La capacidad de una partícula de atravesar una barrera de potencial mayor a su energía cinética.",
      "La reflexión total de fotones en superficies metálicas.",
      "El aumento de masa de un electrón al acelerarse.",
      "La desintegración espontánea de un núcleo pesado.",
    ],
    correctAnswer: "La capacidad de una partícula de atravesar una barrera de potencial mayor a su energía cinética.",
    sourcePage: 72,
  },
];
// ─────────────────────────────────────────────────────────────────────────────

type Props = {
  onExport?: () => void;
};

export function ExamEditor({ onExport }: Props) {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>(MOCK_QUESTIONS);
  const [regenerating, setRegenerating] = useState<string | null>(null);

  const handleUpdate = (id: string, updated: Partial<Question>) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...updated } : q))
    );
  };

  const handleRegenerate = async (id: string) => {
    setRegenerating(id);
    // Simulate async regeneration
    await new Promise((r) => setTimeout(r, 1400));
    setRegenerating(null);
  };

  const handleDiscard = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const agentTouched = questions.filter((q) => q.supervisorNote).length;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between gap-4 px-5 py-3.5 border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent shrink-0">
            <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>
          <span className="font-semibold text-sm text-foreground tracking-tight">
            Copiloto de Exámenes
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Summary chips */}
          <span className="hidden sm:inline text-xs text-muted border border-border rounded-full px-3 py-1">
            {questions.length} pregunta{questions.length !== 1 ? "s" : ""}
          </span>
          {agentTouched > 0 && (
            <span
              className="hidden sm:inline text-xs font-medium rounded-full px-3 py-1 border"
              style={{
                color: "var(--agent-badge-text)",
                background: "var(--agent-badge)",
                borderColor: "var(--agent-badge-border)",
              }}
              title="Preguntas revisadas por el agente supervisor"
            >
              {agentTouched} ajustada{agentTouched !== 1 ? "s" : ""} por IA
            </span>
          )}
        </div>
      </header>

      {/* Page title */}
      <div className="px-5 pt-8 pb-4 max-w-2xl mx-auto w-full">
        <h1 className="text-xl font-bold text-foreground tracking-tight text-balance">
          Revisá y editá las preguntas
        </h1>
        <p className="text-sm text-muted mt-1 leading-relaxed">
          Hacé clic en cualquier pregunta para editarla inline. Podés marcar la respuesta correcta, regenerar o descartar cada una antes de exportar.
        </p>
      </div>

      {/* Question list */}
      <main
        className="flex-1 px-5 pb-32 max-w-2xl mx-auto w-full"
        aria-label="Lista de preguntas del examen"
      >
        {questions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center">
              <svg className="w-6 h-6 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
              </svg>
            </div>
            <p className="text-sm text-muted">
              Descartaste todas las preguntas. Volvé atrás para regenerar.
            </p>
          </div>
        ) : (
          <ol className="flex flex-col gap-4" aria-label="Preguntas">
            {questions.map((q, i) => (
              <li key={q.id} className="relative">
                {/* Regenerating overlay */}
                {regenerating === q.id && (
                  <div className="absolute inset-0 z-10 rounded-[var(--radius)] bg-background/80 backdrop-blur-sm flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 text-accent animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    <span className="text-xs text-accent font-medium">Regenerando…</span>
                  </div>
                )}
                <QuestionCard
                  question={q}
                  index={i}
                  onUpdate={handleUpdate}
                  onRegenerate={handleRegenerate}
                  onDiscard={handleDiscard}
                />
              </li>
            ))}
          </ol>
        )}
      </main>

      {/* Sticky footer: export button */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 border-t border-border bg-background/95 backdrop-blur-sm px-5 py-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => { onExport?.(); router.push("/export"); }}
            disabled={questions.length === 0}
            aria-disabled={questions.length === 0}
            className={[
              "w-full flex items-center justify-center gap-2.5 rounded-[var(--radius)] py-3.5 font-semibold text-sm transition-all duration-200",
              questions.length > 0
                ? "bg-accent hover:bg-accent-hover text-white cursor-pointer shadow-[0_0_20px_rgba(108,99,255,0.3)] hover:shadow-[0_0_28px_rgba(108,99,255,0.45)]"
                : "bg-surface border border-border text-muted cursor-not-allowed",
            ].join(" ")}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Exportar examen
            {questions.length > 0 && (
              <span className="text-xs opacity-70 font-normal">
                ({questions.length} pregunta{questions.length !== 1 ? "s" : ""})
              </span>
            )}
          </button>
        </div>
      </footer>
    </div>
  );
}
