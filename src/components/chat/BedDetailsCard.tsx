import { Bed, Building2, MapPin, Settings, Tag } from "lucide-react";
import type { BedInfo } from "@/types/chat";

interface BedDetailsCardProps {
  bed: BedInfo;
}

const DetailRow = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) => (
  <div className="flex items-start gap-2.5 py-1.5">
    <Icon className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
    <div className="flex-1 min-w-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <p className="text-sm font-medium text-foreground truncate">{value}</p>
    </div>
  </div>
);

export function BedDetailsCard({ bed }: BedDetailsCardProps) {
  return (
    <div className="bg-muted/50 rounded-lg p-3 mt-3 space-y-1">
      <DetailRow icon={Bed} label="Cama" value={`${bed.id} (${bed.locationCode})`} />
      <DetailRow icon={Tag} label="Servicio" value={bed.service} />
      <DetailRow icon={MapPin} label="Estado" value={bed.status} />
      {bed.building && <DetailRow icon={Building2} label="Edificio" value={bed.building} />}
      {bed.area && <DetailRow icon={MapPin} label="Área" value={bed.area} />}
      {bed.type && <DetailRow icon={Tag} label="Tipo" value={bed.type} />}
      {bed.equipment && bed.equipment.length > 0 && (
        <DetailRow icon={Settings} label="Equipamiento" value={bed.equipment.join(", ")} />
      )}
    </div>
  );
}
