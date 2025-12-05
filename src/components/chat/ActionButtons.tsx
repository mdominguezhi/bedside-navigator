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
    <div className="space-y-2 mt-4">
      {reserveActions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {reserveActions.map((action) => (
            <Button
              key={`${action.type}-${action.bedId}`}
              variant="clinical"
              size="sm"
              loading={loadingId === `${action.type}-${action.bedId}`}
              onClick={() => handleClick(action)}
              className="flex-1 min-w-[140px] max-w-[200px]"
            >
              <Check className="w-4 h-4" />
              {action.label}
            </Button>
          ))}
        </div>
      )}
      {cancelActions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {cancelActions.map((action) => (
            <Button
              key={`${action.type}-${action.bedId}`}
              variant="clinicalOutline"
              size="sm"
              loading={loadingId === `${action.type}-${action.bedId}`}
              onClick={() => handleClick(action)}
              className="flex-1 min-w-[140px] max-w-[200px]"
            >
              <X className="w-4 h-4" />
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
