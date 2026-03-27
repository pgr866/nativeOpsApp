import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent,
  IonCardTitle, IonCardHeader, IonIcon, IonButton
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addCircleOutline, listOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard,
    IonCardContent, IonCardTitle, IonCardHeader, IonIcon, IonButton, RouterLink],
})
export class HomePage {

  constructor() {
    addIcons({ addCircleOutline, listOutline });
  }
}
