import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Stepper3Component } from './stepper3.component';

describe('Stepper3Component', () => {
  let component: Stepper3Component;
  let fixture: ComponentFixture<Stepper3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Stepper3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Stepper3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
