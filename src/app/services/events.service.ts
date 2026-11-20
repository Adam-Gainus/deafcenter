import { Injectable } from '@angular/core';

import type { CenterEvent } from '../models/center-event';

import { thisWeekEvents, upcomingEvents } from './event-filters';

@Injectable({ providedIn: 'root' })
export class EventService {
  private events: CenterEvent[] = [];

  getUpcoming(): CenterEvent[] {
    return upcomingEvents(this.events, new Date());
  }

  getThisWeek(): CenterEvent[] {
    return thisWeekEvents(this.events, new Date());
  }
}
