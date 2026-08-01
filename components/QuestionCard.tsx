"use client";

import { useState, useRef, useEffect } from "react";

export type Question = {
  id: string;
  type: "multiple_choice" | "development" | "true_false";
  text: string;
  options?: string[];
  correctAnswer?: string;
  sourcePage?: number;
  supervisorNote?: string;
};

type Props = {
  question: Question;
  index: number;
  onUpdate: (id: string, updated: Partial<Question>) => void;
  onRegenerate: (id: string) => void;
  onDiscard: (id: string) => void;
};

const TYPE_LABEL: Record<Question["type"], string> = {
  multiple_choice: "Múltiple opción",
  development: "Desarrollo",
  true_false: "V / F",
};

export function QuestionCard({
  question,
  index,
  onUpdate,
  onRegenerate,
  onDiscard,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [draftText, setDraftText] = useState(question.text);
  const [draftOptions, setDraftOptions] = useState<string[]>(
    question.options ?? []
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-focus & grow on edit
  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [editing]);

  const handleSave = () => {
    onUpdate(question.id, {
      text: draftText.trim() || question.text,
      options: draftOptions,
    });
    setEditing(false);
  };

  const handleCancel = () => {
    setDraftText(question.text);
    setDraftOptions(question.options ?? []);
    setEditing(false);
  };

  const updateOption = (i: number, value: string) => {
    const next = [...draftOptions];
    next[i] = value;
    setDraftOptions(next);
  };

  const markCorrect = (opt: string) => {
    onUpdate(question.id, { correctAnswer: opt });
  };

  return (
    <article
      className="group relative flex flex-col gap-3 rounded-[var(--radius)] border border-border bg-surface p-5 transition-colors hover:border-accent/40"
      aria-label={`Pregunta ${index + 1}`}
    >
      {/* Top row: type chip + page chip + actions */}
      <div className="flex items-start gap-2 flex-wrap">
        {/* Type badge */}
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted border border-border rounded-full px-2.5 py-0.5 shrink-0">
          {TYPE_LABEL[question.type]}
        </span>

        {/* Source page chip */}
        {question.sourcePage !== undefined && (
          <span className="text-[10px] font-medium text-accent bg-accent-muted border border-accent/25 rounded-full px-2.5 py-0.5 shrink-0">
            Pág.&nbsp;{question.sourcePage}
          </span>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Question number */}
        <span className="text-xs font-bold text-muted shrink-0">
          #{index + 1}
        </span>
      </div>

      {/* Supervisor note badge */}
      {question.supervisorNote && (
        <div
          className="flex items-start gap-1.5 rounded-lg border border-agent-badge-border bg-agent-badge px-3 py-2"
          role="note"
          aria-label="Nota del agente supervisor"
        >
          <span className="text-agent-badge-text text-xs leading-relaxed">
            {question.supervisorNote}
          </span>
        </div>
      )}

      {/* Question text — view or edit */}
      {editing ? (
        <textarea
          ref={textareaRef}
          value={draftText}
          onChange={(e) => {
            setDraftText(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          rows={3}
          aria-label="Texto de la pregunta"
          className="w-full rounded-lg border border-accent bg-surface-hover px-3 py-2.5 text-sm text-foreground outline-none resize-none leading-relaxed transition-colors focus:border-accent-hover"
        />
      ) : (
        <p
          className="text-sm text-foreground leading-relaxed cursor-text"
          onClick={() => setEditing(true)}
          title="Clic para editar"
        >
          {question.text}
        </p>
      )}

      {/* Options (multiple_choice / true_false) */}
      {question.options && question.options.length > 0 && (
        <ul className="flex flex-col gap-1.5 mt-1" role="list" aria-label="Opciones">
          {(editing ? draftOptions : question.options).map((opt, i) => {
            const isCorrect = opt === question.correctAnswer;
            return (
              <li key={i} className="flex items-center gap-2.5">
                {/* Radio: marks the correct answer */}
                <button
                  type="button"
                  onClick={() => !editing && markCorrect(opt)}
                  aria-label={isCorrect ? `Opción correcta: ${opt}` : `Marcar como correcta: ${opt}`}
                  className={[
                    "flex items-center justify-center w-4 h-4 rounded-full border-2 shrink-0 transition-colors",
                    isCorrect
                      ? "border-accent bg-accent"
                      : "border-border bg-transparent hover:border-accent/60",
                    editing ? "cursor-default opacity-50" : "cursor-pointer",
                  ].join(" ")}
                  disabled={editing}
                >
                  {isCorrect && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white" aria-hidden="true" />
                  )}
                </button>

                {editing ? (
                  <input
                    value={opt}
                    onChange={(e) => updateOption(i, e.target.value)}
                    aria-label={`Opción ${i + 1}`}
                    className="flex-1 rounded-md border border-border bg-surface px-2.5 py-1 text-sm text-foreground outline-none transition-colors focus:border-accent"
                  />
                ) : (
                  <span
                    className={[
                      "text-sm leading-snug",
                      isCorrect ? "text-foreground font-medium" : "text-muted",
                    ].join(" ")}
                  >
                    {opt}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {/* Edit inline save/cancel OR view-mode action buttons */}
      {editing ? (
        <div className="flex gap-2 mt-1">
          <button
            onClick={handleSave}
            className="flex-1 rounded-lg py-2 text-xs font-semibold bg-accent hover:bg-accent-hover text-white transition-colors"
          >
            Guardar
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 rounded-lg py-2 text-xs font-semibold border border-border text-muted hover:text-foreground hover:border-accent/40 transition-colors"
          >
            Cancelar
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 mt-1">
          {/* Edit */}
          <button
            onClick={() => setEditing(true)}
            aria-label="Editar pregunta"
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:border-accent/40 transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zM16.862 4.487L19.5 7.125" />
            </svg>
            Editar
          </button>

          {/* Regenerate */}
          <button
            onClick={() => onRegenerate(question.id)}
            aria-label="Regenerar pregunta con IA"
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:border-accent/40 transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Regenerar
          </button>

          {/* Discard — spacer then danger-toned */}
          <div className="flex-1" />
          <button
            onClick={() => onDiscard(question.id)}
            aria-label="Descartar pregunta"
            className="flex items-center gap-1.5 rounded-lg border border-danger/25 bg-danger-muted px-3 py-1.5 text-xs font-medium text-danger hover:bg-danger/20 transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
            Descartar
          </button>
        </div>
      )}
    </article>
  );
}
