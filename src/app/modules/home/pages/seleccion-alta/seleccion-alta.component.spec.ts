import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionAltaComponent } from './seleccion-alta.component';

describe('SeleccionAltaComponent', () => {
  let component: SeleccionAltaComponent;
  let fixture: ComponentFixture<SeleccionAltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionAltaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
