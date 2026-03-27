import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard,
  IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonBackButton, IonButtons,
  AlertController, ToastController, NavController
} from '@ionic/angular/standalone';
import { camera, image, saveOutline, refreshOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { IncidenciasService } from '../../core/services/incidencia';

@Component({
  selector: 'app-alta-incidencia',
  templateUrl: './alta-incidencia.page.html',
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonBackButton, IonButtons
  ]
})
export class AltaIncidenciaPage implements OnInit {
  private navCtrl = inject(NavController);
  public service = inject(IncidenciasService);
  private alertController = inject(AlertController);
  private toastController = inject(ToastController);

  constructor() {
    addIcons({ camera, image, saveOutline, refreshOutline });
  }

  async ngOnInit() {
    try {
      await this.service.obtenerCoordenadas();
    } catch (error: any) {
      await this.mostrarError(`Error obteniendo coordenadas: ${error.message}`);
    }
  }

  async tomarFoto() {
    try {
      await this.service.tomarFoto();
    } catch (error: any) {
      await this.mostrarError(`Error al capturar la foto: ${error.message}`);
    }
  }

  async guardarIncidencia() {
    try {
      await this.service.guardarIncidencia();
      await this.mostrarExito('Incidencia reportada correctamente');
      this.navCtrl.navigateBack('/home');
    } catch (error: any) {
      await this.mostrarError(`Error al guardar incidencia: ${error.message}`);
    }
  }

  private async mostrarExito(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  }

  private async mostrarError(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}