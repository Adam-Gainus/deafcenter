import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';

import type { EventCategory } from '../../../models/center-event';
import { EventService } from '../../../services/events.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.page.html',
  styleUrls: ['./event-form.page.scss'],
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    FormsModule,
    IonBackButton,
    IonButton,
    IonButtons,
    IonInput,
    IonItem,
    IonList,
    IonSelect,
    IonSelectOption,
    IonText,
    IonTextarea,
  ],
})
export class EventFormPage {
  protected readonly title = signal('');
  protected readonly category = signal<EventCategory>('workshop');
  protected readonly start = signal('');
  protected readonly end = signal('');
  protected readonly place = signal('');
  protected readonly details = signal('');
  protected readonly errorMessage = signal('');

  private readonly eventService = inject(EventService);
  private readonly router = inject(Router);

  protected async save(): Promise<void> {
    this.errorMessage.set('');

    const start = new Date(this.start());
    const end = new Date(this.end());

    if (!this.title() || !this.start() || !this.end() || !this.place()) {
      this.errorMessage.set('Please fill in the title, start, end, and place.');
      return;
    }
    if (end <= start) {
      this.errorMessage.set('The end must be after the start.');
      return;
    }

    try {
      await this.eventService.addEvent({
        title: this.title(),
        category: this.category(),
        start,
        end,
        place: this.place(),
        details: this.details(),
        status: 'scheduled',
      });
      await this.router.navigateByUrl('/tabs/staff');
    } catch {
      this.errorMessage.set('Could not save the event. Please try again.');
    }
  }
}
