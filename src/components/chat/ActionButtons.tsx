import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MessageAction } from "@/types/chat";
import { useState } from "react";

interface ActionButtonsProps {
  actions: MessageAction[];
  onAction: (action: MessageAction) => void;
}

export function ActionButtons({ actions, onAction }: ActionButtonsProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleClick = async (action: MessageAction) => {
    setLoadingId(`${action.type}-${action.bedId}`);
    await onAction(action);
    setLoadingId(null);
  };

  const reserveActions = actions.filter((a) => a.type === "reserve");
  const cancelActions = actions.filter((a) => a.type === "cancel");

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {reserveActions.map((action) => (
        <Button
          key={`${action.type}-${action.bedId}`}
          variant="clinical"
          size="sm"
          loading={loadingId === `${action.type}-${action.bedId}`}
          onClick={() => handleClick(action)}
          className="h-7 px-3 text-xs"
        >
          <Check className="w-3 h-3" />
          {action.label}
        </Button>
      ))}
      {cancelActions.map((action) => (
        <Button
          key={`${action.type}-${action.bedId}`}
          variant="clinicalOutline"
          size="sm"
          loading={loadingId === `${action.type}-${action.bedId}`}
          onClick={() => handleClick(action)}
          className="h-7 px-3 text-xs"
        >
          <X className="w-3 h-3" />
          {action.label}
        </Button>
      ))}
    </div>
  );
}
