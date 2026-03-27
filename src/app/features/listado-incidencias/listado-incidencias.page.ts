import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent,
  IonCardHeader, IonCardTitle, IonBackButton, IonButtons, IonIcon, IonButton,
  AlertController, ToastController
} from '@ionic/angular/standalone';
import { IncidenciasService } from '../../core/services/incidencia';
import { addCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-listado-incidencias',
  templateUrl: './listado-incidencias.page.html',
  styleUrls: ['./listado-incidencias.page.scss'],
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent,
    IonCardHeader, IonCardTitle, IonBackButton, IonButtons, IonIcon, IonButton
  ]
})
export class ListadoIncidenciasPage {
  public incidenciaService = inject(IncidenciasService);
  private alertController = inject(AlertController);
  private toastController = inject(ToastController);

  constructor() {
    addIcons({ addCircleOutline });
  }

  async mostrarEnConstruccion() {
    const alert = await this.alertController.create({
      header: 'En construcción 🚧',
      message: 'Esta funcionalidad está en construcción',
      buttons: ['Cerrar']
    });
    await alert.present();
  }

  async eliminarIncidencia(id: string, event: Event) {
    event.stopPropagation();
    const alert = await this.alertController.create({
      header: '¿Eliminar?',
      message: '¿Estás seguro de borrar esta incidencia?',
      buttons: [
        { text: 'No', role: 'cancel' },
        {
          text: 'Sí, borrar',
          handler: async () => {
            try {
              await this.incidenciaService.eliminarIncidencia(id);
              await this.mostrarExito('Incidencia eliminada correctamente');
            } catch (error: any) {
              await this.mostrarError(`Error al eliminar incidencia: ${error.message}`);
            }
          }
        }
      ]
    });
    await alert.present();
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
