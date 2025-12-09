import { X, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PanelStatus } from "@/types/chat";
import { ThemeToggle } from "@/components/ThemeToggle";

interface ChatHeaderProps {
  status: PanelStatus;
  onClose?: () => void;
}

const statusConfig = {
  complete: {
    label: "Completo",
    className: "status-pill-complete",
  },
  thinking: {
    label: "Pensando…",
    className: "status-pill-thinking",
  },
  error: {
    label: "Error",
    className: "status-pill-error",
  },
};

export function ChatHeader({ status, onClose }: ChatHeaderProps) {
  const statusInfo = statusConfig[status];

  return (
    <header className="sticky top-0 z-10 bg-clinical-blue-light border-b border-clinical-border px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-foreground">
              Agente de admisión
            </h1>
            <div className={cn("status-pill mt-0.5", statusInfo.className)}>
              {status === "thinking" && (
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse-soft" />
              )}
              {statusInfo.label}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          {onClose && (
            <button
              onClick={onClose}
              className="flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Cerrar panel"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
