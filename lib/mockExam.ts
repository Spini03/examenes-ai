export type Question = {
  id: string;
  type: "multiple_choice" | "development" | "true_false";
  text: string;
  options?: string[];
  correctAnswer?: string;
  sourcePage?: number;
  supervisorNote?: string;
};

export type ExamTema = {
  label: string;
  questions: Question[];
};

// ─── Tema A ───────────────────────────────────────────────────────────────────
const TEMA_A: Question[] = [
  {
    id: "a1",
    type: "multiple_choice",
    text: "¿Cuál de las siguientes afirmaciones describe correctamente el principio de superposición en mecánica cuántica?",
    options: [
      "Un sistema cuántico puede estar en múltiples estados a la vez hasta que es observado.",
      "Las partículas no tienen masa cuando viajan a la velocidad de la luz.",
      "La energía de un sistema cerrado siempre aumenta con el tiempo.",
      "El spin de un electrón solo puede ser positivo.",
    ],
    correctAnswer:
      "Un sistema cuántico puede estar en múltiples estados a la vez hasta que es observado.",
    sourcePage: 34,
    supervisorNote: "Ajustada: dificultad balanceada respecto a la pregunta 3.",
  },
  {
    id: "a2",
    type: "true_false",
    text: "La ecuación de Schrödinger describe la evolución temporal de la función de onda de un sistema cuántico.",
    options: ["Verdadero", "Falso"],
    correctAnswer: "Verdadero",
    sourcePage: 41,
  },
  {
    id: "a3",
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
    id: "a4",
    type: "development",
    text: "Explicá con tus propias palabras el principio de incertidumbre de Heisenberg y su implicancia sobre la medición simultánea de posición y momento de una partícula. Incluí al menos un ejemplo concreto.",
    sourcePage: 67,
  },
  {
    id: "a5",
    type: "multiple_choice",
    text: "¿Qué fenómeno explica el efecto túnel en mecánica cuántica?",
    options: [
      "La capacidad de una partícula de atravesar una barrera de potencial mayor a su energía cinética.",
      "La reflexión total de fotones en superficies metálicas.",
      "El aumento de masa de un electrón al acelerarse.",
      "La desintegración espontánea de un núcleo pesado.",
    ],
    correctAnswer:
      "La capacidad de una partícula de atravesar una barrera de potencial mayor a su energía cinética.",
    sourcePage: 72,
  },
];

// ─── Tema B ───────────────────────────────────────────────────────────────────
const TEMA_B: Question[] = [
  {
    id: "b1",
    type: "true_false",
    text: "La constante de Planck relaciona la energía de un fotón con su frecuencia.",
    options: ["Verdadero", "Falso"],
    correctAnswer: "Verdadero",
    sourcePage: 18,
  },
  {
    id: "b2",
    type: "multiple_choice",
    text: "¿Cuál es el postulado central del modelo atómico de Bohr?",
    options: [
      "Los electrones se mueven en órbitas circulares con energías cuantizadas.",
      "El núcleo atómico contiene neutrones y electrones.",
      "Los átomos no pueden absorber ni emitir radiación.",
      "La masa de un átomo está distribuida uniformemente en todo su volumen.",
    ],
    correctAnswer:
      "Los electrones se mueven en órbitas circulares con energías cuantizadas.",
    sourcePage: 25,
    supervisorNote: "Simplificada: reducida de 5 a 4 opciones para adecuarse al nivel.",
  },
  {
    id: "b3",
    type: "development",
    text: "Describí el experimento de Rutherford y explicá qué conclusiones permitió extraer sobre la estructura del átomo.",
    sourcePage: 31,
  },
  {
    id: "b4",
    type: "multiple_choice",
    text: "El efecto fotoeléctrico fue explicado por Einstein como evidencia de que la luz:",
    options: [
      "Se propaga como onda transversal en el vacío.",
      "Está compuesta de cuantos de energía llamados fotones.",
      "No puede transferir energía a los electrones.",
      "Requiere un medio material para propagarse.",
    ],
    correctAnswer: "Está compuesta de cuantos de energía llamados fotones.",
    sourcePage: 44,
  },
  {
    id: "b5",
    type: "true_false",
    text: "En el modelo estándar de partículas, los quarks son los constituyentes fundamentales de los leptones.",
    options: ["Verdadero", "Falso"],
    correctAnswer: "Falso",
    sourcePage: 89,
  },
];

// ─── Tema C ───────────────────────────────────────────────────────────────────
const TEMA_C: Question[] = [
  {
    id: "c1",
    type: "multiple_choice",
    text: "El principio de exclusión de Pauli establece que:",
    options: [
      "Dos fermiones idénticos no pueden ocupar el mismo estado cuántico simultáneamente.",
      "La energía de un sistema siempre es mínima en equilibrio.",
      "Las partículas con spin entero obedecen la estadística de Fermi-Dirac.",
      "La función de onda de un sistema de bosones es antisimétrica.",
    ],
    correctAnswer:
      "Dos fermiones idénticos no pueden ocupar el mismo estado cuántico simultáneamente.",
    sourcePage: 51,
  },
  {
    id: "c2",
    type: "development",
    text: "Explicá qué es la dualidad onda-partícula y cómo el experimento de Young con electrones la evidencia. ¿Qué sucede si se intenta detectar por cuál rendija pasa el electrón?",
    sourcePage: 60,
    supervisorNote: "Reordenada: ahora aparece antes de la pregunta sobre colapso de onda.",
  },
  {
    id: "c3",
    type: "true_false",
    text: "El entrelazamiento cuántico permite la transmisión de información a velocidad superior a la de la luz.",
    options: ["Verdadero", "Falso"],
    correctAnswer: "Falso",
    sourcePage: 78,
  },
  {
    id: "c4",
    type: "multiple_choice",
    text: "La interpretación de Copenhague de la mecánica cuántica sostiene que:",
    options: [
      "La función de onda colapsa al momento de la medición.",
      "El universo se divide en múltiples ramas en cada medición.",
      "Las variables ocultas determinan el resultado antes de la medición.",
      "El observador no influye en el sistema observado.",
    ],
    correctAnswer: "La función de onda colapsa al momento de la medición.",
    sourcePage: 82,
  },
  {
    id: "c5",
    type: "multiple_choice",
    text: "¿Qué describe el número cuántico de espín?",
    options: [
      "El momento angular intrínseco de una partícula subatómica.",
      "La distancia promedio entre el electrón y el núcleo.",
      "La velocidad orbital del electrón alrededor del núcleo.",
      "El nivel de energía del estado fundamental del átomo de hidrógeno.",
    ],
    correctAnswer: "El momento angular intrínseco de una partícula subatómica.",
    sourcePage: 47,
  },
];

export const MOCK_TEMAS: ExamTema[] = [
  { label: "Tema A", questions: TEMA_A },
  { label: "Tema B", questions: TEMA_B },
  { label: "Tema C", questions: TEMA_C },
];
