import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AltaIncidenciaPage } from './alta-incidencia.page';

describe('AltaIncidenciaPage', () => {
  let component: AltaIncidenciaPage;
  let fixture: ComponentFixture<AltaIncidenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaIncidenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
