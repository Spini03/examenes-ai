"use client";

export type Template = "universitaria" | "secundaria" | "minimalista";

interface TemplateSelectorProps {
  selected: Template;
  onSelect: (t: Template) => void;
}

const templates: {
  id: Template;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "universitaria",
    label: "Universitaria",
    description: "Encabezado formal, numeración y espacio para cátedra",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    id: "secundaria",
    label: "Secundaria",
    description: "Diseño amigable con espacio para nombre y fecha",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    id: "minimalista",
    label: "Minimalista",
    description: "Limpio y sin adornos, máximo espacio para contenido",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
      </svg>
    ),
  },
];

export function TemplateSelector({ selected, onSelect }: TemplateSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Plantilla de diseño">
      {templates.map((t) => {
        const isSelected = selected === t.id;
        return (
          <button
            key={t.id}
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelect(t.id)}
            className={[
              "flex flex-col gap-2.5 rounded-[var(--radius)] border p-4 text-left transition-all duration-150 cursor-pointer",
              isSelected
                ? "border-accent bg-accent-muted"
                : "border-border bg-surface hover:border-accent/40 hover:bg-surface-hover",
            ].join(" ")}
          >
            <div
              className={[
                "flex items-center justify-center w-9 h-9 rounded-lg transition-colors",
                isSelected ? "bg-accent/25 text-accent" : "bg-border text-muted",
              ].join(" ")}
            >
              {t.icon}
            </div>
            <div>
              <p
                className={["font-semibold text-sm", isSelected ? "text-foreground" : "text-foreground/80"].join(" ")}
              >
                {t.label}
              </p>
              <p className="text-muted text-xs mt-0.5 leading-relaxed">{t.description}</p>
            </div>
            {isSelected && (
              <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
            )}
          </button>
        );
      })}
    </div>
  );
}
