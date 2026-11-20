import type { CenterEvent } from '../models/center-event';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export function upcomingEvents(events: CenterEvent[], now: Date): CenterEvent[] {
  return events.filter((event) => event.end > now).sort((a, b) => a.start.getTime() - b.start.getTime());
}

export function thisWeekEvents(events: CenterEvent[], now: Date): CenterEvent[] {
  const weekLater = new Date(now.getTime() + 7 * ONE_DAY_MS);
  return upcomingEvents(events, now).filter((event) => event.start < weekLater);
}
