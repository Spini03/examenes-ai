"use client";

import { useCallback, useRef, useState } from "react";

interface DropZoneProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

export function DropZone({ file, onFileChange }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const dropped = e.dataTransfer.files[0];
      if (dropped && dropped.type === "application/pdf") {
        onFileChange(dropped);
      }
    },
    [onFileChange]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) onFileChange(selected);
  };

  const handleClick = () => inputRef.current?.click();

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Zona para subir PDF"
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      className={[
        "relative flex flex-col items-center justify-center gap-3 rounded-[var(--radius)] border-2 border-dashed cursor-pointer transition-all duration-200 select-none",
        "min-h-[160px] px-6 py-8",
        isDragging
          ? "border-accent bg-accent-muted scale-[1.01]"
          : file
          ? "border-accent bg-accent-muted"
          : "border-border bg-surface hover:border-accent/50 hover:bg-surface-hover",
      ].join(" ")}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleInputChange}
        aria-hidden="true"
      />

      {file ? (
        <>
          {/* PDF icon */}
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/20 shrink-0">
            <svg
              className="w-6 h-6 text-accent"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>
          <div className="text-center">
            <p className="font-medium text-foreground text-sm leading-relaxed">
              {file.name}
            </p>
            <p className="text-muted text-xs mt-0.5">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <button
            onClick={handleRemove}
            aria-label="Quitar archivo"
            className="absolute top-3 right-3 flex items-center justify-center w-7 h-7 rounded-full bg-border hover:bg-accent/30 transition-colors text-muted hover:text-foreground"
          >
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </>
      ) : (
        <>
          <div
            className={[
              "flex items-center justify-center w-12 h-12 rounded-xl transition-colors duration-200",
              isDragging ? "bg-accent/30" : "bg-border",
            ].join(" ")}
          >
            <svg
              className={["w-6 h-6 transition-colors", isDragging ? "text-accent" : "text-muted"].join(" ")}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
          </div>
          <div className="text-center">
            <p className={["font-medium text-sm transition-colors", isDragging ? "text-accent" : "text-foreground"].join(" ")}>
              {isDragging ? "Soltá el archivo aquí" : "Arrastrá tu PDF o hacé clic para seleccionarlo"}
            </p>
            <p className="text-muted text-xs mt-1">Solo archivos PDF</p>
          </div>
        </>
      )}
    </div>
  );
}
