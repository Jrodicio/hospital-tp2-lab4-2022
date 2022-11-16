import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoAlSistemaComponent } from './ingreso-al-sistema.component';

describe('IngresoAlSistemaComponent', () => {
  let component: IngresoAlSistemaComponent;
  let fixture: ComponentFixture<IngresoAlSistemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoAlSistemaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresoAlSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
