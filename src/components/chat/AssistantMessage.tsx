import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatMessage, MessageAction, FollowUpQuestion } from "@/types/chat";
import { BedDetailsCard } from "./BedDetailsCard";
import { BedListCard } from "./BedListCard";
import { ActionButtons } from "./ActionButtons";
import { FollowUpChips } from "./FollowUpChips";
import { MapLink } from "./MapLink";
import { ReferenceLinks } from "./ReferenceLinks";

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
