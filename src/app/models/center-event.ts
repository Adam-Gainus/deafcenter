export type EventCategory = 'bazaar' | 'workshop' | 'basketball' | 'holiday';

export type EventStatus = 'scheduled' | 'cancelled';

export interface CenterEvent {
  id: string;
  title: string;
  category: EventCategory;
  start: Date;
  end: Date;
  place: string;
  details: string;
  flyerUrl?: string;
  status: EventStatus;
}
