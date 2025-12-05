import { Bed } from "lucide-react";
import type { BedInfo } from "@/types/chat";

interface BedListCardProps {
  beds: BedInfo[];
}

export function BedListCard({ beds }: BedListCardProps) {
  return (
    <div className="space-y-2 mt-3">
      {beds.map((bed) => (
        <div
          key={bed.id}
          className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 shrink-0">
            <Bed className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">Cama {bed.id}</span>
              <span className="text-xs text-muted-foreground">({bed.locationCode})</span>
            </div>
            <div className="mt-0.5">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                {bed.service}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
