import { Bot, Copy, ThumbsUp, ThumbsDown, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatMessage, MessageAction, FollowUpQuestion } from "@/types/chat";
import { BedDetailsCard } from "./BedDetailsCard";
import { BedListCard } from "./BedListCard";
import { ActionButtons } from "./ActionButtons";
import { FollowUpChips } from "./FollowUpChips";
import { MapLink } from "./MapLink";
import { ReferenceLinks } from "./ReferenceLinks";
import { useState } from "react";
import { toast } from "sonner";

interface AssistantMessageProps {
  message: ChatMessage;
  onAction: (action: MessageAction) => void;
  onFollowUp: (question: FollowUpQuestion) => void;
}

const statusLabels = {
  complete: "Completo",
  thinking: "Pensando…",
  error: "Error",
};

export function AssistantMessage({ message, onAction, onFollowUp }: AssistantMessageProps) {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  const handleCopy = async () => {
    const textContent = message.content.replace(/<[^>]*>/g, '');
    await navigator.clipboard.writeText(textContent);
    toast.success("Copiado al portapapeles");
  };

  const handleFeedback = (type: 'up' | 'down') => {
    setFeedback(type);
    toast.success(type === 'up' ? "Gracias por tu feedback" : "Lamentamos que no haya sido útil");
  };

  const handleRegenerate = () => {
    toast.info("Regenerando respuesta...");
  };

  return (
    <div className="animate-fade-in">
      <div className="clinical-card">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10">
            <Bot className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-xs text-muted-foreground">
            Agente de admisión · {statusLabels[message.status || "complete"]}
          </span>
        </div>

        {/* Content */}
        <div
          className="text-sm text-foreground leading-relaxed prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: message.content }}
        />

        {/* Quick Actions */}
        <div className="flex items-center gap-1 mt-3 pt-2 border-t border-border/50">
          <button
            onClick={handleCopy}
            className="quick-action-btn"
            title="Copiar"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleFeedback('up')}
            className={cn("quick-action-btn", feedback === 'up' && "quick-action-btn-active")}
            title="Útil"
          >
            <ThumbsUp className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleFeedback('down')}
            className={cn("quick-action-btn", feedback === 'down' && "quick-action-btn-active-negative")}
            title="No útil"
          >
            <ThumbsDown className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleRegenerate}
            className="quick-action-btn"
            title="Regenerar"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Single Bed Details */}
        {message.bedDetails && <BedDetailsCard bed={message.bedDetails} />}

        {/* Multiple Beds List */}
        {message.multipleBeds && message.multipleBeds.length > 0 && (
          <BedListCard beds={message.multipleBeds} />
        )}

        {/* Action Buttons */}
        {message.actions && message.actions.length > 0 && (
          <ActionButtons actions={message.actions} onAction={onAction} />
        )}

        {/* Map Link */}
        {message.mapLink && <MapLink href={message.mapLink} />}

        {/* Reference Links */}
        {message.references && message.references.length > 0 && (
          <ReferenceLinks references={message.references} />
        )}

        {/* Follow-up Questions */}
        {message.followUpQuestions && message.followUpQuestions.length > 0 && (
          <FollowUpChips questions={message.followUpQuestions} onSelect={onFollowUp} />
        )}
      </div>
    </div>
  );
}
