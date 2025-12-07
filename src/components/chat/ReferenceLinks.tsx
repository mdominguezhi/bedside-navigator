import { ExternalLink, ChevronDown } from "lucide-react";
import { useState } from "react";
import type { ReferenceLink } from "@/types/chat";
import { cn } from "@/lib/utils";

interface ReferenceLinksProps {
  references: ReferenceLink[];
}

export function ReferenceLinks({ references }: ReferenceLinksProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronDown
          className={cn(
            "w-3 h-3 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
        {references.length} {references.length === 1 ? "referencia" : "referencias"}
      </button>
      
      <div
        className={cn(
          "grid transition-all duration-200 ease-out",
          isOpen ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-1 pl-4 border-l border-border">
            {references.map((ref) => (
              <a
                key={ref.id}
                href={ref.href}
                className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors w-fit"
              >
                <ExternalLink className="w-3 h-3" />
                {ref.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}