import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoboffersComponent } from './joboffers.component';

describe('JoboffersComponent', () => {
  let component: JoboffersComponent;
  let fixture: ComponentFixture<JoboffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoboffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoboffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
