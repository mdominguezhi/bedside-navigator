import { User } from "lucide-react";
import type { ChatMessage } from "@/types/chat";

interface UserMessageProps {
  message: ChatMessage;
}

export function UserMessage({ message }: UserMessageProps) {
  return (
    <div className="flex justify-end animate-fade-in">
      <div className="max-w-[85%] flex items-start gap-2">
        <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-md px-4 py-2.5 shadow-clinical">
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted shrink-0">
          <User className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}
