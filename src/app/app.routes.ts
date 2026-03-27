import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'alta-incidencia',
    loadComponent: () => import('./features/alta-incidencia/alta-incidencia.page').then(m => m.AltaIncidenciaPage)
  },
  {
    path: 'listado-incidencias',
    loadComponent: () => import('./features/listado-incidencias/listado-incidencias.page').then(m => m.ListadoIncidenciasPage)
  },
];
