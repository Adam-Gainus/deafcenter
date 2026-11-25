import { Injectable } from '@angular/core';
import type { QueryDocumentSnapshot } from 'firebase/firestore';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

import { db } from '../firebase';
import type { CenterEvent, EventStatus } from '../models/center-event';

import { thisWeekEvents, upcomingEvents } from './event-filters';

@Injectable({ providedIn: 'root' })
export class EventService {
  async getUpcoming(): Promise<CenterEvent[]> {
    const events = await this.loadEvents(['scheduled', 'cancelled']);
    return upcomingEvents(events, new Date());
  }

  async getThisWeek(): Promise<CenterEvent[]> {
    const events = await this.loadEvents(['scheduled', 'cancelled']);
    return thisWeekEvents(events, new Date());
  }

  async getUpcomingForStaff(): Promise<CenterEvent[]> {
    const events = await this.loadEvents(['pending', 'scheduled', 'cancelled']);
    return upcomingEvents(events, new Date());
  }

  async addEvent(event: Omit<CenterEvent, 'id'>): Promise<void> {
    await addDoc(collection(db, 'events'), event);
  }

  private async loadEvents(statuses: EventStatus[]): Promise<CenterEvent[]> {
    const eventsQuery = query(collection(db, 'events'), where('status', 'in', statuses), where('end', '>', new Date()));
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
      request: data['request'],
    };
  }
}
