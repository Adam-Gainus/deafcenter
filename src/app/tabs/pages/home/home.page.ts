import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { calendar, videocam } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonButton, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar, RouterLink],
})
export class HomePage {
  constructor() {
    addIcons({ calendar, videocam });
  }
}
