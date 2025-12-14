import { useState, useRef, useEffect, useMemo } from "react";
import { Send, Bed, Search, Calendar, FileText, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const commands = [
  { id: "buscar", icon: Search, label: "Buscar cama", command: "/buscar ", description: "Buscar camas disponibles" },
  { id: "reservar", icon: Bed, label: "Reservar", command: "/reservar ", description: "Reservar una cama específica" },
  { id: "disponibles", icon: Calendar, label: "Disponibles", command: "/disponibles", description: "Ver todas las camas disponibles" },
  { id: "mapa", icon: MapPin, label: "Ver mapa", command: "/mapa", description: "Abrir mapa del hospital" },
  { id: "historial", icon: FileText, label: "Historial", command: "/historial", description: "Ver historial de reservas" },
];

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  // Filter commands based on input
  const filteredCommands = useMemo(() => {
    if (!value.startsWith("/")) return [];
    const query = value.slice(1).toLowerCase();
    return commands.filter(
      (cmd) =>
        cmd.id.includes(query) ||
        cmd.label.toLowerCase().includes(query) ||
        cmd.command.toLowerCase().includes(query)
    );
  }, [value]);

  // Show/hide autocomplete based on input
  useEffect(() => {
    if (value.startsWith("/") && filteredCommands.length > 0) {
      setShowAutocomplete(true);
      setSelectedIndex(0);
    } else {
      setShowAutocomplete(false);
    }
  }, [value, filteredCommands.length]);

  const handleSubmit = () => {
    if (value.trim() && !disabled) {
      onSend(value.trim());
      setValue("");
      setShowAutocomplete(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showAutocomplete) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          handleSelectCommand(filteredCommands[selectedIndex].command);
        }
      } else if (e.key === "Escape") {
        setShowAutocomplete(false);
      }
    } else if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSelectCommand = (command: string) => {
    setValue(command);
    setShowAutocomplete(false);
    inputRef.current?.focus();
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
          {/* Autocomplete Dropdown */}
          {showAutocomplete && (
            <div
              ref={autocompleteRef}
              className="autocomplete-dropdown"
            >
              {filteredCommands.map((cmd, index) => (
                <button
                  key={cmd.id}
                  onClick={() => handleSelectCommand(cmd.command)}
                  className={cn(
                    "autocomplete-item",
                    index === selectedIndex && "autocomplete-item-selected"
                  )}
                >
                  <div className="autocomplete-item-icon">
                    <cmd.icon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="autocomplete-item-label">{cmd.command}</span>
                    <span className="autocomplete-item-desc">{cmd.description}</span>
                  </div>
                </button>
              ))}
              <div className="autocomplete-hint">
                <kbd>↑↓</kbd> navegar <kbd>Enter</kbd> seleccionar <kbd>Esc</kbd> cerrar
              </div>
            </div>
          )}

          <textarea
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe / para ver comandos"
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
