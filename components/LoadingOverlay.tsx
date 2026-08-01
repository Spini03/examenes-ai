"use client";

interface LoadingOverlayProps {
  step: 1 | 2;
}

export function LoadingOverlay({ step }: LoadingOverlayProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm"
    >
      <div className="flex flex-col items-center gap-8 max-w-sm w-full px-6">
        {/* Animated spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-border" />
          <div className="absolute inset-0 rounded-full border-2 border-t-accent border-r-transparent border-b-transparent border-l-transparent animate-spin" />
          <div className="absolute inset-2 rounded-full border border-accent/20 animate-ping" />
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-3 w-full">
          <Step
            number={1}
            label="Agente generador armando preguntas..."
            active={step === 1}
            done={step > 1}
          />
          <Step
            number={2}
            label="Agente supervisor revisando..."
            active={step === 2}
            done={false}
          />
        </div>
      </div>
    </div>
  );
}

function Step({
  number,
  label,
  active,
  done,
}: {
  number: number;
  label: string;
  active: boolean;
  done: boolean;
}) {
  return (
    <div
      className={[
        "flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-300",
        active
          ? "border-accent bg-accent-muted"
          : done
          ? "border-border/40 bg-surface opacity-50"
          : "border-border/30 bg-surface opacity-30",
      ].join(" ")}
    >
      <div
        className={[
          "flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0 transition-colors",
          active ? "bg-accent text-white" : done ? "bg-border text-muted" : "bg-border/50 text-muted/50",
        ].join(" ")}
      >
        {done ? (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        ) : (
          number
        )}
      </div>
      <span
        className={[
          "text-sm leading-relaxed transition-colors",
          active ? "text-foreground font-medium" : "text-muted",
        ].join(" ")}
      >
        {label}
      </span>
      {active && (
        <div className="ml-auto flex gap-1" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1 h-1 rounded-full bg-accent animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
