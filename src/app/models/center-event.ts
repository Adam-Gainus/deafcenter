export type EventCategory = 'event' | 'workshop' | 'class';

export type EventStatus = 'pending' | 'scheduled' | 'cancelled';

export type EventRequest = 'cancel' | 'delete';

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
  request?: EventRequest;
}
