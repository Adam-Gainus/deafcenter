import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
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
} from '@ionic/angular';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.page.html',
  styleUrls: ['./staff.page.scss'],
  imports: [
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
export class StaffPage {
  protected readonly auth = inject(AuthService);
  protected readonly email = signal('');
  protected readonly password = signal('');
  protected readonly errorMessage = signal('');

  protected async logIn(): Promise<void> {
    this.errorMessage.set('');
    try {
      await this.auth.logIn(this.email(), this.password());
      this.password.set('');
    } catch {
      this.errorMessage.set('Wrong email or password. please try again.');
    }
  }

  protected async logOut(): Promise<void> {
    await this.auth.logOut();
  }
}
