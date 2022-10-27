import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavSidebartComponent } from './nav-sidebart.component';

describe('NavSidebartComponent', () => {
  let component: NavSidebartComponent;
  let fixture: ComponentFixture<NavSidebartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavSidebartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavSidebartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
