import { ExternalLink, Map } from "lucide-react";

interface MapLinkProps {
  href: string;
}

export function MapLink({ href }: MapLinkProps) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
    >
      <Map className="w-4 h-4" />
      Ver mapa de camas con filtros aplicados
      <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}
