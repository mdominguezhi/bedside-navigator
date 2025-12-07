import { Check, CheckCheck, X, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MessageAction } from "@/types/chat";
import { useState } from "react";

interface ActionButtonsProps {
  actions: MessageAction[];
  onAction: (action: MessageAction) => void;
}

export function ActionButtons({ actions, onAction }: ActionButtonsProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [confirmedIds, setConfirmedIds] = useState<Set<string>>(new Set());

  const getActionId = (action: MessageAction) => `${action.type}-${action.bedId}`;

  const handleClick = async (action: MessageAction) => {
    const actionId = getActionId(action);
    setLoadingId(actionId);
    await onAction(action);
    setLoadingId(null);
    setConfirmedIds((prev) => new Set(prev).add(actionId));
  };

  const handleUndo = (action: MessageAction) => {
    const actionId = getActionId(action);
    setConfirmedIds((prev) => {
      const next = new Set(prev);
      next.delete(actionId);
      return next;
    });
  };

  const reserveActions = actions.filter((a) => a.type === "reserve");
  const cancelActions = actions.filter((a) => a.type === "cancel");

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {reserveActions.map((action) => {
        const actionId = getActionId(action);
        const isConfirmed = confirmedIds.has(actionId);
        const isLoading = loadingId === actionId;

        return (
          <div key={actionId} className="flex items-center gap-1">
            <Button
              variant={isConfirmed ? "clinical" : "clinicalOutline"}
              size="sm"
              loading={isLoading}
              onClick={() => !isConfirmed && handleClick(action)}
              disabled={isConfirmed}
              className="h-7 px-3 text-xs"
            >
              {isConfirmed ? (
                <CheckCheck className="w-3 h-3" />
              ) : (
                <Check className="w-3 h-3" />
              )}
              {action.label}
            </Button>
            {isConfirmed && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleUndo(action)}
                className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                title="Deshacer"
              >
                <Undo2 className="w-3 h-3" />
              </Button>
            )}
          </div>
        );
      })}
      {cancelActions.map((action) => {
        const actionId = getActionId(action);
        const isConfirmed = confirmedIds.has(actionId);
        const isLoading = loadingId === actionId;

        return (
          <div key={actionId} className="flex items-center gap-1">
            <Button
              variant={isConfirmed ? "destructive" : "clinicalOutline"}
              size="sm"
              loading={isLoading}
              onClick={() => !isConfirmed && handleClick(action)}
              disabled={isConfirmed}
              className="h-7 px-3 text-xs"
            >
              {isConfirmed ? (
                <CheckCheck className="w-3 h-3" />
              ) : (
                <X className="w-3 h-3" />
              )}
              {action.label}
            </Button>
            {isConfirmed && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleUndo(action)}
                className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                title="Deshacer"
              >
                <Undo2 className="w-3 h-3" />
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}
