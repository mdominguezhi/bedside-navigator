import { Sparkles } from "lucide-react";
import type { FollowUpQuestion } from "@/types/chat";

interface FollowUpChipsProps {
  questions: FollowUpQuestion[];
  onSelect: (question: FollowUpQuestion) => void;
}

export function FollowUpChips({ questions, onSelect }: FollowUpChipsProps) {
  return (
    <div className="follow-up-container">
      {questions.map((question) => (
        <button
          key={question.id}
          onClick={() => onSelect(question)}
          className="clinical-chip text-left"
        >
          <Sparkles className="clinical-chip-icon shrink-0" />
          <span>{question.text}</span>
        </button>
      ))}
    </div>
  );
}
