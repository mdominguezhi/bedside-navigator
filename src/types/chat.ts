export interface BedInfo {
  id: string;
  locationCode: string;
  service: string;
  status: string;
  building?: string;
  area?: string;
  type?: string;
  equipment?: string[];
}

export interface MessageAction {
  type: 'reserve' | 'cancel';
  bedId: string;
  label: string;
}

export interface FollowUpQuestion {
  id: string;
  text: string;
}

export interface ReferenceLink {
  id: string;
  label: string;
  href: string;
}

export interface ChatMessage {
  id: string;
  type: 'assistant' | 'user';
  content: string;
  timestamp: Date;
  status?: 'complete' | 'thinking' | 'error';
  bedDetails?: BedInfo;
  multipleBeds?: BedInfo[];
  actions?: MessageAction[];
  followUpQuestions?: FollowUpQuestion[];
  mapLink?: string;
  references?: ReferenceLink[];
}

export type PanelStatus = 'complete' | 'thinking' | 'error';
