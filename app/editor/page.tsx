import { ExamEditor } from "@/components/ExamEditor";

export const metadata = {
  title: "Editor de preguntas — Copiloto de Exámenes",
  description: "Revisá, editá y exportá las preguntas generadas por IA.",
};

export default function EditorPage() {
  return <ExamEditor />;
}
