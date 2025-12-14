import { useState, useRef, useEffect } from "react";
import { Send, Bed, Search, Calendar, FileText, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const commands = [
  { id: "buscar", icon: Search, label: "Buscar cama", command: "/buscar " },
  { id: "reservar", icon: Bed, label: "Reservar", command: "/reservar " },
  { id: "disponibles", icon: Calendar, label: "Disponibles", command: "/disponibles" },
  { id: "mapa", icon: MapPin, label: "Ver mapa", command: "/mapa" },
  { id: "historial", icon: FileText, label: "Historial", command: "/historial" },
];

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (value.trim() && !disabled) {
      onSend(value.trim());
      setValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleCommand = (command: string) => {
    setValue(command);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  }, [value]);

  return (
    <div className="sticky bottom-0 bg-background border-t border-clinical-border">
      {/* Commands Section */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
          {commands.map((cmd) => (
            <button
              key={cmd.id}
              onClick={() => handleCommand(cmd.command)}
              className="command-chip"
              title={cmd.command}
            >
              <cmd.icon className="w-3.5 h-3.5" />
              <span>{cmd.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="flex items-end gap-2 px-4 pb-4">
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enviar un mensaje al asistente"
            disabled={disabled}
            rows={1}
            className="clinical-input resize-none pr-4 min-h-[48px]"
          />
        </div>
        <Button
          variant="clinical"
          size="icon"
          onClick={handleSubmit}
          disabled={!value.trim() || disabled}
          className="shrink-0 h-12 w-12 rounded-xl"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
