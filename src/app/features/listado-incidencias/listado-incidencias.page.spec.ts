import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoIncidenciasPage } from './listado-incidencias.page';

describe('ListadoIncidenciasPage', () => {
  let component: ListadoIncidenciasPage;
  let fixture: ComponentFixture<ListadoIncidenciasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoIncidenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
