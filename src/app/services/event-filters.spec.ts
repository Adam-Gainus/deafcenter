import type { CenterEvent } from '../models/center-event';

import { thisWeekEvents, upcomingEvents } from './event-filters';

const NOW = new Date('2026-11-20T10:00:00');

function makeEvent(id: string, start: string, end: string): CenterEvent {
    return {
        id,
        title: `Test event ${id}`,
        category: 'workshop',
        start: new Date(start),
        end: new Date(end),
        place: 'Test room',
        details: 'Test details',
        status: 'scheduled',
    };
}

describe('upcomingEvents', () => {
    it('hides events that already ended', () => {
        const past = makeEvent('past', '2026-11-19T18:00:00', '2026-11-19T20:00:00');
        const future = makeEvent('future', '2026-11-21T18:00:00', '2026-11-21T20:00:00');

        const result = upcomingEvents([past, future], NOW);

        expect(result.map((event) => event.id)).toEqual(['future']);
    });

    it('keeps an event that is happening right now', () => {
        const happening = makeEvent('happening', '2026-11-20T09:00:00', '2026-11-20T11:00:00');

        const result = upcomingEvents([happening], NOW);

        expect(result.map((event) => event.id)).toEqual(['happening']);
    });

    it('sorts events by start time, earliest first', () => {
        const later = makeEvent('later', '2026-11-25T09:00:00', '2026-11-25T11:00:00');
        const sooner = makeEvent('sooner', '2026-11-23T09:00:00', '2026-11-23T11:00:00');

        const result = upcomingEvents([later, sooner], NOW);

        expect(result.map((event) => event.id)).toEqual(['sooner', 'later']);
    });
});

describe('thisWeekEvents', () => {
    it('keeps events in the next 7 days and hides later ones', () => {
        const inWeek = makeEvent('in-week', '2026-11-26T18:00:00', '2026-11-26T20:00:00');
        const nextWeek = makeEvent('next-week', '2026-11-28T18:00:00', '2026-11-28T20:00:00');

        const result = thisWeekEvents([nextWeek, inWeek], NOW);

        expect(result.map((event) => event.id)).toEqual(['in-week']);
    });
});