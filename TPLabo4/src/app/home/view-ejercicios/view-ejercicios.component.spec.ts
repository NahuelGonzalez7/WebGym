import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEjerciciosComponent } from './view-ejercicios.component';

describe('ViewEjerciciosComponent', () => {
  let component: ViewEjerciciosComponent;
  let fixture: ComponentFixture<ViewEjerciciosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewEjerciciosComponent]
    });
    fixture = TestBed.createComponent(ViewEjerciciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
