import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTurnosDisponiblesComponent } from './listado-turnos-disponibles.component';

describe('ListadoTurnosDisponiblesComponent', () => {
  let component: ListadoTurnosDisponiblesComponent;
  let fixture: ComponentFixture<ListadoTurnosDisponiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoTurnosDisponiblesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoTurnosDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
