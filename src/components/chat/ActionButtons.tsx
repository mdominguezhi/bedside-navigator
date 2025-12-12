import { Check, CheckCheck, X, Undo2, Bed } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MessageAction } from "@/types/chat";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
            <button
              onClick={() => !isConfirmed && !isLoading && handleClick(action)}
              disabled={isConfirmed || isLoading}
              className={cn(
                "action-card-btn group",
                isConfirmed && "action-card-btn-confirmed",
                !isConfirmed && !isLoading && "animate-pulse-subtle"
              )}
            >
              <div className="action-card-icon">
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                ) : isConfirmed ? (
                  <CheckCheck className="w-4 h-4 text-success" />
                ) : (
                  <Bed className="w-4 h-4 text-primary" />
                )}
              </div>
              <div className="flex flex-col items-start">
                <span className="action-card-label">{action.label}</span>
                <span className="action-card-sublabel">
                  {isConfirmed ? "Confirmado" : "Click para reservar"}
                </span>
              </div>
            </button>
            {isConfirmed && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleUndo(action)}
                className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground animate-fade-in"
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
            <button
              onClick={() => !isConfirmed && !isLoading && handleClick(action)}
              disabled={isConfirmed || isLoading}
              className={cn(
                "action-card-btn action-card-btn-cancel group",
                isConfirmed && "action-card-btn-cancel-confirmed"
              )}
            >
              <div className="action-card-icon action-card-icon-cancel">
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-destructive/30 border-t-destructive rounded-full animate-spin" />
                ) : isConfirmed ? (
                  <CheckCheck className="w-4 h-4 text-destructive" />
                ) : (
                  <X className="w-4 h-4 text-destructive" />
                )}
              </div>
              <div className="flex flex-col items-start">
                <span className="action-card-label">{action.label}</span>
                <span className="action-card-sublabel">
                  {isConfirmed ? "Cancelado" : "Click para cancelar"}
                </span>
              </div>
            </button>
            {isConfirmed && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleUndo(action)}
                className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground animate-fade-in"
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
