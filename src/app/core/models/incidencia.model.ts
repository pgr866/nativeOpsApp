import { SafeResourceUrl } from '@angular/platform-browser';

export interface Incidencia {
  id: string;
  foto: SafeResourceUrl;
  latitud: number;
  longitud: number;
  fecha: Date;
}
