import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { ChatMessage, MessageAction, FollowUpQuestion, PanelStatus } from "@/types/chat";
import { ChatHeader } from "./ChatHeader";
import { AssistantMessage } from "./AssistantMessage";
import { UserMessage } from "./UserMessage";
import { ChatTimestamp } from "./ChatTimestamp";
import { ChatInput } from "./ChatInput";

interface ChatPanelProps {
  messages: ChatMessage[];
  status: PanelStatus;
  isOpen?: boolean;
  onClose?: () => void;
  onSendMessage: (content: string) => void;
  onAction: (action: MessageAction) => void;
  onFollowUp: (question: FollowUpQuestion) => void;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
}

function shouldShowTimestamp(current: ChatMessage, previous: ChatMessage | null): boolean {
  if (!previous) return true;
  const diff = current.timestamp.getTime() - previous.timestamp.getTime();
  return diff > 5 * 60 * 1000; // 5 minutes
}

export function ChatPanel({
  messages,
  status,
  isOpen = true,
  onClose,
  onSendMessage,
  onAction,
  onFollowUp,
}: ChatPanelProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className={cn(
        "fixed right-0 top-0 bottom-0 w-full max-w-[560px] clinical-panel flex flex-col z-50",
        "transition-transform duration-300 ease-out",
        isOpen ? "animate-slide-in-right" : "translate-x-full"
      )}
    >
      <ChatHeader status={status} onClose={onClose} />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-4 space-y-4">
        {messages.map((message, index) => {
          const previousMessage = index > 0 ? messages[index - 1] : null;
          const showTimestamp = shouldShowTimestamp(message, previousMessage);

          return (
            <div key={message.id}>
              {showTimestamp && <ChatTimestamp time={formatTime(message.timestamp)} />}
              {message.type === "assistant" ? (
                <AssistantMessage
                  message={message}
                  onAction={onAction}
                  onFollowUp={onFollowUp}
                />
              ) : (
                <UserMessage message={message} />
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={onSendMessage} disabled={status === "thinking"} />
    </div>
  );
}
