import type { ChatMessage } from "@/types/chat";

export const initialMessages: ChatMessage[] = [
  {
    id: "1",
    type: "assistant",
    content: `Encontré <strong>1 cama libre en Neurología</strong> para la paciente <strong>99310966135711</strong>:`,
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    status: "complete",
    bedDetails: {
      id: "N503",
      locationCode: "LOC8003",
      service: "NEUROLOGÍA",
      status: "Libre",
      building: "Centro Rehabilitación",
      area: "Área Especializada",
      type: "NORMAL",
      equipment: ["VENTILATOR", "VIP/PRIVATE"],
    },
    actions: [
      { type: "reserve", bedId: "N503", label: "Reservar cama N503" },
      { type: "cancel", bedId: "N503", label: "Cancelar N503" },
    ],
    references: [
      { id: "ref1", label: "Ver mapa de camas", href: "#mapa-camas" },
      { id: "ref2", label: "Protocolo de admisión Neurología", href: "#protocolo" },
    ],
    followUpQuestions: [
      {
        id: "q1",
        text: "Mostrar camas con aislamiento disponible",
      },
      {
        id: "q2",
        text: "¿Cuánto tiempo lleva libre esta cama?",
      },
      {
        id: "q3",
        text: "Buscar alternativas en planta baja",
      },
    ],
  },
  {
    id: "2",
    type: "user",
    content: "¿Hay camas libres en otros servicios relacionados con Neurología?",
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
  },
  {
    id: "3",
    type: "assistant",
    content: `Se encontraron <strong>26 camas libres</strong> en servicios relacionados con <strong>Neurología</strong> para la paciente <strong>99310966135711</strong>. Aquí algunos ejemplos:`,
    timestamp: new Date(Date.now() - 7 * 60 * 1000),
    status: "complete",
    multipleBeds: [
      {
        id: "6113",
        locationCode: "LOC7975",
        service: "APARATO DIGESTIVO",
        status: "Libre",
      },
      {
        id: "6117",
        locationCode: "LOC7979",
        service: "CARDIOLOGÍA",
        status: "Libre",
      },
      {
        id: "6120",
        locationCode: "LOC7982",
        service: "MEDICINA INTERNA",
        status: "Libre",
      },
    ],
    actions: [
      { type: "reserve", bedId: "6113", label: "Reservar Cama 6113" },
      { type: "reserve", bedId: "6117", label: "Reservar Cama 6117" },
      { type: "cancel", bedId: "6113", label: "Cancelar 6113" },
      { type: "cancel", bedId: "6117", label: "Cancelar 6117" },
    ],
    references: [
      { id: "ref3", label: "Ver mapa de camas con filtros", href: "#mapa-camas" },
      { id: "ref4", label: "Comparar servicios", href: "#comparar" },
      { id: "ref5", label: "Guía de asignación", href: "#guia" },
    ],
    followUpQuestions: [
      {
        id: "q4",
        text: "Comparar equipamiento de estas camas",
      },
      {
        id: "q5",
        text: "Filtrar por camas cerca de enfermería",
      },
      {
        id: "q6",
        text: "Ver historial de ocupación de la cama 6113",
      },
    ],
  },
];
