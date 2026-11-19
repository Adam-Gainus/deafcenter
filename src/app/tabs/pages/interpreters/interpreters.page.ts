import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-interpreters',
  templateUrl: './interpreters.page.html',
  styleUrls: ['./interpreters.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
})
export class InterpretersPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
