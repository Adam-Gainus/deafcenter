import { DatePipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import type { ViewWillEnter } from '@ionic/angular';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
  IonList,
  IonText,
  IonInput,
  AlertController,
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/angular';

import type { CenterEvent } from '../../../models/center-event';
import { AuthService } from '../../../services/auth.service';
import { EventService } from '../../../services/events.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.page.html',
  styleUrls: ['./staff.page.scss'],
  imports: [
    DatePipe,
    IonBadge,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    RouterLink,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    FormsModule,
    IonButton,
    IonItem,
    IonList,
    IonText,
    IonInput,
  ],
})
export class StaffPage implements ViewWillEnter {
  protected readonly auth = inject(AuthService);
  protected readonly email = signal('');
  protected readonly password = signal('');
  protected readonly errorMessage = signal('');
  protected readonly events = signal<CenterEvent[]>([]);

  private readonly eventService = inject(EventService);
  private readonly alertController = inject(AlertController);

  constructor() {
    effect(() => {
      if (this.auth.isStaff()) {
        this.loadEvents();
      } else {
        this.events.set([]);
      }
    });
  }

  async ionViewWillEnter(): Promise<void> {
    if (this.auth.isStaff()) {
      await this.loadEvents();
    }
  }

  protected async logIn(): Promise<void> {
    this.errorMessage.set('');
    try {
      await this.auth.logIn(this.email(), this.password());
      this.password.set('');
    } catch {
      this.errorMessage.set('Wrong email or password. Please try again.');
    }
  }

  protected async logOut(): Promise<void> {
    await this.auth.logOut();
  }

  protected async cancelEvent(event: CenterEvent): Promise<void> {
    const ok = await this.confirm('Cancel this event?', event.title, 'Yes, cancel it');
    if (!ok) {
      return;
    }
    if (this.auth.isApprover()) {
      await this.eventService.cancelEvent(event.id);
    } else {
      await this.eventService.requestChange(event.id, 'cancel');
    }
    await this.loadEvents();
  }

  protected async deleteEvent(event: CenterEvent): Promise<void> {
    const ok = await this.confirm('Delete this event?', event.title, 'Yes, delete it');
    if (!ok) {
      return;
    }
    if (this.auth.isApprover()) {
      await this.eventService.deleteEvent(event.id);
    } else {
      await this.eventService.requestChange(event.id, 'delete');
    }
    await this.loadEvents();
  }

  protected async approve(event: CenterEvent): Promise<void> {
    await this.eventService.approve(event);
    await this.loadEvents();
  }

  protected async reject(event: CenterEvent): Promise<void> {
    await this.eventService.reject(event);
    await this.loadEvents();
  }

  private async loadEvents(): Promise<void> {
    const events = await this.eventService.getUpcomingForStaff();
    this.events.set(events);
  }

  private async confirm(header: string, message: string, yesText: string): Promise<boolean> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        { text: 'No', role: 'cancel' },
        { text: yesText, role: 'confirm' },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    return role === 'confirm';
  }
}
