interface ChatTimestampProps {
  time: string;
}

export function ChatTimestamp({ time }: ChatTimestampProps) {
  return (
    <div className="flex items-center justify-center py-2">
      <span className="text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
        {time}
      </span>
    </div>
  );
}
