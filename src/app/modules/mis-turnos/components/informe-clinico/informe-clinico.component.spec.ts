import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeClinicoComponent } from './informe-clinico.component';

describe('InformeClinicoComponent', () => {
  let component: InformeClinicoComponent;
  let fixture: ComponentFixture<InformeClinicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeClinicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformeClinicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
