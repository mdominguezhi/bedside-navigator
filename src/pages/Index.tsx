import { useState } from "react";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { initialMessages } from "@/data/mockChatData";
import type { ChatMessage, MessageAction, FollowUpQuestion, PanelStatus } from "@/types/chat";
import { Button } from "@/components/ui/button";
import { MessageSquare, Activity, Users, Calendar } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [status, setStatus] = useState<PanelStatus>("complete");

  const handleSendMessage = (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setStatus("thinking");

    // Simulate response
    setTimeout(() => {
      const response: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: `Procesando su solicitud: "<em>${content}</em>". Un momento por favor...`,
        timestamp: new Date(),
        status: "complete",
      };
      setMessages((prev) => [...prev, response]);
      setStatus("complete");
    }, 2000);
  };

  const handleAction = async (action: MessageAction) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    if (action.type === "reserve") {
      toast.success(`Cama ${action.bedId} reservada correctamente`);
    } else {
      toast.success(`Reserva de cama ${action.bedId} cancelada`);
    }
  };

  const handleFollowUp = (question: FollowUpQuestion) => {
    handleSendMessage(question.text);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mock Hospital App Background */}
      <div className="p-6 max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Sistema de Gestión Hospitalaria
          </h1>
          <p className="text-muted-foreground">
            Panel de control del personal clínico
          </p>
        </header>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Users, label: "Pacientes", value: "142" },
            { icon: Activity, label: "Camas libres", value: "26" },
            { icon: Calendar, label: "Citas hoy", value: "58" },
            { icon: MessageSquare, label: "Alertas", value: "3" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="clinical-card flex items-center gap-3"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Toggle Button */}
        {!isPanelOpen && (
          <Button
            variant="clinical"
            size="lg"
            onClick={() => setIsPanelOpen(true)}
            className="fixed bottom-6 right-6 shadow-clinical-lg z-40"
          >
            <MessageSquare className="w-5 h-5" />
            Abrir Agente de Admisión
          </Button>
        )}

        {/* Placeholder content */}
        <div className="space-y-4">
          <div className="clinical-card">
            <h2 className="font-semibold text-foreground mb-2">
              Paciente: María García López
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              ID: 99310966135711 · Edad: 67 años · Servicio: Neurología
            </p>
            <div className="flex gap-2">
              <Button variant="clinical" size="sm">
                Ver historial
              </Button>
              <Button variant="clinicalOutline" size="sm">
                Editar datos
              </Button>
            </div>
          </div>

          <div className="clinical-card bg-clinical-blue-light border-primary/20">
            <p className="text-sm text-primary font-medium">
              💡 Usa el asistente de admisión para encontrar y reservar camas
              disponibles de forma rápida.
            </p>
          </div>
        </div>
      </div>

      {/* Chat Panel */}
      <ChatPanel
        messages={messages}
        status={status}
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        onSendMessage={handleSendMessage}
        onAction={handleAction}
        onFollowUp={handleFollowUp}
      />
    </div>
  );
};

export default Index;
