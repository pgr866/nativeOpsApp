import { Injectable, signal, computed } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { Incidencia } from '../models/incidencia.model';

@Injectable({ providedIn: 'root' })
export class IncidenciasService {
  private readonly STORAGE_KEY = 'app_incidencias';
  private _incidencias = signal<Incidencia[]>([]);
  public incidencias = this._incidencias.asReadonly();
  private _newIncidencia = signal<Partial<Incidencia>>({});
  public newIncidencia = this._newIncidencia.asReadonly();
  public totalCount = computed(() => this._incidencias().length);

  constructor() {
    this.cargarIncidencias();
  }

  async cargarIncidencias() {
    const { value } = await Preferences.get({ key: this.STORAGE_KEY });
    if (value) {
      const datos = JSON.parse(value).map((inc: any) => ({ ...inc, fecha: new Date(inc.fecha) }));
      this._incidencias.set(datos);
    }
  }

  async obtenerCoordenadas() {
    try {
      const position = await Geolocation.getCurrentPosition();
      this._newIncidencia.update(actual => ({
        ...actual,
        latitud: position.coords.latitude,
        longitud: position.coords.longitude
      }));
    } catch (error) {
      console.error('Error obteniendo coordenadas:', error);
      throw error;
    }
  }

  async tomarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt
      });
      this._newIncidencia.update(actual => ({ ...actual, foto: image.webPath }));
    } catch (error) {
      console.error('Error al capturar la foto:', error);
      throw error;
    }
  }

  async guardarIncidencia() {
    const borrador = this._newIncidencia();
    if (!borrador.foto || borrador.latitud === undefined || borrador.longitud === undefined) {
      throw new Error('Faltan datos críticos: se requiere foto y geolocalización');
    }
    try {
      const completa: Incidencia = {
        id: crypto.randomUUID(),
        foto: borrador.foto,
        latitud: borrador.latitud,
        longitud: borrador.longitud,
        fecha: new Date()
      };
      this._incidencias.update(lista => [completa, ...lista]);
      this._newIncidencia.set({});
      await Preferences.set({ key: this.STORAGE_KEY, value: JSON.stringify(this._incidencias()) });
    } catch (error) {
      console.error('Error al guardar:', error);
      throw error;
    }
  }

  async eliminarIncidencia(id: string) {
    try {
      this._incidencias.update(lista => lista.filter(i => i.id !== id));
      await Preferences.set({ key: this.STORAGE_KEY, value: JSON.stringify(this._incidencias()) });
    } catch (error) {
      console.error('Error obteniendo coordenadas:', error);
      throw error;
    }
  }

  resetNewIncidencia() {
    this._newIncidencia.set({});
    this.obtenerCoordenadas();
  }
}
