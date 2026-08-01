"use client";

import { Question } from "@/lib/mockExam";

export type PreviewTemplate = "universitaria" | "secundaria" | "minimalista";

type Props = {
  subject: string;
  date: string;
  questions: Question[];
  template: PreviewTemplate;
};

const ALPHA = ["a", "b", "c", "d", "e"];

// Template-driven styles applied to the white sheet
const TEMPLATE_STYLES: Record<
  PreviewTemplate,
  {
    headerBg: string;
    headerText: string;
    accentColor: string;
    fontClass: string;
    divider: string;
    questionSpacing: string;
    numberStyle: string;
  }
> = {
  universitaria: {
    headerBg: "#1a1a2e",
    headerText: "#ffffff",
    accentColor: "#6c63ff",
    fontClass: "font-serif",
    divider: "border-t-2 border-[#6c63ff]/30",
    questionSpacing: "pt-5",
    numberStyle: "text-[#6c63ff] font-bold",
  },
  secundaria: {
    headerBg: "#0f4c81",
    headerText: "#ffffff",
    accentColor: "#0f4c81",
    fontClass: "font-sans",
    divider: "border-t border-gray-300",
    questionSpacing: "pt-4",
    numberStyle: "text-[#0f4c81] font-bold",
  },
  minimalista: {
    headerBg: "#ffffff",
    headerText: "#111111",
    accentColor: "#111111",
    fontClass: "font-serif",
    divider: "border-t border-gray-200",
    questionSpacing: "pt-5",
    numberStyle: "text-gray-800 font-semibold",
  },
};

export function ExamPreview({ subject, date, questions, template }: Props) {
  const s = TEMPLATE_STYLES[template];

  return (
    /* White A4-like sheet */
    <div
      className={`bg-white text-gray-900 w-full shadow-xl ${s.fontClass}`}
      style={{
        minHeight: "29.7cm",
        maxWidth: "21cm",
        margin: "0 auto",
        padding: "2cm 2.2cm",
        fontFamily:
          template === "minimalista" || template === "universitaria"
            ? "Georgia, 'Times New Roman', serif"
            : "system-ui, Arial, sans-serif",
      }}
      aria-label="Vista previa del examen imprimible"
    >
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header
        className="rounded-sm mb-6"
        style={{
          background: s.headerBg,
          color: s.headerText,
          padding: "1rem 1.5rem",
        }}
      >
        {template === "minimalista" ? (
          <div className="flex flex-col gap-1" style={{ color: "#111" }}>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-0.5">
              Evaluación
            </p>
            <h1 className="text-xl font-bold">{subject}</h1>
            <p className="text-sm text-gray-600">{date}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p
              className="text-[10px] uppercase tracking-widest mb-0.5"
              style={{ opacity: 0.65 }}
            >
              Evaluación parcial
            </p>
            <h1 className="text-xl font-bold">{subject}</h1>
            <p className="text-sm mt-0.5" style={{ opacity: 0.8 }}>
              {date}
            </p>
          </div>
        )}
      </header>

      {/* ── Student info row ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-6 mb-6 text-sm text-gray-700">
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">
            Apellido y nombre
          </label>
          <div className="border-b border-gray-400 h-5 w-full" />
        </div>
        <div className="flex gap-6">
          <div className="flex-1">
            <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">
              DNI / Legajo
            </label>
            <div className="border-b border-gray-400 h-5 w-full" />
          </div>
          <div className="w-28">
            <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">
              Nota
            </label>
            <div
              className="border border-gray-400 h-8 w-full rounded"
              style={{ borderStyle: "solid" }}
            />
          </div>
        </div>
      </div>

      {/* ── Divider ──────────────────────────────────────────────────────── */}
      <div className={s.divider} />

      {/* ── Instructions ─────────────────────────────────────────────────── */}
      <p className="text-[11px] text-gray-500 italic mt-3 mb-1 leading-snug">
        Leé atentamente cada consigna antes de responder. En las preguntas de
        opciones múltiples marcá con una{" "}
        <strong className="not-italic text-gray-700">X</strong> la respuesta
        correcta. En las de desarrollo respondé con letra clara.
      </p>

      {/* ── Questions ────────────────────────────────────────────────────── */}
      <ol className="list-none p-0 m-0">
        {questions.map((q, i) => (
          <li key={q.id} className={`${s.questionSpacing}`}>
            <div className={`${s.divider} mb-4`} />

            {/* Question text */}
            <p className="text-sm leading-relaxed mb-2">
              <span className={`${s.numberStyle} mr-2`}>{i + 1}.</span>
              {q.text}
              {q.type === "development" && (
                <span className="text-[10px] text-gray-400 ml-2 italic">
                  (desarrollo)
                </span>
              )}
            </p>

            {/* Multiple choice / true-false options */}
            {q.options && q.options.length > 0 && (
              <ul className="list-none p-0 m-0 ml-5 flex flex-col gap-1.5 mb-1">
                {q.options.map((opt, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <span
                      className="shrink-0 w-4 h-4 rounded border text-center leading-none flex items-center justify-center text-[11px] font-semibold"
                      style={{
                        borderColor: s.accentColor,
                        color: s.accentColor,
                        marginTop: "1px",
                      }}
                    >
                      {ALPHA[j]}
                    </span>
                    <span className="text-gray-800 leading-snug">{opt}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Development answer lines */}
            {q.type === "development" && (
              <div className="flex flex-col gap-2 mt-3 ml-5">
                {Array.from({ length: 6 }).map((_, k) => (
                  <div
                    key={k}
                    className="border-b border-gray-300 h-5 w-full"
                    aria-hidden="true"
                  />
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <div className={`${s.divider} mt-10`} />
      <footer className="mt-3 flex justify-between items-center text-[10px] text-gray-400">
        <span>
          {subject} — {date}
        </span>
        <span>
          {questions.length} pregunta{questions.length !== 1 ? "s" : ""}
        </span>
      </footer>
    </div>
  );
}
