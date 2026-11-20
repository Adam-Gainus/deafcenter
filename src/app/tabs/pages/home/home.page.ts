import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { ViewWillEnter } from '@ionic/angular';
import {
  IonBadge,
  IonItem,
  IonLabel,
  IonList,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { calendar, videocam } from 'ionicons/icons';

import type { CenterEvent } from '../../../models/center-event';
import { EventService } from '../../../services/events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonTitle,
    IonToolbar,
    RouterLink,
    DatePipe,
    IonBadge,
    IonLabel,
    IonItem,
    IonList,
  ],
})
export class HomePage implements ViewWillEnter {
  protected readonly thisWeek = signal<CenterEvent[]>([]);

  private readonly eventService = inject(EventService);

  constructor() {
    addIcons({ calendar, videocam });
  }

  ionViewWillEnter(): void {
    this.thisWeek.set(this.eventService.getThisWeek());
  }
}
