import { Injectable } from '@angular/core';
import type { QueryDocumentSnapshot } from 'firebase/firestore';
import { addDoc, collection, deleteDoc, deleteField, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';

import { db } from '../firebase';
import type { CenterEvent, EventRequest, EventStatus } from '../models/center-event';

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

  async requestChange(id: string, request: EventRequest): Promise<void> {
    await updateDoc(doc(db, 'events', id), { request });
  }

  async cancelEvent(id: string): Promise<void> {
    await updateDoc(doc(db, 'events', id), { status: 'cancelled', request: deleteField() });
  }

  async deleteEvent(id: string): Promise<void> {
    await deleteDoc(doc(db, 'events', id));
  }

  async approve(event: CenterEvent): Promise<void> {
    if (event.request === 'delete') {
      await this.deleteEvent(event.id);
    } else if (event.request === 'cancel') {
      await this.cancelEvent(event.id);
    } else if (event.status === 'pending') {
      await updateDoc(doc(db, 'events', event.id), { status: 'scheduled' });
    }
  }

  async reject(event: CenterEvent): Promise<void> {
    if (event.request) {
      await updateDoc(doc(db, 'events', event.id), { request: deleteField() });
    } else if (event.status === 'pending') {
      await this.deleteEvent(event.id);
    }
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
