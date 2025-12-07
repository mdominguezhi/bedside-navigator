import { ExternalLink } from "lucide-react";
import type { ReferenceLink } from "@/types/chat";

interface ReferenceLinksProps {
  references: ReferenceLink[];
}

export function ReferenceLinks({ references }: ReferenceLinksProps) {
  return (
    <div className="flex flex-col gap-1 mt-3">
      {references.map((ref) => (
        <a
          key={ref.id}
          href={ref.href}
          className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors group w-fit"
        >
          <ExternalLink className="w-3 h-3" />
          {ref.label}
        </a>
      ))}
    </div>
  );
}