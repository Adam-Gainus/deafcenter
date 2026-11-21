import { Injectable } from '@angular/core';
import type { QueryDocumentSnapshot } from 'firebase/firestore';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { db } from '../firebase';
import type { CenterEvent } from '../models/center-event';

import { thisWeekEvents, upcomingEvents } from './event-filters';

@Injectable({ providedIn: 'root' })
export class EventService {
  async getUpcoming(): Promise<CenterEvent[]> {
    const events = await this.loadEvents();
    return upcomingEvents(events, new Date());
  }

  async getThisWeek(): Promise<CenterEvent[]> {
    const events = await this.loadEvents();
    return thisWeekEvents(events, new Date());
  }

  private async loadEvents(): Promise<CenterEvent[]> {
    const eventsQuery = query(collection(db, 'events'), where('end', '>', new Date()));
    const snapshot = await getDocs(eventsQuery);
    return snapshot.docs.map((doc) => this.toCenterEvent(doc));
  }

  private toCenterEvent(doc: QueryDocumentSnapshot): CenterEvent {
    const data = doc.data();
    return {
      id: doc.id,
      title: data['title'],
      category: data['category'],
      start: data['start'].toDate(),
      end: data['end'].toDate(),
      place: data['place'],
      details: data['details'],
      flyerUrl: data['flyerUrl'],
      status: data['status'],
    };
  }
}
