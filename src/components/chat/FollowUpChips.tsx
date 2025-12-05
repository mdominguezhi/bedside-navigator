import type { FollowUpQuestion } from "@/types/chat";

interface FollowUpChipsProps {
  questions: FollowUpQuestion[];
  onSelect: (question: FollowUpQuestion) => void;
}

export function FollowUpChips({ questions, onSelect }: FollowUpChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {questions.map((question) => (
        <button
          key={question.id}
          onClick={() => onSelect(question)}
          className="clinical-chip text-left"
        >
          {question.text}
        </button>
      ))}
    </div>
  );
}
